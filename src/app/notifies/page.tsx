"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState, type SetStateAction } from "react";
import { toast } from "react-toastify";
import Spinner from "~/_components/Spinner";
import Container from "~/_components/Container";
import Pagination from "~/_components/Pagination";
import { useNotificationsSocket } from "~/hooks/useGetAllNotifications";
import { useUserDataStore } from "~/APIs/store";
import {
  useDeleteNotificationMutation,
  useGetAllNotificationsQuery,
  usePutNotifiReadMutation
} from "~/APIs/hooks/useNotification";

const Notifies = () => {
  const userData = useUserDataStore.getState().userData;
  const userId = userData.id;
  const { notifications: socketNotifications } = useNotificationsSocket(userId);
  console.log(socketNotifications);
  

  const formatTransactionDate = (dateString: string | number | Date) => {
    if (!dateString) return "No transaction date";
    const formatter = new Intl.DateTimeFormat("en-EG", {
      timeZone: "Asia/Riyadh",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour12: false,
    });
    return formatter.format(new Date(dateString));
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, isLoading, refetch } = useGetAllNotificationsQuery({
    page: currentPage,
    size: rowsPerPage,
  });

  // Combine fetched and socket notifications
  const combinedNotifications = [
    ...(socketNotifications || []),
    ...(data?.data.content || [])
  ];

  const onPageChange = (page: SetStateAction<number>) => {
    setCurrentPage(page);
  };

  const onElementChange = (ele: SetStateAction<number>) => {
    setRowsPerPage(ele);
    setCurrentPage(0);
  };

  const {
    mutateAsync: readNotifi,
    isPending: isReading,
  } = usePutNotifiReadMutation({
    onSuccess: () => {
      toast.success(`Notification read`);
      void refetch();
    },
    onError: () => {
      toast.error("Failed to Read Notification");
    }
  });

  const {
    mutateAsync: deleteNotifi,
    isPending: isDeleting,
  } = useDeleteNotificationMutation({
    onSuccess: () => {
      toast.success(`Notification Deleted`);
      void refetch();
    },
    onError: () => {
      toast.error("Failed to Delete Notification");
    }
  });

  const handleRead = async (id: string) => {
    await readNotifi(id);
  };

  const handleDelete = async (id: string) => {
    await deleteNotifi(id);
  };

  if (isLoading)
    return (
      <div className="flex w-full justify-center">
        <Spinner />
      </div>
    );

  return (
    <Container>
      <div className="grid h-full w-full items-center justify-center gap-3 rounded-xl bg-bgPrimary p-5">
        <div className="mb-5 flex w-full justify-start">
          <h1 className="text-[22px] font-semibold">Notifications</h1>
        </div>

        {combinedNotifications.map((notifi: any, index: number) => (
          <div
            key={`${notifi.id}-${index}`}
            className={`flex gap-2 ${notifi.read ? "bg-bgPrimary" : "bg-thead"} h-full w-[1000px] rounded-lg p-3 shadow-xl max-[1340px]:w-[700px] max-[1040px]:w-[500px] max-[550px]:w-[300px]`}
          >
            <div>
              {notifi.picture == null ? (
                <img
                  src="/images/userr.png"
                  className="mx-2 h-[40px] w-[40px] rounded-full"
                  alt="#"
                />
              ) : (
                <img
                  src={notifi.picture}
                  className="mx-2 h-[40px] w-[40px] rounded-full"
                  alt="#"
                />
              )}
            </div>
            <div className="flex w-full justify-between">
              <div className="grid items-center justify-center gap-4">
                <h1 className="flex items-center gap-2 font-semibold">
                  {notifi.title}{" "}
                  <span className="text-[12px] text-gray-400">
                    {formatTransactionDate(notifi.timestamp)}
                  </span>{" "}
                  {!notifi.read && (
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
                    </span>
                  )}
                </h1>
                <div dangerouslySetInnerHTML={{ __html: notifi.description }} />
              </div>
              <div className="flex items-start gap-2">
                {notifi.read ? (
                  <button className="text-[20px] text-gray-600">
                    <svg
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={() => handleRead(notifi.id)}
                    className="text-[20px] text-gray-600"
                    disabled={isReading}
                  >
                    <svg
                      className="h-5 w-5 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                )}
                <button
                  onClick={() => handleDelete(notifi.id)}
                  className="text-[20px] text-gray-600"
                  disabled={isDeleting}
                >
                  <svg
                    className="h-5 w-5 text-gray-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <line x1="18" y1="6" x2="6" y2="18" />{" "}
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="relative overflow-auto">
          <Pagination
            totalPages={data?.data.totalPagesCount}
            elementsPerPage={rowsPerPage}
            onChangeElementsPerPage={onElementChange}
            currentPage={currentPage}
            onChangePage={onPageChange}
          />
        </div>
      </div>
    </Container>
  );
};

export default Notifies;
