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
  Stack,
  FormControl,
  Input,
  Button,
  Heading,
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
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import useGetTeam from "../../../utils/useGetTeam";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePresence, motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { doc, updateDoc, onSnapshot,getDoc,setDoc } from "firebase/firestore";
import {db}from "../../../firebase/config"


const Loading = () => {
  const ref = useRef(null);
  const [isPresent, safeToRemove] = usePresence();
  const [team, isLoading, isError] = useGetTeam();

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

const FormElement = ({
  handleChange,
  value,
  title,
  tagline,
  type,
  name,
  bgColor,
}: any) => {
  return (
    <VStack bg={bgColor} borderWidth={"1px"} maxW={"lg"} borderRadius={"md"}>
      <VStack
        p={8}
        pb={0}
        spacing={4}
        mb={4}
        textAlign={"left"}
        alignItems={"flex-start"}
      >
        <Heading fontSize={"2xl"}>{title}</Heading>
        <Text fontSize={"sm"}>{tagline}</Text>
        <FormControl isRequired id={title}>
          <Input
            focusBorderColor="red.400"
            type={type || "text"}
            onChange={handleChange}
            value={value}
            name={name || ""}
          />
        </FormControl>
      </VStack>
    </VStack>
  );
};

const SettingsPage = () => {
  const [team, isLoading, isError] = useGetTeam();
  

  const [input, setInput] = useState({
    teamname: "",
    teamrepresentetive: "",
    homeUniversity: "",
    activemembers: undefined,
    teamaddress: "",
    country: "",
    postalcode: undefined,
  });
  const bgColor = useColorModeValue("white", "gray.800");

  const btnTextColor = useColorModeValue("gray.800", "black");
  const toast = useToast();

  useEffect(() => {
    setInput(team);
  }, [team]);

  function handleChange(e: any) {
    const { name, value } = e.target;
    setInput((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }
  const handleSubmit = async () => {
    // console.log("Form Submitted", input);

    try {

      const editdoc=doc(db,"users",team.id)

      const docshap=await getDoc(editdoc)
      console.log(docshap.data());
      

      await setDoc(editdoc,{
        teamname: input.teamname,
        teamrepresentetive: input.teamrepresentetive,
        homeUniversity: input.homeUniversity,
        activemembers: input.activemembers,
        teamaddress: input.teamaddress!==undefined?input.teamaddress:null,
        country: input.country,
        postalcode: input.postalcode !==undefined?input.postalcode : null,
      },{merge:true})

      toast({
        title: "Form Submitted",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating document:", error);
      toast({
        title: "Error",
        description: "There was an error updating your information.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });

    }


  };

  return (
    <Box minH="100vh">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {/* Content */}
          <VStack spacing={6}>
            <FormElement
              bgColor={bgColor}
              btnTextColor={btnTextColor}
              value={input?.teamname}
              handleChange={handleChange}
              title="Team Name"
              name="teamname"
              tagline="This is your team's visible name within GHC. For example, the name of your company or team."
            />
            <FormElement
              bgColor={bgColor}
              btnTextColor={btnTextColor}
              value={input?.teamrepresentetive}
              handleChange={handleChange}
              title="Team Representative"
              name="teamrepresentetive"
              tagline="The main contact person who will represent your team. This individual will handle all team-related communications and decisions."
            />
            <FormElement
              bgColor={bgColor}
              btnTextColor={btnTextColor}
              value={input?.homeUniversity}
              handleChange={handleChange}
              title="University"
              name="homeUniversity"
              tagline="Indicate the university or institution your team is affiliated with. This helps identify your academic or research background."
            />
            <FormElement
              bgColor={bgColor}
              btnTextColor={btnTextColor}
              value={input?.activemembers}
              type="number"
              handleChange={handleChange}
              title="Number of Active Members"
              name="activemembers"
              tagline="Specify the total number of currently active members in your team who are participating in GHC activities."
            />
            <FormElement
              bgColor={bgColor}
              btnTextColor={btnTextColor}
              value={input?.teamaddress}
              handleChange={handleChange}
              title="Address"
              name="teamaddress"
              tagline="Enter your team’s official address or headquarters location. This will be used for any formal correspondence."
            />
            <FormElement
              bgColor={bgColor}
              btnTextColor={btnTextColor}
              value={input?.country}
              handleChange={handleChange}
              title="Country"
              name="country"
              tagline="Select the country where your team is based. This helps identify your geographical location for global collaborations."
            />
            <FormElement
              bgColor={bgColor}
              btnTextColor={btnTextColor}
              value={input?.postalcode}
              handleChange={handleChange}
              title="Postal Code"
              name="postalcode"
              tagline="Provide the postal code of your team's main office or representative’s location for accurate location identification."
            />

            <Button
              size="md"
              bg={"blue.500"}
              color={"white"}
              _hover={{ opacity: 0.8 }}
              onClick={handleSubmit}
            >
              Update All
            </Button>
          </VStack>
        </>
      )}
    </Box>
  );
};

export default SettingsPage;
