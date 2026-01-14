"use client"
import {
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  VisuallyHidden,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { FaLinkedin } from "react-icons/fa";

const Card: React.FC<any> = ({ adv }: any) => {
  const { imgUrl, name, titles, linkedin } = adv;
  return (
    <Stack
      spacing={3}
      direction={"column"}
      width={"300px"}
      
      justify={"center"}
      display={"flex"}
      align={"center"}
      textAlign={"center"}
    >
      <Image src={imgUrl} borderRadius={"full"} h={200} w={200} alt={imgUrl} />
      <Text fontSize={"lg"} fontWeight={"bold"}>
        {name}
      </Text>
      <Text fontSize={"md"} color={"gray.500"}>
        {titles}
      </Text>
      <SocialButton label={"Linkedin"} href={linkedin}>
        <FaLinkedin />
      </SocialButton>
    </Stack>
  );
};

const Advisors = () => {
  return (
    <Container maxW="5xl" id={"advisors"}>
      <Stack
        spacing={4}
        as={Container}
        maxW={"3xl"}
        textAlign={"center"}
        py={4}
        mb={10}
      >
        <Heading fontSize={{ base: "2xl", sm: "5xl" }} fontWeight={"bold"}>
          Our Advisors
        </Heading>
        <Text color={"gray.600"} fontSize={{ base: "sm", sm: "lg" }}>
          Guiding Wisdom: Our Esteemed Advisors Shaping the Path Forward
        </Text>
      </Stack>
      <Flex
        wrap={"wrap"}
        gridGap={6}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {advisors.map((advisor) => (
          <Card key={advisor.name} adv={advisor} />
        ))}
      </Flex>
    </Container>
  );
};

export default Advisors;

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      target="_blank"
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const advisors = [
  {
    imgUrl: "/sav.jpg",
    name: "Shri Ashwini Vaishnaw",
    titles: `Hon'ble Union Minister for Railways, Communications, Electronics and Information Technology of India`,
    linkedin: "https://www.linkedin.com/in/ashwini-vaishnaw-0b13a34/",
  },
  {
    imgUrl: "/sc.jpg",
    name: "Professor Satya Chakravarthy",
    titles: `Head, National Centre for Combustion R&D, & Dept. of Aerospace Engg., IIT Madras`,
    linkedin: "https://www.linkedin.com/in/satya-chakravarthy-51326241/",
  },
  {
    imgUrl: "/tmm.jpg",
    name: "Professor TM Muruganandam",
    titles: `Dept. of Aerospace Engg., IIT Madras`,
    linkedin: "https://www.linkedin.com/in/muruganandam-t-m-733253216/",
  },
  {
    imgUrl: "/rs.jpg",
    name: "Ravi Santhanam",
    titles: `Executive Coach - Leaders & Teams`,
    linkedin: "https://www.linkedin.com/in/muruganandam-t-m-733253216/",
  },
  {
    imgUrl: "/sr.jpg",
    name: "Seshan Rammohan",
    titles: `President Emeritus and Founding Board Member at IIT Madras Foundation`,
    linkedin: "https://www.linkedin.com/in/seshanrammohan/",
  },
  {
    imgUrl: "/arpit.jpg",
    name: "Arpit Garg",
    titles: `Founder, GHC`,
    linkedin: "https://www.linkedin.com/in/arpit-garg-b9286b217/",
  }
];
