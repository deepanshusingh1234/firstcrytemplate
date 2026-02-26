import Image from "next/image";
import HeroSlider from "../components/HeroSlider";
import Boutiques from "@/components/Boutiques";

import CPID from "@/components/CPID";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <Boutiques />
      <CPID />


    </>
  );
}
