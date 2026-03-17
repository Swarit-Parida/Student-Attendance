// src/App.jsx
import { useState, useEffect } from 'react';
import StudentHeader from './components/StudentHeader';
import SummaryChart from './components/SummaryChart';
import AttendanceStats from './components/AttendanceStats';
import TopStudentsTable from './components/TopStudentsTable';
import StudentList from './components/StudentList';

// Deterministic values based on student id
function seeded(id, offset, min, range) {
  return min + ((id * 17 + offset * 13) % range);
}

export default function App() {
  // ── State ──────────────────────────────────────────────────────────────
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState('All');
  const [selectedId, setSelectedId] = useState(null);
  const [showLowAttendance, setShowLowAttendance] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Fetch ──────────────────────────────────────────────────────────────
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) throw new Error('Network error');
        const data = await res.json();
        const enriched = data.map(u => {
          const attendance  = seeded(u.id, 1, 10, 12);  // 10–21
          const late        = seeded(u.id, 2, 2, 8);
          const undertime   = seeded(u.id, 3, 0, 4);
          const absent      = seeded(u.id, 4, 0, 5);
          const attendanceRate = Math.round((attendance / 23) * 100);
          return { ...u, attendance, late, undertime, absent, attendanceRate };
        });
        setStudents(enriched);
        setSelectedId(enriched[0].id);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const selectedStudent = students.find(s => s.id === selectedId) || null;

  // ── Loading / Error ────────────────────────────────────────────────────
  if (loading) return (
    <div className="min-h-screen bg-[#f4f6fb] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-semibold">Loading students…</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-[#f4f6fb] flex items-center justify-center">
      <div className="text-center text-red-400">
        <div className="text-5xl mb-3">⚠️</div>
        <p className="font-poppins font-bold text-lg">Failed to load</p>
        <p className="text-sm text-gray-400 mt-1">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f4f6fb] p-4 sm:p-6">
      {/* Page title */}
      <div className="mb-5 fade-up">
        <h1 className="font-poppins font-bold text-2xl text-gray-800">Attendance Dashboard</h1>
        <p className="text-gray-400 text-sm">Track student presence and identify at-risk learners</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">

        {/* ── Left sidebar: student list ── */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <StudentList
            students={students}
            filter={filter}
            onFilter={setFilter}
            selectedId={selectedId}
            onSelect={setSelectedId}
            showLowAttendance={showLowAttendance}
          />
        </div>

        {/* ── Main content ── */}
        <div className="flex-1 flex flex-col gap-5">

          {/* Student profile + stat cards */}
          <StudentHeader student={selectedStudent} />

          {/* Middle row: stats panel + summary chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <AttendanceStats
              student={selectedStudent}
              showLowAttendance={showLowAttendance}
              onToggleLow={() => setShowLowAttendance(p => !p)}
            />
            <SummaryChart student={selectedStudent} />
          </div>

          {/* Bottom: top students table */}
          <TopStudentsTable
            students={students}
            onSelect={setSelectedId}
            selectedId={selectedId}
          />
        </div>
      </div>
    </div>
  );
}
