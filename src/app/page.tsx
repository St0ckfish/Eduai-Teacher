"use client";
import Image from "next/image";
import Container from "~/_components/Container";
import { FaRegComment, FaRegHeart, FaPaperPlane } from "react-icons/fa";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";
import Input from "~/_components/Input";
import Comment from "~/_components/Comment";
import Button from "~/_components/Button";
import React, { useEffect, useState } from "react";
import { Calendar } from "~/components/ui/calendar";
import { Text } from "~/_components/Text";
import { useGetAllPosts, useLikePost } from "~/APIs/hooks/usePost";
import Spinner from "~/_components/Spinner";
import {
  useCreateComment,
  useGetAllCommentsForPost,
} from "~/APIs/hooks/useComments";
import {
  useAddAttendance,
  useRemoveAttendance,
  useUpcomingEvents,
} from "~/APIs/hooks/useEvents";
import { isToday, isAfter } from "date-fns";
import { type CustomEvent } from "~/types";
import { toast } from "react-toastify";
import ImageComponent from "~/_components/ImageSrc";
import useLanguageStore from "~/APIs/store";

export default function Home() {
  const {
    data: dataEvents,
    isLoading: isEventsLoading,
    refetch: refetchEvents,
  } = useUpcomingEvents();

  const { mutate: addAttendance } = useAddAttendance({
    onSuccess: () => {
      toast.success("Attendance confirmed successfully!");
      void refetchEvents();
    },
    onError: () => {
      toast.error("Error confirmed attendance!");
    },
  });
  const { mutate: removeAttendance } = useRemoveAttendance({
    onSuccess: () => {
      toast.success("Attendance removed successfully!");
      void refetchEvents();
    },

    onError: () => {
      toast.success("Error remove attendance!");
    },
  });

  const language = useLanguageStore((state) => state.language);
  const translate = (en: string, fr: string, ar: string) => {
    return language === "fr" ? fr : language === "ar" ? ar : en;
  };

  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  console.log(comment);
  const { mutate: sendComment } = useCreateComment();

  const [todayEvents, setTodayEvents] = useState<CustomEvent[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<CustomEvent[]>([]);

  const categorizeEvents = (events: CustomEvent[]) => {
    const today = new Date();
    const todayEvents: CustomEvent[] = [];
    const upcomingEvents: CustomEvent[] = [];

    events.forEach((event) => {
      const eventDate = new Date(event.startDate);
      if (isToday(eventDate)) {
        todayEvents.push(event);
      } else if (isAfter(eventDate, today)) {
        upcomingEvents.push(event);
      }
    });

    return { todayEvents, upcomingEvents };
  };

  useEffect(() => {
    if (dataEvents?.data?.content) {
      const { todayEvents, upcomingEvents } = categorizeEvents(
        dataEvents?.data?.content,
      );
      setTodayEvents(todayEvents);
      setUpcomingEvents(upcomingEvents);
    }
  }, [dataEvents]);

  const {
    data: comments,
    refetch: refetchComments,
    isLoading: isLoadingComments,
  } = useGetAllCommentsForPost({
    postId: selectedPostId ?? 0,
    page: 0,
    size: 10,
  });

  console.log(comments);
  const {
    data: dataPosts,
    refetch,
    isLoading,
  } = useGetAllPosts({ page: 0, size: 10 });
  const { mutate: likePost } = useLikePost();

  const handleLikeClick = (postId: number, liked: boolean) => {
    likePost(
      { postId, liked },
      {
        onSuccess: () => {
          void refetch(); // Only refetch posts after successful like/unlike mutation
        },
      },
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
            void refetchComments();
            void refetch();
            setComment(""); // Clear the input field after sending
          },
        },
      );
    }
  };

  const handleLikesCount = (postId: number, likesCount: number) => {
    console.log(likesCount);
  };

  const handleConfirmAttendance = (eventId: string) => {
    addAttendance(eventId);
    void refetchEvents();
  };

  const handleRemoveAttendance = (eventId: string) => {
    removeAttendance(eventId);
    void refetchEvents();
  };
  //
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

  if (isLoading || isEventsLoading)
    return (
      <div className="flex h-[750px] items-center justify-center">
        <Spinner />
      </div>
    );

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
                        priority
                        unoptimized
                        src={
                          post.isPublisherPictureExists
                            ? post.publisherPicture
                            : "/images/noImage.png"
                        }
                        className="h-[60px] w-[60px] rounded-full"
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
                  {/* <div className="mt-2 font-extrabold">
                    <FaEllipsisH size={20} />
                  </div> */}
                </div>
                <Text className="m-2">{post.content}</Text>
                <div className="mt-4">
                  {post?.attachments?.length > 0 && (
                    <div
                      className={`grid gap-4 ${
                        post?.attachments?.length === 1
                          ? "grid-cols-1"
                          : post?.attachments?.length === 2
                            ? "grid-cols-2"
                            : "grid-cols-2 md:grid-cols-3"
                      }`}
                    >
                      {" "}
                      {post.attachments.slice(0, 6).map((attachment, index) => (
                        <div key={index} className="relative">
                          <ImageComponent
                            src={attachment.viewLink}
                            fallbackSrc="/images/noImage.png"
                            aspectRatio="aspect-video"
                            objectFit="cover"
                            priority={true}
                            className="h-full w-full rounded-md object-cover"
                            alt={`Post Image ${index + 1}`}
                            onLoadingComplete={() => console.log('Image loaded')}
                            onError={(error) => console.error('Image failed to load:', error)}
                            key={index} 
                          />
                        </div>
                      ))}
                      {post.attachments.length > 6 && (
                        <div className="relative flex items-center justify-center rounded-md bg-gray-200">
                          <Text font="bold" size="lg" className="text-primary">
                            +{post.attachments.length - 6}  {language === "ar"
    ? "المزيد"
    : language === "fr"
    ? "plus"
    : "more"}
                          </Text>
                        </div>
                      )}
                    </div>
                  )}
                </div>
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

                    <Text size={"xs"}>{post?.likesCount}</Text>
                  </button>
                  <button
                    className="flex items-center gap-1"
                    onClick={() => handleCommentClick(post.id)}
                  >
                    <FaRegComment size={20} />
                    <Text size={"xs"}>{post?.commentsCount}</Text>
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
                          {language === "ar"
                            ? "لا توجد تعليقات حتى الآن"
                            : language === "fr"
                            ? "Pas encore de commentaires"
                            : "No comments yet"}
                        </Text>
                        )}
                      </>
                    )}

                    {/* Comment input area */}
                    <div className="relative flex">
                      <Input
                        border="gray"
                        theme="comment"
                        placeholder={
                          language === "ar"
                            ? "أضف تعليقًا..."
                            : language === "fr"
                            ? "Ajouter un commentaire..."
                            : "Add comment..."
                        }
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
          <div>
          <Text font="bold" size="2xl">
  {language === "ar"
    ? "فعاليات اليوم"
    : language === "fr"
    ? "Événements d'aujourd'hui"
    : "Today's Events"}
</Text>
            {todayEvents.length > 0 ? (
              todayEvents.map((event) => (
                <div
                  key={event.id}
                  className="my-2"
                >
                  <div className="my-4">
                    <div>
                      <div className="flex justify-between rounded-md bg-thead p-2 text-primary">
                        <Text color="primary">
                          {new Date(event.startDate).toLocaleDateString()}
                        </Text>
                        <div className="flex gap-1">
                          <div className="mt-[2px]">
                            <AiOutlineClockCircle size={18} />
                          </div>
                          <Text color="primary">
                            {new Date(event.startDate).toLocaleTimeString()} -{" "}
                            {Math.abs(
                              new Date(event.endDate).getTime() -
                                new Date(event.startDate).getTime(),
                            ) /
                              (1000 * 60)}{" "}
                            Min
                          </Text>
                        </div>
                      </div>

                      <div className="flex justify-between p-4">
                        <div>
                          <Text>{event.title}</Text>
                          <Text color="gray">{event.description}</Text>
                        </div>
                        <div>
                          {event.isAttendee ? (
                            <Button
                            onClick={() =>
                              handleRemoveAttendance(event.id.toString())
                            }
                            color="secondary"
                          >
                           {language === "ar"
                       ? "تم تأكيد الحضور"
                       : language === "fr"
                       ? "Présence confirmée"
                       : "Attendance Confirmed"}
                          </Button>
                          ) : (
                            <Button
                              onClick={() =>
                                handleConfirmAttendance(event.id.toString())
                              }
                            >
                              {language === "ar"
                         ? "تأكيد الحضور"
                         : language === "fr"
                         ? "Confirmer la présence"
                         : "Confirm Attendance"}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <Text color="gray" font="semiBold" size="lg" className="m-2">
  {language === "ar"
    ? "لا توجد فعاليات مجدولة لليوم."
    : language === "fr"
    ? "Aucun événement prévu pour aujourd'hui."
    : "No events scheduled for today."}
</Text>
            )}
          </div>

          <div className="my-2 border-y py-2 border-borderPrimary/50">
          <Text font="bold" size="2xl">
  {translate("Upcoming Events", "Événements à venir", "الأحداث القادمة")}
</Text>
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <div key={event.id} className="my-4">
                  <div className="flex justify-between rounded-md bg-thead p-2 text-primary">
                    <Text color="primary">
                      {new Date(event.startDate).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Text>
                    <div className="flex gap-1">
                      <div className="mt-[2px]">
                        <AiOutlineClockCircle size={18} />
                      </div>
                      <Text color="primary">
                        {new Date(event.startDate).toLocaleTimeString()} -{" "}
                        {Math.abs(
                          new Date(event.endDate).getTime() -
                            new Date(event.startDate).getTime(),
                        ) /
                          (1000 * 60)}{" "}
                        Min
                      </Text>
                    </div>
                  </div>

                  <div className="flex justify-between p-4">
                    <div>
                      <Text>{event.title}</Text>
                      <Text color="gray">{event.description}</Text>
                    </div>
                    <div>
                      {event.isAttendee ? (
                        <Button
                        onClick={() => handleRemoveAttendance(event.id.toString())}
                        color="secondary"
                      >
                        {language === "ar"
                          ? "تم تأكيد الحضور"
                          : language === "fr"
                          ? "Présence confirmée"
                          : "Attendance Confirmed"}
                      </Button>
                      ) : (
                        <Button
                       onClick={() => handleConfirmAttendance(event.id.toString())}
                     >
                       {language === "ar"
                         ? "تأكيد الحضور"
                         : language === "fr"
                         ? "Confirmer la présence"
                         : "Confirm Attendance"}
                     </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
<Text color="gray" font="semiBold" size="lg" className="m-2">
  {language === "ar"
    ? "لا توجد فعاليات قادمة مجدولة."
    : language === "fr"
    ? "Aucun événement à venir programmé."
    : "No upcoming events scheduled."}
</Text>            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
