import { TrendingUp, Clock, Shield, Info } from "lucide-react";
import { RiskBadge, RiskLevel } from "@/components/ui/risk-badge";

interface Investment {
  id: number;
  name: string;
  type: string;
  expectedReturns: string;
  risk: RiskLevel;
  timeHorizon: string;
  minInvestment: number;
  description: string;
}

const investments: Investment[] = [
  {
    id: 1,
    name: "Nifty 50 Index Fund",
    type: "SIP",
    expectedReturns: "12-14%",
    risk: "medium",
    timeHorizon: "5+ years",
    minInvestment: 500,
    description: "Diversified exposure to India's top 50 companies. Ideal for long-term wealth creation.",
  },
  {
    id: 2,
    name: "HDFC Mid-Cap Fund",
    type: "Mutual Fund",
    expectedReturns: "14-16%",
    risk: "high",
    timeHorizon: "7+ years",
    minInvestment: 1000,
    description: "Higher growth potential with mid-sized companies. Suitable for aggressive investors.",
  },
  {
    id: 3,
    name: "SBI Fixed Deposit",
    type: "Fixed Deposit",
    expectedReturns: "6.5-7%",
    risk: "low",
    timeHorizon: "1-5 years",
    minInvestment: 10000,
    description: "Guaranteed returns with capital protection. Best for conservative investors.",
  },
  {
    id: 4,
    name: "Axis Bluechip Fund",
    type: "Mutual Fund",
    expectedReturns: "10-12%",
    risk: "low",
    timeHorizon: "3+ years",
    minInvestment: 500,
    description: "Invests in large-cap, stable companies. Lower volatility with steady returns.",
  },
  {
    id: 5,
    name: "PPF Account",
    type: "Government Scheme",
    expectedReturns: "7.1%",
    risk: "low",
    timeHorizon: "15 years",
    minInvestment: 500,
    description: "Tax-free returns with sovereign guarantee. Great for retirement planning.",
  },
  {
    id: 6,
    name: "Parag Parikh Flexi Cap",
    type: "Mutual Fund",
    expectedReturns: "13-15%",
    risk: "medium",
    timeHorizon: "5+ years",
    minInvestment: 1000,
    description: "Flexible allocation across market caps. Good for balanced portfolios.",
  },
];

export default function Investments() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Investment Recommendations</h1>
        <p className="text-muted-foreground">
          AI-curated investment options based on your risk profile
        </p>
      </div>

      {/* Risk Profile Card */}
      <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Your Risk Profile</h3>
              <p className="text-sm text-muted-foreground">
                Based on your age, income, and goals
              </p>
            </div>
          </div>
          <RiskBadge level="medium" />
        </div>
        <div className="mt-4 p-4 rounded-lg bg-muted/50">
          <p className="text-sm text-muted-foreground">
            <Info className="inline-block h-4 w-4 mr-1 -mt-0.5" />
            A moderate risk profile suggests a balanced portfolio with 60% equity and 40%
            debt instruments for optimal growth with managed volatility.
          </p>
        </div>
      </div>

      {/* Investment Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {investments.map((investment, index) => (
          <div
            key={investment.id}
            className="rounded-xl bg-card p-6 shadow-card border border-border/50 hover:shadow-soft transition-shadow animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Header */}
            <div className="mb-4">
              <div className="flex items-start justify-between mb-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {investment.type}
                </span>
                <RiskBadge level={investment.risk} />
              </div>
              <h3 className="font-semibold text-foreground">{investment.name}</h3>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {investment.description}
            </p>

            {/* Stats */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4 text-success" />
                  Expected Returns
                </div>
                <span className="font-semibold text-success">
                  {investment.expectedReturns}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Time Horizon
                </div>
                <span className="font-medium">{investment.timeHorizon}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Min. Investment</span>
                <span className="font-medium">₹{investment.minInvestment.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="rounded-xl bg-muted/50 p-4">
        <p className="text-xs text-muted-foreground">
          <strong>Disclaimer:</strong> These recommendations are for informational purposes
          only and do not constitute financial advice. Past performance is not indicative
          of future results. Please consult a certified financial advisor before making
          investment decisions.
        </p>
      </div>
    </div>
  );
}
