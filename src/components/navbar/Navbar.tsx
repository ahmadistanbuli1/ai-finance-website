// "use client";

// import Link from "next/link";
// import { useSyncUser } from "@/hooks/useSyncUser";
// import { UserBadge } from "./UserBadge";
// import { GuestButtons } from "./GuestButtons";
// import ModeToggle from "../ModeToggle";
// import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";

// export const Navbar = () => {
//   const { clerkUser, isLoaded, isSignedIn, isSyncing, isError } = useSyncUser();

//   const renderAuthSection = () => {
//     if (!isLoaded) {
//       return (
//         <div className="h-9 w-28 bg-slate-200 animate-pulse rounded-full" />
//       );
//     }

//     if (isSignedIn && clerkUser) {
//       return (
//         <UserBadge
//           name={clerkUser.fullName || clerkUser.firstName || "المستخدم"}
//           email={clerkUser.primaryEmailAddress?.emailAddress}
//           isSyncing={isSyncing}
//           isError={isError}
//         />
//       );
//     }

//     return <GuestButtons />;
//   };

//   return (
//     <header className="sticky top-5 z-50 w-[90%] mt-5 mx-auto  bg-white/70 border-gray-300 dark:bg-black/70 border rounded-xl dark:border-slate-200/30 backdrop-blur-md">
//       <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
//         <Link href="/" className="font-bold text-xl text-sky-600">
//           AI Finance
//         </Link>

//         {/* جمع أدوات المستخدم والمظهر في جهة واحدة */}
//         <div className="flex items-center gap-3">
//           <AnimatedThemeToggler />
//           {renderAuthSection()}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useSyncUser } from "@/hooks/useSyncUser";
import { UserBadge } from "./UserBadge";
import { GuestButtons } from "./GuestButtons";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";

export const Navbar = () => {
  const { clerkUser, isLoaded, isSignedIn, isSyncing, isError } = useSyncUser();

  const renderAuthSection = () => {
    if (!isLoaded) {
      return (
        <div className="h-9 w-28 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
      );
    }

    if (isSignedIn && clerkUser) {
      return (
        <UserBadge
          name={clerkUser.fullName || clerkUser.firstName || "User"}
          email={clerkUser.primaryEmailAddress?.emailAddress}
          isSyncing={isSyncing}
          isError={isError}
        />
      );
    }

    return <GuestButtons />;
  };

  return (
    // الخلفية الزجاجية: bg-white/70 + backdrop-blur-md (بقيت كما هي)
    <header className="sticky top-5 z-50 mx-auto mt-5 w-[90%] rounded-xl border border-gray-300 bg-white/70 shadow-sm shadow-black/5 backdrop-blur-md dark:border-slate-200/30 dark:bg-black/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md text-xl font-bold tracking-tight text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/60"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-sky-600 text-white">
            <Sparkles className="h-4 w-4" />
          </span>
          AI Finance
        </Link>

        {/* جمع أدوات المستخدم والمظهر في جهة واحدة */}
        <div className="flex items-center gap-3">
          <AnimatedThemeToggler />
          {renderAuthSection()}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
