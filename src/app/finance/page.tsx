import Button from "~/_components/Button";
import Container from "~/_components/Container";

const Finance = () => {
  return (
    <Container>
      <div className="w-full overflow-x-hidden rounded-md bg-bgPrimary p-4">
        <h1 className="text-2xl font-semibold">Finance</h1>
        <div className="my-4">
          <div className="ml-4 flex items-center gap-2 text-primary">
            <div className="h-1 w-1 bg-primary"></div>
            <div className="text-xl">Unpaid</div>
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
                <tr className="overflow-hidden rounded-md bg-gray-100 shadow">
                  <td className="rounded-l-md px-4 py-2">Bus Subscription</td>
                  <td className="px-4 py-2">12 Jun, 2024</td>
                  <td className="px-4 py-2">00.00</td>
                  <td className="px-4 py-2">8100.00 MAD</td>
                  <td className="rounded-r-md px-4 py-2">
                    <Button className="w-full">Pay Fees</Button>
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="py-1"></td>
                </tr>
                <tr className="overflow-hidden rounded-md bg-gray-50 shadow">
                  <td className="rounded-l-md px-4 py-2">Meals</td>
                  <td className="px-4 py-2">12 Jun, 2024</td>
                  <td className="px-4 py-2">00.00</td>
                  <td className="px-4 py-2">8100.00 MAD</td>
                  <td className="rounded-r-md px-4 py-2">
                    <Button className="w-full">Pay Fees</Button>
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
                <tr className="overflow-hidden rounded-md bg-gray-100 shadow">
                  <td className="rounded-l-md px-4 py-2">Bus Subscription</td>
                  <td className="px-4 py-2">12 Jun, 2024</td>
                  <td className="px-4 py-2">00.00</td>
                  <td className="px-4 py-2">8100.00 MAD</td>
                  <td className="rounded-r-md px-4 py-2">
                    <Button theme="gray">Paid</Button>
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="py-1"></td>
                </tr>
                <tr className="overflow-hidden rounded-md bg-gray-50 shadow">
                  <td className="rounded-l-md px-4 py-2">Meals</td>
                  <td className="px-4 py-2">12 Jun, 2024</td>
                  <td className="px-4 py-2">00.00</td>
                  <td className="px-4 py-2">8100.00 MAD</td>
                  <td className="rounded-r-md px-4 py-2">
                    <Button theme="gray">Paid</Button>
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="py-1"></td>
                </tr>
                <tr className="overflow-hidden rounded-md bg-gray-100 shadow">
                  <td className="rounded-l-md px-4 py-2">Bus Subscription</td>
                  <td className="px-4 py-2">12 Jun, 2024</td>
                  <td className="px-4 py-2">00.00</td>
                  <td className="px-4 py-2">8100.00 MAD</td>
                  <td className="rounded-r-md px-4 py-2">
                    <Button theme="gray">Paid</Button>
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="py-1"></td>
                </tr>
                <tr className="overflow-hidden rounded-md bg-gray-50 shadow">
                  <td className="rounded-l-md px-4 py-2">Meals</td>
                  <td className="px-4 py-2">12 Jun, 2024</td>
                  <td className="px-4 py-2">00.00</td>
                  <td className="px-4 py-2">8100.00 MAD</td>
                  <td className="rounded-r-md px-4 py-2">
                    <Button theme="gray">Paid</Button>
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="py-1"></td>
                </tr>
                <tr className="overflow-hidden rounded-md bg-gray-100 shadow">
                  <td className="rounded-l-md px-4 py-2">Bus Subscription</td>
                  <td className="px-4 py-2">12 Jun, 2024</td>
                  <td className="px-4 py-2">00.00</td>
                  <td className="px-4 py-2">8100.00 MAD</td>
                  <td className="rounded-r-md px-4 py-2">
                    <Button theme="gray">Paid</Button>
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="py-1"></td>
                </tr>
                <tr className="overflow-hidden rounded-md bg-gray-50 shadow">
                  <td className="rounded-l-md px-4 py-2">Meals</td>
                  <td className="px-4 py-2">12 Jun, 2024</td>
                  <td className="px-4 py-2">00.00</td>
                  <td className="px-4 py-2">8100.00 MAD</td>
                  <td className="rounded-r-md px-4 py-2">
                    <Button theme="gray">Paid</Button>
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
