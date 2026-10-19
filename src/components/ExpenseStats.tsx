"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  Calculator,
  Layers,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { useRecords } from "@/hooks/useRecords";
import { calculateExpenseStats, formatCurrency } from "@/lib/expense-stats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// بطاقة رقم واحدة (الأربع بطاقات كانت تكرر نفس الشكل، فجمعناها هنا)
interface StatTileProps {
  label: string;
  value: string;
  caption: string;
  icon: LucideIcon;
  iconClassName: string;
  valueClassName?: string;
}

const StatTile = ({
  label,
  value,
  caption,
  icon: Icon,
  iconClassName,
  valueClassName = "text-zinc-900 dark:text-zinc-100",
}: StatTileProps) => (
  <div className="p-3.5 rounded-lg border border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50/50 dark:bg-zinc-900/30">
    <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
      <span>{label}</span>
      <Icon className={`w-3.5 h-3.5 ${iconClassName}`} />
    </div>
    <p className={`text-lg font-bold font-mono ${valueClassName}`}>{value}</p>
    <p className="text-[11px] text-zinc-500 mt-0.5 truncate">{caption}</p>
  </div>
);

const ExpenseStats = () => {
  const { data: records, isLoading, isError } = useRecords();

  // Guard Clause 1: حالة التحميل
  if (isLoading) {
    return (
      <Card className="h-87.5 animate-pulse p-6 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="h-5 w-36 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-3 w-52 bg-zinc-100 dark:bg-zinc-900 rounded" />
        </div>
        <div className="grid grid-cols-2 gap-4 my-4">
          <div className="h-20 bg-zinc-100 dark:bg-zinc-900 rounded-lg" />
          <div className="h-20 bg-zinc-100 dark:bg-zinc-900 rounded-lg" />
          <div className="h-20 bg-zinc-100 dark:bg-zinc-900 rounded-lg" />
          <div className="h-20 bg-zinc-100 dark:bg-zinc-900 rounded-lg" />
        </div>
      </Card>
    );
  }

  // Guard Clause 2: حالة الخطأ
  if (isError || !records) {
    return (
      <Card className="p-6 text-sm text-red-500">
        Failed to load expense statistics.
      </Card>
    );
  }

  const stats = calculateExpenseStats(records);

  // Guard Clause 3: لا توجد سجلات بعد
  if (!stats) {
    return (
      <Card className="flex flex-col items-center justify-center p-10 text-center min-h-75">
        <Calculator className="w-10 h-10 text-zinc-400 mb-3 stroke-[1.5]" />
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          No statistics available
        </p>
        <p className="text-xs text-zinc-500 mt-1">
          Your spending insights will appear here once you add records.
        </p>
      </Card>
    );
  }

  return (
    <Card className="shadow-2xs border-zinc-200/80 dark:border-zinc-800/80 flex flex-col justify-between">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">
              Expense Statistics
            </CardTitle>
            <CardDescription className="text-xs">
              Financial overview across {stats.recordsCount}{" "}
              {stats.recordsCount === 1 ? "record" : "records"}
            </CardDescription>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-800">
            USD ($)
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* شبكة الأرقام 2x2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <StatTile
            label="Total Spent"
            value={formatCurrency(stats.totalSpent)}
            caption="Cumulative outflow"
            icon={Wallet}
            iconClassName="text-indigo-500"
          />
          <StatTile
            label="Average / Record"
            value={formatCurrency(stats.averageSpent)}
            caption="Mean transaction size"
            icon={Calculator}
            iconClassName="text-violet-500"
          />
          <StatTile
            label="Highest Expense"
            value={formatCurrency(stats.highestRecord.price)}
            caption={`${stats.highestRecord.text} (${stats.highestRecord.category})`}
            icon={ArrowUpRight}
            iconClassName="text-rose-500"
            valueClassName="text-rose-600 dark:text-rose-400"
          />
          <StatTile
            label="Lowest Expense"
            value={formatCurrency(stats.lowestRecord.price)}
            caption={`${stats.lowestRecord.text} (${stats.lowestRecord.category})`}
            icon={ArrowDownRight}
            iconClassName="text-emerald-500"
            valueClassName="text-emerald-600 dark:text-emerald-400"
          />
        </div>

        {/* أكثر تصنيف إنفاقًا مع شريط النسبة */}
        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-900">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-zinc-500 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-sky-500" />
              Top Category:{" "}
              <strong className="text-zinc-800 dark:text-zinc-200">
                {stats.topCategory.name}
              </strong>
            </span>
            <span className="font-mono text-zinc-700 dark:text-zinc-300 font-medium">
              {formatCurrency(stats.topCategory.amount)} (
              {stats.topCategory.percentage}%)
            </span>
          </div>
          <div
            role="progressbar"
            aria-label="Top category share of total spending"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Number(stats.topCategory.percentage)}
            className="w-full h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden"
          >
            <div
              className="h-full bg-sky-600 dark:bg-sky-500 rounded-full transition-all duration-500"
              style={{ width: `${stats.topCategory.percentage}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseStats;
