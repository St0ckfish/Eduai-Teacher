import Link from "next/link";
import Container from "~/_components/Container";

const French = () => {
  return (
    <Container>
      <div className="flex w-full items-center justify-start gap-5">
        <Link href="/textbooks/" className="grid gap-2 rounded-xl bg-white p-6">
          <h1 className="text-xl font-semibold">English</h1>
          <p>
            <span className="font-medium text-primary">4</span> Number of grades{" "}
          </p>
        </Link>
        <Link
          href="/textbooks/french"
          className="grid gap-2 rounded-xl border border-primary bg-white p-6"
        >
          <h1 className="text-xl font-semibold">French</h1>
          <p>
            <span className="font-medium text-primary">2</span> Number of grades{" "}
          </p>
        </Link>
      </div>
      <div className="mt-10 w-full rounded-xl bg-white p-8"></div>
    </Container>
  );
};

export default French;
