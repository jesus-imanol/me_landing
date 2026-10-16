import { Anton_SC, Plus_Jakarta_Sans } from "next/font/google";

export const anton = Anton_SC({ variable: "--font-anton-sc", weight: "400", subsets: ["latin"] });
export const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  style: ["normal", "italic"],
});
