// "use client";

// import { UserButton } from "@clerk/nextjs";
// import { List, Plus } from "lucide-react";

// interface UserBadgeProps {
//   name: string;
//   email?: string;
//   isSyncing: boolean;
//   isError: boolean;
// }

// export const UserBadge = ({
//   name,
//   email,
//   isSyncing,
//   isError,
// }: UserBadgeProps) => {
//   const statusColor = isSyncing
//     ? "bg-amber-400 animate-ping"
//     : isError
//       ? "bg-red-500"
//       : "bg-emerald-500";

//   return (
//     <div className="flex items-center gap-3 pl-3 pr-1.5 py-1 bg-slate-100/80 dark:bg-black border rounded-xl border-slate-200/30">
//       <div className="hidden sm:flex flex-col text-right">
//         <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
//           {name}
//           <span className={`w-1.5 h-1.5 rounded-full ${statusColor}`} />
//         </span>
//         {email && <span className="text-[10px] text-slate-500">{email}</span>}
//       </div>

//       <UserButton>
//         <UserButton.MenuItems>
//           <UserButton.Link
//             label="Add Record"
//             href="/add-record"
//             labelIcon={<Plus className="w-4 h-4" />}
//           />
//           <UserButton.Link
//             label="Records"
//             href="/records"
//             labelIcon={<List className="w-4 h-4" />}
//           />
//         </UserButton.MenuItems>
//       </UserButton>
//     </div>
//   );
// };

"use client";

import { UserButton } from "@clerk/nextjs";
import { List, Plus } from "lucide-react";

interface UserBadgeProps {
  name: string;
  email?: string;
  isSyncing: boolean;
  isError: boolean;
}

// دالة نقية: تحدد لون النقطة ونصها حسب الحالة (بدل الشرط المتداخل)
const getStatus = (isSyncing: boolean, isError: boolean) => {
  if (isSyncing) {
    return { dot: "bg-amber-400", label: "Syncing your account", pulse: true };
  }
  if (isError) {
    return { dot: "bg-red-500", label: "Sync failed", pulse: false };
  }
  return { dot: "bg-emerald-500", label: "Account synced", pulse: false };
};

export const UserBadge = ({
  name,
  email,
  isSyncing,
  isError,
}: UserBadgeProps) => {
  const status = getStatus(isSyncing, isError);

  return (
    // على الجوال يختفي الاسم، فنقلل الحشوة. من sm وما فوق نعيدها
    <div className="flex items-center gap-3 rounded-xl border border-slate-200/30 bg-slate-100/80 p-1 dark:bg-white/5 sm:pl-3 sm:pr-1.5">
      <div className="hidden flex-col text-right leading-tight sm:flex">
        <span className="flex items-center justify-end gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-100">
          <span className="max-w-44 truncate">{name}</span>

          {/* نقطة الحالة: حلقة تنبض خلف نقطة ثابتة أثناء المزامنة */}
          <span title={status.label} className="relative flex h-2 w-2">
            {status.pulse && (
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${status.dot}`}
              />
            )}
            <span
              className={`relative inline-flex h-2 w-2 rounded-full ${status.dot}`}
            />
            <span className="sr-only">{status.label}</span>
          </span>
        </span>

        {email && (
          <span className="max-w-44 truncate text-[10px] text-slate-500">
            {email}
          </span>
        )}
      </div>

      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Link
            label="Add Record"
            href="/add-record"
            labelIcon={<Plus className="h-4 w-4" />}
          />
          <UserButton.Link
            label="Records"
            href="/records"
            labelIcon={<List className="h-4 w-4" />}
          />
        </UserButton.MenuItems>
      </UserButton>
    </div>
  );
};
