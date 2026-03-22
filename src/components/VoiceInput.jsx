import { useState, useEffect, useRef, useContext } from 'react';
import { ContactsContext } from '../context/ContactsContext';
import { extractProfile } from '../utils/claude';

export default function VoiceInput() {
  const { setCurrentView, addContacts } = useContext(ContactsContext);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [createdProfiles, setCreatedProfiles] = useState([]);
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Initialize Web Speech API
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

      // Extract profiles from transcript using Claude
      const profiles = await extractProfile(transcript);
      setCreatedProfiles(profiles);
      addContacts(profiles);

      // After 2 seconds, return to dashboard
      setTimeout(() => {
        setCurrentView('dashboard');
      }, 2000);
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {isProcessing ? 'Creating Profile...' : createdProfiles.length > 0 ? 'Profile Created!' : 'Tell Me About Them'}
          </h1>
          <p className="text-gray-600">
            {isProcessing
              ? 'AI is structuring the information...'
              : createdProfiles.length > 0
              ? `Added ${createdProfiles.length} ${createdProfiles.length === 1 ? 'person' : 'people'} to your Rolo`
              : 'Speak naturally about a person (or multiple people) you want to add'}
          </p>
        </div>

        {/* Success State - Show Created Profiles */}
        {createdProfiles.length > 0 && !isProcessing && (
          <div className="space-y-4 mb-6">
            {createdProfiles.map((profile, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 border-2 border-green-400">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{profile.name}</h3>
                    <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mt-2">
                      {profile.relationship_type}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-amber-600">
                      {profile.importance}
                      <span className="text-sm text-gray-500">/5</span>
                    </div>
                    <div className="text-xs text-gray-500">importance</div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  {profile.work && (
                    <p className="text-gray-700">💼 {profile.work}</p>
                  )}
                  {profile.interests && profile.interests.length > 0 && (
                    <p className="text-gray-700">✨ {profile.interests.join(', ')}</p>
                  )}
                  {profile.open_threads && profile.open_threads.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="font-semibold text-gray-700 mb-1">Open threads:</p>
                      <ul className="list-disc list-inside text-gray-600">
                        {profile.open_threads.map((thread, i) => (
                          <li key={i}>{thread}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recording UI */}
        {!createdProfiles.length && !isProcessing && (
          <>
            {/* Microphone Button */}
            <div className="flex justify-center mb-8">
              <button
                onClick={isRecording ? stopRecording : startRecording}
                disabled={error && error.includes('not supported')}
                className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isRecording
                    ? 'bg-red-500 hover:bg-red-600 scale-110 shadow-xl'
                    : 'bg-amber-500 hover:bg-amber-600 shadow-lg'
                } ${error && error.includes('not supported') ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isRecording ? (
                  <div className="text-white">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                      <rect x="6" y="6" width="8" height="8" rx="1" />
                    </svg>
                    <p className="text-xs mt-1">Stop</p>
                  </div>
                ) : (
                  <div className="text-white">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" />
                      <path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-1.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z" />
                    </svg>
                    <p className="text-xs mt-1">Start</p>
                  </div>
                )}

                {/* Pulsing ring animation when recording */}
                {isRecording && (
                  <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75"></span>
                )}
              </button>
            </div>

            {/* Transcript Display */}
            {transcript && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Transcript:</h3>
                <p className="text-gray-800 leading-relaxed">{transcript}</p>
              </div>
            )}

            {/* Instructions */}
            <div className="text-center text-gray-600 mb-6">
              <p className="mb-2">
                {isRecording
                  ? '🎤 Listening... Click the button when done'
                  : '💬 Click the microphone to start recording'}
              </p>
              <p className="text-sm text-gray-500">
                You can talk about multiple people in one recording
              </p>
            </div>
          </>
        )}

        {/* Processing State */}
        {isProcessing && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-500"></div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p className="font-semibold">Error</p>
            <p className="text-sm">{error}</p>
            {error.includes('API key') && (
              <p className="text-sm mt-2">
                Make sure you've set VITE_ANTHROPIC_API_KEY in your .env file
              </p>
            )}
          </div>
        )}

        {/* Cancel Button */}
        <div className="flex justify-center">
          <button
            onClick={handleCancel}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            {createdProfiles.length > 0 ? 'Back to Dashboard' : 'Cancel'}
          </button>
        </div>
      </div>
    </div>
  );
}
