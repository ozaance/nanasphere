import type { Metadata } from "next";
import { Recit } from "@/components/recit/Recit";

export const metadata: Metadata = {
  title: "Ton ciel · Nanasphère",
};

export default function RecitPage() {
  return <Recit />;
}
