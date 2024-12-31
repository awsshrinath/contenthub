import { SubscriptionPlan } from '@/types/subscription';

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    tier: 'free',
    price: 0,
    interval: 'month',
    features: [
      'Basic content generation',
      'Standard video quality',
      'Community support',
      'Limited exports'
    ],
    limits: {
      tokensPerMonth: 10,
      videoMinutesPerMonth: 5,
      imageGenerationsPerMonth: 10,
      maxVideoLength: 60, // seconds
      maxResolution: '720p',
      soraAccess: false
    }
  },
  {
    id: 'basic',
    name: 'Basic',
    tier: 'basic',
    price: 29,
    interval: 'month',
    features: [
      'Advanced content generation',
      'HD video quality',
      'Priority support',
      'Unlimited exports',
      'Custom branding'
    ],
    limits: {
      tokensPerMonth: 100,
      videoMinutesPerMonth: 30,
      imageGenerationsPerMonth: 50,
      maxVideoLength: 300, // seconds
      maxResolution: '1080p',
      soraAccess: false
    }
  },
  {
    id: 'pro',
    name: 'Professional',
    tier: 'pro',
    price: 99,
    interval: 'month',
    features: [
      'Premium content generation',
      '4K video quality',
      'Sora AI access',
      'API access',
      'Team collaboration',
      'Advanced analytics'
    ],
    limits: {
      tokensPerMonth: 500,
      videoMinutesPerMonth: 120,
      imageGenerationsPerMonth: 200,
      maxVideoLength: 1800, // seconds
      maxResolution: '4k',
      soraAccess: true
    }
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tier: 'enterprise',
    price: 499,
    interval: 'month',
    features: [
      'Custom content generation',
      'Unlimited video quality',
      'Priority Sora AI access',
      'Dedicated support',
      'Custom integrations',
      'Advanced security'
    ],
    limits: {
      tokensPerMonth: -1, // unlimited
      videoMinutesPerMonth: -1, // unlimited
      imageGenerationsPerMonth: -1, // unlimited
      maxVideoLength: 3600, // seconds
      maxResolution: '8k',
      soraAccess: true
    }
  }
];