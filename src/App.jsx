import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './index.css';
import Navbar              from './components/Navbar';
import Footer              from './components/Footer';
import SubscriptionGuard   from './components/SubscriptionGuard';
import Home                from './pages/Home';
import Contact             from './pages/Contact';
import Login               from './pages/Login';
import Register            from './pages/Register';
import PlayGame            from './pages/PlayGame';
import NotFound            from './pages/NotFound';

const NO_CHROME = ['/login', '/accounts/register'];

function Layout() {
  const { pathname } = useLocation();
  const isPlay       = pathname.startsWith('/play/');
  const isFullScreen = NO_CHROME.includes(pathname) || isPlay;

  return (
    <div className="w-full font-body relative m-0 min-h-full bg_site" id="body">
      {!isFullScreen && <Navbar />}
      <main className="h-full pb-0 flex-1 font-body">
        <Routes>
          <Route path="/"                      element={<Home />} />
          <Route path="/tournaments"           element={<Navigate to="/" replace />} />
          <Route path="/clashes"               element={<Navigate to="/" replace />} />
          <Route path="/games"                 element={<Navigate to="/" replace />} />
          <Route path="/quickplay"             element={<Navigate to="/" replace />} />
          <Route path="/rewards"               element={<Navigate to="/" replace />} />
          <Route path="/community"             element={<Navigate to="/" replace />} />
          <Route path="/support"               element={<Navigate to="/" replace />} />
          <Route path="/contact"               element={<Contact />} />
          <Route path="/login"                 element={<Login />} />
          <Route path="/accounts/register"     element={<Register />} />
          <Route path="/play/:slug"            element={<SubscriptionGuard><PlayGame /></SubscriptionGuard>} />
          <Route path="*"                      element={<NotFound />} />
        </Routes>
      </main>
      {!isFullScreen && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
