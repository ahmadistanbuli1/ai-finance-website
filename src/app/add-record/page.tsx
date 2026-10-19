// // src/app/add-record/page.tsx
// import AddNewRecord from "@/components/AddNewRecord";
// import ExpenseStats from "@/components/ExpenseStats";
// import RecordChart from "@/components/RecordChart";
// import UserInfo from "@/components/UserInfo";

// const Page = () => {
//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
//       {/* Row 1: UserInfo takes 1 col, AddNewRecord takes 2 cols */}
//       <div className="col-span-1">
//         <UserInfo />
//       </div>
//       <AddNewRecord />

//       {/* Row 2: Chart & Stats side by side */}
//       <div className="col-span-1 lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <RecordChart />
//         <ExpenseStats />
//       </div>
//     </div>
//   );
// };

// export default Page;

// src/app/add-record/page.tsx
import AddNewRecord from "@/components/AddNewRecord";
import ExpenseStats from "@/components/ExpenseStats";
import RecordChart from "@/components/RecordChart";
import UserInfo from "@/components/UserInfo";
import { Suspense } from "react";

const Page = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* عنوان الصفحة */}
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Expense Tracker
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Add your expenses, then follow your spending with charts and
          statistics.
        </p>
      </header>

      {/* الصف 1: المستخدم (عمود واحد) + نموذج الإضافة (عمودان).
          على الجوال يظهر النموذج أولاً لأنه الهدف الرئيسي للصفحة */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="order-2 lg:order-1 lg:col-span-1">
          <UserInfo />
        </div>
        <div className="order-1 lg:order-2 lg:col-span-2">
          <Suspense
            fallback={
              <div className="col-span-1 lg:col-span-2 p-6 animate-pulse bg-zinc-100 rounded-xl" />
            }
          >
            <AddNewRecord />
          </Suspense>
        </div>
      </div>

      {/* الصف 2: المخطط والإحصائيات، كل واحد بنصف العرض */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecordChart />
        <ExpenseStats />
      </div>
    </div>
  );
};

export default Page;
