import { ActivitiesList } from './pages/ActivitiesList';
import { Menu } from './components/Menu';

function App() {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Menu />

      <main className="flex-1 overflow-y-auto pt-14 md:pt-0">
        <ActivitiesList />
      </main>
    </div>
  );
}

export default App;
