'use client'
import Button from "~/_components/Button";
import Container from "~/_components/Container";
import Spinner from "~/_components/Spinner";
import { Text } from "~/_components/Text";
import { useGetAllFees } from "~/APIs/hooks/useFees";
import useLanguageStore from "~/APIs/store";

const Finance = () => {
  const { data: fees, isLoading: isFees } = useGetAllFees();
  const language = useLanguageStore((state) => state.language);
  const translate = (en: string, fr: string, ar: string) => {
    return language === "fr" ? fr : language === "ar" ? ar : en;
  };
  const sortedFees = fees?.data ? [...fees.data].sort((a, b) => {
    const unpaidStatuses = ['Not Paid', 'Not Fully Paid'];
    const isPaidA = unpaidStatuses.includes(a.paymentStatus);
    const isPaidB = unpaidStatuses.includes(b.paymentStatus);

    if (isPaidA && !isPaidB) return -1;
    if (!isPaidA && isPaidB) return 1;
    return 0;
  }) : [];

  interface Fee {
    semesterName: string;
    dueDate: string;
    discountAmount: number;
    paidAmount: number;
    feesCurrency: string;
    paymentStatus: string;
    totalFeesAmount: number;
    invoiceId: number;
  }

  const TableRow = ({ fee, isPaid }: { fee: Fee; isPaid: boolean }) => (
    <div className="mb-4 rounded-lg bg-bgSecondary p-4 shadow lg:mb-0 lg:rounded-none lg:p-0">
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-8 lg:gap-0">
        <div className="flex justify-between lg:block lg:px-4 lg:py-2">
          <span className="font-medium lg:hidden">{translate("Semester Name:", "Nom du semestre:", "اسم الفصل:")}</span>
          <span>{fee.semesterName}</span>
        </div>
        <div className="flex justify-between lg:block lg:px-4 lg:py-2">
          <span className="font-medium lg:hidden">Due Date:</span>
          <span>{fee.dueDate}</span>
        </div>
        <div className="flex justify-between lg:block lg:px-4 lg:py-2">
          <span className="font-medium lg:hidden">Discount Amount:</span>
          <span>{fee.discountAmount}</span>
        </div>
        <div className="flex justify-between lg:block lg:px-4 lg:py-2">
          <span className="font-medium lg:hidden">Paid Amount:</span>
          <span>{fee.paidAmount}</span>
        </div>
        <div className="flex justify-between lg:block lg:px-4 lg:py-2">
          <span className="font-medium lg:hidden">Fees Currency:</span>
          <span>{fee.feesCurrency}</span>
        </div>
        <div className="flex justify-between lg:block lg:px-4 lg:py-2">
          <span className="font-medium lg:hidden">Payment Status:</span>
          <span>{fee.paymentStatus}</span>
        </div>
        <div className="flex justify-between lg:block lg:px-4 lg:py-2">
          <span className="font-medium lg:hidden">Total Fees Amount:</span>
          <span>{fee.totalFeesAmount}</span>
        </div>
        <div className="mt-4 lg:mt-0 lg:px-4 lg:py-2">
          <Button 
            className="w-full" 
            as="link" 
            color={isPaid ? "secondary" : "primary"}
            href={isPaid ? "/finance/" : `/finance/payment/${fee.invoiceId}`}
          >
            {isPaid 
              ? translate("Details", "Détails", "تفاصيل")
              : translate("Pay Fees", "Payer les frais", "دفع الرسوم")}
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <Container>
      <div className="w-full rounded-md bg-bgPrimary p-4">
        <Text font="bold" size="4xl">{translate("Finance", "Finance", "المالية")}</Text>
        
        {/* Unpaid Section */}
        <div className="my-4">
          <div className="ml-4 flex items-center gap-2 text-primary">
            <div className="h-1 w-1 bg-primary"></div>
            <Text font="bold" size="2xl" color="primary">{translate("Unpaid / Not Fully Paid", "Non payé / Non totalement payé", "غير مدفوع / غير مدفوع بالكامل")}</Text>
          </div>
          
          <div className="mt-4">
            {isFees ? (
              <div className="flex w-full justify-center">
                <Spinner />
              </div>
            ) : (
              <div className="w-full">
                <div className="hidden lg:block">
                  <div className="grid grid-cols-8 gap-4">
                    <div className="px-4 py-2 text-left font-medium">{translate("Semester Name", "Nom du semestre", "اسم الفصل")}</div>
                    <div className="px-4 py-2 text-left font-medium">{translate("Due Date", "Date d'échéance", "تاريخ الاستحقاق")}</div>
                    <div className="px-4 py-2 text-left font-medium">{translate("Discount Amount", "Montant de la remise", "قيمة الخصم")}</div>
                    <div className="px-4 py-2 text-left font-medium">{translate("Paid Amount", "Montant payé", "المبلغ المدفوع")}</div>
                    <div className="px-4 py-2 text-left font-medium">{translate("Fees Currency", "Devise des frais", "عملة الرسوم")}</div>
                    <div className="px-4 py-2 text-left font-medium">{translate("Payment Status", "Statut du paiement", "حالة الدفع")}</div>
                    <div className="px-4 py-2 text-left font-medium">{translate("Total Fees Amount", "Montant total des frais", "إجمالي الرسوم")}</div>
                    <div className="px-4 py-2 text-left font-medium"></div>
                  </div>
                </div>

                <div className="space-y-4 lg:space-y-0">
                  {sortedFees
                    ?.filter(fee => ['Not paid', 'Not fully paid'].includes(fee.paymentStatus))
                    .map((fee) => (
                      <TableRow key={fee.invoiceId} fee={fee} isPaid={false} />
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Paid Section */}
        <div className="mt-8">
          <div className="ml-4 flex items-center gap-2 text-success">
            <div className="h-1 w-1 bg-success"></div>
            <div className="text-xl">{translate("Paid", "Payé", "مدفوع")}</div>
          </div>
          
          <div className="mt-4">
            <div className="hidden lg:block">
              <div className="grid grid-cols-8 gap-4">
              <div className="px-4 py-2 text-left font-medium">{translate("Semester Name", "Nom du semestre", "اسم الفصل")}</div>
                <div className="px-4 py-2 text-left font-medium">{translate("Due Date", "Date d'échéance", "تاريخ الاستحقاق")}</div>
                <div className="px-4 py-2 text-left font-medium">{translate("Discount Amount", "Montant de la remise", "قيمة الخصم")}</div>
                <div className="px-4 py-2 text-left font-medium">{translate("Paid Amount", "Montant payé", "المبلغ المدفوع")}</div>
                <div className="px-4 py-2 text-left font-medium">{translate("Fees Currency", "Devise des frais", "عملة الرسوم")}</div>
                <div className="px-4 py-2 text-left font-medium">{translate("Payment Status", "Statut du paiement", "حالة الدفع")}</div>
                <div className="px-4 py-2 text-left font-medium">{translate("Total Fees Amount", "Montant total des frais", "إجمالي الرسوم")}</div>
                <div className="px-4 py-2 text-left font-medium"></div>
              </div>
            </div>

            <div className="space-y-4 lg:space-y-0">
              {sortedFees
                ?.filter(fee => ['Paid', 'Fully paid'].includes(fee.paymentStatus))
                .map((fee) => (
                  <TableRow key={fee.invoiceId} fee={fee} isPaid={true} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Finance;