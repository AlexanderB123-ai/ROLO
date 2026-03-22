import { formatRolodexName, getRolodexInitials } from '../utils/nameFormatter';
import { Clock, MessageCircle } from 'lucide-react';

export default function ContactCard({ contact, onClick, drift }) {
  const initials = getRolodexInitials(contact.name);

  const isImportant = contact.importance >= 3;

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl shadow-sm border border-warm-200/60 hover:shadow-lg hover:shadow-brand/5 transition-all duration-300 cursor-pointer p-5 hover:-translate-y-1 hover:border-brand/20"
    >
      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl transition-transform group-hover:scale-110 duration-300 shadow-md ${isImportant ? 'gradient-brand shadow-brand/20' : 'bg-warm-400 shadow-warm-400/20'}`}>
          {initials}
        </div>
      </div>

      {/* Name */}
      <h3 className={`text-center font-semibold mb-1 truncate text-sm ${isImportant ? 'text-warm-800' : 'text-warm-600'}`}>
        {formatRolodexName(contact.name)}
      </h3>

      {/* Relationship type */}
      <div className="text-center mb-3">
        <span className="text-xs text-warm-400 font-medium capitalize">
          {contact.relationship_type}
        </span>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2">
        {drift > 30 && (
          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
            drift > 90 ? 'bg-red-50 text-red-600' :
            drift > 60 ? 'bg-amber-50 text-amber-600' :
            'bg-orange-50 text-orange-600'
          }`}>
            <Clock size={12} />
            {drift}d
          </div>
        )}

        {contact.open_threads && contact.open_threads.length > 0 && (
          <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-600">
            <MessageCircle size={12} />
            {contact.open_threads.length}
          </div>
        )}
      </div>
    </div>
  );
}
