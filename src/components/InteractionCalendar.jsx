import { useContext, useState, useMemo } from 'react';
import { ContactsContext } from '../context/ContactsContext';
import { formatRolodexName, getRolodexInitials } from '../utils/nameFormatter';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';

export default function InteractionCalendar() {
  const { contacts, setCurrentView, setSelectedContact } = useContext(ContactsContext);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const interactionsByDate = useMemo(() => {
    const grouped = {};
    contacts.forEach(contact => {
      if (contact.interactions?.length > 0) {
        contact.interactions.forEach(interaction => {
          const dateKey = interaction.date;
          if (!grouped[dateKey]) grouped[dateKey] = [];
          grouped[dateKey].push({ contact, summary: interaction.summary, date: interaction.date });
        });
      }
    });
    return grouped;
  }, [contacts]);

  const birthdaysThisMonth = useMemo(() => {
    return contacts.filter(contact => {
      if (!contact.birthday) return false;
      return new Date(contact.birthday).getMonth() === month;
    }).map(contact => ({ contact, day: new Date(contact.birthday).getDate() }));
  }, [contacts, month]);

  const interactionStreak = useMemo(() => {
    let streak = 0;
    let checkDate = new Date();
    while (true) {
      const dateKey = checkDate.toISOString().split('T')[0];
      if (interactionsByDate[dateKey]?.length > 0) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else break;
    }
    return streak;
  }, [interactionsByDate]);

  const goToPreviousMonth = () => { setCurrentDate(new Date(year, month - 1, 1)); setSelectedDate(null); };
  const goToNextMonth = () => { setCurrentDate(new Date(year, month + 1, 1)); setSelectedDate(null); };
  const goToToday = () => { setCurrentDate(new Date()); setSelectedDate(null); };

  const getRelationshipColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'friend': return '#DD571C';
      case 'family': return '#22C55E';
      case 'colleague': return '#3B82F6';
      default: return '#9C8B7A';
    }
  };

  const handleDateClick = (day) => {
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(selectedDate === dateKey ? null : dateKey);
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setCurrentView('profile');
  };

  const isToday = (day) => {
    const today = new Date();
    return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
  };

  const renderCalendarDays = () => {
    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayInteractions = interactionsByDate[dateKey] || [];
      const dayBirthdays = birthdaysThisMonth.filter(b => b.day === day);
      const hasActivity = dayInteractions.length > 0 || dayBirthdays.length > 0;
      const isCurrentDay = isToday(day);
      const isSelected = selectedDate === dateKey;

      days.push(
        <div key={day} className="aspect-square">
          <button
            onClick={() => handleDateClick(day)}
            className={`w-full h-full rounded-xl transition-all duration-200 p-1.5 flex flex-col text-left ${
              isSelected ? 'ring-2 ring-brand shadow-md bg-white' :
              isCurrentDay ? 'ring-2 ring-brand/30 bg-white shadow-sm' :
              hasActivity ? 'bg-white hover:shadow-sm' :
              'bg-warm-100/50 hover:bg-warm-100'
            }`}
          >
            <span className={`text-xs font-semibold mb-0.5 ${
              isCurrentDay ? 'text-brand' : hasActivity ? 'text-warm-700' : 'text-warm-400'
            }`}>
              {day}
            </span>

            {dayBirthdays.length > 0 && (
              <div className="flex gap-0.5 mb-0.5">
                {dayBirthdays.map((_, idx) => (
                  <span key={idx} className="text-[10px] leading-none">🎂</span>
                ))}
              </div>
            )}

            {dayInteractions.length > 0 && (
              <div className="flex flex-wrap gap-0.5 mt-auto">
                {dayInteractions.slice(0, 3).map((interaction, idx) => (
                  <div
                    key={idx}
                    className="w-4 h-4 rounded-full text-white text-[8px] flex items-center justify-center font-bold"
                    style={{ background: getRelationshipColor(interaction.contact.relationship_type) }}
                  >
                    {getRolodexInitials(interaction.contact.name)[0]}
                  </div>
                ))}
                {dayInteractions.length > 3 && (
                  <div className="w-4 h-4 rounded-full bg-warm-300 text-warm-700 text-[8px] flex items-center justify-center font-bold">
                    +{dayInteractions.length - 3}
                  </div>
                )}
              </div>
            )}
          </button>
        </div>
      );
    }

    return days;
  };

  const selectedDayInteractions = selectedDate ? (interactionsByDate[selectedDate] || []) : [];
  const selectedDayBirthdays = selectedDate
    ? birthdaysThisMonth.filter(b => b.day === parseInt(selectedDate.split('-')[2]))
    : [];

  return (
    <div className="min-h-screen bg-warm-50 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-warm-900 mb-2">Calendar</h1>
          <p className="text-warm-500">Track every meaningful connection</p>
        </div>

        {/* Streak */}
        {interactionStreak > 0 && (
          <div className="mb-6 text-center animate-slide-up">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl gradient-brand text-white shadow-md shadow-brand/20">
              <Flame size={18} />
              <span className="font-semibold">{interactionStreak} day streak!</span>
            </div>
          </div>
        )}

        {/* Calendar */}
        <div className="bg-white rounded-2xl border border-warm-200/60 shadow-sm p-6 mb-6 animate-slide-up delay-100">
          {/* Controls */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={goToPreviousMonth} className="p-2 rounded-xl hover:bg-warm-100 transition-colors text-warm-600">
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-warm-800">
                {monthNames[month]} {year}
              </h2>
              <button
                onClick={goToToday}
                className="px-3 py-1 rounded-lg text-xs font-semibold text-brand bg-brand-light hover:bg-brand/15 transition-colors"
              >
                Today
              </button>
            </div>
            <button onClick={goToNextMonth} className="p-2 rounded-xl hover:bg-warm-100 transition-colors text-warm-600">
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 justify-center text-xs mb-5">
            {[
              { color: '#DD571C', label: 'Friends' },
              { color: '#22C55E', label: 'Family' },
              { color: '#3B82F6', label: 'Colleagues' },
              { color: '#9C8B7A', label: 'Other' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                <span className="text-warm-500">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1.5 mb-1.5">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-xs font-semibold text-warm-400 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1.5">
            {renderCalendarDays()}
          </div>
        </div>

        {/* Selected day details */}
        {selectedDate && (selectedDayInteractions.length > 0 || selectedDayBirthdays.length > 0) && (
          <div className="bg-white rounded-2xl border border-warm-200/60 shadow-sm p-6 mb-6 animate-scale-in">
            <h3 className="font-semibold text-warm-800 mb-4">
              {monthNames[month]} {parseInt(selectedDate.split('-')[2])}
            </h3>

            {selectedDayBirthdays.length > 0 && (
              <div className="mb-4">
                {selectedDayBirthdays.map((bday, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleContactClick(bday.contact)}
                    className="flex items-center gap-3 p-3 rounded-xl bg-green-50 cursor-pointer hover:bg-green-100 transition-colors mb-2"
                  >
                    <span className="text-lg">🎂</span>
                    <span className="font-medium text-sm text-green-700">{formatRolodexName(bday.contact.name)}'s birthday</span>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-2">
              {selectedDayInteractions.map((interaction, idx) => (
                <div
                  key={idx}
                  onClick={() => handleContactClick(interaction.contact)}
                  className="flex items-center gap-3 p-3 rounded-xl bg-warm-50 cursor-pointer hover:bg-warm-100 transition-colors"
                >
                  <div
                    className="w-8 h-8 rounded-lg text-white text-xs flex items-center justify-center font-bold flex-shrink-0"
                    style={{ background: getRelationshipColor(interaction.contact.relationship_type) }}
                  >
                    {getRolodexInitials(interaction.contact.name)[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-warm-800">{formatRolodexName(interaction.contact.name)}</div>
                    {interaction.summary && (
                      <p className="text-xs text-warm-500 truncate">{interaction.summary}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 animate-slide-up delay-200">
          {[
            { value: Object.keys(interactionsByDate).length, label: 'Active Days' },
            { value: Object.values(interactionsByDate).flat().length, label: 'Interactions' },
            { value: birthdaysThisMonth.length, label: 'Birthdays' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl border border-warm-200/60 shadow-sm p-5 text-center">
              <div className="text-2xl font-bold text-brand mb-1">{stat.value}</div>
              <div className="text-xs text-warm-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
