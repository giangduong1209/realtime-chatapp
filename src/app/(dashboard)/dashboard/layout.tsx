import { Icon, Icons } from "@/components/Icons";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

interface SidebarOptions {
  id: number;
  name: string;
  href: string;
  Icon: Icon;
}

const sideOptions: SidebarOptions[] = [
  {
    id: 0,
    name: "Add friend",
    href: "/dashboard/add",
    Icon: "UserPlus",
  },
];

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  return (
    <div className="w-full flex h-screen">
      <div className="flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto border-r border-text-500 bg-white px-6">
        <Link href="/dashboard" className="flex h-16 shrink-0 items-center">
          <Icons.Logo className="h-8 w-auto text-indigo-600" />
        </Link>
        <div className="text-xs font-semibold leading-6 text-gray-400">
          Your chats
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>chat that this user</li>
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400">
                Overview
              </div>
              <ul role="list" className="mt-2 space-y-1">
                {sideOptions.map((sideOption) => {
                  const Icon = Icons[sideOption.Icon];
                  return (
                    <li key={sideOption.id}>
                      <Link
                        href={sideOption.href}
                        className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 flex items-center gap-3 rounded-md py-2 text-sm leading-3 font-semibold"
                      >
                        <span className="text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 justify-center items-center rounded-lg border text-[0.625rem] font-medium bg-white">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="truncate">{sideOption.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      {children}
    </div>
  );
};

export default Layout;
