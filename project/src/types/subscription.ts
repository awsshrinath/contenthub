export type SubscriptionTier = 'free' | 'basic' | 'pro' | 'enterprise';

export interface SubscriptionPlan {
  id: string;
  name: string;
  tier: SubscriptionTier;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  limits: {
    tokensPerMonth: number;
    videoMinutesPerMonth: number;
    imageGenerationsPerMonth: number;
    maxVideoLength: number;
    maxResolution: string;
    soraAccess: boolean;
  };
}

export interface UserSubscription {
  userId: string;
  planId: string;
  status: 'active' | 'canceled' | 'expired';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}