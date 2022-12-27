import Navigation from './components/Navigation';
import LocationPage from './pages/LocationPage';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function App() {
  return (
    <div className="App">
      <SkeletonTheme baseColor="#b7b7b7" highlightColor="#c8c8c8">
        <Navigation goBack={false} />
        <LocationPage />
      </SkeletonTheme>
    </div>
  );
}

export default App;
