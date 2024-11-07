import Link from "next/link";
import Container from "~/_components/Container";

const French = () => {
    return ( 
        <Container>
            <div className="flex w-full items-center justify-start gap-5">
                <Link href="/textbooks/" className="rounded-xl p-6 bg-white grid gap-2">
                    <h1 className="font-semibold text-xl">English</h1>
                    <p><span className="font-medium text-primary">4</span> Number of grades </p>
                </Link>
                <Link href="/textbooks/french" className="rounded-xl p-6 bg-white border border-primary grid gap-2">
                    <h1 className="font-semibold text-xl">French</h1>
                    <p><span className="font-medium text-primary">2</span> Number of grades </p>
                </Link>
            </div>
            <div className="mt-10 bg-white rounded-xl p-8 w-full">

            </div>
        </Container>
     );
}
 
export default French;