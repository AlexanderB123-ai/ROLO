import { useState, useEffect, useRef, useContext } from 'react';
import { ContactsContext } from '../context/ContactsContext';
import { extractProfile } from '../utils/claude';
import { formatRolodexName } from '../utils/nameFormatter';
import { Mic, Square, ArrowLeft, Loader2 } from 'lucide-react';

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
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);

  const startRecording = () => {
    setTranscript('');
    setError(null);
    setCreatedProfiles([]);
    try {
      recognitionRef.current?.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error starting recognition:', err);
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

      setTimeout(() => setCurrentView('dashboard'), 2500);
    } catch (err) {
      console.error('Error processing transcript:', err);
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
    <div className="min-h-screen bg-warm-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-48 -right-48 w-[500px] h-[500px] rounded-full bg-brand/8 blur-3xl animate-blob" />
        <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full bg-brand/5 blur-3xl animate-blob delay-2000" />
      </div>

      <div className="max-w-xl w-full relative z-10">
        {/* Back */}
        <button
          onClick={handleCancel}
          className="mb-8 inline-flex items-center gap-2 text-warm-500 hover:text-warm-700 font-medium transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          {createdProfiles.length > 0 ? 'Dashboard' : 'Cancel'}
        </button>

        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-4xl font-bold text-warm-900 mb-2">
            {isProcessing ? 'Processing...' : createdProfiles.length > 0 ? 'Added!' : 'Tell me about them'}
          </h1>
          <p className="text-warm-500">
            {isProcessing
              ? 'AI is extracting contact details...'
              : createdProfiles.length > 0
              ? `${createdProfiles.length} ${createdProfiles.length === 1 ? 'person' : 'people'} added to your Rolo`
              : 'Speak naturally about anyone you want to remember'}
          </p>
        </div>

        {/* Success */}
        {createdProfiles.length > 0 && !isProcessing && (
          <div className="space-y-4 mb-8 animate-slide-up">
            {createdProfiles.map((profile, index) => (
              <div key={index} className="bg-white rounded-2xl border border-warm-200/60 shadow-sm p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-warm-900">{formatRolodexName(profile.name)}</h3>
                    <span className="text-xs font-medium text-brand bg-brand-light px-2 py-1 rounded-lg capitalize">
                      {profile.relationship_type}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-brand">{profile.importance}</span>
                    <span className="text-sm text-warm-400">/5</span>
                  </div>
                </div>

                {profile.work && (
                  <p className="text-sm text-warm-600 mb-1">{profile.work}</p>
                )}
                {profile.interests?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {profile.interests.map((interest, i) => (
                      <span key={i} className="text-xs bg-warm-100 text-warm-600 px-2 py-1 rounded-lg">{interest}</span>
                    ))}
                  </div>
                )}
                {profile.open_threads?.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-warm-100">
                    <p className="text-xs font-semibold text-warm-500 uppercase tracking-wider mb-1.5">Follow up on</p>
                    <ul className="space-y-1">
                      {profile.open_threads.map((thread, i) => (
                        <li key={i} className="text-sm text-warm-600 flex items-start gap-1.5">
                          <span className="text-brand">&#8226;</span>{thread}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Recording UI */}
        {!createdProfiles.length && !isProcessing && (
          <>
            <div className="flex justify-center mb-8 animate-scale-in">
              <button
                onClick={isRecording ? stopRecording : startRecording}
                disabled={error && error.includes('not supported')}
                className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
                  isRecording ? 'bg-red-500 shadow-red-500/30 scale-110' : 'gradient-brand shadow-brand/30 hover:scale-105 hover:shadow-2xl'
                } ${error && error.includes('not supported') ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isRecording ? (
                  <Square size={32} className="text-white" fill="white" />
                ) : (
                  <Mic size={36} className="text-white" />
                )}

                {isRecording && (
                  <span className="absolute inset-0 rounded-full bg-red-400/30 animate-ping" />
                )}
              </button>
            </div>

            <p className="text-center text-warm-500 text-sm mb-6">
              {isRecording ? 'Listening... tap to stop' : 'Tap to start recording'}
            </p>

            {transcript && (
              <div className="bg-white rounded-2xl border border-warm-200/60 shadow-sm p-5 mb-6 animate-slide-up">
                <p className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-2">Live transcript</p>
                <p className="text-warm-700 text-sm leading-relaxed">{transcript}</p>
              </div>
            )}
          </>
        )}

        {/* Processing */}
        {isProcessing && (
          <div className="flex flex-col items-center py-8 animate-fade-in">
            <Loader2 size={40} className="text-brand animate-spin mb-4" />
            <p className="text-warm-500 text-sm">Creating connections...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-6 animate-fade-in">
            <p className="font-medium text-red-700 text-sm">{error}</p>
            {error.includes('API key') && (
              <p className="text-xs text-red-500 mt-1">Check your .env file for VITE_ANTHROPIC_API_KEY</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
