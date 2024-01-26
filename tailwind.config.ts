import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...fontFamily.sans],
        "sans-semibold": ["Poppins Semibold", ...fontFamily.sans],
        "sans-bold": ["Poppins Bold", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
