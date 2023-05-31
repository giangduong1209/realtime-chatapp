"use client";
import { chatHrefConstructor } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { FC, useEffect } from "react";
import Image from "next/image";
import { pusherClient } from "@/lib/pusher";

interface RecentsChatProps {
  sessionId: string;
  friendsWithLastMessage: FriendsWithLastMessage[];
}

const RecentsChat: FC<RecentsChatProps> = ({
  sessionId,
  friendsWithLastMessage,
}) => {
  //   useEffect(() => {
  //     pusherClient.subscribe(`chat:${sessionId}:messages`);

  //     const lastMessageHandler = (lastMessage: FriendsWithLastMessage) => {
  //       console.log(lastMessage);
  //     };

  //     pusherClient.bind("messages", lastMessageHandler);
  //     return () => {
  //       pusherClient.unsubscribe(`chat:${sessionId}:messages`);
  //       pusherClient.unbind("messages", lastMessageHandler);
  //     };
  //   }, [sessionId]);
  return (
    <>
      {friendsWithLastMessage.length === 0 ? (
        <p className="text-sm text-zinc-500">Nothing to show here...</p>
      ) : (
        friendsWithLastMessage.map((friend) => (
          <div
            key={friend.id}
            className="relative bg-zinc-50 border-zinc-200 p-3 rounded-md"
          >
            <div className="absolute right-4 inset-y-0 flex items-center">
              <ChevronRight className="h-7 w-7 text-zinc-400" />
            </div>
            <Link
              href={`/dashboard/chat/${chatHrefConstructor(
                sessionId,
                friend.id
              )}`}
            >
              <div className="relative sm:flex">
                <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                  <div className="relative h-6 w-6">
                    <Image
                      referrerPolicy="no-referrer"
                      className="rounded-full"
                      alt={`${friend.name} profile picture`}
                      src={friend.image}
                      fill
                    />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold">{friend.name}</h4>
                  <p className="mt-1 max-w-md">
                    <span className="text-zinc-400">
                      {friend.lastMessage.senderId === sessionId ? "You" : ""}
                    </span>
                    {friend.lastMessage.text}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))
      )}
    </>
  );
};

export default RecentsChat;
