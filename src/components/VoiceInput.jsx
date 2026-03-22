import { useState, useEffect, useRef, useContext } from 'react';
import { ContactsContext } from '../context/ContactsContext';
import { extractProfile } from '../utils/claude';
import { formatRolodexName } from '../utils/nameFormatter';

export default function VoiceInput() {
  const { setCurrentView, addContacts } = useContext(ContactsContext);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [createdProfiles, setCreatedProfiles] = useState([]);
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const current = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setTranscript(current);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setError(`Speech recognition error: ${event.error}`);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    } else {
      setError('Speech recognition not supported in this browser. Please use Chrome or Edge.');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startRecording = () => {
    setTranscript('');
    setError(null);
    setCreatedProfiles([]);
    try {
      recognitionRef.current?.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recognition:', error);
      setError('Error starting voice recording');
    }
  };

  const stopRecording = async () => {
    try {
      recognitionRef.current?.stop();
      setIsRecording(false);

      if (!transcript.trim()) {
        setError('No speech detected. Please try again.');
        return;
      }

      setIsProcessing(true);
      setError(null);

      const profiles = await extractProfile(transcript);
      setCreatedProfiles(profiles);
      addContacts(profiles);

      setTimeout(() => {
        setCurrentView('dashboard');
      }, 2500);
    } catch (error) {
      console.error('Error processing transcript:', error);
      setError('Error creating profile. Please try again or check your API key.');
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    }
    setTranscript('');
    setError(null);
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-6" style={{background: 'linear-gradient(to bottom right, #D6CFC7, #F5F1ED)'}}>
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{background: '#DD571C'}}></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000" style={{background: '#DD571C'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" style={{background: '#C4B5A8'}}></div>
      </div>

      <div className="max-w-3xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-5xl font-bold mb-3" style={{color: '#DD571C'}}>
            {isProcessing ? 'Creating Magic...' : createdProfiles.length > 0 ? 'Profile Created! ✨' : 'Tell Me About Them'}
          </h1>
          <p className="text-gray-600 text-lg">
            {isProcessing
              ? 'AI is structuring everything...'
              : createdProfiles.length > 0
              ? `Added ${createdProfiles.length} ${createdProfiles.length === 1 ? 'person' : 'people'} to your Rolo`
              : 'Speak naturally - mention as many people as you\'d like'}
          </p>
        </div>

        {/* Success State */}
        {createdProfiles.length > 0 && !isProcessing && (
          <div className="space-y-4 mb-8 animate-slide-up">
            {createdProfiles.map((profile, index) => (
              <div key={index} className="rounded-3xl p-[2px] animate-slide-up" style={{background: 'linear-gradient(135deg, #DD571C, #C44915)', animationDelay: `${index * 0.1}s`}}>
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-3xl font-bold" style={{color: '#DD571C'}}>{formatRolodexName(profile.name)}</h3>
                      <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold mt-3" style={{background: '#F5F1ED', color: '#DD571C'}}>
                        {profile.relationship_type}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold" style={{color: '#DD571C'}}>
                        {profile.importance}<span className="text-2xl text-gray-400">/5</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    {profile.work && <p className="text-gray-700 flex items-center gap-2"><span>💼</span> {profile.work}</p>}
                    {profile.interests && profile.interests.length > 0 && (
                      <p className="text-gray-700 flex items-start gap-2"><span>✨</span> <span>{profile.interests.join(', ')}</span></p>
                    )}
                    {profile.open_threads && profile.open_threads.length > 0 && (
                      <div className="mt-4 pt-4 border-t" style={{borderColor: '#D6CFC7'}}>
                        <p className="font-semibold mb-2 flex items-center gap-2" style={{color: '#DD571C'}}><span>💭</span> Open threads:</p>
                        <ul className="space-y-1 text-gray-600 ml-6">
                          {profile.open_threads.map((thread, i) => (
                            <li key={i} className="list-disc">{thread}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recording UI */}
        {!createdProfiles.length && !isProcessing && (
          <>
            <div className="flex justify-center mb-10 animate-scale-in">
              <button
                onClick={isRecording ? stopRecording : startRecording}
                disabled={error && error.includes('not supported')}
                className={`relative w-40 h-40 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${
                  isRecording ? 'scale-110' : 'hover:scale-105'
                } ${error && error.includes('not supported') ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={{
                  background: isRecording ? 'linear-gradient(135deg, #CC0000, #990000)' : 'linear-gradient(135deg, #DD571C, #C44915)',
                  boxShadow: isRecording
                    ? '0 0 40px rgba(204, 0, 0, 0.6), 0 8px 32px rgba(204, 0, 0, 0.4)'
                    : '0 8px 32px rgba(221, 87, 28, 0.4), 0 0 20px rgba(221, 87, 28, 0.2)'
                }}
              >
                {isRecording ? (
                  <div className="text-white flex flex-col items-center">
                    <svg className="w-20 h-20 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                      <rect x="6" y="6" width="8" height="8" rx="2" />
                    </svg>
                    <p className="text-sm mt-2 font-semibold">Stop</p>
                  </div>
                ) : (
                  <div className="text-white flex flex-col items-center">
                    <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" />
                      <path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-1.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z" />
                    </svg>
                    <p className="text-sm mt-2 font-semibold">Start</p>
                  </div>
                )}

                {isRecording && (
                  <>
                    <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-50"></span>
                    <span className="absolute inset-0 rounded-full bg-red-300 animate-pulse opacity-30"></span>
                  </>
                )}
              </button>
            </div>

            {transcript && (
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-6 border animate-slide-up" style={{borderColor: '#D6CFC7'}}>
                <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{color: '#DD571C'}}>
                  <span>📝</span> Live Transcript
                </h3>
                <p className="text-gray-800 leading-relaxed">{transcript}</p>
              </div>
            )}

            <div className="text-center text-gray-600 mb-6">
              <p className="mb-2 text-lg font-medium">
                {isRecording
                  ? '🎤 Listening... Speak naturally'
                  : '💬 Click the mic when you\'re ready'}
              </p>
              <p className="text-sm text-gray-500">
                You can talk about multiple people in one go
              </p>
            </div>
          </>
        )}

        {/* Processing State */}
        {isProcessing && (
          <div className="flex flex-col items-center animate-fade-in">
            <div className="relative">
              <div className="w-24 h-24 rounded-full animate-spin" style={{background: 'linear-gradient(135deg, #DD571C, #C44915)'}}></div>
              <div className="absolute inset-2 rounded-full bg-white/90 backdrop-blur-xl"></div>
            </div>
            <p className="text-gray-600 mt-6 text-lg">Creating your connections...</p>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="rounded-2xl mb-6 animate-shake p-[2px]" style={{background: 'linear-gradient(135deg, #DD571C, #C44915)'}}>
            <div className="bg-white rounded-2xl p-4">
              <p className="font-semibold" style={{color: '#DD571C'}}>⚠️ {error}</p>
              {error.includes('API key') && (
                <p className="text-sm mt-2 text-gray-600">
                  Check your .env file for VITE_ANTHROPIC_API_KEY
                </p>
              )}
            </div>
          </div>
        )}

        {/* Cancel Button */}
        <div className="flex justify-center">
          <button
            onClick={handleCancel}
            className="px-8 py-3 text-gray-600 hover:text-gray-800 font-semibold transition-colors rounded-2xl hover:bg-white/50"
          >
            {createdProfiles.length > 0 ? 'Back to Dashboard' : 'Cancel'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-fade-in { animation: fadeIn 0.6s ease-out; }
        .animate-slide-up { animation: slideUp 0.6s ease-out; }
        .animate-scale-in { animation: scaleIn 0.5s ease-out; }
        .animate-shake { animation: shake 0.5s ease-out; }
      `}</style>
    </div>
  );
}
