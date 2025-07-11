import React from "react";
import Hero from "./Hero";
import LatestEvents from "./LatestEvents";
import Feature from "./Feature";
import Cta from "./Cta";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      <Hero />
      <LatestEvents />
      <Feature />
      <Cta />
      <Footer />
    </div>
  );
};

export default Home;
