import { useState } from "react";
import { Plus, Target, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Goal {
  id: number;
  name: string;
  target: number;
  saved: number;
  deadline: string;
  icon: string;
}

const initialGoals: Goal[] = [
  { id: 1, name: "Emergency Fund", target: 200000, saved: 136000, deadline: "2025-06-30", icon: "🛡️" },
  { id: 2, name: "Vacation Trip", target: 80000, saved: 45000, deadline: "2025-03-31", icon: "✈️" },
  { id: 3, name: "New Laptop", target: 120000, saved: 72000, deadline: "2025-04-15", icon: "💻" },
  { id: 4, name: "Wedding Fund", target: 500000, saved: 125000, deadline: "2026-12-01", icon: "💒" },
];

export default function Goals() {
  const [goals, setGoals] = useState(initialGoals);
  const [isOpen, setIsOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({ name: "", target: "", deadline: "" });

  const handleAddGoal = () => {
    if (newGoal.name && newGoal.target && newGoal.deadline) {
      const goal: Goal = {
        id: Date.now(),
        name: newGoal.name,
        target: parseInt(newGoal.target),
        saved: 0,
        deadline: newGoal.deadline,
        icon: "🎯",
      };
      setGoals([...goals, goal]);
      setNewGoal({ name: "", target: "", deadline: "" });
      setIsOpen(false);
    }
  };

  const getStatus = (saved: number, target: number, deadline: string) => {
    const progress = (saved / target) * 100;
    const daysLeft = Math.ceil(
      (new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    const expectedProgress = ((365 - daysLeft) / 365) * 100;
    
    if (progress >= expectedProgress) {
      return { label: "On Track", color: "success" };
    }
    return { label: "Behind", color: "warning" };
  };

  const getMonthlyRequired = (target: number, saved: number, deadline: string) => {
    const remaining = target - saved;
    const monthsLeft = Math.max(
      1,
      Math.ceil(
        (new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30)
      )
    );
    return Math.ceil(remaining / monthsLeft);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Goals</h1>
          <p className="text-muted-foreground">
            Track your savings goals and progress
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="goal-name">Goal Name</Label>
                <Input
                  id="goal-name"
                  placeholder="e.g., Dream Vacation"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target-amount">Target Amount (₹)</Label>
                <Input
                  id="target-amount"
                  type="number"
                  placeholder="100000"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">Target Date</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                />
              </div>
              <Button onClick={handleAddGoal} className="w-full">
                Create Goal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Goals Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {goals.map((goal, index) => {
          const progress = (goal.saved / goal.target) * 100;
          const status = getStatus(goal.saved, goal.target, goal.deadline);
          const monthlyRequired = getMonthlyRequired(goal.target, goal.saved, goal.deadline);

          return (
            <div
              key={goal.id}
              className="rounded-xl bg-card p-6 shadow-card border border-border/50 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{goal.icon}</span>
                  <div>
                    <h3 className="font-semibold text-foreground">{goal.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(goal.deadline).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
                <span
                  className={cn(
                    "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold",
                    status.color === "success"
                      ? "bg-success-soft text-success"
                      : "bg-warning-soft text-warning"
                  )}
                >
                  {status.label}
                </span>
              </div>

              {/* Progress */}
              <div className="space-y-3">
                <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-3 rounded-full bg-primary transition-all duration-700"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    ₹{goal.saved.toLocaleString()} saved
                  </span>
                  <span className="font-medium">{progress.toFixed(0)}%</span>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">Target</p>
                  <p className="font-semibold">₹{goal.target.toLocaleString()}</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">Monthly Required</p>
                  <p className="font-semibold text-primary">
                    ₹{monthlyRequired.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {goals.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <Target className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No goals yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first savings goal to start tracking
          </p>
          <Button onClick={() => setIsOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Goal
          </Button>
        </div>
      )}
    </div>
  );
}
