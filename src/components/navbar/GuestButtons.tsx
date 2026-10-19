// import Link from "next/link";
// import { Button } from "../ui/button";

// export const GuestButtons = () => (
//   <div className="flex items-center gap-2.5">
//     <Button variant={"outline"}>
//       <Link href="/sign-in">Login</Link>
//     </Button>
//     <Button>
//       <Link href="sign-up">Sign Up</Link>
//     </Button>
//   </div>
// );

import Link from "next/link";
import { buttonVariants } from "../ui/button";

// الرابط نفسه يأخذ شكل الزر (بدل وضع <Link> داخل <Button>)
export const GuestButtons = () => (
  <div className="flex items-center gap-2">
    <Link
      href="/sign-in"
      className={buttonVariants({ variant: "outline", size: "sm" })}
    >
      Login
    </Link>
    <Link href="/sign-up" className={buttonVariants({ size: "sm" })}>
      Sign Up
    </Link>
  </div>
);
