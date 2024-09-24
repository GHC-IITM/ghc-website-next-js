"use client";
import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { IoAnalyticsSharp, IoSearchSharp } from "react-icons/io5";
import { ReactElement } from "react";
// import { Link } from "react-router-dom";
import Link from "next/link";
import { RiFlashlightLine } from "react-icons/ri";
import CardWithIllustration from "./CardWithIllustrations"

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function FollowWAChannel() {
  return (
    <Container maxW={"7xl"} py={12} px={8}>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, md: 20 }}
        placeItems={"center"}
        alignSelf={"center"}
      >
        <Stack spacing={4}>
          <Text
            // textTransform={"uppercase"}
            color={"blue.400"}
            fontWeight={600}
            fontSize={"sm"}
            bg={useColorModeValue("blue.50", "blue.900")}
            p={2}
            alignSelf={"flex-start"}
            rounded={"md"}
          >
            REGULAR UPDATES
          </Text>
          <Heading>Join the club!</Heading>
          <Text color={"gray.500"} fontSize={"lg"}>
            We are here to collaborate and learn about every aspect of the
            hyperloop technology together. We’re truly excited to show you what
            we have in store for you and cannot wait to make the Global
            Hyperloop Competition a reality!🔥
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <Feature
              icon={
                <Icon as={IoAnalyticsSharp} color={"yellow.500"} w={5} h={5} />
              }
              iconBg={useColorModeValue("yellow.100", "yellow.900")}
              text={"Learn"}
            />
            <Feature
              icon={
                <Icon as={RiFlashlightLine} color={"green.500"} w={5} h={5} />
              }
              iconBg={useColorModeValue("green.100", "green.900")}
              text={"Hyperloop Technology"}
            />
            <Feature
              icon={
                <Icon as={IoSearchSharp} color={"purple.500"} w={5} h={5} />
              }
              iconBg={useColorModeValue("purple.100", "purple.900")}
              text={"Discover"}
            />
          </Stack>
        </Stack>
        <Flex>
          <CardWithIllustration />
        </Flex>
      </SimpleGrid>
    </Container>
  );
}