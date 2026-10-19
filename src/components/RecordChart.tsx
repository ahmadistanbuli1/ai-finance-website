// "use client";

// import { BarChart3 } from "lucide-react";
// import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
// import { useRecords } from "@/hooks/useRecords";
// import { ExpenseRecord } from "@/types/record.types";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "../components/ui/card";
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
//   type ChartConfig,
// } from "@/components/ui/chart";

// // 1. Chart Configuration: Defines label and color for the "price" data key
// const chartConfig = {
//   price: {
//     label: "Amount ($)",
//     color: "var(--chart-1)",
//   },
// } satisfies ChartConfig;

// // 2. Pure Helper Function: Transforms DB records into Chart-ready objects
// const formatShortDate = (dateString: string): string => {
//   return new Intl.DateTimeFormat("en-US", {
//     month: "short",
//     day: "numeric",
//     timeZone: "UTC", // Prevents timezone shift from changing the selected day
//   }).format(new Date(dateString));
// };

// const mapRecordsToChartData = (records: ExpenseRecord[]) => {
//   return records.map((record) => ({
//     id: record.id,
//     description: record.text,
//     category: record.category,
//     dateLabel: formatShortDate(record.date as string), // X-Axis value (e.g., "Oct 15")
//     price: record.price, // Y-Axis value (e.g., 45.5)
//   }));
// };

// const RecordChart = () => {
//   const { data: records, isLoading, isError } = useRecords();

//   // Guard Clause 1: Loading State
//   if (isLoading) {
//     return (
//       <Card className="col-span-1 lg:col-span-2 h-87.5 animate-pulse flex flex-col justify-between p-6">
//         <div className="space-y-2">
//           <div className="h-5 w-40 bg-zinc-200 dark:bg-zinc-800 rounded" />
//           <div className="h-3 w-60 bg-zinc-100 dark:bg-zinc-900 rounded" />
//         </div>
//         <div className="h-56 w-full bg-zinc-100 dark:bg-zinc-900 rounded-lg" />
//       </Card>
//     );
//   }

//   // Guard Clause 2: Error State
//   if (isError || !records) {
//     return (
//       <Card className="col-span-1 lg:col-span-2 p-6 text-sm text-red-500">
//         Failed to load expense chart data.
//       </Card>
//     );
//   }

//   // Guard Clause 3: Empty State (No records in DB yet)
//   if (records.length === 0) {
//     return (
//       <Card className="col-span-1 lg:col-span-2 flex flex-col items-center justify-center p-10 text-center min-h-75">
//         <BarChart3 className="w-10 h-10 text-zinc-400 mb-3 stroke-[1.5]" />
//         <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
//           No expenses recorded yet
//         </p>
//         <p className="text-xs text-zinc-500 mt-1">
//           Add your first expense record to see your spending chart.
//         </p>
//       </Card>
//     );
//   }

//   const chartData = mapRecordsToChartData(records);

//   return (
//     <Card className="col-span-1 lg:col-span-2 shadow-2xs border-zinc-200/80 dark:border-zinc-800/80">
//       <CardHeader>
//         <CardTitle className="text-base font-semibold">
//           Expense History
//         </CardTitle>
//         <CardDescription className="text-xs">
//           Showing spending amount per record by date
//         </CardDescription>
//       </CardHeader>

//       <CardContent>
//         <ChartContainer config={chartConfig} className="min-h-60 w-full">
//           <BarChart accessibilityLayer data={chartData}>
//             <CartesianGrid vertical={false} strokeDasharray="3 3" />

//             {/* X-Axis: Displays Day & Month (e.g., "Oct 15") */}
//             <XAxis
//               dataKey="dateLabel"
//               tickLine={false}
//               tickMargin={10}
//               axisLine={false}
//             />

//             {/* Y-Axis: Displays Dollar Amounts */}
//             <YAxis
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               tickFormatter={(value) => `$${value}`}
//             />

//             {/* Tooltip: Appears when hovering over a bar */}
//             <ChartTooltip
//               cursor={false}
//               content={
//                 <ChartTooltipContent
//                   labelFormatter={(_, payload) => {
//                     const item = payload?.[0]?.payload;
//                     return item
//                       ? `${item.description} (${item.dateLabel})`
//                       : "";
//                   }}
//                 />
//               }
//             />

//             {/* The Bars: Height is determined by dataKey="price" */}
//             <Bar
//               dataKey="price"
//               fill="var(--color-price)"
//               radius={[6, 6, 0, 0]}
//               maxBarSize={48}
//             />
//           </BarChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   );
// };

// export default RecordChart;

"use client";

import { BarChart3 } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useRecords } from "@/hooks/useRecords";
import { ExpenseRecord } from "@/types/record.types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

// 1. إعدادات المخطط: اسم ولون العمود "price"
const chartConfig = {
  price: {
    label: "Amount ($)",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

// 2. دالة نقية لتنسيق التاريخ القصير، مثال: "2026-10-15" -> "Oct 15"
const formatShortDate = (dateString: string): string => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC", // يمنع تغيّر اليوم بسبب فرق التوقيت
  }).format(new Date(dateString));
};

// 3. تحويل السجلات إلى بيانات للمخطط، مرتبة من الأقدم إلى الأحدث
const mapRecordsToChartData = (records: ExpenseRecord[]) => {
  return [...records] // نسخة، حتى لا نغيّر المصفوفة الأصلية
    .sort(
      (a, b) =>
        new Date(a.date as string).getTime() -
        new Date(b.date as string).getTime(),
    )
    .map((record) => ({
      id: record.id,
      description: record.text,
      category: record.category,
      dateLabel: formatShortDate(record.date as string), // قيمة المحور X
      price: record.price, // قيمة المحور Y
    }));
};

const RecordChart = () => {
  const { data: records, isLoading, isError } = useRecords();

  // Guard Clause 1: حالة التحميل
  if (isLoading) {
    return (
      <Card className="h-87.5 animate-pulse flex flex-col justify-between p-6">
        <div className="space-y-2">
          <div className="h-5 w-40 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-3 w-60 bg-zinc-100 dark:bg-zinc-900 rounded" />
        </div>
        <div className="h-56 w-full bg-zinc-100 dark:bg-zinc-900 rounded-lg" />
      </Card>
    );
  }

  // Guard Clause 2: حالة الخطأ
  if (isError || !records) {
    return (
      <Card className="p-6 text-sm text-red-500">
        Failed to load expense chart data.
      </Card>
    );
  }

  // Guard Clause 3: لا توجد سجلات بعد
  if (records.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-10 text-center min-h-75">
        <BarChart3 className="w-10 h-10 text-zinc-400 mb-3 stroke-[1.5]" />
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          No expenses recorded yet
        </p>
        <p className="text-xs text-zinc-500 mt-1">
          Add your first expense record to see your spending chart.
        </p>
      </Card>
    );
  }

  const chartData = mapRecordsToChartData(records);

  return (
    <Card className="shadow-2xs border-zinc-200/80 dark:border-zinc-800/80">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Expense History
        </CardTitle>
        <CardDescription className="text-xs">
          Showing spending amount per record by date
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-60 w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />

            {/* المحور X: اليوم والشهر، مثال "Oct 15" */}
            <XAxis
              dataKey="dateLabel"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />

            {/* المحور Y: المبالغ بالدولار */}
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `$${value}`}
            />

            {/* التلميح: يظهر عند تمرير الماوس على العمود */}
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(_, payload) => {
                    const item = payload?.[0]?.payload;
                    return item
                      ? `${item.description} (${item.dateLabel})`
                      : "";
                  }}
                />
              }
            />

            {/* الأعمدة: الارتفاع يحدده dataKey="price" */}
            <Bar
              dataKey="price"
              fill="var(--color-price)"
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default RecordChart;
