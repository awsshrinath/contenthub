import React from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, Star, Download } from 'lucide-react';

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    features: ['Basic content generation', 'Limited exports', 'Community support'],
    current: true,
  },
  {
    name: 'Premium',
    price: '$29/month',
    features: ['Advanced AI features', 'Unlimited exports', 'Priority support'],
    current: false,
  },
];

export function SubscriptionSection() {
  const handleUpgrade = () => {
    // Handle subscription upgrade
    console.log('Upgrading subscription');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Subscription</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`p-6 rounded-lg border-2 ${
              plan.current ? 'border-primary bg-primary/5' : 'border-gray-200'
            }`}
          >
            <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
            <p className="text-2xl font-bold mb-4">{plan.price}</p>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center text-sm">
                  <Star className="w-4 h-4 mr-2 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
            {plan.current ? (
              <Button variant="outline" className="w-full">Current Plan</Button>
            ) : (
              <Button onClick={handleUpgrade} className="w-full">Upgrade</Button>
            )}
          </div>
        ))}
      </div>

      {/* Billing History */}
      <div className="mt-8 pt-6 border-t">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Billing History</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Invoice #{i}</p>
                <p className="text-sm text-gray-500">March {i}, 2024</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}