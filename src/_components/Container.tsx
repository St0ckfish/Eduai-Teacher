import type { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  // TODO: Add padding
  return <div
  className={`ml-3 mr-3 mt-5 lg:ml-[270px]`}>{children}</div>;
};

export default Container;
