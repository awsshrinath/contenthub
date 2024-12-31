import React from 'react';
import { ProfileSection } from './profile-section';
import { SecuritySection } from './security-section';
import { SubscriptionSection } from './subscription-section';
import { ContentOverview } from './content-overview';

export function AccountSettings() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>

      <div className="grid grid-cols-1 gap-8">
        {/* Profile Management */}
        <ProfileSection />

        {/* Security Settings */}
        <SecuritySection />

        {/* Subscription Management */}
        <SubscriptionSection />

        {/* Content Overview */}
        <ContentOverview />
      </div>
    </div>
  );
}