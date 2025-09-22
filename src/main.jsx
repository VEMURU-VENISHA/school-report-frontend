import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import FirstPage from './firstpage.jsx'
import Studentlogin from './Studentlogin.jsx'
import Parentlogin from './Parentlogin.jsx'
import Teacherlogin from './teacherlogin.jsx'
import TeacherPage from './Teacherpage.jsx'
import ParentPage from './ParentPage.jsx'
import StudentPage from './Studentpage.jsx'
import StudentProfile from './studentmain.jsx'
import StudentFirst from './studentfirst.jsx'
import PendingCoursesPage from './pendingcourses.jsx'
import PendingCoursesByStudent from './pendingcourseStudent.jsx'
import CurrentCoursesByStudent from './urrentCoursesByStudent.jsx'
import Teacherfirst from './Teacherfirst.jsx'
import TeacherCourse from './TeacherCourse.jsx'
import ViewReports from './ViewReports.jsx'
import AddReport from './AddReport.jsx'
import CurrentCoursesByStudentTeacher from './CurrentCoursesByStudentTeacher.jsx'
import StudentReportChart from './StudentReportChart.jsx'
import StudentReportCompare from './StudentReportComapre.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<FirstPage/>} />
      <Route path="/Parentlogin" element={<Parentlogin/>} />
      <Route path="/Studentlogin" element={<Studentlogin/>} />
      <Route path="/teacherlogin" element={<Teacherlogin/>}/>
      <Route path="/TeacherPage" element={<TeacherPage/>}/>
      <Route path="/ParentPage" element={<ParentPage/>}/>
      <Route path="/StudentPage" element={<StudentPage/>}/>
      <Route path="/StudentProfile" element={<StudentProfile/>}/>
      <Route path="/StudentFirst" element={<StudentFirst/>}/>
      <Route path="/PendingCourses" element={<PendingCoursesPage/>}/>
      <Route path="/PendingCoursesByStudent" element={<PendingCoursesByStudent/>}/>
      <Route path="/CurrentCoursesByStudent" element={<CurrentCoursesByStudent/>}/>
      <Route path="Teacherfirst" element={<Teacherfirst/>}/>
      <Route path="/TeacherCourse" element={<TeacherCourse/>}/>
      <Route path="/ViewReports" element={<ViewReports/>}/>
      <Route path="/AddReport" element={<AddReport/>}/>
      <Route path="/CurrentCoursesByStudentTeacher" element={<CurrentCoursesByStudentTeacher/>}/>
      <Route path="/StudentReportChart" element={<StudentReportChart/>}/>
      <Route path="/StudentReportCompare" element={<StudentReportCompare/>}/>
    </Routes>
  </BrowserRouter>
)
