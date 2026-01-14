"use client";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer"
import { ParallaxScroll } from "../../components/ui/parallax-scroll";
import {motion} from 'framer-motion'

export default function ParallaxScrollDemo() {
  return (
    <>
      <Navbar />
      <Box px={{ base: 6, md: 12 }} py={10} textAlign="center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <VStack spacing={4}>
            <Heading as="h1" size="2xl" color="gray.100">
              GHC 2025 Gallery
            </Heading>
            <Text fontSize="lg" color="gray.400" maxW="3xl">
              Take a look at some of the highlights from the event!
            </Text>
          </VStack>
        </motion.div>
      </Box>

      <ParallaxScroll images={images} />
      <Footer />
    </>
  );
}

const images = [
  "/gallery1.jpg",
  "/gallery2.jpg",
  "/gallery3.jpg",
  "/gallery4.jpg",
  "/gallery5.jpg",
  "/gallery6.jpg",
  "/gallery8.jpg",
  "/gallery7.jpg",
  "/gallery9.jpg",
  "/gallery10.jpg",
  "/gallery11.jpg",
  "/gallery12.jpg",
];
