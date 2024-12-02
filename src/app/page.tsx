"use client";
import Image from "next/image";
import Container from "~/_components/Container";
import {
  FaEllipsisH,
  FaRegComment,
  FaRegHeart,
  FaPaperPlane,
} from "react-icons/fa";
import Input from "~/_components/Input";
import Comment from "~/_components/Comment";
import { AiOutlineClockCircle, AiOutlineDown } from "react-icons/ai";
import Button from "~/_components/Button";
import React, { useState } from "react";
import { Calendar } from "~/components/ui/calendar";
import { Text } from "~/_components/Text";
import { useGetAllPosts, useGetPost, useLikePost } from "~/APIs/hooks/usePost";
import Spinner from "~/_components/Spinner";
import {
  useCreateComment,
  useGetAllCommentsForPost,
} from "~/APIs/hooks/useComments";
import { IoSend } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";

export default function Home() {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  console.log(comment);
  const { mutate: sendComment } = useCreateComment();


  const {
    data: comments,
    refetch: refetchComments,
    isLoading: isLoadingComments,
  } = useGetAllCommentsForPost({
    postId: selectedPostId || 0,
    page: 0,
    size: 10,
  });
  
  console.log(comments);
  const { data: dataPosts, refetch, isLoading } = useGetAllPosts({ page: 0, size: 10 });
  const { mutate: likePost } = useLikePost();

  const handleLikeClick = (postId: number, liked: boolean) => {
    likePost(
      { postId, liked },
      {
        onSuccess: () => {
          refetch(); // Only refetch posts after successful like/unlike mutation
        },
      }
    );
  };
  
  const handleCommentClick = (postId: number) => {
    setSelectedPostId(postId === selectedPostId ? null : postId);
  };

  const handleSendComment = () => {
    if (comment.trim() && selectedPostId) {
      sendComment(
        { postId: selectedPostId, comment },
        {
          onSuccess: () => {
            // Refetch the comments after the comment is added successfully
            refetchComments();
            setComment(""); // Clear the input field after sending
          },
        },
      );
    }
  };

  const handleLikesCount = (postId: number, likesCount: number) => {
    console.log(likesCount);
  };

  function CalendarDemo() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-commentsCountmd flex w-full justify-center"
      />
    );
  }

  if (isLoading) return <Spinner />;

  return (
    <Container>
      <div className="m-4 mb-4 flex flex-col items-start justify-between gap-4 md:flex-row">
        <div className="flex w-full flex-col gap-4">
          {dataPosts?.data.content.map((post) => (
            <div key={post.id} className="w-full rounded-xl bg-bgPrimary p-4">
              <div className="mb-4 border-b border-borderPrimary py-4">
                <div className="mb-4 flex justify-between">
                  <div className="flex gap-4">
                    <div className="h-[60px] w-[60px] overflow-hidden">
                      <Image
                        src={
                          post.isPublisherPictureExists
                            ? post.publisherPicture
                            : "/images/default.png"
                        }
                        className="rounded-full w-[60px] h-[60px]"
                        alt="Profile Photo"
                        width={60}
                        height={60}
                      />
                    </div>
                    <div>
                      <Text font="bold">{post.publisherName}</Text>
                      <Text color="gray">
                        {new Date(post.creationDate).toLocaleTimeString()}
                      </Text>
                    </div>
                  </div>
                  <div className="mt-2 font-extrabold">
                    <FaEllipsisH size={20} />
                  </div>
                </div>
                <Text className="ml-2">{post.content}</Text>
              </div>
              <div>
                <div className="flex gap-3">
                
                  <button
                    className="flex items-center gap-1"
                    onClick={() => handleLikesCount(post.id, post.likesCount)}
                  >
                    {post?.isLiked ? (
                      <FaHeart
                        color="red"
                        size={20}
                        onClick={() => handleLikeClick(post.id, false)} 
                      />
                    ) : (
                      <FaRegHeart
                        size={20}
                        onClick={() => handleLikeClick(post.id, true)}
                      />
                    )}

                    <span className="text-sm">{post?.likesCount}</span>
                  </button>
                  <button
                    className="flex items-center gap-1"
                    onClick={() => handleCommentClick(post.id)} 
                  >
                    <FaRegComment size={20} />
                    <span className="text-sm">
                      {comments?.data.content.length}
                    </span>
                  </button>
                  <FaPaperPlane size={20} />
                </div>

                {selectedPostId === post.id && (
                  <div className="my-4 ml-4">
                    {isLoadingComments ? (
                      <div className="flex justify-center py-4">
                        <Spinner />
                      </div>
                    ) : (
                      <>
                        {comments?.data.content.map((comment) => (
                          <Comment
                            refetchComments={refetchComments}
                            key={comment.id}
                            userName={comment.creatorName}
                            comment={comment.comment}
                            time={new Date(
                              comment.createdDate,
                            ).toLocaleTimeString()}
                            imageUrl={
                              comment.isCreatorPictureExists
                                ? comment.creatorPicture
                                : "/images/default.png"
                            }
                            postId={selectedPostId}
                            commentId={comment.id}
                            isLiked={comment.isLiked}
                            likesCount={comment.likesCount}
                          />
                        ))}

                        {comments?.data.content.length === 0 && (
                          <Text color="gray" className="py-4 text-center">
                            No comments yet
                          </Text>
                        )}
                      </>
                    )}

                    {/* Comment input area */}
                    <div className="relative flex">
                      <Input
                        border="gray"
                        theme="comment"
                        placeholder="Add comment..."
                        type="comment"
                        value={comment} // Set the input value to the state
                        onChange={(e) => setComment(e.target.value)} // Update state on input change
                      />
                      <IoSend
                        size={30}
                        className={`absolute right-4 ${comment ? "text-textPrimary" : "text-textSecondary"} top-2 cursor-pointer`}
                        onClick={handleSendComment} // Call the send function when clicked
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full rounded-md bg-bgPrimary p-4 md:w-1/2">
          <div className="my-2 border-b border-borderPrimary">
            <Text font={"bold"} size={"2xl"}>
              Today&apos;s Events
            </Text>
            <div className="my-4">
              <div>
                <div className="flex justify-between rounded-md bg-thead p-2 text-primary">
                  <Text color={"primary"}>Today</Text>
                  <div className="flex gap-1">
                    <div className="mt-[2px]">
                      <AiOutlineClockCircle size={18} />
                    </div>
                    <Text color={"primary"}>04:00 - 43 Min</Text>
                  </div>
                </div>

                <div className="flex justify-between p-4">
                  <div>
                    <Text>Parent - teacher meeting!</Text>
                    <Text color={"gray"}>Academic Progress</Text>
                  </div>
                  <div>
                    <Button>Confirm Attendance</Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-1 text-primary">
                <Text color={"primary"}>Show more </Text>
                <div className="mt-[2px]">
                  <AiOutlineDown size={20} />{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="my-2 border-b border-borderPrimary">
            <Text font={"bold"} size={"2xl"}>
              Upcoming Events
            </Text>
            <div className="my-4">
              <div>
                <div className="flex justify-between rounded-md bg-thead p-2 text-primary">
                  <Text color={"primary"}>Sunday - 4 April 2024</Text>
                  <div className="flex gap-1">
                    <div className="mt-[2px]">
                      <AiOutlineClockCircle size={18} />
                    </div>
                    <Text color={"primary"}>04:00 - 43 Min</Text>
                  </div>
                </div>

                <div className="flex justify-between p-4">
                  <div>
                    <Text>Parent - teacher meeting!</Text>
                    <Text color={"gray"}>Academic Progress</Text>
                  </div>
                  <div>
                    <Button>Confirm Attendance</Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-1 text-primary">
                <Text color={"primary"}>Show more </Text>
                <div className="mt-[2px]">
                  <AiOutlineDown size={20} />{" "}
                </div>
              </div>
            </div>
          </div>

          <div className="my-2 border-b border-borderPrimary">
            <Text font={"bold"} size={"2xl"}>
              Public Holidays Calendar
            </Text>
            <div className="flex w-full justify-center">
              <div className="mt-4 flex w-fit items-center justify-center shadow-lg">
                <CalendarDemo />
              </div>
            </div>

            <div className="mt-4 flex items-center rounded-xl border border-borderPrimary">
              <div className="m-4 border-r-4 border-primary py-4 pr-4 text-primary">
                <div className="flex flex-col items-center font-bold">
                  <Text color={"primary"} size={"xl"} font={"bold"}>
                    20
                  </Text>
                  <Text color={"primary"} size={"xl"} font={"bold"}>
                    August
                  </Text>
                </div>
              </div>
              <div>
                <Text font={"bold"}>Revolution of the King and the People</Text>
                <Text color={"gray"}>Tuesday</Text>
              </div>
            </div>
            <div className="mt-4 flex items-center rounded-xl border border-borderPrimary">
              <div className="m-4 border-r-4 border-primary py-4 pr-4 text-primary">
                <div className="flex flex-col items-center font-bold">
                  <Text color={"primary"} size={"xl"} font={"bold"}>
                    21
                  </Text>
                  <Text color={"primary"} size={"xl"} font={"bold"}>
                    August
                  </Text>
                </div>
              </div>
              <div>
                <Text font={"bold"}>Youth Day</Text>
                <Text color={"gray"}>Wednesday</Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
