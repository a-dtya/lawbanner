export type SubscriptionTier = 'free' | 'basic' | 'standard' | 'premium';

export interface TierFeatures {
  name: string;
  description: string;
  monthlyPrice: number;
  stripePriceId: string;
  maxNumberOfVisits: number;
  features: {
    maxProducts: number;
    analyticsDashboard: boolean;
    bannerCustomization: boolean;
    autoUpdatePolicies: boolean;
    regionAwareDelivery: boolean;
    aiGeneratedPolicies: boolean;
    multiLanguageSupport: boolean;
    supportPriority: 'none' | 'standard' | 'priority';
  };
}

export const subscriptionTiers: Record<SubscriptionTier, TierFeatures> = {
  free: {
    name: 'Free',
    description: 'For solo developers testing things out.',
    monthlyPrice: 0,
    stripePriceId: '',
    maxNumberOfVisits: 500,
    features: {
      maxProducts: 1,
      analyticsDashboard: false,
      bannerCustomization: false,
      autoUpdatePolicies: false,
      regionAwareDelivery: true,
      aiGeneratedPolicies: true,
      multiLanguageSupport: false,
      supportPriority: 'none',
    },
  },
  basic: {
    name: 'Basic',
    description: 'For small projects that need a little more control.',
    monthlyPrice: 9,
    stripePriceId: 'price_basic_123', // Replace with real Stripe Price ID
    maxNumberOfVisits: 5_000,
    features: {
      maxProducts: 3,
      analyticsDashboard: true,
      bannerCustomization: false,
      autoUpdatePolicies: false,
      regionAwareDelivery: true,
      aiGeneratedPolicies: true,
      multiLanguageSupport: false,
      supportPriority: 'standard',
    },
  },
  standard: {
    name: 'Standard',
    description: 'Best for indie founders and growing apps.',
    monthlyPrice: 19,
    stripePriceId: 'price_standard_123', // Replace with real Stripe Price ID
    maxNumberOfVisits: 25_000,
    features: {
      maxProducts: 10,
      analyticsDashboard: true,
      bannerCustomization: true,
      autoUpdatePolicies: true,
      regionAwareDelivery: true,
      aiGeneratedPolicies: true,
      multiLanguageSupport: true,
      supportPriority: 'standard',
    },
  },
  premium: {
    name: 'Premium',
    description: 'For teams and businesses that need it all.',
    monthlyPrice: 49,
    stripePriceId: 'price_premium_123', // Replace with real Stripe Price ID
    maxNumberOfVisits: 100_000,
    features: {
      maxProducts: 50,
      analyticsDashboard: true,
      bannerCustomization: true,
      autoUpdatePolicies: true,
      regionAwareDelivery: true,
      aiGeneratedPolicies: true,
      multiLanguageSupport: true,
      supportPriority: 'priority',
    },
  },
} as const;

export const subscriptionTiersInOrder = [
  subscriptionTiers.free,
  subscriptionTiers.basic,
  subscriptionTiers.standard,
  subscriptionTiers.premium,
] as const;