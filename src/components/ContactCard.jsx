export default function ContactCard({ contact, onClick, drift }) {
  // Get initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Get color based on importance
  const getColorClass = (importance) => {
    if (importance >= 4) return 'bg-gradient-to-br from-amber-400 to-orange-500';
    if (importance === 3) return 'bg-gradient-to-br from-orange-300 to-orange-400';
    return 'bg-gradient-to-br from-gray-300 to-gray-400';
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer p-4 transform hover:scale-105"
    >
      {/* Avatar */}
      <div className="flex justify-center mb-3">
        <div className={`w-16 h-16 rounded-full ${getColorClass(contact.importance)} flex items-center justify-center text-white font-bold text-xl`}>
          {getInitials(contact.name)}
        </div>
      </div>

      {/* Name */}
      <h3 className="text-center font-semibold text-gray-800 mb-1 truncate">
        {contact.name}
      </h3>

      {/* Relationship Badge */}
      <div className="text-center">
        <span className="inline-block px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
          {contact.relationship_type}
        </span>
      </div>

      {/* Drift Warning */}
      {drift > 30 && (
        <div className="mt-2 text-center">
          <span className="text-xs text-orange-600 font-medium">
            {drift > 90 ? '🚨 ' : drift > 60 ? '⚠️ ' : ''}
            {drift} days
          </span>
        </div>
      )}

      {/* Open Threads Indicator */}
      {contact.open_threads && contact.open_threads.length > 0 && (
        <div className="mt-2 text-center">
          <span className="text-xs text-blue-600 font-medium">
            {contact.open_threads.length} thread{contact.open_threads.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}
    </div>
  );
}
