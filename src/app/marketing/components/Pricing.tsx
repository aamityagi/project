import { Card, CardHeader, CardContent } from "../../(protected)/components/ui/card";
import { Button } from "../../(protected)/components/ui/button";

export default function Pricing() {
  const plans = [
    { name: "Free Plan", price: "$0", features: ["Basic Dashboard", "Limited Support"] },
    { name: "Gold Plan", price: "$49", features: ["Full Dashboard", "Priority Support"] },
    { name: "Platinum Plan", price: "$99", features: ["Full Dashboard", "Dedicated Support", "Custom Features"] },
  ];

  return (
    <section id="pricing" className="py-20 px-6 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-10">Pricing Plans</h2>
      <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.name}>
            <CardHeader>{plan.name}</CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mb-4">{plan.price}</p>
              <ul className="mb-4">
                {plan.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <Button>Choose Plan</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
