import WelcomeBanner from './WelcomeBanner';
import StatsCards from './StatsCards';
import RecentArrivals from './RecentArrivals';
import RecentDepartures from './RecentDepartures';

export default function DashboardContent() {
  return (
    <div className="max-w-7xl mx-auto">
      <WelcomeBanner />
      <StatsCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentArrivals />
        <RecentDepartures />
      </div>
    </div>
  );
}
