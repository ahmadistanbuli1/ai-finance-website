import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-black">
        <SignIn />
      </div>
    </Suspense>
  );
}
