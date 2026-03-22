import { formatRolodexName, getRolodexInitials } from '../utils/nameFormatter';
import { getRelationshipColor, getDriftColor } from '../utils/drift';
import { Clock, MessageCircle } from 'lucide-react';

export default function ContactCard({ contact, onClick, drift, compact = false }) {
  const initials = getRolodexInitials(contact.name);
  const relColor = getRelationshipColor(contact.relationship_type);
  const driftStyle = drift > 30 ? getDriftColor(drift) : null;

  if (compact) {
    return (
      <div
        onClick={onClick}
        className="group flex items-center gap-3 bg-white rounded-xl shadow-sm border border-warm-200/60 hover:shadow-md hover:border-brand/20 transition-all duration-300 cursor-pointer p-3"
      >
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm"
          style={{ background: relColor.hex }}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-warm-800 text-sm truncate">{formatRolodexName(contact.name)}</h3>
          <span className="text-xs text-warm-400 capitalize">{contact.relationship_type}</span>
        </div>
        {drift > 30 && driftStyle && (
          <span className={`text-xs font-medium ${driftStyle.text} flex items-center gap-1`}>
            <Clock size={11} />{drift}d
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl shadow-sm border border-warm-200/60 hover:shadow-lg hover:shadow-brand/5 transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-1 hover:border-brand/20"
    >
      {/* Color accent bar */}
      <div className="h-1 w-full" style={{ background: relColor.hex }} />

      <div className="p-5">
        {/* Avatar */}
        <div className="flex justify-center mb-3">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg transition-transform group-hover:scale-110 duration-300 shadow-md"
            style={{ background: relColor.hex }}
          >
            {initials}
          </div>
        </div>

        {/* Name */}
        <h3 className="text-center font-semibold mb-0.5 truncate text-sm text-warm-800">
          {formatRolodexName(contact.name)}
        </h3>

        {/* Relationship type */}
        <div className="text-center mb-3">
          <span
            className="text-xs font-medium capitalize px-2 py-0.5 rounded-md"
            style={{ color: relColor.hex, background: `${relColor.hex}15` }}
          >
            {contact.relationship_type}
          </span>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2">
          {drift > 30 && driftStyle && (
            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${driftStyle.bg} ${driftStyle.text}`}>
              <Clock size={12} />
              {drift}d
            </div>
          )}

          {contact.open_threads?.length > 0 && (
            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-600">
              <MessageCircle size={12} />
              {contact.open_threads.length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
