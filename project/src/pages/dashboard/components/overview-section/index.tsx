import React from 'react';
import { StatsOverview } from '../stats-overview';
import { QuickActions } from '../quick-actions';
import { PerformanceMetrics } from '../performance-metrics';

export function OverviewSection() {
  return (
    <div className="space-y-8">
      <QuickActions />
      <StatsOverview />
      <PerformanceMetrics />
    </div>
  );
}