"use client";

import {
  Box,
  Text,
  Container,
  Heading,
  LinkBox,
  LinkOverlay,
  VStack,
  Flex,
  useColorModeValue,
  Grid,
} from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useEffect } from "react";

const Documents = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Function to calculate the time difference
  const timeDifference = (date: string) => {
    const now = new Date();
    const pastDate = new Date(date);
    const diff = now.getTime() - pastDate.getTime(); // Convert to milliseconds
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days < 5) {
      return `New`;
    } else {
      return `${days} days ago`;
    }
  };

  return (
    <Container maxW={"7xl"}>
      <Navbar />

      <Flex
        direction="row"
        align="center"
        justify="center"
        minHeight="70vh"
        wrap={"wrap"}
        p={4}
      >
        <VStack width={"100%"} spacing={8} align="center" textAlign="center">
          <Heading
            as="h1"
            size="2xl"
            color={useColorModeValue("teal.600", "teal.300")}
          >
            Document Archive
          </Heading>
          <Text fontSize="xl" color={useColorModeValue("gray.600", "gray.300")}>
            Explore our collection of documents and resources
          </Text>

          <Flex
            wrap={"wrap"}
            width={"100%"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
            gap={6}
          >
            <LinkBox
              as="article"
              maxW="sm"
              p={5}
              borderWidth={10}
              rounded="lg"
              shadow="md"
              bg={useColorModeValue("white", "gray.700")}
              transition="transform 0.2s"
              _hover={{ transform: "scale(1.05)" }}
            >
              <Box
                as="time"
                dateTime="2024-06-03T15:30:00Z"
                color={useColorModeValue("gray.500", "gray.400")}
              >
                {timeDifference("2024-06-25T15:30:00Z")}
              </Box>
              <Heading size="md" my={2}>
                <LinkOverlay
                  href="https://ghc-document.s3.ap-south-1.amazonaws.com/GHC+2025+R%26R+Version+1.0+22-08.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  color={useColorModeValue("teal.500", "teal.300")}
                >
                  Rules and Regulation Version 1.0{" "}
                </LinkOverlay>
              </Heading>
              <Text color={useColorModeValue("gray.600", "gray.300")}>
                GLOBAL HYPERLOOP COMPETITION 2025
              </Text>
            </LinkBox>

            <LinkBox
              as="article"
              maxW="sm"
              p={5}
              borderWidth={10}
              rounded="lg"
              shadow="md"
              bg={useColorModeValue("white", "gray.700")}
              transition="transform 0.2s"
              _hover={{ transform: "scale(1.05)" }}
            >
              <Box
                as="time"
                dateTime="2024-06-03T15:30:00Z"
                color={useColorModeValue("gray.500", "gray.400")}
              >
                {timeDifference("2024-06-03T15:30:00Z")}
              </Box>
              <Heading size="md" my={2}>
                <LinkOverlay
                  href="https://ghc-document.s3.ap-south-1.amazonaws.com/GHC+2025+Track+%26+Tube+Documentation.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  color={useColorModeValue("teal.500", "teal.300")}
                >
                  Track and Tube Document
                </LinkOverlay>
              </Heading>
              <Text color={useColorModeValue("gray.600", "gray.300")}>
                GLOBAL HYPERLOOP COMPETITION 2025
              </Text>
            </LinkBox>
          </Flex>
        </VStack>
      </Flex>

      <Box width={"full"} mt={8}>
        <Footer />
      </Box>
    </Container>
  );
};

export default Documents;
