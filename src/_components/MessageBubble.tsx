/* eslint-disable @next/next/no-img-element */
interface MessageProps {
  message: {
    content: string;
    creationTime: string;
    imageUrl?: string;
  };
  isCurrentUser: boolean;
  userName: string;
}

export const MessageBubble = ({ message, isCurrentUser, userName }: MessageProps) => {
  const formatTime = (datetimeString: string) => {
    const date = new Date(datetimeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <div dir={`${!isCurrentUser ? "ltr" : "rtl"}`} className={`mb-4 flex w-[320px] break-words rounded-lg p-3 font-semibold ${!isCurrentUser
            ? "mr-auto text-left text-white"
            : "ml-auto text-right text-black"
          }`}>
        <img className="w-8 h-8 rounded-full" src="/images/man.png" alt="Jese image" />
        <div className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 ${!isCurrentUser ? "bg-gray-100" : "bg-[#ffead1]"} rounded-e-xl rounded-es-xl  ${!isCurrentUser ? "dark:bg-gray-700" : "dark:bg-blue-900"} `}>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className={`text-sm font-semibold text-gray-900 dark:text-white  `}>{!isCurrentUser ? userName : "You"}</span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400" dir="ltr">{formatTime(message.creationTime)}</span>
          </div>
          <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{message.content}</p>
          <span className="text-sm font-normal flex justify-end text-gray-500 dark:text-gray-400">
            {!isCurrentUser ? "" : 
              <svg className="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 7 17l-5-5"></path>
                <path d="m22 10-7.5 7.5L13 16"></path>
              </svg>
              }
          </span>
        </div>

      </div>
      {/* <div
        className={`mb-4 grid w-[320px] break-words rounded-lg p-3 font-semibold ${!isCurrentUser
            ? "mr-auto bg-[#5570f1] text-left text-white"
            : "ml-auto bg-chat text-right text-black"
          }`}
      >
        <p className="font-light text-gray-800">
          {!isCurrentUser ? userName : "You"}
        </p>
        <p className="w-[300px] break-words">{message.content}</p>
        <p className="break-words text-start text-sm font-light text-gray-800">
          {formatTime(message.creationTime)}
        </p>
        {message.imageUrl && (
          <img
            src={message.imageUrl}
            alt="Attached"
            className="mt-2 max-w-full rounded-lg"
            loading="lazy"
          />
        )}
      </div> */}
    </>
  );
};
