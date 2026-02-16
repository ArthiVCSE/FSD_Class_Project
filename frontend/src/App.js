import React, { useState } from 'react';
import { Home, FileText, History, User, LogOut, Calendar, Clock, CheckCircle, CheckSquare, Users, DollarSign, UserPlus, Download, Menu, X } from 'lucide-react';
import './App.css';

function App() {
  const [userRole, setUserRole] = useState('login');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '', role: 'student' });
  
  const [leaveForm, setLeaveForm] = useState({ type: 'sick', startDate: '', endDate: '', reason: '' });
  const [attendanceDate, setAttendanceDate] = useState('');
  const [attendance, setAttendance] = useState([
    { id: 1, name: 'John Doe', rollNo: 'CS2021045', present: true },
    { id: 2, name: 'Jane Smith', rollNo: 'CS2021046', present: true },
    { id: 3, name: 'Mike Johnson', rollNo: 'CS2021047', present: false },
    { id: 4, name: 'Sarah Williams', rollNo: 'CS2021048', present: true },
    { id: 5, name: 'Tom Brown', rollNo: 'CS2021049', present: true }
  ]);

  const leaveHistory = [
    { id: 1, type: 'Sick Leave', date: '2024-01-15 to 2024-01-17', status: 'Approved', reason: 'Fever', studentName: 'John Doe', rollNo: 'CS2021045' },
    { id: 2, type: 'Casual Leave', date: '2024-01-20 to 2024-01-21', status: 'Pending', reason: 'Personal Work', studentName: 'Jane Smith', rollNo: 'CS2021046' },
    { id: 3, type: 'Medical Leave', date: '2024-01-10 to 2024-01-12', status: 'Rejected', reason: 'Medical Checkup', studentName: 'Mike Johnson', rollNo: 'CS2021047' }
  ];

  const facultyList = [
    { id: 1, name: 'Prof. Robert Smith', empId: 'FAC001', dept: 'Computer Science', attendance: 22, salary: 45000 },
    { id: 2, name: 'Prof. Maria Garcia', empId: 'FAC002', dept: 'Computer Science', attendance: 24, salary: 48000 },
    { id: 3, name: 'Prof. David Lee', empId: 'FAC003', dept: 'Computer Science', attendance: 20, salary: 42000 }
  ];

  const payrollData = [
    { id: 1, name: 'Prof. Robert Smith', empId: 'FAC001', basicSalary: 45000, deductions: 500, netSalary: 44500, status: 'Processed' },
    { id: 2, name: 'Prof. Maria Garcia', empId: 'FAC002', basicSalary: 48000, deductions: 0, netSalary: 48000, status: 'Processed' },
    { id: 3, name: 'Prof. David Lee', empId: 'FAC003', basicSalary: 42000, deductions: 1000, netSalary: 41000, status: 'Pending' }
  ];

  const handleLogin = () => {
    if (loginForm.email && loginForm.password) {
      setUserRole(loginForm.role);
      setCurrentPage('dashboard');
    } else {
      alert('Please enter email and password');
    }
  };

  const handleLogout = () => {
    setUserRole('login');
    setCurrentPage('dashboard');
    setLoginForm({ email: '', password: '', role: 'student' });
  };

  const toggleAttendance = (id) => {
    setAttendance(attendance.map(student => 
      student.id === id ? {...student, present: !student.present} : student
    ));
  };

  if (userRole === 'login') {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-icon">
              <Calendar size={32} />
            </div>
            <h1>EduManage Pro</h1>
            <p>Student Leave & Faculty Payroll System</p>
          </div>

          <div className="login-form">
            <div className="role-selector">
              <button
                onClick={() => setLoginForm({...loginForm, role: 'student'})}
                className={loginForm.role === 'student' ? 'role-btn active' : 'role-btn'}
              >
                Student
              </button>
              <button
                onClick={() => setLoginForm({...loginForm, role: 'faculty'})}
                className={loginForm.role === 'faculty' ? 'role-btn active' : 'role-btn'}
              >
                Faculty
              </button>
              <button
                onClick={() => setLoginForm({...loginForm, role: 'admin'})}
                className={loginForm.role === 'admin' ? 'role-btn active' : 'role-btn'}
              >
                Admin
              </button>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                placeholder="Enter your password"
              />
            </div>

            <button onClick={handleLogin} className="login-btn">
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  const renderStudentDashboard = () => (
    <div className="page-content">
      <h2 className="page-title">Dashboard</h2>
      
      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-content">
            <div>
              <p className="stat-label">Total Leaves</p>
              <p className="stat-value">12</p>
            </div>
            <Calendar size={32} />
          </div>
        </div>

        <div className="stat-card green">
          <div className="stat-content">
            <div>
              <p className="stat-label">Approved</p>
              <p className="stat-value">8</p>
            </div>
            <CheckCircle size={32} />
          </div>
        </div>

        <div className="stat-card yellow">
          <div className="stat-content">
            <div>
              <p className="stat-label">Pending</p>
              <p className="stat-value">3</p>
            </div>
            <Clock size={32} />
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Recent Applications</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveHistory.slice(0, 3).map(leave => (
                <tr key={leave.id}>
                  <td>{leave.type}</td>
                  <td>{leave.date}</td>
                  <td>
                    <span className={`badge ${leave.status.toLowerCase()}`}>
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderApplyLeave = () => (
    <div className="page-content">
      <h2 className="page-title">Apply for Leave</h2>
      
      <div className="card form-card">
        <div className="form-group">
          <label>Leave Type</label>
          <select
            value={leaveForm.type}
            onChange={(e) => setLeaveForm({...leaveForm, type: e.target.value})}
          >
            <option value="sick">Sick Leave</option>
            <option value="casual">Casual Leave</option>
            <option value="medical">Medical Leave</option>
            <option value="emergency">Emergency Leave</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              value={leaveForm.startDate}
              onChange={(e) => setLeaveForm({...leaveForm, startDate: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              value={leaveForm.endDate}
              onChange={(e) => setLeaveForm({...leaveForm, endDate: e.target.value})}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Reason</label>
          <textarea
            value={leaveForm.reason}
            onChange={(e) => setLeaveForm({...leaveForm, reason: e.target.value})}
            rows={4}
            placeholder="Enter reason for leave..."
          />
        </div>

        <button onClick={() => alert('Leave submitted!')} className="submit-btn">
          Submit Application
        </button>
      </div>
    </div>
  );

  const renderLeaveHistory = () => (
    <div className="page-content">
      <h2 className="page-title">Leave History</h2>
      
      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Date</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveHistory.map(leave => (
                <tr key={leave.id}>
                  <td>{leave.type}</td>
                  <td>{leave.date}</td>
                  <td>{leave.reason}</td>
                  <td>
                    <span className={`badge ${leave.status.toLowerCase()}`}>
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderFacultyDashboard = () => (
    <div className="page-content">
      <h2 className="page-title">Faculty Dashboard</h2>
      
      <div className="stats-grid">
        <div className="stat-card yellow">
          <div className="stat-content">
            <div>
              <p className="stat-label">Pending Leaves</p>
              <p className="stat-value">3</p>
            </div>
            <Clock size={32} />
          </div>
        </div>

        <div className="stat-card blue">
          <div className="stat-content">
            <div>
              <p className="stat-label">Total Students</p>
              <p className="stat-value">150</p>
            </div>
            <Users size={32} />
          </div>
        </div>

        <div className="stat-card green">
          <div className="stat-content">
            <div>
              <p className="stat-label">Attendance</p>
              <p className="stat-value">85%</p>
            </div>
            <CheckCircle size={32} />
          </div>
        </div>
      </div>
    </div>
  );

  const renderLeaveApproval = () => (
    <div className="page-content">
      <h2 className="page-title">Leave Requests</h2>
      
      {leaveHistory.filter(l => l.status === 'Pending').map(leave => (
        <div key={leave.id} className="card leave-card">
          <div className="leave-info">
            <div className="leave-header">
              <h3>{leave.studentName}</h3>
              <span className="badge blue">{leave.rollNo}</span>
            </div>
            
            <div className="leave-details">
              <div>
                <p className="label">Type</p>
                <p>{leave.type}</p>
              </div>
              <div>
                <p className="label">Date</p>
                <p>{leave.date}</p>
              </div>
            </div>
            
            <div>
              <p className="label">Reason</p>
              <p>{leave.reason}</p>
            </div>
          </div>
          
          <div className="action-buttons">
            <button onClick={() => alert('Approved!')} className="btn-approve">
              Approve
            </button>
            <button onClick={() => alert('Rejected!')} className="btn-reject">
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderAttendance = () => (
    <div className="page-content">
      <h2 className="page-title">Mark Attendance</h2>
      
      <div className="card">
        <div className="form-group" style={{maxWidth: '400px'}}>
          <label>Select Date</label>
          <input
            type="date"
            value={attendanceDate}
            onChange={(e) => setAttendanceDate(e.target.value)}
          />
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th style={{textAlign: 'center'}}>Present</th>
                <th style={{textAlign: 'center'}}>Absent</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map(student => (
                <tr key={student.id}>
                  <td>{student.rollNo}</td>
                  <td>{student.name}</td>
                  <td style={{textAlign: 'center'}}>
                    <input
                      type="radio"
                      name={`attendance-${student.id}`}
                      checked={student.present}
                      onChange={() => toggleAttendance(student.id)}
                    />
                  </td>
                  <td style={{textAlign: 'center'}}>
                    <input
                      type="radio"
                      name={`attendance-${student.id}`}
                      checked={!student.present}
                      onChange={() => toggleAttendance(student.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="attendance-footer">
          <p>
            Present: <strong>{attendance.filter(s => s.present).length}</strong> | 
            Absent: <strong>{attendance.filter(s => !s.present).length}</strong>
          </p>
          <button onClick={() => alert('Attendance submitted!')} className="submit-btn">
            Submit
          </button>
        </div>
      </div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="page-content">
      <h2 className="page-title">Admin Dashboard</h2>
      
      <div className="stats-grid four-col">
        <div className="stat-card blue">
          <div className="stat-content">
            <div>
              <p className="stat-label">Faculty</p>
              <p className="stat-value">{facultyList.length}</p>
            </div>
            <Users size={32} />
          </div>
        </div>

        <div className="stat-card green">
          <div className="stat-content">
            <div>
              <p className="stat-label">Students</p>
              <p className="stat-value">150</p>
            </div>
            <Users size={32} />
          </div>
        </div>

        <div className="stat-card purple">
          <div className="stat-content">
            <div>
              <p className="stat-label">Payroll</p>
              <p className="stat-value">₹2.5L</p>
            </div>
            <DollarSign size={32} />
          </div>
        </div>

        <div className="stat-card yellow">
          <div className="stat-content">
            <div>
              <p className="stat-label">Pending</p>
              <p className="stat-value">12</p>
            </div>
            <Clock size={32} />
          </div>
        </div>
      </div>
    </div>
  );

  const renderManageUsers = () => (
    <div className="page-content">
      <div className="page-header">
        <h2 className="page-title">Manage Users</h2>
        <button className="btn-primary">
          <UserPlus size={18} />
          <span>Add User</span>
        </button>
      </div>
      
      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th style={{textAlign: 'center'}}>Attendance</th>
                <th style={{textAlign: 'center'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {facultyList.map(faculty => (
                <tr key={faculty.id}>
                  <td>{faculty.empId}</td>
                  <td>{faculty.name}</td>
                  <td>{faculty.dept}</td>
                  <td style={{textAlign: 'center'}}>{faculty.attendance}/25</td>
                  <td style={{textAlign: 'center'}}>
                    <button className="btn-text blue">Edit</button>
                    <button className="btn-text red">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPayroll = () => (
    <div className="page-content">
      <div className="page-header">
        <h2 className="page-title">Payroll Management</h2>
        <button className="btn-success">
          <DollarSign size={18} />
          <span>Process All</span>
        </button>
      </div>
      
      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th style={{textAlign: 'right'}}>Basic</th>
                <th style={{textAlign: 'right'}}>Deduct</th>
                <th style={{textAlign: 'right'}}>Net</th>
                <th style={{textAlign: 'center'}}>Status</th>
                <th style={{textAlign: 'center'}}>Action</th>
              </tr>
            </thead>
            <tbody>
              {payrollData.map(item => (
                <tr key={item.id}>
                  <td>{item.empId}</td>
                  <td>{item.name}</td>
                  <td style={{textAlign: 'right'}}>₹{item.basicSalary.toLocaleString()}</td>
                  <td style={{textAlign: 'right', color: '#dc2626'}}>₹{item.deductions.toLocaleString()}</td>
                  <td style={{textAlign: 'right', color: '#16a34a', fontWeight: '600'}}>₹{item.netSalary.toLocaleString()}</td>
                  <td style={{textAlign: 'center'}}>
                    <span className={`badge ${item.status === 'Processed' ? 'approved' : 'pending'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td style={{textAlign: 'center'}}>
                    <button className="btn-text blue">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="page-content">
      <h2 className="page-title">Generate Reports</h2>
      
      <div className="reports-grid">
        {['Attendance Report', 'Payroll Report', 'Leave Report', 'Department Report'].map((report, idx) => (
          <div key={idx} className="card">
            <h3>{report}</h3>
            <p className="report-desc">Generate monthly {report.toLowerCase()}</p>
            <div className="form-group">
              <label>Select Period</label>
              <input type="month" />
            </div>
            <button className="btn-primary full-width">
              <Download size={18} />
              <span>Download</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const getNavItems = () => {
    if (userRole === 'student') {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'apply', label: 'Apply Leave', icon: FileText },
        { id: 'history', label: 'Leave History', icon: History },
        { id: 'profile', label: 'Profile', icon: User }
      ];
    } else if (userRole === 'faculty') {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'leaves', label: 'Leave Requests', icon: CheckSquare },
        { id: 'attendance', label: 'Attendance', icon: Calendar },
        { id: 'profile', label: 'Profile', icon: User }
      ];
    } else {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'users', label: 'Manage Users', icon: Users },
        { id: 'payroll', label: 'Payroll', icon: DollarSign },
        { id: 'reports', label: 'Reports', icon: FileText }
      ];
    }
  };

  const renderContent = () => {
    if (userRole === 'student') {
      if (currentPage === 'dashboard') return renderStudentDashboard();
      if (currentPage === 'apply') return renderApplyLeave();
      if (currentPage === 'history') return renderLeaveHistory();
      if (currentPage === 'profile') return <div className="page-content"><p style={{textAlign: 'center', color: '#666', padding: '80px 0'}}>Profile Page</p></div>;
    } else if (userRole === 'faculty') {
      if (currentPage === 'dashboard') return renderFacultyDashboard();
      if (currentPage === 'leaves') return renderLeaveApproval();
      if (currentPage === 'attendance') return renderAttendance();
      if (currentPage === 'profile') return <div className="page-content"><p style={{textAlign: 'center', color: '#666', padding: '80px 0'}}>Profile Page</p></div>;
    } else if (userRole === 'admin') {
      if (currentPage === 'dashboard') return renderAdminDashboard();
      if (currentPage === 'users') return renderManageUsers();
      if (currentPage === 'payroll') return renderPayroll();
      if (currentPage === 'reports') return renderReports();
    }
  };

  const navItems = getNavItems();

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="menu-btn"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="header-title">
              EduManage Pro - {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Portal
            </h1>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="app-body">
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <nav className="sidebar-nav">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setSidebarOpen(false);
                }}
                className={`nav-btn ${currentPage === item.id ? 'active' : ''}`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)} />}

        <main className="main-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;