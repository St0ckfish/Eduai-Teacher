import PaymentClient from "./PaymentComponent";

export default async function Payment({ params }: {
  params: Promise<{ invoiceId: string }>
}) {
  const invoiceId = (await params).invoiceId;
  return <PaymentClient invoiceId={invoiceId} />;
}

