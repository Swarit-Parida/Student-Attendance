// src/components/StudentHeader.jsx

const AVATAR_COLORS = [
  'bg-blue-400', 'bg-violet-400', 'bg-emerald-400', 'bg-orange-400',
  'bg-pink-400',  'bg-cyan-400',   'bg-rose-400',    'bg-teal-400',
  'bg-indigo-400','bg-amber-400',
];

function getInitials(name) {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
}

function StudentHeader({ student }) {
  if (!student) return null;
  const { id, name, username, email, address, attendance, late, undertime, absent } = student;
  const paddedId = `ID: 2021-${String(id).padStart(4, '0')}`;

  const stats = [
    { label: 'Total Attendance', value: attendance, color: 'bg-blue-50',   icon: '🧑‍🎓', iconBg: 'bg-blue-100',   iconColor: 'text-blue-500' },
    { label: 'Late Attendance',  value: late,       color: 'bg-green-50',  icon: '🔄',   iconBg: 'bg-green-100',  iconColor: 'text-green-500' },
    { label: 'Undertime',        value: undertime,  color: 'bg-orange-50', icon: '🕐',   iconBg: 'bg-orange-100', iconColor: 'text-orange-400' },
    { label: 'Total Absent',     value: absent,     color: 'bg-red-50',    icon: '🚫',   iconBg: 'bg-red-100',    iconColor: 'text-red-400' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 mb-5 fade-up">
      {/* Profile row */}
      <div className="flex flex-wrap items-center gap-5 pb-5 border-b border-gray-100">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-poppins font-bold text-xl shadow flex-shrink-0 ${AVATAR_COLORS[(id - 1) % AVATAR_COLORS.length]}`}>
          {getInitials(name)}
        </div>
        <div className="flex flex-wrap gap-x-10 gap-y-1 flex-1">
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">ID</p>
            <p className="font-bold text-gray-800 text-sm">{paddedId}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Number</p>
            <p className="font-bold text-gray-800 text-sm">(555) {100 + id * 37}-{1000 + id * 123}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Email</p>
            <p className="font-bold text-gray-800 text-sm">{email}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Address</p>
            <p className="font-bold text-gray-800 text-sm">{address.street}</p>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
        {stats.map((s) => (
          <div key={s.label} className={`${s.color} rounded-xl px-4 py-3 flex items-center gap-3`}>
            <div className={`${s.iconBg} ${s.iconColor} w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0`}>
              {s.icon}
            </div>
            <div>
              <p className="font-poppins font-bold text-gray-800 text-lg leading-tight">{s.value} Days</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentHeader;
