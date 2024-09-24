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
} from "@chakra-ui/react";
import {

  // FiTrendingUp,
  FiCompass,
  // FiStar,
  FiSettings,
 
  FiUpload,

} from "react-icons/fi";
import { IconType } from "react-icons";
import { FiHome, FiUser, FiChevronDown, FiMenu, FiBell, FiDownload, FiBriefcase, FiBookOpen } from "react-icons/fi"; // Imported required icons

import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import useGetTeam from "../../utils/useGetTeam";
// import { useNavigate, Link } from 'react-router-dom'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePresence, motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import gsap from "gsap";
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

const LinkItems: LinkItemProps[] = [
  { name: "Home", icon: FiHome, url: "/" },
  { name: "Team Details", icon: FiUser, url: "/dashboard" },
  { name: "Demonstration", icon: FiDownload, url: "/dashboard/submission1" },
  { name: "DesignX Blueprint", icon: FiBriefcase, url: "/dashboard/submission2" },
  { name: "Hyperloop Innoquest", icon: FiBookOpen, url: "/dashboard/submission3" },
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
            src={useColorModeValue("/GHC-LOGO-BLACK.png", "/GHC-logo.png")}
            h={6}
            alt="GHC_logo"
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
  const [team, isLoading] = useGetTeam();
  console.log(team);

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
                  <Avatar size={"sm"} src={team?.profilePictureUrl!} />
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
                {/* <Link href={"/dashboard/profile"}>
                  <MenuItem>Profile</MenuItem>
                </Link> */}
                {/* <Link href={"/dashboard/settings"}>
                  <MenuItem>Settings</MenuItem>
                </Link> */}

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

export const Loading: React.FC<any> = (props: any) => {
  const ref = useRef(null);
  const [isPresent, safeToRemove] = usePresence();
  const [team, isLoading] = useGetTeam();

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

const Detail = ({ label, value }: { label: string; value: string }) => {
  return (
    <HStack
      borderColor={useColorModeValue("gray.300", "gray.700")}
      borderBottomWidth={"1px"}
      w={"full"}
      py={4}
      px={8}
    >
      <Text fontWeight={600} color={useColorModeValue("gray.900", "gray.100")}>
        {label}:{" "}
      </Text>
      <Text fontSize={"xl"} color={useColorModeValue("gray.600", "gray.500")}>
        {value}
      </Text>
    </HStack>
  );
};

const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [team, isLoading] = useGetTeam();
  const [loading, setLoading] = useState<boolean>(true);
  const cardBgColor = useColorModeValue("white", "gray.800");

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      {loading ? (
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
            <VStack
              spacing={8}
              py={8}
              px={16}
              bg={cardBgColor}
              w={"fit-content"}
              borderRadius={"lg"}
              textAlign={"left"}
            >
              <Heading fontSize={{ base: "2xl", md: "5xl" }}>
                {team?.teamname}
              </Heading>

              <VStack textAlign={"left"} w={"full"} alignItems={"baseline"}>
                <Detail label="University" value={team?.homeUniversity} />
                <Detail label="Active members" value={team?.activemembers} />
                <Detail
                  label="Members attending event"
                  value={team?.attendeventmembers}
                />
                <Detail
                  label="Representative"
                  value={team?.teamrepresentetive}
                />
                <Detail
                  label="Representative Email"
                  value={team?.emailrepresentetive}
                />
                <Detail label="WhatsApp Number" value={team?.phone} />
                <Detail label="Country" value={team?.country} />
                <Detail label="Postal Code" value={team?.postalcode} />
              </VStack>
            </VStack>
          </Stack>
        </>
      )}
    </Box>
  );
};

export default SidebarWithHeader;
