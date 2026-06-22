import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
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
      <main className={`h-full pb-0 flex-1 font-body${!isFullScreen ? ' mt-0 lg:mt-24' : ''}`}>
        <Routes>
          <Route path="/"                      element={<Home />} />
          <Route path="/tournaments"           element={<Tournaments />} />
          <Route path="/clashes"               element={<Clashes />} />
          <Route path="/games"                 element={<Games />} />
          <Route path="/quickplay"             element={<QuickPlay />} />
          <Route path="/rewards"               element={<Rewards />} />
          <Route path="/community"             element={<Community />} />
          <Route path="/support"               element={<Support />} />
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
