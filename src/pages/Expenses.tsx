import { useState } from "react";
import { Search, Filter, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryBadge, CategoryType } from "@/components/ui/category-badge";

interface Transaction {
  id: number;
  date: string;
  description: string;
  category: CategoryType;
  amount: number;
}

const transactions: Transaction[] = [
  { id: 1, date: "2024-12-23", description: "Swiggy Order", category: "food", amount: 450 },
  { id: 2, date: "2024-12-22", description: "Uber Ride", category: "travel", amount: 280 },
  { id: 3, date: "2024-12-22", description: "Netflix Subscription", category: "entertainment", amount: 649 },
  { id: 4, date: "2024-12-21", description: "Electricity Bill", category: "utilities", amount: 2100 },
  { id: 5, date: "2024-12-20", description: "Home Loan EMI", category: "emi", amount: 15000 },
  { id: 6, date: "2024-12-19", description: "Zomato Order", category: "food", amount: 580 },
  { id: 7, date: "2024-12-18", description: "Amazon Purchase", category: "shopping", amount: 2499 },
  { id: 8, date: "2024-12-17", description: "Doctor Visit", category: "health", amount: 800 },
  { id: 9, date: "2024-12-16", description: "Metro Card Recharge", category: "travel", amount: 500 },
  { id: 10, date: "2024-12-15", description: "Grocery - BigBasket", category: "food", amount: 3200 },
  { id: 11, date: "2024-12-14", description: "Phone Bill", category: "utilities", amount: 599 },
  { id: 12, date: "2024-12-13", description: "Movie Tickets", category: "entertainment", amount: 800 },
];

export default function Expenses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = t.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || t.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalExpenses = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Expenses</h1>
          <p className="text-muted-foreground">
            Track and manage your transactions
          </p>
        </div>
        <div className="rounded-xl bg-card px-6 py-4 shadow-card border border-border/50">
          <p className="text-sm text-muted-foreground">Monthly Total</p>
          <p className="text-2xl font-bold text-danger">
            ₹{totalExpenses.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-40">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="food">Food</SelectItem>
            <SelectItem value="travel">Travel</SelectItem>
            <SelectItem value="emi">EMI</SelectItem>
            <SelectItem value="utilities">Utilities</SelectItem>
            <SelectItem value="entertainment">Entertainment</SelectItem>
            <SelectItem value="shopping">Shopping</SelectItem>
            <SelectItem value="health">Health</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Date Range
        </Button>
      </div>

      {/* Transactions Table */}
      <div className="rounded-xl bg-card shadow-card border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Category
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredTransactions.map((transaction, index) => (
                <tr
                  key={transaction.id}
                  className="transition-colors hover:bg-muted/30 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4">
                    <CategoryBadge category={transaction.category} />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-semibold text-danger">
                    -₹{transaction.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredTransactions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No transactions found</p>
        </div>
      )}
    </div>
  );
}
