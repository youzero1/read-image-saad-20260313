import { Suspense } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import DashboardContent from '@/components/DashboardContent';

export default function Home() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="text-gray-500">Loading...</div></div>}>
        <DashboardContent />
      </Suspense>
    </DashboardLayout>
  );
}
