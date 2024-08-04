"use client";

import React from "react";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/Newsletter"
import Subscribe from "../components/Subscribe";
import HeroSection from "../components/HomeHero";
import Footer from "../components/Footer";
import Business from "../components/Business";
import FAQ from "../components/FAQ";
import { Box, Text } from "@chakra-ui/react";
import useGetTeam from "../utils/useGetTeam";
import { AnimatePresence, motion, usePresence } from "framer-motion";
import { gsap } from "gsap";
import SplitWithImage from "../components/SplitWithImage";

const Home: React.FC<any> = () => {
  return (
    <AnimatePresence mode="wait">
      <Box maxWidth={"full"}>
        <Navbar />
        <HeroSection />
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
