"use client";

import {
  Box,
  chakra,
  Container,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  IconButton,
  useColorModeValue,
  Image,
  HStack,
} from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { FaInstagram, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";
import Link from "next/link";

import { MdMail, MdPhone } from "react-icons/md";

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
      w={12}
      h={10}
      cursor={"pointer"}
      as={"a"}
      href={href}
      target="_blank"
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("red.500", "red.500"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

const FooterLink = ({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) => {
  return (
    <Link href={href}>
      <Box
        color={"gray.500"}
        _hover={{ color: "red.400", textDecoration: "underline" }}
      >
        {children}
      </Box>
    </Link>
  );
};

export default function LargeWithNewsletter() {
  const [email, setEmail] = useState("");

  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 2fr" }}
          spacing={8}
        >
          <Stack spacing={6}>
            <HStack>
              <Link href="/">
                <Image
                  alt="GHC_logo"
                  src={useColorModeValue(
                    "/GHC-LOGO-BLACK.png",
                    "/GHC-logo.png"
                  )}
                  h={6}
                />
              </Link>
            </HStack>
            <Text fontSize={"sm"}>© 2024 GHC . All rights reserved</Text>
            <Stack direction={"row"} spacing={6}>
              <SocialButton
                label={"Instagram"}
                href="https://www.instagram.com/ghc_india/"
              >
                <FaInstagram />
              </SocialButton>
              <SocialButton
                label={"Linkedin"}
                href={
                  "https://www.linkedin.com/company/global-hyperloop-competition-iitm/mycompany/"
                }
              >
                <FaLinkedin />
              </SocialButton>
              <SocialButton
                label={"Twitter"}
                href={"https://twitter.com/GHCIITM"}
              >
                <FaTwitter />
              </SocialButton>
              <SocialButton
                label={"YouTube"}
                href={
                  "https://www.youtube.com/channel/UCevcN_ISH3AZ5eujROl7UAQ"
                }
              >
                <FaYoutube />
              </SocialButton>
            </Stack>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <FooterLink href="/about/mission">Mission and Vision</FooterLink>
            <FooterLink href="/about/team">Our Team</FooterLink>
            <FooterLink href="/about/activity">Activity</FooterLink>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Support</ListHeader>
            <FooterLink href="#">Blog (Coming soon)</FooterLink>
            <FooterLink href="/contact">Contact us</FooterLink>
            <FooterLink href="mailto: ghc@smail.iitm.ac.in">Email</FooterLink>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Contact Us</ListHeader>
            <Stack direction={"row"} w={""}>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={"Your email address"}
                bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
                border={0}
                _focus={{
                  bg: "whiteAlpha.300",
                }}
                focusBorderColor="red.400"
              />
              <Link href={`/contact?email=${email}`}>
                <IconButton
                  bg={useColorModeValue("red.400", "red.600")}
                  color={useColorModeValue("white", "gray.200")}
                  _hover={{
                    bg: useColorModeValue("red.600", "red.400"),
                  }}
                  aria-label="Contact"
                  icon={<BiMailSend />}
                />
              </Link>
            </Stack>
            <Stack mt={6} direction={"row"} w="80%">
              <IconButton
                as="a"
                href="tel:+91 97408 71617"
                width={"50%"}
                icon={<MdPhone />}
                aria-label="phone"
              />
              <IconButton
                as="a"
                href="mailto: ghc@smail.iitm.ac.in"
                width={"50%"}
                icon={<MdMail />}
                aria-label="email"
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
