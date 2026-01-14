"use client";

import {
  Box,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Heading,
} from "@chakra-ui/react";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import useGetTeam from "../../utils/useGetTeam";
// import { useNavigate, Link } from 'react-router-dom'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePresence, motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import gsap from "gsap";


import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";

    interface User {
        id: string;
        email: string;
        uid: string;
        teamname?: string;
        designfile?: string;
        demonstrationfile?: string;
    }



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
  const [team, isLoading] = useGetTeam();
  const [loading, setLoading] = useState<boolean>(true);
  const [entries, setEntries] = useState<User[]>([]);



  const groupUsers = (fetchedUsers: User[]) => {
    const groupedUsers: { [uid: string]: User } = {};

    fetchedUsers.forEach((user) => {
        if (!groupedUsers[user.uid]) {
            // Initialize with the first user doc for each uid
            groupedUsers[user.uid] = { ...user };
        } else {
            // Merge designfile and demonstrationfile if they exist
            groupedUsers[user.uid] = {
                ...groupedUsers[user.uid],
                designfile: user.designfile || groupedUsers[user.uid].designfile,
                demonstrationfile: user.demonstrationfile || groupedUsers[user.uid].demonstrationfile,
            };
        }
    });

    return Object.values(groupedUsers);
};

useEffect(() => {
  const usersCollection = collection(db, "submissions");

  const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
      const fetchedUsers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
      })) as User[];

      const groupedUsers = groupUsers(fetchedUsers);
      setEntries(groupedUsers);
  });

  return () => unsubscribe();
}, []);

  console.log(team);
  console.log(entries);
  useEffect(() => {
    setLoading(isLoading);
    
  }, [isLoading]);

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")}>
      {/* Content */}
      <VStack
        spacing={8}
        py={8}
        px={16}
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
          <Detail label="Representative" value={team?.teamrepresentetive} />
          <Detail
            label="Representative Email"
            value={team?.emailrepresentetive}
          />
          <Detail label="WhatsApp Number" value={team?.phone} />
          <Detail label="Country" value={team?.country} />
          <Detail label="Postal Code" value={team?.postalcode} />
        </VStack>
      </VStack>
    </Box>
  );
};

export default SidebarWithHeader;
