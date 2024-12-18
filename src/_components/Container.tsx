import type { ReactNode } from "react";
import { useBooleanValue } from "~/APIs/store";

const Container = ({ children }: { children: ReactNode }) => {
    const bool = useBooleanValue((state) => state.boolean)
  return <div
  className={`ml-3 mr-3 mt-5 ${bool ? "lg:ml-[270px]" : "lg:ml-[100px]"} transition ease-in duration-300 transform`}>{children}</div>;
};

export default Container;
