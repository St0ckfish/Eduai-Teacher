import Image from "next/image";
import { FaEllipsisV } from "react-icons/fa";
import { Text } from "./Text";
import { useEffect, useState, useRef } from "react";
import Input from "./Input";
import {
  useDeleteComment,
  useUpdateComment,
  useLikeComment,
} from "~/APIs/hooks/useComments";

const Comment = ({
  userName,
  comment,
  time,
  imageUrl,
  postId,
  commentId,
  refetchComments,
  isLiked,
  likesCount,
}: {
  userName: string;
  comment: string;
  time: string;
  imageUrl: string;
  postId: number;
  commentId: number;
  isLiked: boolean;
  likesCount: number;
  refetchComments: () => void;
}) => {
  const [currentComment, setCurrentComment] = useState(comment);
  const [isEditing, setIsEditing] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For controlling the menu visibility

  const { mutate: updateComment, error: updateError } = useUpdateComment();
  const { mutate: deleteComment, error: deleteError } = useDeleteComment();
  const { mutate: likeComment, error: likeError } = useLikeComment(); // Mutation for liking the comment

  const menuRef = useRef<HTMLDivElement | null>(null); // Ref for the menu

  // Handle edit button click
  const handleEditClick = () => {
    setIsEditing(true);
    setIsMenuOpen(false);
  };

  // Handle delete button click
  const handleDeleteClick = () => {
    deleteComment(
      { postId, commentId },
      {
        onSuccess: () => {
          refetchComments(); // Refetch comments only after successful deletion
          setIsMenuOpen(false); // Close the menu
        },
      },
    );
  };

  // Handle comment input change
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentComment(e.target.value);
  };

  // Save the comment after editing
  const handleSaveComment = () => {
    if (currentComment.trim() !== comment) {
      updateComment({ postId, commentId, comment: currentComment });
    }
    setIsEditing(false);
  };

  // Handle like button click
  // const handleLikeClick = () => {
  //   likeComment(
  //     { postId, commentId, comment: currentComment },
  //     {
  //       onError: () => {
  //         // If an error occurs, reset the like state and count
  //         console.error('Error liking the comment');
  //       }
  //     }
  //   );
  // };
  const handleLikeClick = () => {
    likeComment(
      { postId, commentId, liked: !isLiked }, // Toggle like/unlike state
      {
        onSuccess: () => {
          refetchComments(); // Refetch comments only after successful mutation
        },
      },
    );
  };

  // Close the menu if clicked outside
  const handleOutsideClick = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  // Update the current comment state when the comment prop changes
  useEffect(() => {
    setCurrentComment(comment);
  }, [comment]);

  useEffect(() => {
    // Add event listener for clicks outside the menu
    document.addEventListener("click", handleOutsideClick);

    return () => {
      // Remove the event listener on cleanup
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="mb-4 flex">
      <div className="mr-4">
        <Image
          src={imageUrl}
          alt="Profile Photo"
          className="rounded-full"
          width={60}
          height={60}
        />
      </div>
      <div>
        <div className="flex justify-between gap-4 rounded-xl bg-comment p-4">
          <div>
            <Text className="font-semibold">{userName}</Text>
            {isEditing ? (
              <Input
                value={currentComment}
                onChange={handleCommentChange}
                border="none"
              />
            ) : (
              <Text>{currentComment}</Text>
            )}
          </div>
          <div className="relative mt-1 cursor-pointer" ref={menuRef}>
            {isEditing ? (
              <button onClick={handleSaveComment}>Save</button>
            ) : (
              <FaEllipsisV
                size={18}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            )}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 rounded border border-borderPrimary bg-bgPrimary shadow-lg">
                <ul>
                  <li
                    className="cursor-pointer px-4 py-2 hover:bg-bgSecondary"
                    onClick={handleEditClick}
                  >
                    Edit
                  </li>
                  <li
                    className="cursor-pointer px-4 py-2 hover:bg-bgSecondary"
                    onClick={handleDeleteClick}
                  >
                    Delete
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="mx-4 flex gap-4 text-[14px] text-textSecondary">
          <div>{time}</div>

          <div>
            <button onClick={handleLikeClick}>
              {isLiked ? (
                <Text color="primary">{likesCount} liked</Text>
              ) : (
                <Text color="gray">{likesCount} like</Text>
              )}
            </button>
          </div>
          <div>reply</div>
        </div>
        {updateError && (
          <div className="text-red-500">Error updating comment</div>
        )}
        {deleteError && (
          <div className="text-red-500">Error deleting comment</div>
        )}
        {likeError && (
          <div className="text-red-500">Error liking the comment</div>
        )}
      </div>
    </div>
  );
};

export default Comment;
