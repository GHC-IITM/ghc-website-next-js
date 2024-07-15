"use client";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Flex,
  Text,
  Container,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";

export default function SimpleAccordion() {
  return (
    <Flex
      minH={"50vh"}
      align={"center"}
      marginBottom={"5%"}
      justify={"center"}
      flexDirection={"column"}
      //   bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Text fontWeight={600} fontSize={"4xl"} padding={5}>
        FAQs
      </Text>
      <Container>
        <Accordion allowMultiple width="100%" maxW="lg" rounded="lg">
          <AccordionItem>
            <AccordionButton
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p={4}
            >
              <Text fontSize="xl">What is GHC?</Text>
              <ChevronDownIcon fontSize="24px" />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text color="gray.500">
                GHC is a student-run organisation, which aims to conduct the
                Global Hyperloop Competition and create an international
                collaborative Hyperloop community.
              </Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p={4}
            >
              <Text fontSize="xl" textAlign={"left"} pr={4}>
                {" "}
                What was the Global Hyperloop Conference?
              </Text>
              <ChevronDownIcon fontSize="24px" />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text color="gray.500">
                Parivahan Global Hyperloop Conference was an international
                scientific conference in April 2024. Conducted by GHC, it was
                attended by delegates, researchers, startup founders and
                students from all across the world.
              </Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton
              display="flex"
              // alignItems="center"
              justifyContent="space-between"
              p={4}
            >
              <Text fontSize="xl" textAlign={"left"} pr={4}>
                What are the other events that will be conducted by GHC in the
                future?
              </Text>
              <ChevronDownIcon fontSize="24px" />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text color="gray.500">
                The GHC is poised to conducted the inauguration of its 422 m
                track-&-tube in 2024 and conduct the Parivahan Global Hyperloop
                Competition in 2025. More details will be
                released with due time.
              </Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p={4}
            >
              <Text fontSize="xl">How do I take part in GHC events?</Text>
              <ChevronDownIcon fontSize="24px" />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text color="gray.500">
                We will be releasing a newsletter soon, for now just stay tuned
                on our socials.
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Container>
    </Flex>
  );
}
