import React from 'react';
import { useAuth } from '@/lib/auth';
import { PlanCard } from '@/components/subscription/plan-card';
import { subscriptionPlans } from '@/config/subscription-plans';
import type { SubscriptionPlan } from '@/types/subscription';

export function SubscriptionPage() {
  const { user } = useAuth();

  const handleSelectPlan = async (plan: SubscriptionPlan) => {
    if (plan.tier === 'enterprise') {
      window.location.href = '/contact-sales';
      return;
    }

    // Implement subscription logic
    console.log('Selected plan:', plan);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Get access to advanced features including Sora AI video generation, unlimited exports,
          and premium support.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {subscriptionPlans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isCurrentPlan={user?.subscription?.planId === plan.id}
            onSelect={handleSelectPlan}
          />
        ))}
      </div>
    </div>
  );
}