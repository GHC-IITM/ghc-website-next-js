"use client"

import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Icon,
  IconProps,
  useColorModeValue,
  AspectRatio,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaHeadSideVirus } from "react-icons/fa";
// import { Link } from "react-router-dom";
import Link from "next/link";

export default function LectureHero() {
  const [play, setPlay] = useState(false);

  return (
    <Container maxW={"7xl"} overflow={"hidden"} px={8} mb={10}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 12, md: 16 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 6 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text
              as={"span"}
              position={"relative"}
              zIndex={2}
              _after={{
                content: "''",
                width: "full",
                height: "20%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "red.400",
                zIndex: -1,
              }}
            >
              Explore Now,
            </Text>
            <br />
            <Text as={"span"} color={"red.400"}>
              The Hyperloop Way
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            The GHC online lecture series aims to educate the world about the
            Hyperloop, the technology involved, its feasibility, and its future.
            <br />
            Meet 5 leading Hyperloop teams from India - gain technical insights,
            and learn how to start your own Hyperloop team
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
              <Link target="_blank" href={"https://www.youtube.com/@GHCIITM"}>
                <Button
                  rounded={"full"}
                  size={"lg"}
                  fontWeight={"bold"}
                  px={6}
                  colorScheme={"red"}
                  bg={"red.400"}
                  _hover={{ bg: "red.500" }}
                  onClick={() => {
                    var elmntToView = document.getElementById("advisors");
                    elmntToView?.scrollIntoView();
                  }}
                >
                  Get Started
                </Button>
              </Link>
            </motion.div>

            <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
              <Button
                rounded={"full"}
                size={"lg"}
                fontWeight={"normal"}
                px={6}
                leftIcon={<FaHeadSideVirus color={"gray.300"} />}
                onClick={() => {
                  var elmntToView = document.getElementById("createdBy");
                  elmntToView?.scrollIntoView();
                }}
              >
                Learn More
              </Button>
            </motion.div>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <Blob
            w={"150%"}
            h={"150%"}
            position={"absolute"}
            top={"-25%"}
            left={0}
            zIndex={0}
            color={useColorModeValue("red.300", "red.400")}
          />
          <Box
            position={"relative"}
            height={{ base: "200px", md: "300px" }}
            rounded={"2xl"}
            boxShadow={"2xl"}
            width={"full"}
            overflow={"hidden"}
          >
            <AspectRatio h={"100%"} w={"100%"} ratio={1}>
              <iframe
                title="GHC Introduction"
                src="https://www.youtube.com/embed/Wm42-ni3RR4?si=kaqq63EyqST4L6Bo"
                allowFullScreen
              />
            </AspectRatio>
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}

const Blob = (props: IconProps) => {
  return (
    <Icon
      width={"100%"}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  );
};
