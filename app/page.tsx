import HeroCarousel from "@/components/sections/HeroCarousel";
import SelectedWork from "@/components/sections/SelectedWork";
import ArtistIntro from "@/components/sections/ArtistIntro";
import ArtisticStatement from "@/components/sections/ArtisticStatement";
import Process from "@/components/sections/Process";
import Commissions from "@/components/sections/Commissions";
import ContactCTA from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <SelectedWork />
      <ArtistIntro />
      <ArtisticStatement />
      <Process />
      <Commissions />
      <ContactCTA />
    </>
  );
}
