import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import t from './i18n/ar';
import Navbar              from './components/Navbar';
import Footer              from './components/Footer';
import SubscriptionGuard   from './components/SubscriptionGuard';
import Home                from './pages/Home';
import Tournaments         from './pages/Tournaments';
import Clashes             from './pages/Clashes';
import Games               from './pages/Games';
import QuickPlay           from './pages/QuickPlay';
import Rewards             from './pages/Rewards';
import Community           from './pages/Community';
import Support             from './pages/Support';
import Contact             from './pages/Contact';
import Login               from './pages/Login';
import PlayGame            from './pages/PlayGame';
import NotFound            from './pages/NotFound';

const NO_CHROME = ['/login'];

function GuardedRoute({ children }) {
  return <SubscriptionGuard>{children}</SubscriptionGuard>;
}

function Layout() {
  const { pathname } = useLocation();
  const isPlay       = pathname.startsWith('/play/');
  const isFullScreen = NO_CHROME.includes(pathname) || isPlay;

  return (
    <div className="w-full font-body relative m-0 min-h-full bg_site" style={{ direction: 'rtl' }} id="body">
      {!isFullScreen && <Navbar />}
      <main className={`h-full pb-0 flex-1 font-body${!isFullScreen ? ' mt-0 lg:mt-24' : ''}`}>
        <Routes>
          <Route path="/"                element={<GuardedRoute><Home /></GuardedRoute>} />
          <Route path="/tournaments"     element={<GuardedRoute><Tournaments /></GuardedRoute>} />
          <Route path="/clashes"         element={<GuardedRoute><Clashes /></GuardedRoute>} />
          <Route path="/games"           element={<GuardedRoute><Games /></GuardedRoute>} />
          <Route path="/quickplay"       element={<GuardedRoute><QuickPlay /></GuardedRoute>} />
          <Route path="/rewards"         element={<GuardedRoute><Rewards /></GuardedRoute>} />
          <Route path="/community"       element={<Community />} />
          <Route path="/support"         element={<Support />} />
          <Route path="/contact"         element={<Contact />} />
          <Route path="/login"           element={<Login />} />
          <Route path="/play/:slug"      element={<GuardedRoute><PlayGame /></GuardedRoute>} />
          <Route path="*"               element={<NotFound />} />
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
