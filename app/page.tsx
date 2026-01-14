"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Subscribe from "../components/Subscribe";
import HeroSection from "../components/HomeHero";
import Spons from "../components/spons";
import Footer from "../components/Footer";
import Business from "../components/Business";
import FAQ from "../components/FAQ";
import { Box } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";


const Home: React.FC<any> = () => {
  return (
    <AnimatePresence mode="wait">
      <Box maxWidth={"full"}>
        <Navbar />
        <HeroSection />
        <Spons />
        <Business />
        {/* <SplitWithImage /> */}
       
        <Subscribe />
        <FAQ />
        <Footer />
      </Box>
    </AnimatePresence>
  );
};

export default Home;
