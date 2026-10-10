import { Gate } from "@/components/gate/Gate";
import { StarList, gateStars } from "@/lib/stars";

export default function Home() {
  return <Gate stars={<StarList stars={gateStars()} />} />;
}
