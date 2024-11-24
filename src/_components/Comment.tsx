import Image from "next/image";
import { FaEllipsisV } from "react-icons/fa";
import { Text } from "./Text";

const Comment = ({ userName, comment, time, imageUrl }: { userName: string, comment: string, time: string, imageUrl: string }) => (
    <div className="flex mb-4">
      <div>
        <Image src={imageUrl} alt="Profile Photo" width={60} height={60} />
      </div>
      <div>
        <div className="flex gap-4 bg-bgSecondary p-4 rounded-xl">
          <div>
            <Text className="font-semibold">{userName}</Text>
            <div>{comment}</div>
          </div>
          <div className="mt-1">
            <FaEllipsisV size={18} />
          </div>
        </div>
        <div className="flex gap-4 mx-4 text-[14px] text-textSecondary">
          <div>{time}</div>
          <div>like</div>
          <div>reply</div>
        </div>
      </div>
    </div>
  );
  
export default Comment;
