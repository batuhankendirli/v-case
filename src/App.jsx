import Navigation from './components/Navigation';
import LocationPage from './pages/LocationPage';
import CharactersPage from './pages/CharactersPage';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function App() {
  const { pathname } = useLocation();

  return (
    <div className="App">
      <SkeletonTheme baseColor="#b7b7b7" highlightColor="#c8c8c8">
        <Navigation goBack={pathname === '/' ? false : true} />
        <Routes>
          <Route path="/" element={<LocationPage />} />
          <Route path="/location/:locationId" element={<CharactersPage />} />
        </Routes>
      </SkeletonTheme>
    </div>
  );
}

export default App;
