import React, { useState } from "react";

interface Attachment {
  id: string;
  viewLink: string;
  downloadLink: string;
  isVideo: boolean;
  isAudio: boolean;
  isFile: boolean;
  isImage: boolean;
}

interface Message {
  id?: number | string;
  chatId?: number | string;
  content: string;
  creationTime: string;
  creatorName: string; // Using this to identify message sender
  imageUrl?: string;
  hasAttachment?: boolean;
  attachment?: Attachment;
}

interface MessageProps {
  message: Message;
  isCurrentUser: boolean;
  userName: string;
  currentChatId?: string | null; // Added to filter messages by chat
}

export const MessageBubble = ({ message, isCurrentUser, userName, currentChatId }: MessageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isImageFullscreen, setIsImageFullscreen] = useState(false);

  // Add this check to filter out messages that don't belong to the current chat
  if (currentChatId && message.chatId && message.chatId != currentChatId) {
    return null; // Don't render messages from other chats
  }

  // Determine if the current user is the sender by comparing creatorName with userName
  // This provides a more reliable way to determine message ownership
  const isSentByCurrentUser = message.creatorName === userName;

  const formatTime = (datetimeString: string) => {
    const date = new Date(datetimeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsImageFullscreen(!isImageFullscreen);
  };

  return (
    <>
      <div 
        dir={`${!isSentByCurrentUser ? "ltr" : "rtl"}`} 
        className={`mb-4 flex w-[320px] break-words rounded-lg p-3 font-semibold ${
          isSentByCurrentUser
            ? "mr-auto text-left text-white"
            : "ml-auto text-right text-black"
        }`}
      >
        <img className="w-8 h-8 rounded-full" src="/images/man.png" alt="User avatar" />
        <div 
          className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 ${
            isSentByCurrentUser ? "bg-gray-100" : "bg-[#fcead1]"
          } rounded-e-xl rounded-es-xl ${
            isSentByCurrentUser ? "dark:bg-gray-700" : "dark:bg-blue-900"
          }`}
        >
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {!isSentByCurrentUser ? "You" : message.creatorName}
            </span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400" dir="ltr">
              {formatTime(message.creationTime)}
            </span>
          </div>
          
          <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
            {message.content}
          </p>

          {/* Regular image attachment (legacy support) */}
          {message.imageUrl && !message.hasAttachment && (
            <div className="mt-2">
              <img
                src={message.imageUrl}
                alt="Attached"
                className="mt-2 max-w-full rounded-lg"
                loading="lazy"
              />
            </div>
          )}

          {/* API-based attachment system */}
          {message.hasAttachment && message.attachment && (
            <div className="mt-2">
              {/* Image attachment */}
              {message.attachment.isImage && (
                <div className="relative">
                  {!imageLoaded && !imageError && (
                    <div className="h-32 w-full rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  
                  {!imageError ? (
                    <>
                      <img
                        src={message.attachment.viewLink}
                        alt="Attachment"
                        className={`w-full max-h-60 rounded-lg object-contain cursor-pointer ${
                          !imageLoaded ? "hidden" : ""
                        }`}
                        onClick={toggleFullscreen}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                      />
                      {imageLoaded && (
                        <div className="flex items-center justify-end mt-1 space-x-2 rtl:space-x-reverse">
                          <a
                            href={message.attachment.downloadLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs text-blue-500 dark:text-blue-400 hover:underline"
                          >
                            Download
                          </a>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-xs text-red-500 dark:text-red-400 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span>Failed to load</span>
                      <a
                        href={message.attachment.downloadLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-blue-500 dark:text-blue-400 hover:underline"
                      >
                        Download
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Video attachment */}
              {message.attachment.isVideo && (
                <div className="mt-2">
                  <video 
                    controls 
                    className="w-full rounded-lg"
                    src={message.attachment.viewLink}
                  >
                    Your browser does not support the video tag.
                  </video>
                  <div className="flex justify-end mt-1">
                    <a
                      href={message.attachment.downloadLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-500 dark:text-blue-400 hover:underline"
                    >
                      Download
                    </a>
                  </div>
                </div>
              )}

              {/* Audio attachment */}
              {message.attachment.isAudio && (
                <div className="mt-2">
                  <audio 
                    controls 
                    className="w-full"
                    src={message.attachment.viewLink}
                  >
                    Your browser does not support the audio tag.
                  </audio>
                  <div className="flex justify-end mt-1">
                    <a
                      href={message.attachment.downloadLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-500 dark:text-blue-400 hover:underline"
                    >
                      Download
                    </a>
                  </div>
                </div>
              )}

              {/* Other file attachment */}
              {message.attachment.isFile && (
                <div className="mt-2 flex items-center justify-between p-2 rounded-lg bg-gray-200 dark:bg-gray-800">
                  <div className="flex items-center">
                    <svg 
                      className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                      />
                    </svg>
                    <span className="text-sm text-gray-700 dark:text-gray-300 truncate">File</span>
                  </div>
                  <a
                    href={message.attachment.downloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-500 dark:text-blue-400 hover:underline"
                  >
                    Download
                  </a>
                </div>
              )}
            </div>
          )}

          <span className="text-sm font-normal flex justify-start text-gray-500 dark:text-gray-400">
            {isSentByCurrentUser ? "" : (
              <svg 
                className="shrink-0 size-3" 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M18 6 7 17l-5-5"></path>
                <path d="m22 10-7.5 7.5L13 16"></path>
              </svg>
            )}
          </span>
        </div>
      </div>

      {/* Fullscreen image modal */}
      {isImageFullscreen && message.attachment?.isImage && message.attachment?.viewLink && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={toggleFullscreen}
        >
          <div className="relative max-h-screen max-w-screen-lg p-4">
            <img
              src={message.attachment.viewLink}
              alt="Fullscreen view"
              className="max-h-[90vh] max-w-full object-contain"
            />
            <button 
              className="absolute right-4 top-4 rounded-full bg-black bg-opacity-50 p-2 text-white"
              onClick={toggleFullscreen}
            >
              <svg 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
