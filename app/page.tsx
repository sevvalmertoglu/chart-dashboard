import DashboardStats from './components/DashboardStats';
import SalesChart from './components/SalesChart';
import TankStatus from './components/TankStatus';
import FuelTypeDistribution from './components/FuelTypeDistribution';
import Sidebar from './components/Sidebar';

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 ml-16 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <DashboardStats />
          </div>
          
          {}
          <div className="w-full">
            <SalesChart />
          </div>

          {}
          <div className="grid gap-6 md:grid-cols-2">
            <TankStatus />
            <FuelTypeDistribution />
          </div>
        </div>
      </main>
    </div>
  );
}
