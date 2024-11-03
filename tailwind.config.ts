import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      
    },
    colors: {
      "primary" : "#3E5AF0",
      "bgSecondary" : "#f5f6fa",
      "bgPrimary" : "#ffffff"
    }
  },
  plugins: [],
} satisfies Config;
