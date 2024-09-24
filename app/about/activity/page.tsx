"use client";
import {
  Box,
  Container,
  Flex,
  HStack,
  Heading,
  Image,
  VStack,
  Text,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import { InstagramEmbed } from "react-social-media-embed";
import { AiOutlineLike } from "react-icons/ai";
import { CgComment } from "react-icons/cg";
import { IoIosSend } from "react-icons/io";

const LinkedInCard = ({
  image,
  title,
  postUrl,
}: {
  image: string;
  title: string;
  postUrl: string;
}) => {
  return (
    <VStack
      height={"fit-content"}
      as={"a"}
      target="_blank"
      href={postUrl}
      borderWidth={"1px"}
      bg={"gray.50"}
      py={6}
      rounded={"md"}
      maxWidth={"320px"}
      spacing={4}
    >
      <HStack spacing={4}>
        <Image
          src="https://media.licdn.com/dms/image/D560BAQHnhPt5WzYP9g/company-logo_100_100/0/1699265383714?e=1710374400&v=beta&t=GvHPws-aTOay5MdCQ7Y19avhHE7E9DFKn_2-lo2XbuQ"
          alt="ghc logo"
          h={10}
        />
        <VStack textAlign={"left"} align={"left"} spacing={0}>
          <Text color={"gray.900"} fontWeight={600}>
            Global Hyperloop Competition
          </Text>
          <Text color={"gray.500"} fontSize={"xs"}>
            78 followers
          </Text>
        </VStack>
      </HStack>

      <Box px={4}>
        <Text color={"gray.700"} fontSize={"sm"}>
          {title}
        </Text>
      </Box>

      <Image src={image} alt="post_image" width={"full"} />

      <HStack
        mt={4}
        pt={4}
        borderTopWidth={"1px"}
        borderColor={"gray.300"}
        w={"90%"}
        h={"fit-content"}
        spacing={4}
        color={"gray.600"}
        justifyContent={"space-evenly"}
      >
        <Icon boxSize={6} as={AiOutlineLike} />
        <Icon boxSize={6} as={CgComment} />
        <Icon boxSize={6} as={IoIosSend} />
      </HStack>
    </VStack>
  );
};

const Activity: React.FC<any> = () => {
  return (
    <Box w={"full"} px={0} overflowX={"hidden"}>
      <Navbar />
      <Container maxW={"3xl"} textAlign={"center"} p={8}>
        <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"}>
          Social Media Activity
        </Heading>
      </Container>

      <Container maxW={"6xl"} my={2} overflowX={"hidden"} mb={16}>
        <Container
          maxW={"3xl"}
          textAlign={"center"}
          mb={6}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Image alt="insta logo" src="/insta-logo.png" h={8} mr={4} />
          <Heading
            fontSize={{ base: "2xl", sm: "4xl" }}
            fontWeight={"bold"}
            w={"fit-content"}
          >
            Instagram
          </Heading>
        </Container>
        <Flex flexWrap="wrap" gridGap={10} justify="center">
          <InstagramEmbed
            url="https://www.instagram.com/p/DALXG31TS5j/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
            width={328}
          />
          <InstagramEmbed
            url="https://www.instagram.com/p/DALg8HCTHUv/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
            width={328}
          />
          <InstagramEmbed
            url="https://www.instagram.com/p/DALzwJ2TWmi/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
            width={328}
          />
        </Flex>
      </Container>

      <Container maxW={"6xl"} my={2} overflowX={"hidden"} mb={12}>
        <Container
          maxW={"3xl"}
          textAlign={"center"}
          mb={6}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Image alt="insta logo" src="/linkedin-logo.webp" h={16} mr={1} />
          <Heading
            fontSize={{ base: "2xl", sm: "4xl" }}
            fontWeight={"bold"}
            w={"fit-content"}
          >
            LinkedIn
          </Heading>
        </Container>
        <Flex flexWrap="wrap" gridGap={10} justify="center">
          <LinkedInCard
            title="Competition Category #1: Pod Demonstration Bring Your Hyperloop Vision to Life! 🌟
It’s time to turn your ideas into reality! Showcase your physical prototypes—whether it's a complete Hyperloop Pod or subsystems. "
            image="https://media.licdn.com/dms/image/D4D22AQF3OSiumJ_Snw/feedshare-shrink_1280/0/1706984737481?e=1712188800&v=beta&t=Xqt3OBJGkA8LPTlWeDGDGn-I3s22rf0vNrwbM5LjDEQ"
            postUrl="https://www.linkedin.com/posts/global-hyperloop-competition-iitm_competition-category-1-pod-demonstration-activity-7243223257858887680-2YF6?utm_source=share&utm_medium=member_desktop"
          />
          <LinkedInCard
            title="Check out our website https://lnkd.in/djfD6hEE to explore the various competition categories at the Global Hyperloop Competition 2025!"
            image="https://media.licdn.com/dms/image/D5622AQGOgr2LsF3SXg/feedshare-shrink_1280/0/1707753568809?e=1712188800&v=beta&t=YPVoYdV8uDGYzB98ORzC8cSWFhMHerQU7g39qtUfZM0"
            postUrl="https://www.linkedin.com/posts/global-hyperloop-competition-iitm_check-out-our-website-httpslnkdindjfd6hee-activity-7242044653494034433-B7nY?utm_source=share&utm_medium=member_desktop"
          />
          <iframe
            src="https://www.linkedin.com/embed/feed/update/urn:li:share:7162475629643345921"
            width="320"
            frameBorder="10"
            title="Embedded post"
          ></iframe>
        </Flex>
      </Container>
      <Footer />
    </Box>
  );
};

export default Activity;
