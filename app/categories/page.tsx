"use client";

import {
  Box,
  Container,
  Button,
  Image,
  Icon,
  Flex,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  AspectRatio,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { ReactElement } from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import { motion } from "framer-motion";
import { CheckCircleIcon } from "@chakra-ui/icons";

import Link from "next/link";

interface CardProps {
  heading: string;
  description?: string;
  icon?: ReactElement;
  href: string;
}

const Card = ({ heading, description, icon, href }: CardProps) => {
  return (
    <Box
      maxW={{ base: "full", md: "300px" }}
      w={"full"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={8}
      bg={useColorModeValue("white", "gray.900")}
    >
      <Stack align={"start"} spacing={2}>
        {icon && (
          <Flex
            w={16}
            h={16}
            align={"center"}
            justify={"center"}
            color={"white"}
            rounded={"full"}
            // bg={useColorModeValue("gray.200", "gray.700")}
          >
            {icon}
          </Flex>
        )}
        <Box mt={2}>
          <Heading size="md" mb={4}>
            {heading}
          </Heading>
          {description && (
            <Text mt={1} fontSize={"sm"}>
              {description}
            </Text>
          )}
        </Box>
        {/* <Button variant={'link'} colorScheme={'red'} size={'sm'}>
                    Learn more
                </Button> */}
      </Stack>
    </Box>
  );
};

const Page = () => {
  return (
    <>
      <Box bg={useColorModeValue("white", "gray.800")} maxW="full">
        <Navbar />

        <Stack
          spacing={4}
          as={Container}
          maxW={"7xl"}
          textAlign={"center"}
          my={15}
        >
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
            fontWeight={"bold"}
          >
            <Text as={"span"} color={"red.400"}>
              GHC 2025{" "}
            </Text>
            <Text as={"span"}>| Competition Categories</Text>
          </Heading>
        </Stack>

        <Container maxW={"7xl"} my={16}>
          <Flex flexWrap="wrap" gridGap={6} justify="space-evenly">
            <Card
              heading={"Pod Demonstration"}
              icon={<Image src={"/demo_comp.jpg"} alt="demo" w={10} h={10} />}
              description={
                "Compete with your subscale prototypes systems Run them in our vacuum environment tube, designed to mimic working conditions of full-scale Hyperloop"
              }
              href={"#"}
            />
            <Card
              heading={"DesignX BluePrint"}
              icon={
                <Image src={"/bluePrint.jpg"} alt="bluePrint" w={10} h={10} />
              }
              description={
                "Present your ideas, designs, research, and software simulations to an international jury of experts. Build a basis for your future prototypes to demonstrate and future iterations of GHC."
              }
              href={"#"}
            />
            <Card
              heading={"Hyperloop Innoquest"}
              icon={
                <Image src={"/caseStudy.jpg"} alt="caseStudy" w={10} h={10} />
              }
              description={
                " Understand the real-life problems in implementing new technologies at a large scale Bridge the implementation gap between industry and academia"
              }
              href={"#"}
            />
          </Flex>
        </Container>
        <Box
          py={{ base: 10, md: 14 }}
          mt={10}
          mx="auto"
          bg={useColorModeValue("gray.50", "gray.700")}
          rounded="md"
          shadow="md"
          maxW={"7xl"}
        >
          <Stack
            spacing={{ base: 8, md: 10 }}
            textAlign={"center"}
            align={"center"}
          >
            {/* Heading and Subheading */}
            <Heading
              lineHeight={1.2}
              fontWeight={600}
              fontSize={{ base: "3xl", sm: "4xl", lg: "5xl" }}
            >
              <Text as={"span"}>Register Now</Text>
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "md", lg: "lg" }}>
              Be part of an exclusive community that drives the future of
              transportation!
            </Text>

            <Text
              fontSize={"xl"}
              color={useColorModeValue("gray.700", "gray.300")}
              fontWeight={500}
            >
              Exclusive Benefits Include:
            </Text>

            {/* List of Benefits */}
            <List spacing={3} textAlign="left" mx="auto" maxW="4xl">
              <motion.div
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.2 }}
              >
                <ListItem height={10} fontSize={"xl"} borderRadius={10}>
                  <ListIcon as={CheckCircleIcon} color="green.400" />
                  Free participation and industry updates
                </ListItem>
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.2 }}
              >
                <ListItem height={10} fontSize={"xl"} borderRadius={10}>
                  <ListIcon as={CheckCircleIcon} color="green.400" />
                  Regular Updates to cutting-edge Hyperloop research
                </ListItem>
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.2 }}
              >
                <ListItem height={10} fontSize={"xl"} borderRadius={10}>
                  <ListIcon as={CheckCircleIcon} color="green.400" />
                  Exclusive acess To GHC Wiki
                </ListItem>
              </motion.div>
            </List>

            {/* Divider */}
            <Box borderBottom="2px solid" borderColor="gray.200" w="40%" />

            {/* Register Button */}
            <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
              <Link href={"/signup"}>
                <Button
                  rounded={"full"}
                  size={"lg"}
                  fontWeight={"bold"}
                  px={6}
                  colorScheme={"red"}
                  bg={"red.400"}
                  _hover={{ bg: "red.500" }}
                >
                  Register Now
                </Button>
              </Link>
            </motion.div>

            <Text fontSize={"lg"} color={"gray.500"} maxW={"3xl"}>
              "The Global Hyperloop Competition is the future of transportation
              innovation. Join us and be a part of this revolution!"
            </Text>
          </Stack>
        </Box>

        <Box width={"full"}>
          <Footer />
        </Box>
      </Box>
    </>
  );
};
export default Page;
