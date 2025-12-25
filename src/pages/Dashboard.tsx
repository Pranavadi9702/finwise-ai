import {
  Wallet,
  TrendingDown,
  PiggyBank,
  Shield,
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { ProgressRing } from "@/components/ui/progress-ring";
import { RiskBadge } from "@/components/ui/risk-badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const expenseData = [
  { month: "Jul", amount: 42000 },
  { month: "Aug", amount: 38000 },
  { month: "Sep", amount: 45000 },
  { month: "Oct", amount: 41000 },
  { month: "Nov", amount: 48000 },
  { month: "Dec", amount: 44500 },
];

const categoryData = [
  { name: "Food & Dining", value: 12000, color: "hsl(38, 92%, 50%)" },
  { name: "Rent & EMI", value: 18000, color: "hsl(0, 84%, 60%)" },
  { name: "Travel", value: 5500, color: "hsl(199, 89%, 48%)" },
  { name: "Utilities", value: 3500, color: "hsl(220, 9%, 46%)" },
  { name: "Entertainment", value: 4000, color: "hsl(280, 65%, 60%)" },
  { name: "Shopping", value: 1500, color: "hsl(234, 89%, 54%)" },
];

export default function Dashboard() {
  const savingsGoalProgress = 68;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your financial overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Monthly Income"
          value="₹85,000"
          icon={Wallet}
          variant="success"
        />
        <StatCard
          title="Total Expenses"
          value="₹44,500"
          icon={TrendingDown}
          trend={{ value: 8, isPositive: false }}
          variant="danger"
        />
        <StatCard
          title="Savings This Month"
          value="₹40,500"
          icon={PiggyBank}
          trend={{ value: 12, isPositive: true }}
          variant="success"
        />
        <StatCard
          title="Risk Score"
          value="Low"
          subtitle="Based on your spending patterns"
          icon={Shield}
          variant="default"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Expense Trend Chart */}
        <div className="lg:col-span-2 rounded-xl bg-card p-6 shadow-card border border-border/50">
          <h3 className="mb-6 text-lg font-semibold">Expenses Over Last 6 Months</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={expenseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="month"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `₹${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    boxShadow: "var(--shadow-md)",
                  }}
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, "Expenses"]}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Savings Goal */}
        <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
          <h3 className="mb-6 text-lg font-semibold">Savings Goal</h3>
          <div className="flex flex-col items-center justify-center">
            <ProgressRing progress={savingsGoalProgress} size={160} strokeWidth={12}>
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">{savingsGoalProgress}%</p>
                <p className="text-sm text-muted-foreground">Complete</p>
              </div>
            </ProgressRing>
            <div className="mt-6 w-full space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Target</span>
                <span className="font-medium">₹2,00,000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Saved</span>
                <span className="font-medium text-success">₹1,36,000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Remaining</span>
                <span className="font-medium">₹64,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Category Split */}
        <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
          <h3 className="mb-6 text-lg font-semibold">Expense Categories</h3>
          <div className="flex items-center gap-8">
            <div className="h-48 w-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`₹${value.toLocaleString()}`, ""]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {categoryData.map((category) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {category.name}
                    </span>
                  </div>
                  <span className="text-sm font-medium">
                    ₹{category.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Profile */}
        <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
          <h3 className="mb-6 text-lg font-semibold">Financial Health</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Risk Profile</span>
              <RiskBadge level="low" />
            </div>
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">Savings Rate</span>
                  <span className="font-medium text-success">47.6%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-success"
                    style={{ width: "47.6%" }}
                  />
                </div>
              </div>
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">Budget Adherence</span>
                  <span className="font-medium text-primary">82%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: "82%" }}
                  />
                </div>
              </div>
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">Debt Ratio</span>
                  <span className="font-medium text-warning">28%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-warning"
                    style={{ width: "28%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
