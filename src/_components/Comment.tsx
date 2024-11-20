import Image from "next/image";
import { FaEllipsisV } from "react-icons/fa";

const Comment = ({
  userName,
  comment,
  time,
  imageUrl,
}: {
  userName: string;
  comment: string;
  time: string;
  imageUrl: string;
}) => (
  <div className="mb-4 flex">
    <div>
      <Image src={imageUrl} alt="Profile Photo" width={60} height={60} />
    </div>
    <div>
      <div className="flex gap-4 rounded-xl bg-bgSecondary p-4">
        <div>
          <div className="font-semibold">{userName}</div>
          <div>{comment}</div>
        </div>
        <div className="mt-1">
          <FaEllipsisV size={18} />
        </div>
      </div>
      <div className="ml-4 flex gap-4 text-[14px] text-[#89939e]">
        <div>{time}</div>
        <div>like</div>
        <div>reply</div>
      </div>
    </div>
  </div>
);

export default Comment;
