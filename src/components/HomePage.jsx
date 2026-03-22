import { useContext } from 'react';
import { ContactsContext } from '../context/ContactsContext';

export default function HomePage() {
  const { setCurrentView, contacts } = useContext(ContactsContext);

  // Calculate stats
  const driftingCount = contacts.filter(c => {
    if (!c.last_interaction?.approximate_date) return true;
    const now = new Date();
    const last = new Date(c.last_interaction.approximate_date);
    const daysSince = Math.floor((now - last) / (1000 * 60 * 60 * 24));
    return daysSince > 30;
  }).length;

  return (
    <div className="min-h-screen relative overflow-hidden" style={{background: 'linear-gradient(to bottom right, #D6CFC7, #F5F1ED)'}}>
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{background: '#DD571C'}}></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000" style={{background: '#DD571C'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" style={{background: '#C4B5A8'}}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-12 animate-fade-in">
          <h1 className="text-7xl md:text-8xl font-bold mb-6" style={{color: '#DD571C'}}>
            Rolo
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 mb-4 font-light">
            AI that makes you more human
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Social media uses AI to keep you scrolling past your friends.
            <span className="font-semibold" style={{color: '#DD571C'}}> Rolo uses AI to make you call them.</span>
          </p>
        </div>

        {/* Stats Cards */}
        {contacts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-4xl animate-slide-up animation-delay-200">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-5xl font-bold mb-2" style={{color: '#DD571C'}}>
                {contacts.length}
              </div>
              <div className="text-sm text-gray-600 font-medium">people in your world</div>
            </div>
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-5xl font-bold mb-2" style={{color: '#DD571C'}}>
                {driftingCount}
              </div>
              <div className="text-sm text-gray-600 font-medium">need your attention</div>
            </div>
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-5xl font-bold mb-2" style={{color: '#DD571C'}}>
                {contacts.filter(c => c.importance >= 4).length}
              </div>
              <div className="text-sm text-gray-600 font-medium">in your inner circle</div>
            </div>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up animation-delay-400">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="px-10 py-5 rounded-2xl text-white font-bold text-lg shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl group"
            style={{background: 'linear-gradient(135deg, #DD571C, #C44915)', boxShadow: '0 8px 32px rgba(221, 87, 28, 0.3)'}}
          >
            <span className="group-hover:inline-block group-hover:animate-pulse">👥</span> View Your Contacts
          </button>
          <button
            onClick={() => setCurrentView('suggestions')}
            className="px-10 py-5 bg-white/90 backdrop-blur-xl rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:bg-white group"
            style={{color: '#DD571C', borderColor: '#DD571C'}}
          >
            <span className="group-hover:inline-block group-hover:animate-pulse">✨</span> Get AI Suggestions
          </button>
        </div>

        {/* Add First Contact CTA */}
        {contacts.length === 0 && (
          <div className="mt-8 text-center animate-slide-up animation-delay-600">
            <p className="text-gray-600 mb-4">Start by adding people you care about</p>
            <button
              onClick={() => setCurrentView('voice')}
              className="px-8 py-4 bg-white/90 backdrop-blur-xl rounded-2xl font-semibold shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto"
              style={{color: '#DD571C'}}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" />
                <path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-1.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z" />
              </svg>
              Add Your First Contact
            </button>
          </div>
        )}

        {/* Feature Highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full animate-fade-in animation-delay-800">
          <div className="text-center">
            <div className="text-4xl mb-3">🎤</div>
            <h3 className="font-bold text-lg mb-2" style={{color: '#DD571C'}}>Voice-First</h3>
            <p className="text-gray-600 text-sm">Just talk naturally about your friends. AI does the rest.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-bold text-lg mb-2" style={{color: '#DD571C'}}>Smart Reminders</h3>
            <p className="text-gray-600 text-sm">Never let friendships drift. AI tracks who you haven't talked to.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">💬</div>
            <h3 className="font-bold text-lg mb-2" style={{color: '#DD571C'}}>Personal Messages</h3>
            <p className="text-gray-600 text-sm">AI writes thoughtful, personalized messages for everyone.</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-fade-in { animation: fadeIn 0.6s ease-out; }
        .animate-slide-up { animation: slideUp 0.6s ease-out; }
        .animation-delay-200 { animation-delay: 0.2s; animation-fill-mode: backwards; }
        .animation-delay-400 { animation-delay: 0.4s; animation-fill-mode: backwards; }
        .animation-delay-600 { animation-delay: 0.6s; animation-fill-mode: backwards; }
        .animation-delay-800 { animation-delay: 0.8s; animation-fill-mode: backwards; }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
