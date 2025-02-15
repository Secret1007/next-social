import Image from "next/image";
import CommentList from "./CommentList";
import prisma from "@/lib/client";

const Comments = async ({ postId }: { postId: number }) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: true,
    },
  });
  return (
    <div className="">
      <CommentList comments={comments} postId={postId} />
    </div>
  );
};

export default Comments;
