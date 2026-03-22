import { useContext, useState, useMemo } from 'react';
import { ContactsContext } from '../context/ContactsContext';
import { formatRolodexName, getRolodexInitials } from '../utils/nameFormatter';

export default function InteractionCalendar() {
  const { contacts, setCurrentView, setSelectedContact } = useContext(ContactsContext);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Get current month/year
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Calendar calculations
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  // Get all interactions grouped by date
  const interactionsByDate = useMemo(() => {
    const grouped = {};

    contacts.forEach(contact => {
      if (contact.interactions && contact.interactions.length > 0) {
        contact.interactions.forEach(interaction => {
          const dateKey = interaction.date;
          if (!grouped[dateKey]) {
            grouped[dateKey] = [];
          }
          grouped[dateKey].push({
            contact,
            summary: interaction.summary,
            date: interaction.date
          });
        });
      }
    });

    return grouped;
  }, [contacts]);

  // Get birthdays in this month
  const birthdaysThisMonth = useMemo(() => {
    return contacts.filter(contact => {
      if (!contact.birthday) return false;
      const bday = new Date(contact.birthday);
      return bday.getMonth() === month;
    }).map(contact => ({
      contact,
      day: new Date(contact.birthday).getDate()
    }));
  }, [contacts, month]);

  // Calculate interaction streak
  const interactionStreak = useMemo(() => {
    const today = new Date();
    let streak = 0;
    let checkDate = new Date(today);

    while (true) {
      const dateKey = checkDate.toISOString().split('T')[0];
      if (interactionsByDate[dateKey] && interactionsByDate[dateKey].length > 0) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }, [interactionsByDate]);

  // Navigation handlers
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(null);
  };

  // Get color by relationship type
  const getRelationshipColor = (type) => {
    switch (type.toLowerCase()) {
      case 'friend': return '#DD571C'; // Amber/warm
      case 'family': return '#22C55E'; // Green
      case 'colleague': return '#3B82F6'; // Blue
      case 'acquaintance': return '#9CA3AF'; // Gray
      default: return '#DD571C';
    }
  };

  // Handle date click
  const handleDateClick = (day) => {
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(selectedDate === dateKey ? null : dateKey);
  };

  // Handle contact click
  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setCurrentView('profile');
  };

  // Check if date is today
  const isToday = (day) => {
    const today = new Date();
    return today.getDate() === day &&
           today.getMonth() === month &&
           today.getFullYear() === year;
  };

  // Render calendar days
  const renderCalendarDays = () => {
    const days = [];

    // Empty cells before first day of month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayInteractions = interactionsByDate[dateKey] || [];
      const dayBirthdays = birthdaysThisMonth.filter(b => b.day === day);
      const hasActivity = dayInteractions.length > 0 || dayBirthdays.length > 0;
      const isCurrentDay = isToday(day);
      const isSelected = selectedDate === dateKey;

      days.push(
        <div key={day} className="aspect-square">
          <div
            onClick={() => handleDateClick(day)}
            className={`h-full rounded-xl transition-all duration-200 cursor-pointer p-2 flex flex-col ${
              isCurrentDay
                ? 'ring-2 ring-offset-2 bg-white shadow-lg'
                : hasActivity
                  ? 'bg-white hover:shadow-md'
                  : 'bg-gray-50 hover:bg-gray-100 opacity-60'
            } ${isSelected ? 'ring-2 shadow-xl' : ''}`}
            style={{
              ringColor: isCurrentDay || isSelected ? '#DD571C' : 'transparent'
            }}
          >
            {/* Day number */}
            <div className={`text-sm font-semibold mb-1 ${isCurrentDay ? 'text-[#DD571C]' : 'text-gray-700'}`}>
              {day}
            </div>

            {/* Birthdays */}
            {dayBirthdays.length > 0 && (
              <div className="flex flex-wrap gap-0.5 mb-1">
                {dayBirthdays.map((bday, idx) => (
                  <span key={idx} className="text-xs">🎂</span>
                ))}
              </div>
            )}

            {/* Interaction avatars */}
            {dayInteractions.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-auto">
                {dayInteractions.slice(0, 4).map((interaction, idx) => (
                  <div
                    key={idx}
                    className="w-6 h-6 rounded-full text-white text-xs flex items-center justify-center font-bold shadow-sm"
                    style={{ background: getRelationshipColor(interaction.contact.relationship_type) }}
                    title={formatRolodexName(interaction.contact.name)}
                  >
                    {getRolodexInitials(interaction.contact.name)[0]}
                  </div>
                ))}
                {dayInteractions.length > 4 && (
                  <div className="w-6 h-6 rounded-full bg-gray-300 text-gray-700 text-xs flex items-center justify-center font-bold">
                    +{dayInteractions.length - 4}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Expanded day details */}
          {isSelected && dayInteractions.length > 0 && (
            <div className="mt-2 bg-white rounded-xl shadow-xl p-4 border-2 animate-slide-up" style={{ borderColor: '#DD571C' }}>
              <h4 className="font-bold text-gray-800 mb-3">
                Interactions on {monthNames[month]} {day}
              </h4>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {dayInteractions.map((interaction, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleContactClick(interaction.contact)}
                    className="p-3 rounded-lg cursor-pointer hover:shadow-md transition-all"
                    style={{ background: '#F5F1ED' }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="w-8 h-8 rounded-full text-white text-sm flex items-center justify-center font-bold"
                        style={{ background: getRelationshipColor(interaction.contact.relationship_type) }}
                      >
                        {getRolodexInitials(interaction.contact.name)[0]}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm" style={{ color: '#DD571C' }}>
                          {formatRolodexName(interaction.contact.name)}
                        </div>
                        <div className="text-xs text-gray-600">{interaction.contact.relationship_type}</div>
                      </div>
                    </div>
                    {interaction.summary && (
                      <p className="text-sm text-gray-700 mt-2">{interaction.summary}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Birthday details */}
          {isSelected && dayBirthdays.length > 0 && (
            <div className="mt-2 bg-white rounded-xl shadow-xl p-4 border-2 border-green-400 animate-slide-up">
              <h4 className="font-bold text-gray-800 mb-3">
                🎂 Birthdays on {monthNames[month]} {day}
              </h4>
              <div className="space-y-2">
                {dayBirthdays.map((bday, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleContactClick(bday.contact)}
                    className="p-2 rounded-lg cursor-pointer hover:bg-green-50 transition-all"
                  >
                    <div className="font-semibold text-sm text-green-700">
                      {formatRolodexName(bday.contact.name)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: 'linear-gradient(to bottom right, #D6CFC7, #F5F1ED)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-3" style={{ color: '#DD571C' }}>
            Interaction Calendar
          </h1>
          <p className="text-gray-600 text-lg">Track every meaningful connection</p>
        </div>

        {/* Streak Counter */}
        {interactionStreak > 0 && (
          <div className="mb-6 text-center animate-fade-in">
            <div className="inline-block px-6 py-3 rounded-2xl text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #DD571C, #C44915)' }}>
              <span className="text-2xl mr-2">🔥</span>
              <span className="font-bold text-lg">
                {interactionStreak} day streak!
              </span>
              <span className="text-sm ml-2 opacity-90">
                {interactionStreak === 1 ? "Keep it going!" : "You're on fire!"}
              </span>
            </div>
          </div>
        )}

        {/* Calendar Controls */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={goToPreviousMonth}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <h2 className="text-2xl font-bold" style={{ color: '#DD571C' }}>
              {monthNames[month]} {year}
            </h2>

            <button
              onClick={goToNextMonth}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="flex justify-center mb-4">
            <button
              onClick={goToToday}
              className="px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105"
              style={{ background: '#F5F1ED', color: '#DD571C' }}
            >
              Today
            </button>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 justify-center text-sm mb-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ background: '#DD571C' }}></div>
              <span className="text-gray-700">Friends</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ background: '#22C55E' }}></div>
              <span className="text-gray-700">Family</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ background: '#3B82F6' }}></div>
              <span className="text-gray-700">Colleagues</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ background: '#9CA3AF' }}></div>
              <span className="text-gray-700">Acquaintances</span>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2">
            {renderCalendarDays()}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold mb-2" style={{ color: '#DD571C' }}>
              {Object.keys(interactionsByDate).length}
            </div>
            <div className="text-sm text-gray-600">Days with interactions</div>
          </div>
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold mb-2" style={{ color: '#DD571C' }}>
              {Object.values(interactionsByDate).flat().length}
            </div>
            <div className="text-sm text-gray-600">Total interactions</div>
          </div>
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold mb-2" style={{ color: '#DD571C' }}>
              {birthdaysThisMonth.length}
            </div>
            <div className="text-sm text-gray-600">Birthdays this month</div>
          </div>
        </div>
      </div>
    </div>
  );
}
