// src/components/SummaryChart.jsx

const BARS = [
  { label: 'Attendance', key: 'attendance', topColor: 'bg-blue-400',   bodyColor: 'bg-blue-500',   icon: '🧑‍🎓' },
  { label: 'Late',       key: 'late',       topColor: 'bg-green-300',  bodyColor: 'bg-green-500',  icon: '🔄' },
  { label: 'Undertime',  key: 'undertime',  topColor: 'bg-orange-200', bodyColor: 'bg-orange-400', icon: '🕐' },
  { label: 'Absent',     key: 'absent',     topColor: 'bg-red-200',    bodyColor: 'bg-red-500',    icon: '🚫' },
];

function SummaryChart({ student }) {
  if (!student) return null;
  const max = Math.max(student.attendance, student.late, student.undertime, student.absent, 1);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 h-full">
      <h2 className="font-poppins font-semibold text-gray-700 text-base mb-5">Summary — {student.name}</h2>
      <div className="flex gap-4 items-end h-52">
        {BARS.map((bar) => {
          const val = student[bar.key];
          const pct = Math.round((val / max) * 100);
          return (
            <div key={bar.key} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-lg font-bold text-gray-700 font-poppins">{String(val).padStart(2, '0')}</span>
              <div className="w-full flex flex-col rounded-xl overflow-hidden" style={{ height: '160px' }}>
                {/* top lighter portion */}
                <div
                  className={`${bar.topColor} w-full`}
                  style={{ flex: `${100 - pct}` }}
                ></div>
                {/* bottom colored bar */}
                <div
                  className={`${bar.bodyColor} w-full flex items-end justify-center pb-2`}
                  style={{ flex: `${pct}` }}
                >
                  <span className="text-white text-base">{bar.icon}</span>
                </div>
              </div>
              <span className="text-xs text-gray-500 font-semibold text-center">{bar.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SummaryChart;
