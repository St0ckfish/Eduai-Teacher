'use client'
import { useRouter } from "next/navigation";
import Button from "~/_components/Button";
import Container from "~/_components/Container";
import { Text } from "~/_components/Text";

const Finance = () => {
  const router = useRouter();

  const handlePayClick = () => {
    router.push('/payment')
  }
  return (
    <Container>
      <div className="w-full overflow-x-hidden rounded-md bg-bgPrimary p-4">
        <Text font={"bold"} size={"4xl"}>Finance</Text>
        <div className="my-4">
          <div className="ml-4 flex items-center gap-2 text-primary">
            <div className="h-1 w-1 bg-primary"></div>
            <Text font={"bold"} size={"2xl"} color={"primary"}>Unpaid</Text>
          </div>
          <div className="mt-4">
            <table className="w-full table-fixed">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Fee Type</th>
                  <th className="px-4 py-2 text-left">Payment Date</th>
                  <th className="px-4 py-2 text-left">Discount</th>
                  <th className="px-4 py-2 text-left">Amount</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={5} className="py-1"></td>
                </tr>
                <tr className="overflow-hidden rounded-md bg-bgSecondary shadow">
                  <td className="rounded-l-md px-4 py-2">Bus Subscription</td>
                  <td className="px-4 py-2">12 Jun, 2024</td>
                  <td className="px-4 py-2">00.00</td>
                  <td className="px-4 py-2">8100.00 MAD</td>
                  <td className="rounded-r-md px-4 py-2">
                    <Button className="w-full" onClick={handlePayClick}>Pay Fees</Button>
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="py-1"></td>
                </tr>
                <tr className="overflow-hidden rounded-md bg-bgSecondary/50 shadow">
                  <td className="rounded-l-md px-4 py-2">Meals</td>
                  <td className="px-4 py-2">12 Jun, 2024</td>
                  <td className="px-4 py-2">00.00</td>
                  <td className="px-4 py-2">8100.00 MAD</td>
                  <td className="rounded-r-md px-4 py-2">
                    <Button className="w-full" onClick={handlePayClick}>Pay Fees</Button>
                  </td>
                </tr>
              </tbody>
            </table>
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
                  <th className="px-4 py-2 text-left">Fee Type</th>
                  <th className="px-4 py-2 text-left">Payment Date</th>
                  <th className="px-4 py-2 text-left">Discount</th>
                  <th className="px-4 py-2 text-left">Amount</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={5} className="py-1"></td>
                </tr>
                <tr className="overflow-hidden rounded-md bg-bgSecondary shadow">
                  <td className="rounded-l-md px-4 py-2">Bus Subscription</td>
                  <td className="px-4 py-2">12 Jun, 2024</td>
                  <td className="px-4 py-2">00.00</td>
                  <td className="px-4 py-2">8100.00 MAD</td>
                  <td className="rounded-r-md px-4 py-2">
                    <Button color="secondary">Paid</Button>
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="py-1"></td>
                </tr>
                <tr className="overflow-hidden rounded-md bg-bgSecondary/50 shadow">
                  <td className="rounded-l-md px-4 py-2">Meals</td>
                  <td className="px-4 py-2">12 Jun, 2024</td>
                  <td className="px-4 py-2">00.00</td>
                  <td className="px-4 py-2">8100.00 MAD</td>
                  <td className="rounded-r-md px-4 py-2">
                    <Button color="secondary">Paid</Button>
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="py-1"></td>
                </tr>
                <tr className="overflow-hidden rounded-md bg-bgSecondary shadow">
                  <td className="rounded-l-md px-4 py-2">Bus Subscription</td>
                  <td className="px-4 py-2">12 Jun, 2024</td>
                  <td className="px-4 py-2">00.00</td>
                  <td className="px-4 py-2">8100.00 MAD</td>
                  <td className="rounded-r-md px-4 py-2">
                    <Button color="secondary">Paid</Button>
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="py-1"></td>
                </tr>
                <tr className="overflow-hidden rounded-md bg-bgSecondary/50 shadow">
                  <td className="rounded-l-md px-4 py-2">Meals</td>
                  <td className="px-4 py-2">12 Jun, 2024</td>
                  <td className="px-4 py-2">00.00</td>
                  <td className="px-4 py-2">8100.00 MAD</td>
                  <td className="rounded-r-md px-4 py-2">
                    <Button color="secondary">Paid</Button>
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="py-1"></td>
                </tr>
                <tr className="overflow-hidden rounded-md bg-bgSecondary shadow">
                  <td className="rounded-l-md px-4 py-2">Bus Subscription</td>
                  <td className="px-4 py-2">12 Jun, 2024</td>
                  <td className="px-4 py-2">00.00</td>
                  <td className="px-4 py-2">8100.00 MAD</td>
                  <td className="rounded-r-md px-4 py-2">
                    <Button color="secondary">Paid</Button>
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="py-1"></td>
                </tr>
                <tr className="overflow-hidden rounded-md bg-bgSecondary/50 shadow">
                  <td className="rounded-l-md px-4 py-2">Meals</td>
                  <td className="px-4 py-2">12 Jun, 2024</td>
                  <td className="px-4 py-2">00.00</td>
                  <td className="px-4 py-2">8100.00 MAD</td>
                  <td className="rounded-r-md px-4 py-2">
                    <Button color="secondary">Paid</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Finance;
