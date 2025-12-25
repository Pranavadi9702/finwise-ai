import { TrendingUp, TrendingDown, Lightbulb, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type InsightType = "positive" | "negative" | "warning" | "tip";

interface Insight {
  id: number;
  title: string;
  description: string;
  type: InsightType;
  value?: string;
  trend?: "up" | "down";
  percentage?: number;
}

const insights: Insight[] = [
  {
    id: 1,
    title: "Food expenses increased",
    description: "Your food & dining expenses went up by 18% compared to last month. Consider cooking at home more often.",
    type: "negative",
    trend: "up",
    percentage: 18,
  },
  {
    id: 2,
    title: "Great savings progress!",
    description: "You've saved ₹40,500 this month, exceeding your target by 12%. Keep up the excellent work!",
    type: "positive",
    trend: "up",
    percentage: 12,
  },
  {
    id: 3,
    title: "Subscription optimization",
    description: "You can save ₹3,850/month by cancelling 3 subscriptions you rarely use (Hotstar, Gym, LinkedIn).",
    type: "tip",
    value: "₹3,850/mo",
  },
  {
    id: 4,
    title: "Budget alert: Food category",
    description: "You've exceeded your food budget by ₹2,500. Consider adjusting your budget or reducing expenses.",
    type: "warning",
    value: "₹2,500 over",
  },
  {
    id: 5,
    title: "Travel expenses down",
    description: "Your travel expenses decreased by 24% this month. Great job on optimizing commute costs!",
    type: "positive",
    trend: "down",
    percentage: 24,
  },
  {
    id: 6,
    title: "Emergency fund milestone",
    description: "You're just ₹64,000 away from your emergency fund goal. At current rate, you'll reach it by March 2025.",
    type: "positive",
    value: "₹64,000 left",
  },
  {
    id: 7,
    title: "Investment opportunity",
    description: "Based on your savings rate, you could invest ₹10,000/month in SIP for better returns than savings account.",
    type: "tip",
    value: "₹10,000/mo",
  },
  {
    id: 8,
    title: "Entertainment spending stable",
    description: "Your entertainment expenses have remained consistent at ₹4,000/month for the past 3 months.",
    type: "positive",
    value: "₹4,000/mo",
  },
];

const typeConfig = {
  positive: {
    icon: CheckCircle,
    bgColor: "bg-success-soft",
    borderColor: "border-success/20",
    iconColor: "text-success",
  },
  negative: {
    icon: TrendingUp,
    bgColor: "bg-danger-soft",
    borderColor: "border-danger/20",
    iconColor: "text-danger",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-warning-soft",
    borderColor: "border-warning/20",
    iconColor: "text-warning",
  },
  tip: {
    icon: Lightbulb,
    bgColor: "bg-info-soft",
    borderColor: "border-info/20",
    iconColor: "text-info",
  },
};

export default function Insights() {
  const positiveCount = insights.filter((i) => i.type === "positive").length;
  const warningCount = insights.filter((i) => i.type === "warning" || i.type === "negative").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Insights & Analytics</h1>
        <p className="text-muted-foreground">
          AI-generated insights to help you manage money better
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-success-soft border border-success/20 p-5">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-8 w-8 text-success" />
            <div>
              <p className="text-2xl font-bold text-success">{positiveCount}</p>
              <p className="text-sm text-success/80">Positive trends this month</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-warning-soft border border-warning/20 p-5">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-warning" />
            <div>
              <p className="text-2xl font-bold text-warning">{warningCount}</p>
              <p className="text-sm text-warning/80">Areas needing attention</p>
            </div>
          </div>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {insights.map((insight, index) => {
          const config = typeConfig[insight.type];
          const Icon = config.icon;

          return (
            <div
              key={insight.id}
              className={cn(
                "rounded-xl bg-card p-5 shadow-card border animate-fade-in",
                config.borderColor
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className={cn("rounded-xl p-3", config.bgColor)}>
                  <Icon className={cn("h-5 w-5", config.iconColor)} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-semibold text-foreground">{insight.title}</h3>
                    {insight.trend && (
                      <div
                        className={cn(
                          "flex items-center gap-1 text-sm font-medium",
                          insight.type === "positive" ? "text-success" : "text-danger"
                        )}
                      >
                        {insight.trend === "up" ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        {insight.percentage}%
                      </div>
                    )}
                    {insight.value && !insight.trend && (
                      <span
                        className={cn(
                          "text-sm font-semibold",
                          insight.type === "positive"
                            ? "text-success"
                            : insight.type === "warning"
                            ? "text-warning"
                            : insight.type === "negative"
                            ? "text-danger"
                            : "text-info"
                        )}
                      >
                        {insight.value}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {insight.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Monthly Summary */}
      <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
        <h3 className="text-lg font-semibold mb-4">Monthly Summary</h3>
        <div className="grid gap-6 sm:grid-cols-4">
          <div>
            <p className="text-sm text-muted-foreground">Income</p>
            <p className="text-xl font-bold text-foreground">₹85,000</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Expenses</p>
            <p className="text-xl font-bold text-danger">₹44,500</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Savings</p>
            <p className="text-xl font-bold text-success">₹40,500</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Savings Rate</p>
            <p className="text-xl font-bold text-primary">47.6%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
