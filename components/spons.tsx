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
import { FaExternalLinkAlt } from "react-icons/fa";

const Card: React.FC<any> = ({ adv }: any) => {
  const { imgUrl, name, link } = adv;
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
      <SocialButton label={"Linkedin"} href={link}>
        <FaExternalLinkAlt /> 
      </SocialButton>
    </Stack>
  );
};

const Spons = () => {
  return (
    <Container maxW="5xl" id={"sponsors"}>
      <Stack
        spacing={4}
        as={Container}
        maxW={"3xl"}
        textAlign={"center"}
        py={4}
        mb={10}
      >
        <Heading fontSize={{ base: "2xl", sm: "5xl" }} fontWeight={"bold"}>
          Our Sponsors
        </Heading>

        <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"}>
          Organisors
        </Heading>
      </Stack>
      <Flex
        wrap={"wrap"}
        gridGap={6}
        alignItems={"center"}
        justifyContent={"center"}
      >

        {Organisors.map((organisor) => (
          <Card key={organisor.name} adv={organisor} />
        ))}
      </Flex>
      <Stack
        spacing={4}
        as={Container}
        maxW={"3xl"}
        textAlign={"center"}
        py={4}
        mb={10}
      >
        <Flex flexDirection={{ base: "column", md: "row" }}>
        <Flex flexDirection={"column"} padding={"3rem"}>
          
        <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"} padding={"1rem"}>
          Gold Sponsor
        </Heading>
        <Flex
        wrap={"wrap"}
        gridGap={6}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"row"}
            >

        {gold_spons.map((spons) => (
          <Card key={spons.name} adv={spons} />
        ))}
        </Flex>
            </Flex>

            <Flex flexDirection={"column"} padding={"3rem"}>
            <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"} padding={"1rem"}>
          Silver Sponsor
        </Heading>
        <Flex
        wrap={"wrap"}
        gridGap={6}
        alignItems={"center"}
        justifyContent={"center"}
            >

        {silver_spons.map((spons) => (
          <Card key={spons.name} adv={spons} />
        ))}
        </Flex>
        </Flex>
            </Flex>
      </Stack>

      <Stack
        spacing={4}
        as={Container}
        maxW={"3xl"}
        textAlign={"center"}
        py={4}
        mb={10}
      >
        {/* <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"}>
          Silver Sponsor
        </Heading>
        <Flex
        wrap={"wrap"}
        gridGap={6}
        alignItems={"center"}
        justifyContent={"center"}
      >

        {silver_spons.map((spons) => (
          <Card key={spons.name} adv={spons} />
        ))}
      </Flex> */}
      </Stack>
    </Container>
  );
};

export default Spons;

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

const Organisors = [
  {
    imgUrl: "/iitm.png",
    name: "Indian Institute of Technology, Madras",
    link: "https://www.iitm.ac.in",
  },
  {
    imgUrl: "/indianrailways.png",
    name: "Indian Railway",
    link: "https://www.indianrail.gov.in/enquiry/StaticPages/StaticEnquiry.jsp?StaticPage=index.html",
  },
  {
    imgUrl: "/iitmparvatak.jpg",
    name: "IITM Pravartak",
    link: "https://iitmpravartak.org.in",
  },
  {
    imgUrl: "/saeindia.jpg",
    name: "SAEINDIA",
    link: "https://saeindia.org",
  },
  
];

const gold_spons = [
  {
    imgUrl: "/amittal.webp",
    name: "ArcelorMittal",
    link: "https://corporate.arcelormittal.com",
  }
];

const silver_spons = [
  {
    imgUrl: "/Ansys.jpg",
    name: "Ansys",
    link: "https://www.ansys.com/en-in",
  }
];
