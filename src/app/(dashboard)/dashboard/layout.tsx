import { Icon, Icons } from "@/components/Icons";
import { authOptions } from "@/lib/auth";
import { User, getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import SignOutButton from "@/components/SignOutButton";
import FriendRequestSideBarOptions from "@/components/FriendRequestSideBarOptions";
import { fetchRedis } from "@/app/helpers/redis";

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

  const unseenRequestCount = (
    (await fetchRedis(
      "smembers",
      `user:${session.user.id}:incoming_friend_requests`
    )) as User[]
  ).length;

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
                        className="text-gray-700 group hover:text-indigo-600 hover:bg-gray-50 flex items-center gap-3 rounded-md py-2 text-sm leading-3 font-semibold"
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
            <li>
              <FriendRequestSideBarOptions
                sessionId={session.user.id}
                initialUnseenRequestCount={unseenRequestCount}
              />
            </li>
            <li className="-mx-6 mt-auto flex items-center">
              <div className="flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
                <div className="relative h-8 w-8 bg-gray-50">
                  <Image
                    fill
                    referrerPolicy="no-referrer"
                    className="rounded-full"
                    src={session.user.image || ""}
                    alt="Your profile picture"
                  />
                </div>
                <span className="sr-only">Your profile</span>
                <div className="flex flex-col">
                  <span aria-hidden="true">{session.user.name}</span>
                  <span className="text-xs text-zinc-400" aria-hidden="true">
                    {session.user.email}
                  </span>
                </div>
              </div>
              <SignOutButton className="h-full aspect-square" />
            </li>
          </ul>
        </nav>
      </div>
      {children}
    </div>
  );
};

export default Layout;
