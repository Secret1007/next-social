"use client";
import { switchBlock, switchFollow } from "@/lib/actions";
import { useOptimistic, useState } from "react";

const UserInfoCardInteraction = ({
  userId,
  isUserBlocked,
  isFollowing,
  isFollowingSent,
}: {
  userId: string;
  isUserBlocked: boolean;
  isFollowing: boolean;
  isFollowingSent: boolean;
}) => {
  const [userState, setUserState] = useState({
    following: isFollowing,
    blocked: isUserBlocked,
    followingRequestSent: isFollowingSent,
  });
  const follow = async () => {
    setOptimisticState("follow");
    try {
      await switchFollow(userId);
      setUserState((prev) => ({
        ...prev,
        following: prev.following && false,
        followingRequestSent:
          !prev.following && !prev.followingRequestSent ? true : false,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const block = async () => {
    setOptimisticState("block");
    try {
      await switchBlock(userId);
      setUserState((prev) => ({
        ...prev,
        blocked: !prev.blocked,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const [optimisticState, setOptimisticState] = useOptimistic(
    userState,
    (state, value: "follow" | "block") =>
      value === "follow"
        ? {
            ...state,
            following: state.following && false,
            followingRequestSent:
              !state.following && !state.followingRequestSent ? true : false,
          }
        : {
            ...state,
            blocked: !state.blocked,
          }
  );
  return (
    <>
      <form action={follow}>
        <button className="w-full bg-blue-500 text-white text-sm rounded-md p-2">
          {optimisticState.following
            ? "Following"
            : optimisticState.followingRequestSent
            ? "Friends Request Sent"
            : "Follow"}
        </button>
      </form>
      <form action={block} className="self-end">
        <button className="text-red-400 text-xs cursor-pointer">
          {optimisticState.blocked ? "Unblock User" : "Block User"}
        </button>
      </form>
    </>
  );
};

export default UserInfoCardInteraction;
