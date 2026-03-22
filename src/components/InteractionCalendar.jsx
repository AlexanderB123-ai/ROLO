import { useContext, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContactsContext } from '../context/ContactsContext';
import { getRelationshipColor } from '../utils/drift';
import { ChevronLeft, ChevronRight, Flame, Calendar, Cake, MessageCircle, X } from 'lucide-react';

function normalizeInteractions(contacts) {
  return contacts.map(contact => {
    if (contact.interactions?.length > 0) return contact;
    if (contact.last_interaction?.approximate_date) {
      return {
        ...contact,
        interactions: [{
          date: contact.last_interaction.approximate_date.split('T')[0],
          summary: contact.last_interaction.description || 'Interaction logged'
        }]
      };
    }
    return contact;
  });
}

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
const DAY_NAMES = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function InteractionCalendar() {
  const { contacts: rawContacts, setCurrentView, setSelectedContact } = useContext(ContactsContext);
  const contacts = useMemo(() => normalizeInteractions(rawContacts), [rawContacts]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startingDayOfWeek = new Date(year, month, 1).getDay();

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
    const checkDate = new Date();
    while (true) {
      const dateKey = checkDate.toISOString().split('T')[0];
      if (interactionsByDate[dateKey]?.length > 0) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else break;
    }
    return streak;
  }, [interactionsByDate]);

  const totalInteractions = useMemo(() => {
    return Object.values(interactionsByDate).flat().length;
  }, [interactionsByDate]);

  const goToPreviousMonth = () => { setCurrentDate(new Date(year, month - 1, 1)); setSelectedDate(null); };
  const goToNextMonth = () => { setCurrentDate(new Date(year, month + 1, 1)); setSelectedDate(null); };
  const goToToday = () => { setCurrentDate(new Date()); setSelectedDate(null); };

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

  const selectedDayInteractions = selectedDate ? (interactionsByDate[selectedDate] || []) : [];
  const selectedDayBirthdays = selectedDate
    ? birthdaysThisMonth.filter(b => b.day === parseInt(selectedDate.split('-')[2]))
    : [];

  return (
    <div className="min-h-screen pt-20 pb-24 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl font-bold text-warm-900 mb-1">Calendar</h1>
          <p className="text-warm-500 text-sm">Track every meaningful connection</p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="grid grid-cols-3 gap-3 mb-5"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-warm-200/60 p-3.5 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Flame size={14} className="text-brand" />
              <span className="text-xl font-bold text-warm-800">{interactionStreak}</span>
            </div>
            <span className="text-[11px] text-warm-500 font-medium">Day Streak</span>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-warm-200/60 p-3.5 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <MessageCircle size={14} className="text-brand" />
              <span className="text-xl font-bold text-warm-800">{totalInteractions}</span>
            </div>
            <span className="text-[11px] text-warm-500 font-medium">Interactions</span>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-warm-200/60 p-3.5 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Cake size={14} className="text-brand" />
              <span className="text-xl font-bold text-warm-800">{birthdaysThisMonth.length}</span>
            </div>
            <span className="text-[11px] text-warm-500 font-medium">Birthdays</span>
          </div>
        </motion.div>

        {/* Calendar card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl border border-warm-200/60 shadow-sm overflow-hidden mb-5"
        >
          {/* Month navigation */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-warm-100">
            <button onClick={goToPreviousMonth} className="w-8 h-8 rounded-lg hover:bg-warm-100 flex items-center justify-center transition-colors text-warm-500">
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-2.5">
              <h2 className="text-lg font-bold text-warm-800">{MONTH_NAMES[month]} {year}</h2>
              <button onClick={goToToday} className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-brand bg-brand-light hover:bg-brand/15 transition-colors uppercase tracking-wide">
                Today
              </button>
            </div>
            <button onClick={goToNextMonth} className="w-8 h-8 rounded-lg hover:bg-warm-100 flex items-center justify-center transition-colors text-warm-500">
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 px-3 pt-3">
            {DAY_NAMES.map((day, i) => (
              <div key={i} className="text-center text-[11px] font-bold text-warm-400 uppercase tracking-wide py-2">{day}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-px px-3 pb-4">
            {/* Empty cells */}
            {Array.from({ length: startingDayOfWeek }, (_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {/* Day cells */}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const dayInteractions = interactionsByDate[dateKey] || [];
              const dayBirthdays = birthdaysThisMonth.filter(b => b.day === day);
              const hasInteractions = dayInteractions.length > 0;
              const hasBirthdays = dayBirthdays.length > 0;
              const currentDay = isToday(day);
              const isSelected = selectedDate === dateKey;

              return (
                <button
                  key={day}
                  onClick={() => handleDateClick(day)}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all duration-200 ${
                    isSelected
                      ? 'bg-brand text-white shadow-md shadow-brand/20 scale-105'
                      : currentDay
                      ? 'bg-brand/10 ring-2 ring-brand/30'
                      : hasInteractions || hasBirthdays
                      ? 'bg-warm-50 hover:bg-warm-100'
                      : 'hover:bg-warm-50'
                  }`}
                >
                  <span className={`text-sm font-semibold ${
                    isSelected
                      ? 'text-white'
                      : currentDay
                      ? 'text-brand font-bold'
                      : hasInteractions || hasBirthdays
                      ? 'text-warm-800'
                      : 'text-warm-400'
                  }`}>
                    {day}
                  </span>

                  {/* Activity dots */}
                  {(hasInteractions || hasBirthdays) && !isSelected && (
                    <div className="flex gap-0.5 mt-0.5">
                      {hasBirthdays && (
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      )}
                      {hasInteractions && (
                        <div className="w-1.5 h-1.5 rounded-full bg-brand" />
                      )}
                      {dayInteractions.length > 2 && (
                        <div className="w-1.5 h-1.5 rounded-full bg-brand/50" />
                      )}
                    </div>
                  )}

                  {/* Selected indicator dots */}
                  {isSelected && (hasInteractions || hasBirthdays) && (
                    <div className="flex gap-0.5 mt-0.5">
                      {Array.from({ length: Math.min(dayInteractions.length + dayBirthdays.length, 3) }, (_, idx) => (
                        <div key={idx} className="w-1.5 h-1.5 rounded-full bg-white/70" />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-5 px-5 py-3 border-t border-warm-100 bg-warm-50/50">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-brand" />
              <span className="text-[11px] text-warm-500">Interaction</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-[11px] text-warm-500">Birthday</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-5 rounded bg-brand/10 ring-1 ring-brand/30" />
              <span className="text-[11px] text-warm-500">Today</span>
            </div>
          </div>
        </motion.div>

        {/* Selected day detail panel */}
        <AnimatePresence>
          {selectedDate && (selectedDayInteractions.length > 0 || selectedDayBirthdays.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: 8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              className="overflow-hidden mb-5"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-warm-200/60 shadow-sm overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-warm-100">
                  <div className="flex items-center gap-2">
                    <Calendar size={15} className="text-brand" />
                    <h3 className="font-bold text-warm-800 text-sm">
                      {MONTH_NAMES[month]} {parseInt(selectedDate.split('-')[2])}
                    </h3>
                    <span className="text-xs text-warm-400">
                      {selectedDayInteractions.length + selectedDayBirthdays.length} {selectedDayInteractions.length + selectedDayBirthdays.length === 1 ? 'event' : 'events'}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="w-6 h-6 rounded-lg hover:bg-warm-100 flex items-center justify-center text-warm-400"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* Birthdays */}
                {selectedDayBirthdays.map((bday, idx) => (
                  <div
                    key={`bday-${idx}`}
                    onClick={() => handleContactClick(bday.contact)}
                    className="flex items-center gap-3 px-5 py-3 cursor-pointer hover:bg-warm-50 transition-colors border-b border-warm-50 last:border-0"
                  >
                    <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Cake size={16} className="text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-warm-800">{bday.contact.name}</div>
                      <div className="text-xs text-green-600 font-medium">Birthday</div>
                    </div>
                  </div>
                ))}

                {/* Interactions */}
                {selectedDayInteractions.map((interaction, idx) => {
                  const color = getRelationshipColor(interaction.contact.relationship_type);
                  return (
                    <div
                      key={`int-${idx}`}
                      onClick={() => handleContactClick(interaction.contact)}
                      className="flex items-center gap-3 px-5 py-3 cursor-pointer hover:bg-warm-50 transition-colors border-b border-warm-50 last:border-0"
                    >
                      <div
                        className="w-9 h-9 rounded-xl text-white text-sm flex items-center justify-center font-bold flex-shrink-0"
                        style={{ background: color.hex }}
                      >
                        {interaction.contact.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-warm-800">{interaction.contact.name}</div>
                        {interaction.summary && (
                          <p className="text-xs text-warm-500 truncate">{interaction.summary}</p>
                        )}
                      </div>
                      <span className="text-[11px] text-warm-400 font-medium flex-shrink-0 capitalize">{interaction.contact.relationship_type}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
