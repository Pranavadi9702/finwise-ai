import { AlertTriangle, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BudgetCategory {
  id: number;
  name: string;
  budget: number;
  spent: number;
  icon: string;
}

const budgets: BudgetCategory[] = [
  { id: 1, name: "Food & Dining", budget: 10000, spent: 12500, icon: "🍔" },
  { id: 2, name: "Travel", budget: 5000, spent: 3800, icon: "🚗" },
  { id: 3, name: "Entertainment", budget: 3000, spent: 2200, icon: "🎬" },
  { id: 4, name: "Shopping", budget: 8000, spent: 4500, icon: "🛍️" },
  { id: 5, name: "Utilities", budget: 4000, spent: 3200, icon: "💡" },
  { id: 6, name: "Health", budget: 2000, spent: 800, icon: "🏥" },
];

export default function Budgets() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Budgets</h1>
          <p className="text-muted-foreground">
            Manage your category-wise spending limits
          </p>
        </div>
        <Button>
          <Settings2 className="mr-2 h-4 w-4" />
          Adjust Budgets
        </Button>
      </div>

      {/* AI Hint */}
      <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
        <p className="text-sm text-primary">
          💡 <strong>AI Tip:</strong> Your budgets are automatically adjusted
          based on your spending patterns. We recommend increasing your Food
          budget by ₹2,000.
        </p>
      </div>

      {/* Budget Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget, index) => {
          const percentage = (budget.spent / budget.budget) * 100;
          const isOverBudget = percentage > 100;
          const remaining = budget.budget - budget.spent;

          return (
            <div
              key={budget.id}
              className={cn(
                "rounded-xl bg-card p-6 shadow-card border transition-all animate-fade-in",
                isOverBudget ? "border-danger/50" : "border-border/50"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{budget.icon}</span>
                  <h3 className="font-semibold text-foreground">{budget.name}</h3>
                </div>
                {isOverBudget && (
                  <div className="flex items-center gap-1 text-danger">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-xs font-medium">Exceeded</span>
                  </div>
                )}
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn(
                      "h-3 rounded-full transition-all duration-700",
                      isOverBudget ? "bg-danger" : percentage > 80 ? "bg-warning" : "bg-success"
                    )}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    ₹{budget.spent.toLocaleString()} spent
                  </span>
                  <span
                    className={cn(
                      "font-medium",
                      isOverBudget ? "text-danger" : "text-muted-foreground"
                    )}
                  >
                    {percentage.toFixed(0)}%
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-4 flex justify-between text-sm">
                <div>
                  <p className="text-muted-foreground">Budget</p>
                  <p className="font-semibold">₹{budget.budget.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground">
                    {isOverBudget ? "Over by" : "Remaining"}
                  </p>
                  <p
                    className={cn(
                      "font-semibold",
                      isOverBudget ? "text-danger" : "text-success"
                    )}
                  >
                    ₹{Math.abs(remaining).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
          <p className="text-sm text-muted-foreground">Total Budget</p>
          <p className="text-2xl font-bold">
            ₹{budgets.reduce((sum, b) => sum + b.budget, 0).toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
          <p className="text-sm text-muted-foreground">Total Spent</p>
          <p className="text-2xl font-bold text-danger">
            ₹{budgets.reduce((sum, b) => sum + b.spent, 0).toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
          <p className="text-sm text-muted-foreground">Overall Status</p>
          <p className="text-2xl font-bold text-warning">
            {budgets.filter((b) => b.spent > b.budget).length} over budget
          </p>
        </div>
      </div>
    </div>
  );
}
