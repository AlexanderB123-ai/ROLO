import { formatRolodexName, getRolodexInitials } from '../utils/nameFormatter';

export default function ContactCard({ contact, onClick, drift }) {
  // Get initials for avatar
  const getInitials = (name) => {
    return getRolodexInitials(name);
  };

  // Get gradient color based on importance
  const getGradientStyle = (importance) => {
    if (importance >= 4) return {background: 'linear-gradient(135deg, #DD571C, #C44915)'};
    if (importance === 3) return {background: 'linear-gradient(135deg, #DD571C, #C44915)'};
    return {background: 'linear-gradient(135deg, #999, #666)'};
  };

  return (
    <div
      onClick={onClick}
      className="group bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer p-5 transform hover:scale-105 hover:-translate-y-2 border border-white/50"
      style={{boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'}}
    >
      {/* Avatar with gradient border */}
      <div className="flex justify-center mb-4">
        <div className="p-[3px] rounded-full shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110 duration-300" style={{...getGradientStyle(contact.importance), boxShadow: '0 4px 16px rgba(221, 87, 28, 0.3)'}}>
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
            <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-inner" style={getGradientStyle(contact.importance)}>
              {getInitials(contact.name)}
            </div>
          </div>
        </div>
      </div>

      {/* Name */}
      <h3 className="text-center font-bold text-gray-800 mb-2 truncate transition-all group-hover:scale-105" style={{color: contact.importance >= 3 ? '#DD571C' : '#666'}}>
        {formatRolodexName(contact.name)}
      </h3>

      {/* Relationship Badge with gradient */}
      <div className="text-center mb-2">
        <span className="inline-block px-3 py-1.5 text-white rounded-full text-xs font-semibold shadow-sm transition-all group-hover:scale-105" style={{...getGradientStyle(contact.importance), boxShadow: '0 2px 8px rgba(221, 87, 28, 0.3)'}}>
          {contact.relationship_type}
        </span>
      </div>

      {/* Stats Row */}
      <div className="flex justify-center gap-3 mt-3">
        {/* Drift Warning */}
        {drift > 30 && (
          <div className="flex items-center gap-1">
            <span className="text-base">{drift > 90 ? '🚨' : drift > 60 ? '⚠️' : '⏰'}</span>
            <span className="text-xs font-semibold text-orange-600">{drift}d</span>
          </div>
        )}

        {/* Open Threads Indicator */}
        {contact.open_threads && contact.open_threads.length > 0 && (
          <div className="flex items-center gap-1">
            <span className="text-base">💭</span>
            <span className="text-xs font-semibold text-blue-600">{contact.open_threads.length}</span>
          </div>
        )}
      </div>
    </div>
  );
}
