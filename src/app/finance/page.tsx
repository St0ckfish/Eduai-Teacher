'use client'
import Button from "~/_components/Button";
import Container from "~/_components/Container";
import Spinner from "~/_components/Spinner";
import { Text } from "~/_components/Text";
import { useGetAllFees } from "~/APIs/hooks/useFees";

const Finance = () => {
  const { data: fees, isLoading: isFees } = useGetAllFees();

  // Sort fees with unpaid/not fully paid at the top
  const sortedFees = fees?.data ? [...fees.data].sort((a, b) => {
    const unpaidStatuses = ['Not Paid', 'Not Fully Paid'];
    const isPaidA = unpaidStatuses.includes(a.paymentStatus);
    const isPaidB = unpaidStatuses.includes(b.paymentStatus);

    if (isPaidA && !isPaidB) return -1;
    if (!isPaidA && isPaidB) return 1;
    return 0;
  }) : [];

  return (
    <Container>
      <div className="w-full overflow-x-hidden rounded-md bg-bgPrimary p-4">
        <Text font={"bold"} size={"4xl"}>Finance</Text>
        <div className="my-4">
          <div className="ml-4 flex items-center gap-2 text-primary">
            <div className="h-1 w-1 bg-primary"></div>
            <Text font={"bold"} size={"2xl"} color={"primary"}>Unpaid / Not Fully Paid</Text>
          </div>
          <div className="mt-4">
            {
              isFees ?
              <div className="flex w-full justify-center">
                <Spinner />
              </div> : 
              <table className="w-full table-fixed">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Semester Name</th>
                    <th className="px-4 py-2 text-left">Due Date</th>
                    <th className="px-4 py-2 text-left">Discount Amount</th>
                    <th className="px-4 py-2 text-left">Paid Amount</th>
                    <th className="px-4 py-2 text-left">Fees Currency</th>
                    <th className="px-4 py-2 text-left">Payment Status</th>
                    <th className="px-4 py-2 text-left">Total Fees Amount</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {sortedFees?.filter(fee => 
                    ['Not paid', 'Not fully paid'].includes(fee.paymentStatus)
                  ).map((fee) => (
                    <tr key={fee.invoiceId} className="overflow-hidden rounded-md bg-bgSecondary shadow">
                      <td className="rounded-l-md px-4 py-2">{fee.semesterName} </td>
                      <td className="px-4 py-2">{fee.dueDate}</td>
                      <td className="px-4 py-2">{fee.discountAmount}</td>
                      <td className="px-4 py-2">{fee.paidAmount}</td>
                      <td className="px-4 py-2">{fee.feesCurrency}</td>
                      <td className="px-4 py-2">{fee.paymentStatus}</td>
                      <td className="px-4 py-2">{fee.totalFeesAmount}</td>
                      <td className="rounded-r-md px-4 py-2">
                        <Button className="w-full" as="link" href={`/finance/payment/${fee.invoiceId}`}>Pay Fees</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            }
          </div>
        </div>
        <div className="mt-8">
          <div className="ml-4 flex items-center gap-2 text-success">
            <div className="h-1 w-1 bg-success"></div>
            <div className="text-xl">Paid</div>
          </div>
          <div className="mt-4">
            <table className="w-full table-fixed">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Semester Name</th>
                  <th className="px-4 py-2 text-left">Due Date</th>
                  <th className="px-4 py-2 text-left">Discount Amount</th>
                  <th className="px-4 py-2 text-left">Paid Amount</th>
                  <th className="px-4 py-2 text-left">Fees Currency</th>
                  <th className="px-4 py-2 text-left">Payment Status</th>
                  <th className="px-4 py-2 text-left">Total Fees Amount</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sortedFees?.filter(fee => 
                  ['Paid', 'Fully paid'].includes(fee.paymentStatus)
                ).map((fee) => (
                  <tr key={fee.invoiceId} className="overflow-hidden rounded-md bg-bgSecondary shadow">
                    <td className="rounded-l-md px-4 py-2">{fee.semesterName} </td>
                    <td className="px-4 py-2">{fee.dueDate}</td>
                    <td className="px-4 py-2">{fee.discountAmount}</td>
                    <td className="px-4 py-2">{fee.paidAmount}</td>
                    <td className="px-4 py-2">{fee.feesCurrency}</td>
                    <td className="px-4 py-2">{fee.paymentStatus}</td>
                    <td className="px-4 py-2">{fee.totalFeesAmount}</td>
                    <td className="rounded-r-md px-4 py-2">
                      <Button color="secondary" as="link" href="/finance/">Details</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Finance;