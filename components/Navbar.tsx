"use client";

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useColorMode,
  Image,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useGetTeam from "../utils/useGetTeam";
import { FaChevronDown, FaFileAlt, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { Loading } from "@/app/dashboard/page";
import { RiDashboard3Fill } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useRouter();
  const spacing_bk = useBreakpointValue({ sm: 1, md: 4 });
  const { data: session } = useSession();
  const [team, isLoading] = useGetTeam();

  async function handleLogout() {
    await signOut({ redirect: false });
    navigate.push("/login");
  }

  return (
    <Box
      zIndex={100}
      position={"sticky"}
      top={0}
      left={0}
      w={"full"}
      boxShadow={"md"}
    >
      <Flex
        bg={useColorModeValue("gray.100", "gray.900")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
        justify={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "left", md: "start" }}
          alignItems={"center"}
        >
          <Link href={"/"}>
            <Image
              src={useColorModeValue("/GHC-LOGO-BLACK.png", "/GHC-logo.png")}
              h={6}
              alt={"Global Hyperloop Competition logo"}
            />
          </Link>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={spacing_bk}
          align={"center"}
        >
          <>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            {isLoading ? (
              <Text>...</Text>
            ) : (
              <>
                {session?.user ? (
                  <>
                    <Link href={"/dashboard"}>
                      <motion.div
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Button
                          fontSize={"sm"}
                          rounded={"full"}
                          // display={{ base: 'none', md: 'inline-flex' }}
                          fontWeight={600}
                          colorScheme={"red"}
                          bg={"red.400"}
                          _hover={{
                            bg: "red.500",
                          }}
                          rightIcon={<RiDashboard3Fill fontSize={"20"} />}
                        >
                          Dashboard
                        </Button>
                      </motion.div>
                    </Link>
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Button
                        fontSize={"sm"}
                        rounded={"full"}
                        display={{ base: "none", md: "inline-flex" }}
                        fontWeight={600}
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </motion.div>
                  </>
                ) : (
                  <Link href={"https://drive.google.com/file/d/1JqdF2sRRrBUIB11fFEkhHMLb8VppM6pR/view?usp=sharing"}>
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Button
                        fontSize={"sm"}
                        rounded={"full"}
                        // display={{ base: 'none', md: 'inline-flex' }}
                        fontWeight={600}
                        colorScheme={"red"}
                        bg={"red.400"}
                        _hover={{
                          bg: "red.500",
                        }}
                        rightIcon={<FaFileAlt />}
                      >
                        Event Guide
                      </Button>
                    </motion.div>
                  </Link>
                )}
              </>
            )}
          </>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav handleLogout={handleLogout} />
      </Collapse>
    </Box>
  );
}

const DesktopNav: React.FC<any> = () => {
  const linkColor = useColorModeValue("gray.900", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const bgHoverColor = useColorModeValue("gray.200", "gray.700");
  const popoverContentBgColor = useColorModeValue("white", "gray.900");

  return (
    <>
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label}>
            <Popover trigger={"hover"} placement={"bottom-start"}>
              <PopoverTrigger>
                <Link href={navItem.href ?? "#"}>
                  <Box
                    px={4}
                    py={2}
                    fontSize={"m"}
                    fontWeight={"medium"}
                    color={linkColor}
                    _hover={{
                      textDecoration: "none",
                      color: linkHoverColor,
                      bg: bgHoverColor,
                    }}
                    rounded={"md"}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    {navItem.label}
                    {navItem.children && <Icon as={FaChevronDown} ml={2} />}
                  </Box>
                </Link>
              </PopoverTrigger>

              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={"xl"}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={"xl"}
                  minW={"sm"}
                  mt={2}
                >
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        ))}
      </Stack>
    </>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link href={href!}>
      <Box
        role={"group"}
        display={"block"}
        p={2}
        rounded={"md"}
        _hover={{ bg: useColorModeValue("red.50", "gray.800") }}
      >
        <Stack direction={"row"} align={"center"}>
          <Box>
            <Text
              transition={"all .3s ease"}
              _groupHover={{ color: "red.400" }}
              fontWeight={500}
            >
              {label}
            </Text>
            <Text fontSize={"sm"}>{subLabel}</Text>
          </Box>
          <Flex
            transition={"all .3s ease"}
            transform={"translateX(-10px)"}
            opacity={0}
            _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
            justify={"flex-end"}
            align={"center"}
            flex={1}
          >
            <Icon color={"red.400"} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Box>
    </Link>
  );
};

const MobileNav = ({ handleLogout }: any) => {
  return (
    <>
      <Stack
        bg={useColorModeValue("gray.50", "gray.900")}
        p={4}
        display={{ md: "none" }}
        borderBottom={"1px"}
      >
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
        <Button
          fontSize={"sm"}
          rounded={"full"}
          fontWeight={600}
          rightIcon={<IoMdLogOut />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Stack>
    </>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Link href={href || "#"}>
        <Box
          py={2}
          justifyContent="space-between"
          alignItems="center"
          _hover={{
            textDecoration: "none",
          }}
        >
          <Text
            fontWeight={600}
            color={useColorModeValue("gray.600", "gray.200")}
          >
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={"all .25s ease-in-out"}
              transform={isOpen ? "rotate(180deg)" : ""}
              w={6}
              h={6}
            />
          )}
        </Box>
      </Link>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link href={child.href || "#"} key={child.label}>
                <Box py={2}>{child.label}</Box>
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Events",
    children: [
      {
        label: "The Hyperloop Way",
        subLabel: "High-Value online lectures!",
        href: "/events/lecture-series",
      },
      {
        label: "Parivahan",
        subLabel: "Global Hyperloop Conference",
        href: "/events/ghc1.0",
      },
    ],
  },
  {
    label: "About",
    children: [
      {
        label: "Our Mission",
        href: "/about/mission",
        subLabel: "Learn about our Vision, Mission",
      },
      {
        label: "Activity",
        href: "/about/activity",
        subLabel: "Checkout out social feed",
      },
      {
        label: "Team",
        href: "/about/team",
        subLabel: "People behind the event!",
      },
    ],
  },
  {
    label: "Contact Us",
    href: "/contact",
  },
  {
    label: "Documents",
    href: "/documents",
  },
  {
    label: "Categories",
    href: "/categories",
  },
];
