"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  Flex,
  VStack,
  useDisclosure,
  CloseButton,
  Image,
  useColorModeValue,
  Heading,
  HStack,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FiHome, FiUser, FiChevronDown, FiBriefcase, FiDownload, FiBookOpen } from "react-icons/fi";
import Link from "next/link";
import { useSession } from "next-auth/react";
import useGetTeam from "../../../../utils/useGetTeam";

interface LinkItemProps {
  name: string;
  icon: React.ComponentType;
  url?: string;
  hasDropdown?: boolean; // Added flag for dropdown items
}

const LinkItems: LinkItemProps[] = [
  { name: "Home", icon: FiHome, url: "/" },
  { name: "Team Details", icon: FiUser, url: "/dashboard" },
  { name: "Demonstration", icon: FiDownload, url: "/dashboard/submission1" },
  { name: "DesignX Blueprint", icon: FiBriefcase, url: "/dashboard/submission2" },
  { name: "Hyperloop Innoquest", icon: FiBookOpen, url: "/dashboard/submission3" },
];

const SidebarContent = ({ onClose }: { onClose: () => void }) => (
  <Box
    bg={useColorModeValue("white", "gray.900")}
    borderRight="1px"
    borderRightColor={useColorModeValue("gray.200", "gray.700")}
    w={{ base: "full", md: 60 }}
    pos="fixed"
    h="full"
  >
    <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
      <Link href="/">
        <Image
          src={useColorModeValue("/GHC-LOGO-gray.900.png", "/GHC-logo.png")}
          h={6}
          alt="GHC_logo"
        />
      </Link>
      <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
    </Flex>

    {LinkItems.map((link) =>
      link.hasDropdown ? (
        <Menu key={link.name}>
          <MenuButton as={Button} rightIcon={<FiChevronDown />} mx="4" mt="2">
            {link.name}
          </MenuButton>
          <MenuList>
            <Link href="/dashboard/submission1">
              <MenuItem>Demonstration</MenuItem>
            </Link>
            <Link href="/dashboard/submission2">
              <MenuItem>DesignX Blueprint</MenuItem>
            </Link>
            <Link href="/dashboard/submission3">
              <MenuItem>Hyperloop Innoquest</MenuItem>
            </Link>
          </MenuList>
        </Menu>
      ) : (
        <Link key={link.name} href={link.url || "/"}>
          <NavItem icon={link.icon}>{link.name}</NavItem>
        </Link>
      )
    )}
  </Box>
);

const NavItem = ({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType;
  children: React.ReactNode;
}) => (
  <Flex
    align="center"
    p="4"
    mx="4"
    borderRadius="lg"
    cursor="pointer"
    _hover={{ bg: "teal.500", color: "white" }}
    transition="background-color 0.2s ease-in-out"
  >
    {Icon && <Icon style={{ marginRight: "8px" }} />}
    {children}
  </Flex>
);

const Submissions = () => {
  const { onClose } = useDisclosure();
  const [team] = useGetTeam();
  const { data: session } = useSession();
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [file3, setFile3] = useState<File | null>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent onClose={onClose} />
      <VStack spacing={6} ml={{ base: 0, md: 60 }} p="8">
        <Heading as="h1" size="xl" mb={4}>
          Submission Dashboard
        </Heading>
        <Divider />
        <Box flexDirection={{ base: "column", md: "row" }}>
          <Heading
            as="h2"
            size="lg"
            mx="auto"
            textAlign="center"
            fontWeight="semibold"
            mb={4}
            color="teal.500"
          >
            Hyperloop Innoquest
          </Heading>
        </Box>
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.900", "gray.100")}
        >
          Submissions for Hyperloop Innoquest will start soon.
        </Text>

        {/* Placeholder when no submissions are uploaded */}
      </VStack>
    </Box>
  );
};

export default Submissions;
