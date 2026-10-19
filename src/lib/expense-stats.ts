import { ExpenseRecord } from "@/types/record.types";

export interface ExpenseSummary {
  totalSpent: number;
  recordsCount: number;
  averageSpent: number;
  highestRecord: ExpenseRecord;
  lowestRecord: ExpenseRecord;
  topCategory: {
    name: string;
    amount: number;
    percentage: number;
  };
}

export const calculateExpenseStats = (
  records: ExpenseRecord[],
): ExpenseSummary | null => {
  // Guard Clause: Prevent NaN and Infinity when array is empty
  if (!records || records.length === 0) {
    return null;
  }

  let totalSpent = 0;
  let highestRecord = records[0];
  let lowestRecord = records[0];
  const categoryTotals: Record<string, number> = {};

  // Single-pass loop O(n) for maximum performance
  for (const record of records) {
    totalSpent += record.price;

    if (record.price > highestRecord.price) {
      highestRecord = record;
    }

    if (record.price < lowestRecord.price) {
      lowestRecord = record;
    }

    categoryTotals[record.category] =
      (categoryTotals[record.category] || 0) + record.price;
  }

  // Find the category with the highest total spending
  let topCategoryName = "Other";
  let topCategoryAmount = 0;

  for (const [category, amount] of Object.entries(categoryTotals)) {
    if (amount > topCategoryAmount) {
      topCategoryName = category;
      topCategoryAmount = amount;
    }
  }

  const averageSpent = totalSpent / records.length;
  const topCategoryPercentage =
    totalSpent > 0 ? Math.round((topCategoryAmount / totalSpent) * 100) : 0;

  return {
    totalSpent,
    recordsCount: records.length,
    averageSpent,
    highestRecord,
    lowestRecord,
    topCategory: {
      name: topCategoryName,
      amount: topCategoryAmount,
      percentage: topCategoryPercentage,
    },
  };
};

// Helper for clean currency formatting (e.g., "$1,250.50")
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
