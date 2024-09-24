"use client";

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorMode,
  Image,
  Heading,
  Stack,
  Button,
  FormControl,
  Input,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import {
  FiHome,
  FiCompass,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiUser,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { DeleteIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import useGetTeam from "../../../utils/useGetTeam";
// import { useNavigate, Link } from 'react-router-dom'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePresence, motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { MdBuild } from "react-icons/md";
import { signOut, useSession } from "next-auth/react";
import { TbListDetails } from "react-icons/tb";

interface LinkItemProps {
  name: string;
  icon: IconType;
  url?: string;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
}

interface MobileProps extends FlexProps {
  headName: string;
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, url: "/" },
  { name: "Team Details", icon: TbListDetails, url: "/dashboard" },
  // { name: "Explore", icon: FiCompass, url: "/about/activity" },
  // { name: "Settings", icon: FiSettings, url: "/dashboard/settings" },
  { name: "Profile", icon: FiUser, url: "/dashboard/profile" },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Link href="/">
          <Image
            src={useColorModeValue("/GHC-LOGO-gray.900.png", "/GHC-logo.png")}
            h={6}
            alt="Ghc_logo"
          />
        </Link>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <Link key={link.name} href={link.url || "/"}>
          <NavItem icon={link.icon}>{link.name}</NavItem>
        </Link>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "red.500",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, headName, ...rest }: MobileProps) => {
  const navigate = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const { data: session } = useSession();

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
        {/* <Text
                    display={{ base: 'flex', md: 'none' }}
                    fontSize="2xl"
                    fontFamily="monospace"
                    fontWeight="bold">
                    GHC
                </Text> */}
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
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} src={session?.user?.image!} />
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
            <MenuList
            // bg={useColorModeValue('white', 'gray.900')}
            // borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <Link href={"/dashboard/profile"}>
                <MenuItem>Profile</MenuItem>
              </Link>
              {/* <Link href={"/dashboard/settings"}>
                <MenuItem>Settings</MenuItem>
              </Link> */}

              <MenuDivider />
              <MenuItem onClick={handleLogout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const Loading = () => {
  const ref = useRef(null);
  const [isPresent, safeToRemove] = usePresence();
  const [isLoading] = useGetTeam();

  const show = {
    opacity: 1,
    display: "block",
  };

  const hide = {
    opacity: 0,
    transitionEnd: {
      display: "none",
    },
  };

  useEffect(() => {
    if (!isPresent) {
      gsap.to(ref.current, {
        opacity: 0,
        onComplete: () => safeToRemove?.(),
      });
    }
  }, [isPresent, safeToRemove]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isLoading ? show : hide}
      ref={ref}
      transition={{ ease: "easeOut", duration: 3 }}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        transition={"all ease 12s"}
        height={"100vh"}
        width={"100vw"}
      >
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: 10 }}
          transition={{ ease: "easeIn" }}
        >
          <Text fontWeight={"extrabold"} fontSize={"6xl"}>
            GHC
          </Text>
        </motion.div>
      </Box>
    </motion.div>
  );
};

const ProfilePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [team, isLoading] = useGetTeam();
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { data: session } = useSession();
  const toast = useToast();
  const toastShown = useRef(false);

  useEffect(() => {
    if (!toastShown.current) {
      toast({
        title: "Website Under Development",
        description:
          "This website is currently under development. Features may be incomplete.",
        status: "info",
        duration: 2500,
        isClosable: true,
      });
      toastShown.current = true;
    }
  }, [toast]);

  const bgColor = useColorModeValue("white", "gray.900");

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <SidebarContent
            onClose={() => onClose}
            display={{ base: "none", md: "block" }}
          />
          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            returnFocusOnClose={false}
            onOverlayClick={onClose}
            size="full"
          >
            <DrawerContent>
              <SidebarContent onClose={onClose} />
            </DrawerContent>
          </Drawer>
          {/* mobilenav */}
          <MobileNav headName={team?.teamrepresentetive} onOpen={onOpen} />
          <Stack
            ml={{ base: 0, md: 60 }}
            p="8"
            justify={"center"}
            align={"center"}
          >
            {/* Content */}
            <VStack spacing={6}>
              <Avatar
                size={"3xl"}
                src={session?.user?.image!}
                alignSelf={{ base: "flex-start", sm: "center" }}
              />

              <Heading
                fontWeight={600}
                fontSize={"3xl"}
                alignSelf={{ base: "flex-start", sm: "center" }}
              >
                {" "}
                Welcome, {team?.teamrepresentetive}!
              </Heading>
              <Text fontWeight={400} fontSize={"1xl"} opacity={0.7}>
                {" "}
                Manage your info, team details, and security to make the best
                out of our website.
              </Text>

              <Stack
                direction={{ base: "column", sm: "row" }}
                alignSelf={{ base: "flex-start", sm: "center" }}
                spacing={6}
              >
                <Link href={"/dashboard/settings"}>
                  <Button
                    leftIcon={<MdBuild />}
                    colorScheme="green"
                    variant="solid"
                  >
                    Settings
                  </Button>
                </Link>

                <Button
                  leftIcon={<DeleteIcon />}
                  colorScheme="red"
                  variant="solid"
                >
                  Delete Account
                </Button>
              </Stack>

              {/* <VStack
                mt={10}
                w={"full"}
                alignItems={"flex-start"}
                bg={bgColor}
                borderWidth={"1px"}
                borderRadius={"md"}
              >
                <VStack
                  p={8}
                  pb={0}
                  spacing={4}
                  mb={4}
                  textAlign={"left"}
                  alignItems={"flex-start"}
                >
                  <Heading fontSize={"2xl"}>{"Verify Your Email"}</Heading>
                  <Text fontSize={"sm"}>
                    Verify your email to start using all of our websites
                    features!
                  </Text>
                  <FormControl isRequired isDisabled id={"Verify Your Email"}>
                    <Input
                      focusBorderColor="red.400"
                      type={"email"}
                      onChange={(e) => setEmail(e.target.value)}
                      value={team?.email}
                    />
                  </FormControl>
                </VStack>

                <VStack borderTopWidth={"1px"} w={"full"} px={8} py={4}>
                  <HStack justifyContent={"flex-end"} w={"full"}>
                    <Button
                      size="sm"
                      bg={"gray.100"}
                      color={"gray.900"}
                      _hover={{ opacity: 0.7 }}
                      variant="solid"
                    >
                      Verify
                    </Button>
                  </HStack>
                </VStack>
              </VStack>

              <VStack
                mt={10}
                w={"full"}
                alignItems={"flex-start"}
                bg={bgColor}
                borderWidth={"1px"}
                borderRadius={"md"}
              >
                <VStack
                  p={8}
                  pb={0}
                  spacing={4}
                  mb={4}
                  textAlign={"left"}
                  alignItems={"flex-start"}
                >
                  <Heading fontSize={"2xl"}>Change Password</Heading>
                  <Text fontSize={"sm"}>
                    Empower Your Security: Renew Your Shield with a New
                    Password!
                  </Text>
                  <FormControl w={"full"} isRequired id={"Change Password"}>
                    <FormLabel>Old Password</FormLabel>
                    <Input
                      focusBorderColor="red.400"
                      type={"password"}
                      onChange={(e) => setOldPassword(e.target.value)}
                      value={oldPassword}
                    />
                  </FormControl>
                  <FormControl isRequired id={"New Password"}>
                    <FormLabel>New Password</FormLabel>
                    <Input
                      focusBorderColor="red.400"
                      type={"password"}
                      onChange={(e) => setNewPassword(e.target.value)}
                      value={newPassword}
                    />
                  </FormControl>
                </VStack>

                <VStack borderTopWidth={"1px"} w={"full"} px={8} py={4}>
                  <HStack justifyContent={"space-between"} w={"full"}>
                    <Text fontSize={"sm"} opacity={0.7}>
                      Use maximum 32 characters.
                    </Text>
                    <Button
                      size="sm"
                      bg={"gray.100"}
                      color={"gray.900"}
                      _hover={{ opacity: 0.7 }}
                      variant="solid"
                    >
                      Confirm
                    </Button>
                  </HStack>
                </VStack>
              </VStack> */}
            </VStack>
          </Stack>
        </>
      )}
    </Box>
  );
};

export default ProfilePage;
