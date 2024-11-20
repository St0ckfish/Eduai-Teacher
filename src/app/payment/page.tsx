import Container from "~/_components/Container"

function Payment() {
  return (
    <Container>
      <div className="w-full overflow-x-hidden rounded-md bg-bgPrimary p-4">
        <h1 className="text-2xl font-semibold">Payment</h1>
        <p className="mt-4 text-textSecondary">Choose payment method</p>
        
      </div>
    </Container>
  )
}

export default Payment