"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  Box,
  Button,
  Input,
  Text,
  Flex,
  FlexProps,
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
  IconButton,
  Avatar,
  MenuDivider,
  useColorMode,
} from "@chakra-ui/react";
import { FiHome, FiUser, FiChevronDown, FiMenu, FiBell, FiDownload, FiBookOpen, FiBriefcase } from "react-icons/fi"; // Imported required icons
import Link from "next/link";
import { useSession, signOut } from "next-auth/react"; // Import signOut
import useGetTeam from "../../../../utils/useGetTeam"; // Assuming this hook is correct
import { useRouter } from "next/router"; // Import useRouter
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { app } from "../firebase/config";
import { app } from "../../../../firebase/config";

interface LinkItemProps {
  name: string;
  icon: React.ComponentType;
  url?: string;
  hasDropdown?: boolean;
}

interface NavItemProps extends FlexProps {
  icon: React.ComponentType;
  children: React.ReactNode;
}

interface MobileProps extends FlexProps {
  headName: string;
  onOpen: () => void;
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
              <MenuItem>Pod Demonstration</MenuItem>
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
  ...rest
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
    {...rest}
  >
    {Icon && <Icon />}
    {children}
  </Flex>
);

const MobileNav = ({ onOpen, headName, ...rest }: MobileProps) => {
  const navigate = useRouter(); // Added useRouter hook for navigation
  const { colorMode, toggleColorMode } = useColorMode();
  const [team, isLoading] = useGetTeam();

  function handleLogout() {
    signOut({ redirect: false });
    navigate.push("/");
  }

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Link href="/">
        <Image
          display={{ base: "flex", md: "none" }}
          src={useColorModeValue("/GHC-LOGO-BLACK.png", "/GHC-logo.png")}
          h={6}
          alt="GHC_Logo"
        />
      </Link>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          onClick={toggleColorMode}
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        />
        <Flex alignItems={"center"}>
          {isLoading ? (
            <>...</>
          ) : (
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack>
                  <Avatar size={"sm"} src={team?.profilePictureUrl || ""} />{" "}
                  {/* Handled undefined or null profile picture */}
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">{headName}</Text>
                    <Text fontSize="xs" color="gray.600">
                      Team Rep
                    </Text>
                  </VStack>
                  <Box display={{ base: "none", md: "flex" }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuDivider />
                <MenuItem onClick={handleLogout}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </HStack>
    </Flex>
  );
};

const Submissions = () => {
  const { onClose } = useDisclosure();
  const storage = getStorage(app);
  const [designFileUrl, setdesignFileUrl] = useState<File | null>(null);
  const [team] = useGetTeam();
  const [loading, setLoading] = useState(false); // Loading state

  const handleUpload = async () => {
    const file = designFileUrl; // Get the file from the input element

    if (file) {
      console.log(`Uploading file: ${file.name}`);
      const fileId = uuidv4(); // Generate a unique ID for the file

      try {
        // 1. Upload file to Firebase Storage
        const fileRef = ref(
          storage,
          `submissions/design/${team?.uid}/${fileId}`
        ); // Use fileId in the path to avoid name conflicts
        const snapshot = await uploadBytes(fileRef, file); // Upload the file to the reference
        console.log("File uploaded to Firebase Storage.");

        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log(`File available at: ${downloadURL}`);

        return downloadURL;
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Failed to upload file");
        return null;
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const downloadURL = await handleUpload();
    try {
      setLoading(true); // Set loading state to true
      const response = await fetch("/api/filesubmission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: team?.email,
          designFileUrl: downloadURL,
        }),
      });

      if (!response.ok) {
        alert("Failed to upload design file");
        throw new Error("Failed to upload the design file");
      }

      const data = await response.json();

      if (!data.success) {
        alert("Failed to upload design file");
        throw new Error("Failed to upload the design file");
      }

      alert("Design file uploaded successfully!");
    } catch (error) {
      console.error("Error uploading design file:", error);
      alert("Failed to upload design file");
    } finally {
      setLoading(false); // Reset loading
    }
  };

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent onClose={onClose} />
      <VStack spacing={6} p="8">
        <Heading as="h1" size="lg">
          Submission Dashboard
        </Heading>
        <Divider />
        <form onSubmit={handleSubmit}>
          <Heading
            as="h2"
            size="lg"
            fontWeight="semibold"
            mt={4}
            mb={4}
            color="teal.500"
          >
            DesignX Blueprint
          </Heading>
          <HStack spacing={8} justifyContent="space-around" w="full">
            <Box
              w="full"
              bg={"teal.600"}
              boxShadow={"2xl"}
              p={4}
              maxW="500px"
              borderRadius="md"
            >
              <Heading size="md" mb={4}>
                Registration Design Submission (RDS)
              </Heading>
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setdesignFileUrl(e.target.files[0]);
                  }
                }}
              />
            </Box>
          </HStack>

          <Button type="submit" colorScheme="teal" isLoading={loading} mt={4}>
            Submit
          </Button>
        </form>
      </VStack>
    </Box>
  );
};

export default Submissions;
