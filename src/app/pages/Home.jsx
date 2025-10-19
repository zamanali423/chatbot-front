"use client";
import HeroSection from "../../components/home/HeroSection";
import Integrations from "../../components/home/Integrations";
import FeaturesSection from "../../components/home/FeaturesSection";
import LevelUpSection from "../../components/home/LevelUpSection";
import CapabilitiesSection from "../../components/home/CapabilitiesSection";
import PricingSection from "../../components/home/PricingSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <>
      <Navbar/>
      <section id="home">
        <HeroSection />
      </section>
      <section id="product">
        <FeaturesSection />
      </section>
      <section id="integrations">
        <Integrations />
      </section>
      <div
        style={{
          backgroundImage: "url('/assets/images/bg_hero.svg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <CapabilitiesSection />
        <section id="pricing">
          <PricingSection />
        </section>
        <LevelUpSection />
      </div>
      <Footer/>
    </>
  );
};

export default Home;
