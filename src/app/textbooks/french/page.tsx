import Link from "next/link";
import Container from "~/_components/Container";
import { Text } from "~/_components/Text";

const French = () => {
  return (
    <Container>
      <div className="flex w-full items-center justify-start gap-5">
        <Link href="/textbooks/" className="grid gap-2 rounded-xl bg-bgPrimary p-6">
          <Text font={"bold"} size={"2xl"}>English</Text>
          <div className="flex gap-2">
            <Text color={"primary"}>4</Text>
            <Text>Number of grades</Text>
          </div>
        </Link>
        <Link
          href="/textbooks/french"
          className="grid gap-2 rounded-xl border border-primary bg-bgPrimary p-6"
        >
          <Text font={"bold"} size={"2xl"}>French</Text>
          <div className="flex gap-2">
            <Text color={"primary"}>4</Text>
            <Text>Number of grades</Text>
          </div>
        </Link>
      </div>
      <div className="mt-10 w-full rounded-xl bg-bgPrimary p-8"></div>
    </Container>
  );
};

export default French;
