// "use client";

// import { useRecords } from "@/hooks/useRecords";
// import { formatCurrency } from "@/lib/expense-stats";
// import { ButtonActions } from "@/components/ButtonActions";
// import { FileText } from "lucide-react";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Card } from "@/components/ui/card";

// const RecordsPage = () => {
//   const { data: records, isLoading, isError } = useRecords();

//   if (isLoading) {
//     return (
//       <div className="max-w-6xl mx-auto px-4 py-10">
//         <div className="h-10 w-48 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse mb-6" />
//         <Card className="h-[400px] p-6 animate-pulse bg-zinc-50 dark:bg-zinc-900/50" />
//       </div>
//     );
//   }

//   if (isError || !records) {
//     return (
//       <div className="p-10 text-center text-red-500">
//         Failed to load records.
//       </div>
//     );
//   }

//   return (
//     <div className="w-[90%] mx-auto px-4 py-10">
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
//           Transaction History
//         </h1>
//         <p className="text-sm text-zinc-500 mt-1">
//           Review and manage all your past income and expenses.
//         </p>
//       </div>

//       <Card className="overflow-hidden shadow-2xs border-zinc-200/80 dark:border-zinc-800/80">
//         {records.length === 0 ? (
//           <div className="flex flex-col items-center justify-center p-16 text-center">
//             <FileText className="w-12 h-12 text-zinc-300 mb-4 stroke-[1.5]" />
//             <p className="text-zinc-700 dark:text-zinc-300 font-medium">
//               No records found
//             </p>
//             <p className="text-zinc-500 text-sm mt-1">
//               You havent added any transactions yet.
//             </p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <Table>
//               <TableHeader className="bg-zinc-50/50 dark:bg-zinc-900/50">
//                 <TableRow>
//                   <TableHead>Date</TableHead>
//                   <TableHead>Description</TableHead>
//                   <TableHead>Category</TableHead>
//                   <TableHead className="text-right">Amount</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {records.map((record) => (
//                   <TableRow
//                     key={record.id}
//                     className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50"
//                   >
//                     <TableCell className="font-mono text-xs text-zinc-500">
//                       {new Date(record.date).toISOString().split("T")[0]}
//                     </TableCell>
//                     <TableCell className="font-medium text-zinc-900 dark:text-zinc-100">
//                       {record.text}
//                     </TableCell>
//                     <TableCell>
//                       <span className="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
//                         {record.category}
//                       </span>
//                     </TableCell>
//                     <TableCell className="text-right font-mono font-medium">
//                       {formatCurrency(record.price)}
//                     </TableCell>
//                     <TableCell>
//                       {/* المكون المعزول للتحكم بحالة الحذف لكل سطر بمفرده */}
//                       <ButtonActions record={record} />
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         )}
//       </Card>
//     </div>
//   );
// };

// export default RecordsPage;

"use client";

"use client";

import Link from "next/link";
import { FileText, Plus } from "lucide-react";
import { useRecords } from "@/hooks/useRecords";
import { calculateExpenseStats, formatCurrency } from "@/lib/expense-stats";
import { ExpenseRecord } from "@/types/record.types";
import { ButtonActions } from "@/components/ButtonActions";

import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// دالة نقية: "2026-10-15" -> "Oct 15, 2026"
const formatRecordDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC", // يمنع تغيّر اليوم بسبب فرق التوقيت
  }).format(new Date(date));
};

// الأحدث أولاً. نعمل نسخة [...records] حتى لا نغيّر المصفوفة الأصلية
const sortNewestFirst = (records: ExpenseRecord[]): ExpenseRecord[] => {
  return [...records].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
};

const RecordsSkeleton = () => (
  <Card className="animate-pulse space-y-3 p-6">
    {Array.from({ length: 5 }).map((_, index) => (
      <div
        key={index}
        className="h-10 rounded-lg bg-zinc-100 dark:bg-zinc-900"
      />
    ))}
  </Card>
);

const RecordsPage = () => {
  const { data: records, isLoading, isError } = useRecords();

  // نعرض المحتوى حسب الحالة، والعنوان يبقى ثابتًا فلا يقفز التصميم
  const renderContent = () => {
    if (isLoading) return <RecordsSkeleton />;

    if (isError || !records) {
      return (
        <Card className="p-10 text-center text-sm text-red-500">
          Failed to load records.
        </Card>
      );
    }

    const stats = calculateExpenseStats(records);

    // stats تكون null عندما لا توجد سجلات
    if (!stats) {
      return (
        <Card className="flex flex-col items-center justify-center p-16 text-center">
          <FileText className="mb-4 h-12 w-12 stroke-[1.5] text-zinc-300" />
          <p className="font-medium text-zinc-700 dark:text-zinc-300">
            No records found
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            You haven&apos;t added any transactions yet.
          </p>
        </Card>
      );
    }

    return (
      <Card className="overflow-hidden border-zinc-200/80 shadow-2xs dark:border-zinc-800/80">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-zinc-50/50 dark:bg-zinc-900/50">
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {sortNewestFirst(records).map((record) => (
                <TableRow
                  key={record.id}
                  className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50"
                >
                  <TableCell className="whitespace-nowrap font-mono text-xs text-zinc-500">
                    {formatRecordDate(record.date)}
                  </TableCell>
                  <TableCell className="font-medium text-zinc-900 dark:text-zinc-100">
                    {/* الوصف الطويل يُختصر، ويظهر كاملًا عند تمرير الماوس */}
                    <span
                      className="block max-w-56 truncate"
                      title={record.text}
                    >
                      {record.text}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-md bg-zinc-100 px-2 py-1 text-[11px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                      {record.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-mono font-medium">
                    {formatCurrency(record.price)}
                  </TableCell>
                  <TableCell>
                    {/* المكون المعزول للتحكم بحالة الحذف لكل سطر بمفرده */}
                    <div className="flex justify-end">
                      <ButtonActions record={record} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            {/* صف المجموع */}
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3} className="text-xs text-zinc-500">
                  Total · {stats.recordsCount}{" "}
                  {stats.recordsCount === 1 ? "record" : "records"}
                </TableCell>
                <TableCell className="text-right font-mono font-semibold">
                  {formatCurrency(stats.totalSpent)}
                </TableCell>
                <TableCell />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Card>
    );
  };

  return (
    <div className="mx-auto w-[90%] space-y-8 py-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Transaction History
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Review and manage all your past expenses.
          </p>
        </div>

        <Link href="/add-record" className={buttonVariants({ size: "sm" })}>
          <Plus className="h-4 w-4" />
          Add Record
        </Link>
      </header>

      {renderContent()}
    </div>
  );
};

export default RecordsPage;
