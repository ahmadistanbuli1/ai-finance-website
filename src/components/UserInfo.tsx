// "use client";

// import Image from "next/image";
// import { Calendar, Mail, ShieldCheck } from "lucide-react";
// import { useSyncUser } from "@/hooks/useSyncUser";

// // دالة مساعدة نقية (Pure Function) لتنسيق التاريخ خارج المكون
// const formatJoinDate = (dateString?: string | Date | null): string => {
//   if (!dateString) return "Not available";
//   return new Intl.DateTimeFormat("en-US", {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//   }).format(new Date(dateString));
// };

// const UserInfo = () => {
//   const { clerkUser, dbUser, isLoaded, isSyncing } = useSyncUser();

//   // 1. Guard Clause: حالة التحميل الأولية (Skeleton هادئ)
//   if (!isLoaded) {
//     return (
//       <div className="h-52 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 animate-pulse flex flex-col justify-between">
//         <div className="flex items-center gap-3.5">
//           <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-800" />
//           <div className="space-y-2">
//             <div className="h-4 w-28 bg-zinc-200 dark:bg-zinc-800 rounded" />
//             <div className="h-3 w-40 bg-zinc-100 dark:bg-zinc-900 rounded" />
//           </div>
//         </div>
//         <div className="h-12 w-full bg-zinc-100 dark:bg-zinc-900 rounded-lg" />
//       </div>
//     );
//   }

//   // 2. Guard Clause: في حال لم يكن هناك مستخدم مسجل
//   if (!clerkUser) {
//     return (
//       <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 text-sm text-zinc-500">
//         Please log in to view account details.
//       </div>
//     );
//   }

//   // 3. تجهيز البيانات النظيفة للعرض
//   const displayName = clerkUser.fullName || clerkUser.firstName || "User";
//   const email =
//     clerkUser.primaryEmailAddress?.emailAddress || "There is no mail";
//   const joinDate = formatJoinDate(dbUser?.createdAt || clerkUser.createdAt);

//   return (
//     <section className="h-full rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-5 shadow-2xs flex flex-col justify-between gap-6">
//       {/* القسم العلوي: الصورة والاسم وحالة التوثيق */}
//       <div className="flex items-start justify-between gap-3">
//         <div className="flex items-center gap-3.5">
//           <Image
//             src={clerkUser.imageUrl}
//             alt={displayName}
//             width={48}
//             height={48}
//             className="w-12 h-12 rounded-full object-cover border border-zinc-200 dark:border-zinc-800"
//           />
//           <div>
//             <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 leading-snug">
//               {displayName}
//             </h2>
//             <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 mt-1">
//               <Mail className="w-3.5 h-3.5 shrink-0" />
//               <span className="truncate max-w-42.5">{email}</span>
//             </p>
//           </div>
//         </div>

//         {/* مؤشر حالة قاعدة البيانات */}
//         <span
//           className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border ${
//             isSyncing
//               ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
//               : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
//           }`}
//         >
//           <ShieldCheck className="w-3 h-3" />
//           {isSyncing ? "synchronization" : "active"}
//         </span>
//       </div>

//       {/* القسم السفلي: البيانات الوصفية (Metadata) */}
//       <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
//         <span className="flex items-center gap-1.5">
//           <Calendar className="w-3.5 h-3.5" />
//           Joining date
//         </span>
//         <time className="font-mono text-zinc-700 dark:text-zinc-300 font-medium">
//           {joinDate}
//         </time>
//       </div>
//     </section>
//   );
// };

// export default UserInfo;

"use client";

import Image from "next/image";
import { Calendar, Loader2, Mail, ShieldCheck } from "lucide-react";
import { useSyncUser } from "@/hooks/useSyncUser";

// دالة مساعدة نقية (Pure Function) لتنسيق التاريخ خارج المكون
const formatJoinDate = (dateString?: string | Date | null): string => {
  if (!dateString) return "Not available";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(dateString));
};

const UserInfo = () => {
  const { clerkUser, dbUser, isLoaded, isSyncing } = useSyncUser();

  // 1. Guard Clause: حالة التحميل الأولية (Skeleton هادئ)
  if (!isLoaded) {
    return (
      <div className="h-52 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 animate-pulse flex flex-col justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="space-y-2">
            <div className="h-4 w-28 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-3 w-40 bg-zinc-100 dark:bg-zinc-900 rounded" />
          </div>
        </div>
        <div className="h-12 w-full bg-zinc-100 dark:bg-zinc-900 rounded-lg" />
      </div>
    );
  }

  // 2. Guard Clause: في حال لم يكن هناك مستخدم مسجل
  if (!clerkUser) {
    return (
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 text-sm text-zinc-500">
        Please log in to view account details.
      </div>
    );
  }

  // 3. تجهيز البيانات النظيفة للعرض
  const displayName = clerkUser.fullName || clerkUser.firstName || "User";
  const email = clerkUser.primaryEmailAddress?.emailAddress || "No email";
  const joinDate = formatJoinDate(dbUser?.createdAt || clerkUser.createdAt);

  return (
    <section className="h-full rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-5 shadow-2xs flex flex-col justify-between gap-6">
      {/* القسم العلوي: الصورة والاسم وحالة الحساب */}
      <div className="flex items-start justify-between gap-3">
        {/* min-w-0 يسمح للإيميل الطويل بالاختصار (...) بدل كسر التصميم */}
        <div className="flex min-w-0 items-center gap-3.5">
          <Image
            src={clerkUser.imageUrl}
            alt={displayName}
            width={48}
            height={48}
            className="w-12 h-12 shrink-0 rounded-full object-cover border border-zinc-200 dark:border-zinc-800"
          />
          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold text-zinc-900 dark:text-zinc-100 leading-snug">
              {displayName}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 mt-1">
              <Mail className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{email}</span>
            </p>
          </div>
        </div>

        {/* مؤشر حالة الحساب */}
        <span
          title={
            isSyncing ? "Saving your account data..." : "Your account is ready"
          }
          className={`inline-flex shrink-0 items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border ${
            isSyncing
              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
              : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
          }`}
        >
          {isSyncing ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <ShieldCheck className="w-3 h-3" />
          )}
          {isSyncing ? "Syncing" : "Active"}
        </span>
      </div>

      {/* القسم السفلي: البيانات الوصفية (Metadata) */}
      <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
        <span className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          Member since
        </span>
        <time className="font-mono text-zinc-700 dark:text-zinc-300 font-medium">
          {joinDate}
        </time>
      </div>
    </section>
  );
};

export default UserInfo;
