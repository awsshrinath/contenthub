import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';
import { SubscriptionPlan } from '@/types/subscription';
import { cn } from '@/lib/utils';

interface PlanCardProps {
  plan: SubscriptionPlan;
  isCurrentPlan?: boolean;
  onSelect: (plan: SubscriptionPlan) => void;
}

export function PlanCard({ plan, isCurrentPlan, onSelect }: PlanCardProps) {
  const isPro = plan.tier === 'pro';
  const isEnterprise = plan.tier === 'enterprise';

  return (
    <div
      className={cn(
        'relative rounded-lg border p-6 shadow-sm transition-all',
        isPro && 'border-primary shadow-md',
        !isPro && 'border-gray-200 dark:border-gray-700'
      )}
    >
      {isPro && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-sm text-white">
          Popular
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-lg font-semibold">{plan.name}</h3>
        <div className="mt-2">
          <span className="text-3xl font-bold">${plan.price}</span>
          <span className="text-gray-600 dark:text-gray-400">/{plan.interval}</span>
        </div>
      </div>

      <ul className="mb-6 space-y-2">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center text-sm">
            <Check className="mr-2 h-4 w-4 text-primary" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="space-y-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <div>
            {plan.limits.tokensPerMonth === -1 
              ? 'Unlimited tokens'
              : `${plan.limits.tokensPerMonth} tokens/month`}
          </div>
          <div>
            {plan.limits.videoMinutesPerMonth === -1
              ? 'Unlimited video minutes'
              : `${plan.limits.videoMinutesPerMonth} video minutes/month`}
          </div>
          <div>Max resolution: {plan.limits.maxResolution}</div>
          {plan.limits.soraAccess && (
            <div className="flex items-center text-primary">
              <Star className="mr-1 h-4 w-4" />
              Sora AI Access
            </div>
          )}
        </div>

        <Button
          onClick={() => onSelect(plan)}
          variant={isPro ? 'primary' : 'outline'}
          className="w-full"
          disabled={isCurrentPlan}
        >
          {isCurrentPlan ? 'Current Plan' : isEnterprise ? 'Contact Sales' : 'Subscribe'}
        </Button>
      </div>
    </div>
  );
}