import { AlertCircle, Calendar, IndianRupee } from "lucide-react";
import { cn } from "@/lib/utils";

interface Subscription {
  id: number;
  name: string;
  cost: number;
  nextRenewal: string;
  category: string;
  logo: string;
  isActive: boolean;
  recommendation?: "keep" | "cancel";
}

const subscriptions: Subscription[] = [
  {
    id: 1,
    name: "Netflix",
    cost: 649,
    nextRenewal: "2025-01-15",
    category: "Entertainment",
    logo: "🎬",
    isActive: true,
    recommendation: "keep",
  },
  {
    id: 2,
    name: "Spotify",
    cost: 119,
    nextRenewal: "2025-01-08",
    category: "Music",
    logo: "🎵",
    isActive: true,
    recommendation: "keep",
  },
  {
    id: 3,
    name: "Amazon Prime",
    cost: 299,
    nextRenewal: "2025-02-20",
    category: "Shopping",
    logo: "📦",
    isActive: true,
  },
  {
    id: 4,
    name: "Hotstar",
    cost: 499,
    nextRenewal: "2025-01-05",
    category: "Entertainment",
    logo: "⭐",
    isActive: true,
    recommendation: "cancel",
  },
  {
    id: 5,
    name: "Gym Membership",
    cost: 1500,
    nextRenewal: "2025-01-01",
    category: "Health",
    logo: "💪",
    isActive: false,
    recommendation: "cancel",
  },
  {
    id: 6,
    name: "LinkedIn Premium",
    cost: 1850,
    nextRenewal: "2025-03-10",
    category: "Career",
    logo: "💼",
    isActive: true,
    recommendation: "cancel",
  },
  {
    id: 7,
    name: "iCloud Storage",
    cost: 75,
    nextRenewal: "2025-01-20",
    category: "Cloud",
    logo: "☁️",
    isActive: true,
    recommendation: "keep",
  },
  {
    id: 8,
    name: "YouTube Premium",
    cost: 139,
    nextRenewal: "2025-01-12",
    category: "Entertainment",
    logo: "▶️",
    isActive: true,
    recommendation: "keep",
  },
];

export default function Subscriptions() {
  const totalMonthly = subscriptions
    .filter((s) => s.isActive)
    .reduce((sum, s) => sum + s.cost, 0);

  const potentialSavings = subscriptions
    .filter((s) => s.recommendation === "cancel")
    .reduce((sum, s) => sum + s.cost, 0);

  const upcomingRenewals = subscriptions
    .filter((s) => s.isActive)
    .filter((s) => {
      const daysUntil = Math.ceil(
        (new Date(s.nextRenewal).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      );
      return daysUntil <= 7;
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Subscriptions</h1>
        <p className="text-muted-foreground">
          Track and optimize your recurring payments
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <IndianRupee className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Monthly Spend</p>
              <p className="text-xl font-bold">₹{totalMonthly.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success-soft">
              <IndianRupee className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Potential Savings</p>
              <p className="text-xl font-bold text-success">
                ₹{potentialSavings.toLocaleString()}/mo
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning-soft">
              <Calendar className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Renewing Soon</p>
              <p className="text-xl font-bold text-warning">
                {upcomingRenewals.length} this week
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendation */}
      {potentialSavings > 0 && (
        <div className="rounded-xl bg-success-soft border border-success/20 p-4">
          <p className="text-sm text-success">
            💡 <strong>AI Insight:</strong> You could save ₹{potentialSavings.toLocaleString()}/month
            by cancelling {subscriptions.filter((s) => s.recommendation === "cancel").length} 
            {" "}unused or rarely-used subscriptions.
          </p>
        </div>
      )}

      {/* Subscription Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subscriptions.map((sub, index) => (
          <div
            key={sub.id}
            className={cn(
              "rounded-xl bg-card p-5 shadow-card border transition-all animate-fade-in",
              !sub.isActive
                ? "border-muted opacity-60"
                : sub.recommendation === "cancel"
                ? "border-warning/50"
                : "border-border/50"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{sub.logo}</span>
                <div>
                  <h3 className="font-semibold text-foreground">{sub.name}</h3>
                  <p className="text-xs text-muted-foreground">{sub.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">₹{sub.cost}</p>
                <p className="text-xs text-muted-foreground">/month</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  Renews{" "}
                  {new Date(sub.nextRenewal).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
              </div>
              {!sub.isActive && (
                <span className="text-xs font-medium text-muted-foreground">
                  Inactive
                </span>
              )}
            </div>

            {sub.recommendation === "cancel" && sub.isActive && (
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-warning-soft px-3 py-2">
                <AlertCircle className="h-4 w-4 text-warning" />
                <span className="text-xs font-medium text-warning">
                  Consider cancelling
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
