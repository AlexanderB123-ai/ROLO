import { useState, useEffect, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContactsContext } from '../context/ContactsContext';
import { extractProfile } from '../utils/claude';
import { fallbackProfileExtraction } from '../utils/fallbackData';
import { formatRolodexName } from '../utils/nameFormatter';
import { getRelationshipColor } from '../utils/drift';
import { Mic, Square, ArrowLeft, Loader2, CheckCircle2, Sparkles } from 'lucide-react';

export default function VoiceInput() {
  const { setCurrentView, addContacts } = useContext(ContactsContext);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [createdProfiles, setCreatedProfiles] = useState([]);
  const [error, setError] = useState(null);
  const [usedFallback, setUsedFallback] = useState(false);
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
    setUsedFallback(false);
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

      let profiles;
      try {
        profiles = await extractProfile(transcript);
      } catch (apiErr) {
        console.warn('API failed, using fallback data:', apiErr);
        profiles = fallbackProfileExtraction;
        setUsedFallback(true);
      }

      setIsProcessing(false);
      setCreatedProfiles(profiles);
      addContacts(profiles);

      setTimeout(() => setCurrentView('dashboard'), 3000);
    } catch (err) {
      console.error('Error processing transcript:', err);
      // Even on unexpected errors, use fallback so demo never breaks
      const profiles = fallbackProfileExtraction;
      setIsProcessing(false);
      setCreatedProfiles(profiles);
      setUsedFallback(true);
      addContacts(profiles);
      setTimeout(() => setCurrentView('dashboard'), 3000);
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
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-48 -right-48 w-[500px] h-[500px] rounded-full bg-brand/8 blur-3xl animate-blob" />
        <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full bg-brand/5 blur-3xl animate-blob delay-2000" />
      </div>

      <div className="max-w-xl w-full relative z-10">
        {/* Back */}
        <button
          onClick={handleCancel}
          aria-label={createdProfiles.length > 0 ? 'Go to dashboard' : 'Cancel recording'}
          className="mb-8 inline-flex items-center gap-2 text-warm-500 hover:text-warm-700 font-medium transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          {createdProfiles.length > 0 ? 'Dashboard' : 'Cancel'}
        </button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
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
        </motion.div>

        {/* Fallback notice */}
        {usedFallback && createdProfiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-6"
          >
            <p className="text-sm text-amber-700 font-medium">Demo mode — used sample profile data</p>
            <p className="text-xs text-amber-500 mt-1">AI was unavailable, so a sample contact was added instead.</p>
          </motion.div>
        )}

        {/* Success state */}
        <AnimatePresence>
          {createdProfiles.length > 0 && !isProcessing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 mb-8"
            >
              {createdProfiles.map((profile, index) => {
                const relColor = getRelationshipColor(profile.relationship_type);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 }}
                    className="bg-white rounded-2xl border border-warm-200/60 shadow-sm overflow-hidden"
                  >
                    <div className="h-1 w-full" style={{ background: relColor.hex }} />
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold shadow-sm"
                            style={{ background: relColor.hex }}
                          >
                            {profile.name?.charAt(0) || '?'}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-warm-900">{profile.name}</h3>
                            <span className="text-xs font-medium text-brand bg-brand-light px-2 py-0.5 rounded-lg capitalize">
                              {profile.relationship_type}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 size={16} className="text-green-500" />
                          <span className="text-sm font-semibold text-warm-700">{profile.importance}/5</span>
                        </div>
                      </div>

                      {profile.work && (
                        <p className="text-sm text-warm-600 mb-2">{profile.work}</p>
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
                                <span className="text-brand mt-0.5">&#8226;</span>{thread}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recording UI */}
        {!createdProfiles.length && !isProcessing && (
          <>
            <div className="flex justify-center mb-8">
              <div className="relative">
                {/* Pulse rings when recording */}
                {isRecording && (
                  <>
                    <div className="absolute inset-0 m-auto w-32 h-32 rounded-full bg-red-400/20 animate-pulse-ring" />
                    <div className="absolute inset-0 m-auto w-32 h-32 rounded-full bg-red-400/15 animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
                    <div className="absolute inset-0 m-auto w-32 h-32 rounded-full bg-red-400/10 animate-pulse-ring" style={{ animationDelay: '1s' }} />
                  </>
                )}

                <motion.button
                  whileHover={{ scale: isRecording ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={error && error.includes('not supported')}
                  aria-label={isRecording ? 'Stop recording' : 'Start recording'}
                  className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${
                    isRecording
                      ? 'bg-red-500 shadow-2xl animate-recording-glow'
                      : 'gradient-brand shadow-xl shadow-brand/30 hover:shadow-2xl hover:shadow-brand/40'
                  } ${error && error.includes('not supported') ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isRecording ? (
                    <Square size={32} className="text-white" fill="white" />
                  ) : (
                    <Mic size={36} className="text-white" />
                  )}
                </motion.button>
              </div>
            </div>

            <p className="text-center text-warm-500 text-sm mb-6">
              {isRecording ? 'Listening... tap to stop' : 'Tap the mic to start recording'}
            </p>

            <AnimatePresence>
              {transcript && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="bg-white rounded-2xl border border-warm-200/60 shadow-sm p-5 mb-6"
                >
                  <p className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-2">Live transcript</p>
                  <p className="text-warm-700 text-sm leading-relaxed">{transcript}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tips */}
            {!isRecording && !transcript && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-2xl border border-warm-200/60 shadow-sm p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={14} className="text-brand" />
                  <p className="text-xs font-semibold text-warm-500 uppercase tracking-wider">Tips</p>
                </div>
                <ul className="space-y-2 text-sm text-warm-500">
                  <li className="flex gap-2"><span className="text-brand">&#8226;</span>Mention multiple people in one recording</li>
                  <li className="flex gap-2"><span className="text-brand">&#8226;</span>Include how you met, their interests, and recent updates</li>
                  <li className="flex gap-2"><span className="text-brand">&#8226;</span>Say when you last talked and what to follow up on</li>
                </ul>
              </motion.div>
            )}
          </>
        )}

        {/* Processing */}
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center py-8"
          >
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full gradient-brand flex items-center justify-center">
                <Loader2 size={32} className="text-white animate-spin" />
              </div>
              <div className="absolute inset-0 rounded-full bg-brand/20 animate-pulse-ring" />
            </div>
            <p className="text-warm-600 font-medium">Creating connections...</p>
            <p className="text-warm-400 text-sm mt-1">AI is analyzing your voice memo</p>
          </motion.div>
        )}

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-6"
            >
              <p className="font-medium text-red-700 text-sm">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
