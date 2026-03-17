// src/components/StudentList.jsx

const AVATAR_COLORS = [
  'bg-blue-400', 'bg-violet-400', 'bg-emerald-400', 'bg-orange-400',
  'bg-pink-400',  'bg-cyan-400',   'bg-rose-400',    'bg-teal-400',
  'bg-indigo-400','bg-amber-400',
];

function getInitials(name) {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
}

const FILTERS = ['All', 'Present', 'Absent'];

function StudentList({ students, filter, onFilter, selectedId, onSelect, showLowAttendance }) {
  let list = students.filter(s => {
    if (filter === 'Present') return s.attendanceRate >= 75;
    if (filter === 'Absent')  return s.attendanceRate < 75;
    return true;
  });
  if (showLowAttendance) list = list.filter(s => s.attendanceRate < 75);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-3 h-full">
      <h2 className="font-poppins font-semibold text-gray-700">Students</h2>

      {/* Filter tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => onFilter(f)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all
              ${filter === f ? 'bg-white text-blue-500 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex flex-col gap-1 overflow-y-auto max-h-[420px] pr-1">
        {list.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-8">No students found</p>
        )}
        {list.map((s, i) => (
          <div
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all
              ${selectedId === s.id ? 'bg-blue-50 border border-blue-100' : 'hover:bg-gray-50'}`}
            style={{ animationDelay: `${i * 30}ms` }}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs flex-shrink-0 ${AVATAR_COLORS[(s.id - 1) % AVATAR_COLORS.length]}`}>
              {getInitials(s.name)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-700 truncate">{s.name}</p>
              <p className="text-xs text-gray-400 truncate">{s.email}</p>
            </div>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0
              ${s.attendanceRate >= 75 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
              {s.attendanceRate}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentList;
