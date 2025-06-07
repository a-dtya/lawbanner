import { subscriptionTiersInOrder } from "@/data/subscriptionTiers";
import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";

export function PricingSection() {
  return (
    <section id="pricing"
      className="py-24 px-6 text-center"
      style={{
        background: `radial-gradient(circle at top, #f3f4f6 0%, #ffffff 100%)`,
      }}
    >
      <h2 className="text-3xl font-bold mb-6">Pricing Plans</h2>
      <p className="text-muted-foreground mb-14 max-w-2xl mx-auto">
        Whether you're just starting out or scaling fast, we’ve got a plan that fits your needs.
      </p>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
        {subscriptionTiersInOrder.map((tier) => (
          <div
            key={tier.name}
            className="bg-white rounded-2xl border shadow-sm p-6 flex flex-col items-center text-center text-balance"
          >
            <h3 className="text-xl font-semibold mb-1">{tier.name}</h3>
            <p className="text-muted-foreground mb-4 text-sm">{tier.description}</p>
            <p className="text-3xl font-bold">
              {tier.monthlyPrice === 0 ? "Free" : `$${tier.monthlyPrice}/mo`}
            </p>
            <div className="mt-4 mb-4 w-58">
            <SignUpButton>
              <Button className="w-full">
                {tier.monthlyPrice === 0 ? "Get Started" : "Subscribe"}
              </Button>
            </SignUpButton>
            </div>
            <ul className="text-sm space-y-2 mb-6 text-left border-t pt-4">
              <li>
                <strong>{tier.maxNumberOfVisits.toLocaleString()}</strong> visits/month
              </li>
              <li>
                <strong>{tier.features.maxProducts}</strong> product
                {tier.features.maxProducts > 1 && "s"}
              </li>
              {tier.features.analyticsDashboard && <li>Analytics dashboard</li>}
              {tier.features.bannerCustomization && <li>Banner customization</li>}
              {tier.features.autoUpdatePolicies && <li>Auto-update policies</li>}
              {tier.features.regionAwareDelivery && <li>Region-aware delivery</li>}
              {tier.features.aiGeneratedPolicies && <li>AI-generated policies</li>}
              {tier.features.multiLanguageSupport && <li>Multi-language support</li>}
              <li>
                Support:{" "}
                <span className="capitalize">{tier.features.supportPriority}</span>
              </li>
            </ul>
            
          </div>
        ))}
      </div>
    </section>
  );
}
