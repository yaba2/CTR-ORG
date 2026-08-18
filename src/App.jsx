import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Students from './pages/Students';
import Government from './pages/Government';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import { CmsProvider } from './context/CmsContext';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import PagesList from './admin/PagesList';
import PageEditor from './admin/PageEditor';
import PostsList from './admin/PostsList';
import PostEditor from './admin/PostEditor';
import TestimonialsAdmin from './admin/TestimonialsAdmin';
import SettingsPage from './admin/SettingsPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <CmsProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="pages" element={<PagesList />} />
            <Route path="pages/:slug" element={<PageEditor />} />
            <Route path="posts" element={<PostsList />} />
            <Route path="posts/new" element={<PostEditor />} />
            <Route path="posts/:id" element={<PostEditor />} />
            <Route path="testimonials" element={<TestimonialsAdmin />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/students" element={<Students />} />
            <Route path="/government" element={<Government />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </Router>
    </CmsProvider>
  );
}

export default App;
