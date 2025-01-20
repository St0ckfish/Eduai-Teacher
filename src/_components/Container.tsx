import type { ReactNode } from "react";
import useLanguageStore, { useBooleanValue } from "~/APIs/store";
import { cn } from "~/lib/utils";

const Container = ({ children }: { children: ReactNode }) => {
  const { language } = useLanguageStore();
  const bool = useBooleanValue((state) => state.boolean);
  
  return (
    <div
      className={cn(
        "mx-3 mt-5 transition-transform duration-300 ease-in",
        {
          // LTR layout
          "lg:ml-[270px] lg:mr-3": bool && language !== "ar",
          "lg:ml-[100px] lg:mr-3": !bool && language !== "ar",
          // RTL layout
          "lg:mr-[270px] lg:ml-3": bool && language === "ar",
          "lg:mr-[100px] lg:ml-3": !bool && language === "ar",
        }
      )}
    >
      {children}
    </div>
  );
};

export default Container;