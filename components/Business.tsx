// import { StarIcon } from '@chakra-ui/icons'
"use client";

import {
  Box,
  Container,
  SimpleGrid,
  Image,
  Icon,
  Flex,
  Heading,
  Text,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import { FcApproval, FcBullish, FcConferenceCall } from "react-icons/fc";
// import { IoAnalyticsSharp, IoLogoBitcoin, IoSearchSharp } from 'react-icons/io5'
// import { ReactElement } from 'react'
// import { BiMoney } from 'react-icons/bi'
// import { FaBusinessTime, FaMapMarkedAlt, FaMoneyBill } from 'react-icons/fa'

// interface FeatureProps {
//   text: string
//   iconBg: string
//   icon?: ReactElement
// }

// const Feature = ({ text, icon, iconBg }: FeatureProps) => {
//   return (
//     <Stack direction={'row'} align={'center'}>
//       <Flex w={8} h={8} align={'center'} justify={'center'} rounded={'full'} bg={iconBg}>
//         {icon}
//       </Flex>
//       <Text fontWeight={600}>{text}</Text>
//     </Stack>
//   )
// }

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
      bg={useColorModeValue("gray.50", "gray.800")}
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

export default function SplitWithImage() {
  return (
    <>
      <Container maxW={"7xl"} py={12}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={4}>
            <Text
              textTransform={"uppercase"}
              color={"blue.400"}
              fontWeight={600}
              fontSize={"sm"}
              bg={useColorModeValue("blue.50", "blue.900")}
              p={2}
              alignSelf={"flex-start"}
              rounded={"md"}
            >
              Our Vision
            </Text>
            <Heading>What is Global Hyperloop Competition ?</Heading>
            <Text color={"gray.500"} fontSize={"lg"}>
              The Global Hyperloop Competition 2025, hosted by the Indian
              Institute of Technology, Madras, introduces the Hyperloop to
              India, providing a global platform for innovative teams. It aims
              to showcase and propagate hyperloop concepts worldwide, fostering
              a transformative spirit among young minds in the field of
              transportation.
            </Text>
            <Text color={"gray.500"} fontSize={"lg"}>
              With a 400m tube on the edge we have a vision to conduct a global
              competition to foster innovation, collaboration, and technological
              advancement on a worldwide scale.{" "}
            </Text>
            {/* <Stack
            spacing={4}
            divider={
              <StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />
            }>
            <Feature
              icon={<Icon as={FaBusinessTime} color={'yellow.500'} w={5} h={5} />}
              iconBg={useColorModeValue('yellow.100', 'yellow.900')}
              text={'Business Planning'}
            />
            <Feature
              icon={<Icon as={FaMoneyBill} color={'green.500'} w={5} h={5} />}
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={'Financial Planning'}
            />
            <Feature
              icon={<Icon as={FaMapMarkedAlt} color={'purple.500'} w={5} h={5} />}
              iconBg={useColorModeValue('purple.100', 'purple.900')}
              text={'Market Analysis'}
            />
          </Stack> */}
          </Stack>
          <Flex>
            <Image
              rounded={"md"}
              alt={"feature image"}
              src={"/ghcomp.jpg"}
              objectFit={"cover"}
            />
          </Flex>
        </SimpleGrid>
      </Container>

      <Stack
        spacing={4}
        as={Container}
        maxW={"3xl"}
        textAlign={"center"}
        my={15}
      >
        <Heading fontSize={{ base: "2xl", sm: "5xl" }} fontWeight={"bold"}>
          GHC’s Mission
        </Heading>
        <Text color={"gray.600"} fontSize={{ base: "sm", sm: "lg" }}>
          Transcending borders in speed and innovation
        </Text>
      </Stack>

      <Container maxW={"5xl"} my={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          <Card
            heading={"The Hyperloop Vision"}
            icon={<Icon as={FcBullish} w={10} h={10} />}
            description={
              "By explaining the technologies involved in Hyperloop and its associated benefits - incredible speed, safety and sustainability - to people, GHC will ensure the development of a massive Hyperloop community over the years to revolutionalise the existing transport system."
            }
            href={"#"}
          />
          <Card
            heading={"The Conference"}
            icon={<Icon as={FcConferenceCall} w={10} h={10} />}
            description={
              "Serving as a stage for Hyperloop enthusiasts, the Conference gives an opportunity for networking and collaboration among students, academicians and industrialists in order to propel the research and development of the hyperloop technologies."
            }
            href={"#"}
          />
          <Card
            heading={"The Competition"}
            icon={<Icon as={FcApproval} w={10} h={10} />}
            description={
              "The Competetion aims to engage students and teams to ideate, innovate and develop. The competitive spirit will drive teams to showcase different perspectives on the hyperloop technology and assist its growth."
            }
            href={"#"}
          />
        </Flex>
      </Container>

      <Stack
        spacing={4}
        as={Container}
        maxW={"3xl"}
        textAlign={"center"}
        my={15}
      >
        <Heading fontSize={{ base: "2xl", sm: "5xl" }} fontWeight={"bold"}>
          GHC’s Vision
        </Heading>
      </Stack>

      <Container maxW={"5xl"} my={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          <Card
            heading={"Innovation"}
            description={
              "Foster a culture of creativity and innovation in Hyperloop research and development. Encourage experimentation and prototyping of new ideas and technologies. Develop innovative solutions to real-world problems"
            }
            href={"#"}
          />
          <Card
            heading={"Inclusion"}
            description={
              "Provide a platform for diverse stakeholders to share knowledge, resources, and expertise. Foster a community of students, professionals, and industries working together to advance Hyperloop technology. Promote diversity, equity, and inclusion in the development and deployment of Hyperloop systems"
            }
            href={"#"}
          />
          <Card
            heading={"Impletation"}
            description={
              "Design, build, and test scalable and sustainable Hyperloop systems. Collaborate with industries, governments, and academia to accelerate adoption. Develop standards and regulations for safe and efficient Hyperloop operations"
            }
            href={"#"}
          />
        </Flex>
      </Container>
    </>
  );
}
