// src/components/TopStudentsTable.jsx

const AVATAR_COLORS = [
  'bg-blue-400', 'bg-violet-400', 'bg-emerald-400', 'bg-orange-400',
  'bg-pink-400',  'bg-cyan-400',   'bg-rose-400',    'bg-teal-400',
  'bg-indigo-400','bg-amber-400',
];

function getInitials(name) {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
}

function TopStudentsTable({ students, onSelect, selectedId }) {
  const top = [...students].sort((a, b) => b.attendanceRate - a.attendanceRate).slice(0, 5);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <h2 className="font-poppins font-semibold text-gray-700 text-base mb-4">Top Attendance Students</h2>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left pb-2 text-xs text-gray-400 font-semibold uppercase tracking-wide">Number</th>
            <th className="text-left pb-2 text-xs text-gray-400 font-semibold uppercase tracking-wide">Name</th>
            <th className="text-left pb-2 text-xs text-gray-400 font-semibold uppercase tracking-wide hidden sm:table-cell">ID</th>
            <th className="text-left pb-2 text-xs text-gray-400 font-semibold uppercase tracking-wide">Progress</th>
          </tr>
        </thead>
        <tbody>
          {top.map((s, i) => (
            <tr
              key={s.id}
              onClick={() => onSelect(s.id)}
              className={`border-b border-gray-50 cursor-pointer transition-colors
                ${selectedId === s.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
            >
              <td className="py-3 text-sm text-gray-500 font-semibold">{String(i + 1).padStart(2, '0')}</td>
              <td className="py-3">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 ${AVATAR_COLORS[(s.id - 1) % AVATAR_COLORS.length]}`}>
                    {getInitials(s.name)}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{s.name}</span>
                </div>
              </td>
              <td className="py-3 text-sm text-gray-400 hidden sm:table-cell">2021-{String(s.id).padStart(4,'0')}</td>
              <td className="py-3">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden max-w-[100px]">
                    <div
                      className={`h-full rounded-full ${s.attendanceRate >= 75 ? 'bg-blue-400' : 'bg-red-400'}`}
                      style={{ width: `${s.attendanceRate}%` }}
                    ></div>
                  </div>
                  <span className={`text-xs font-bold ${s.attendanceRate >= 75 ? 'text-blue-500' : 'text-red-400'}`}>
                    {s.attendanceRate}%
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopStudentsTable;
