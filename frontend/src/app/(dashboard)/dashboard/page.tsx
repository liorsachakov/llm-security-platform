import StatsCards from '@/components/dashboard/StatsCards';
import ActiveChallengesList from '@/components/dashboard/ActiveChallengesList';
import TopContributors from '@/components/dashboard/TopContributors';

export default function DashboardPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <ActiveChallengesList />
        </div>
        <div className="lg:col-span-2">
          <TopContributors />
        </div>
      </div>
    </div>
  );
}











