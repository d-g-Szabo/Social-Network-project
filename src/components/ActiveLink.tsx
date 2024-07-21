"use client";
// This is a custom component that will be used to create a link that will be active when the user is on that page

import Link from "next/link";
import { usePathname } from "next/navigation";

// children is a prop that is passed to the component that will be rendered inside the component
export function ActiveLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  // the usePathname hook to get the current pathname
  const pathname = usePathname();
  // compare the current pathname with the href prop to see if the link is active
  const isActive = pathname === href;

  return (
    // add a class to the link if it is active to change the color
    <Link href={href} className={isActive ? "text-orange-400" : ""}>
      {/* // pass the children prop to the link to render the text inside the link tag */}
      {children}
    </Link>
  );
}
