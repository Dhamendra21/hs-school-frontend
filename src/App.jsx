import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Facilities from './pages/Facilities';
import StudentLife from './pages/StudentLife';
import Faculty from './pages/Faculty';
import Gallery from './pages/Gallery';
import Achievements from './pages/Achievements';
import News from './pages/News';
import Admissions from './pages/Admissions';
import Contact from './pages/Contact';
import AdminLayout from './admin/AdminLayout';
import Login from './admin/Login';
import Dashboard from './admin/Dashboard';
import ContentEditor from './admin/ContentEditor';
import NoticesAdmin from './admin/NoticesAdmin';
import FacultyAdmin from './admin/FacultyAdmin';
import GalleryAdmin from './admin/GalleryAdmin';
import EnquiriesAdmin from './admin/EnquiriesAdmin';
import Settings from './admin/Settings';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/student-life" element={<StudentLife />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/news" element={<News />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="enquiries" element={<EnquiriesAdmin />} />
        <Route path="content" element={<ContentEditor />} />
        <Route path="notices" element={<NoticesAdmin />} />
        <Route path="faculty" element={<FacultyAdmin />} />
        <Route path="gallery" element={<GalleryAdmin />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
