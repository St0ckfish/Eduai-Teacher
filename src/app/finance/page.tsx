import Button from "~/_components/Button";
import Container from "~/_components/Container";

const Finance = () => {
    return (
        <Container>
            <div className="w-full bg-bgPrimary p-4 rounded-md overflow-x-hidden"> {/* Container without scroll */}
                <h1 className="text-2xl font-semibold">Finance</h1>
                <div className="my-4">
                    <div className="ml-4 text-primary flex items-center gap-2">
                        <div className="w-1 h-1 bg-primary"></div>
                        <div className="text-xl">Unpaid</div>
                    </div>
                    <div className="mt-4">
                        <table className="w-full table-fixed"> {/* Fixed table layout */}
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left">Fee Type</th>
                                    <th className="px-4 py-2 text-left">Payment Date</th>
                                    <th className="px-4 py-2 text-left">Discount</th>
                                    <th className="px-4 py-2 text-left">Amount</th>
                                    <th>{""}</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td colSpan={5} className="py-1"></td> {/* Space between rows */}
                                </tr>
                                <tr className="bg-gray-100 rounded-md overflow-hidden shadow">
                                    <td className="px-4 py-2 rounded-l-md">Bus Subscription</td>
                                    <td className="px-4 py-2">12 Jun, 2024</td>
                                    <td className="px-4 py-2">00.00</td>
                                    <td className="px-4 py-2">8100.00 MAD</td>
                                    <td className="px-4 py-2 rounded-r-md">
                                        <Button className="w-full">Pay Fees</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={5} className="py-1"></td> {/* Space between rows */}
                                </tr>
                                <tr className="bg-gray-50 rounded-md overflow-hidden shadow">
                                    <td className="px-4 py-2 rounded-l-md">Meals</td>
                                    <td className="px-4 py-2">12 Jun, 2024</td>
                                    <td className="px-4 py-2">00.00</td>
                                    <td className="px-4 py-2">8100.00 MAD</td>
                                    <td className="px-4 py-2 rounded-r-md">
                                        <Button className="w-full">Pay Fees</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="ml-4 text-success flex items-center gap-2">
                        <div className="w-1 h-1 bg-success"></div>
                        <div className="text-xl">Paid</div>
                    </div>
                    <div className="mt-4">
                        <table className="w-full table-fixed"> {/* Fixed table layout */}
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left">Fee Type</th>
                                    <th className="px-4 py-2 text-left">Payment Date</th>
                                    <th className="px-4 py-2 text-left">Discount</th>
                                    <th className="px-4 py-2 text-left">Amount</th>
                                    <th>{""}</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td colSpan={5} className="py-1"></td> {/* Space between rows */}
                                </tr>
                                <tr className="bg-gray-100 rounded-md overflow-hidden shadow">
                                    <td className="px-4 py-2 rounded-l-md">Bus Subscription</td>
                                    <td className="px-4 py-2">12 Jun, 2024</td>
                                    <td className="px-4 py-2">00.00</td>
                                    <td className="px-4 py-2">8100.00 MAD</td>
                                    <td className="px-4 py-2 rounded-r-md">
                                        <Button theme="gray">Paid</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={5} className="py-1"></td> {/* Space between rows */}
                                </tr>
                                <tr className="bg-gray-50 rounded-md overflow-hidden shadow">
                                    <td className="px-4 py-2 rounded-l-md">Meals</td>
                                    <td className="px-4 py-2">12 Jun, 2024</td>
                                    <td className="px-4 py-2">00.00</td>
                                    <td className="px-4 py-2">8100.00 MAD</td>
                                    <td className="px-4 py-2 rounded-r-md">
                                        <Button theme="gray">Paid</Button>
                                    </td>
                                </tr>
                                <tr className="text-right">
                                    <td colSpan={5} className="py-1"></td> {/* Space between rows */}
                                </tr>
                                <tr className="bg-gray-100 rounded-md overflow-hidden shadow">
                                    <td className="px-4 py-2 rounded-l-md">Bus Subscription</td>
                                    <td className="px-4 py-2">12 Jun, 2024</td>
                                    <td className="px-4 py-2">00.00</td>
                                    <td className="px-4 py-2">8100.00 MAD</td>
                                    <td className="px-4 py-2 rounded-r-md">
                                        <Button theme="gray">Paid</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={5} className="py-1"></td> {/* Space between rows */}
                                </tr>
                                <tr className="bg-gray-50 rounded-md overflow-hidden shadow">
                                    <td className="px-4 py-2 rounded-l-md">Meals</td>
                                    <td className="px-4 py-2">12 Jun, 2024</td>
                                    <td className="px-4 py-2">00.00</td>
                                    <td className="px-4 py-2">8100.00 MAD</td>
                                    <td className="px-4 py-2 rounded-r-md">
                                        <Button theme="gray">Paid</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={5} className="py-1"></td> {/* Space between rows */}
                                </tr>
                                <tr className="bg-gray-100 rounded-md overflow-hidden shadow">
                                    <td className="px-4 py-2 rounded-l-md">Bus Subscription</td>
                                    <td className="px-4 py-2">12 Jun, 2024</td>
                                    <td className="px-4 py-2">00.00</td>
                                    <td className="px-4 py-2">8100.00 MAD</td>
                                    <td className="px-4 py-2 rounded-r-md">
                                        <Button theme="gray">Paid</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={5} className="py-1"></td> {/* Space between rows */}
                                </tr>
                                <tr className="bg-gray-50 rounded-md overflow-hidden shadow">
                                    <td className="px-4 py-2 rounded-l-md">Meals</td>
                                    <td className="px-4 py-2">12 Jun, 2024</td>
                                    <td className="px-4 py-2">00.00</td>
                                    <td className="px-4 py-2">8100.00 MAD</td>
                                    <td className="px-4 py-2 rounded-r-md">
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
