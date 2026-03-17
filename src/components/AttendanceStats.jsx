// src/components/AttendanceStats.jsx

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June'];
const MONTH_COLORS = [
  'bg-blue-400', 'bg-orange-400', 'bg-green-300',
  'bg-purple-300', 'bg-pink-300', 'bg-cyan-300',
];

function AttendanceStats({ student, showLowAttendance, onToggleLow }) {
  if (!student) return null;

  const classDays = 23;
  const rate = student.attendanceRate;

  // Generate fake monthly rates seeded by student id
  const monthly = MONTHS.map((m, i) => {
    const seed = (student.id * 7 + i * 13) % 30;
    return { month: m, rate: 45 + seed };
  });

  const maxRate = Math.max(...monthly.map(m => m.rate));

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 h-full flex flex-col gap-5">

      {/* Class Days */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div>
          <p className="font-poppins font-semibold text-gray-700">Class Days</p>
          <p className="text-xs text-gray-400">Class days for Monthly</p>
        </div>
        <p className="font-poppins font-bold text-3xl text-gray-800">{classDays} Days</p>
      </div>

      {/* Attendance Rate */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div>
          <p className="font-poppins font-semibold text-gray-700">Attendance Rate</p>
          <span className={`mt-1 inline-block px-3 py-0.5 rounded-full text-xs font-semibold
            ${rate < 75 ? 'bg-red-100 text-red-500' : 'bg-blue-100 text-blue-500'}`}>
            {rate < 75 ? 'At Risk' : 'This Year'}
          </span>
        </div>
        <p className={`font-poppins font-bold text-4xl ${rate < 75 ? 'text-red-400' : 'text-gray-800'}`}>
          {rate}%
        </p>
      </div>

      {/* Low attendance toggle */}
      <button
        onClick={onToggleLow}
        className={`w-full py-2 rounded-xl text-sm font-semibold transition-all border
          ${showLowAttendance
            ? 'bg-red-50 border-red-200 text-red-500'
            : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
          }`}
      >
        {showLowAttendance ? '🔴 Showing Under 75%' : '⚪ Show Under 75% Only'}
      </button>

      {/* Monthly Rate mini chart */}
      <div>
        <p className="font-poppins font-semibold text-gray-700 text-sm mb-3">Monthly Attendance Rate</p>
        <div className="flex items-end gap-2 h-24">
          {monthly.map((m, i) => {
            const h = Math.round((m.rate / maxRate) * 80);
            return (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-full ${MONTH_COLORS[i]} rounded-xl flex flex-col justify-end items-center pb-1 transition-all`}
                  style={{ height: `${h}px` }}
                >
                  <span className="text-white text-xs font-bold">{m.rate}%</span>
                </div>
                <span className="text-gray-400 text-xs truncate w-full text-center">{m.month.slice(0,3)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AttendanceStats;
