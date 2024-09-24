"use client";

import { use, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
  Select,
  FormLabel,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import NextLink from "next/link";

import SignUpField from "../../components/SignUpField";
import { useMutation } from "react-query";
import signup from "../../utils/mutations/signup";
// import { useNavigate, Link as ReactLink } from "react-router-dom"
import { useRouter } from "next/navigation";
import Image from "next/image";
import useGetTeam from "@/utils/useGetTeam";

const avatars = [
  {
    name: "IIT Madras",
    url: "/iitm.png",
  },
  {
    name: "GHC",
    url: "/favicon.jpg",
  },
  {
    name: "SAE INDIA",
    url: "/SAE.png",
  },
];

const Blur = (props: IconProps) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};

const Form1 = ({ handleChange, input }: any) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      console.log("Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container px={0} py={6} width={"100%"}>
      <Stack spacing={4}>
        <Heading color="black" fontSize={"medium"}>
          {session
            ? "Proceed to the next step to complete your registration"
            : "To Register please use your team’s official Google Account"}
        </Heading>
        {!session ? (
          <Button
            colorScheme="red"
            textColor={"white"}
            fontFamily={"heading"}
            w={"full"}
            bgGradient="linear(to-r, red.400, cyan.400)"
            color={"white"}
            _hover={{
              bgGradient: "linear(to-r, red.400,cyan.500)",
            }}
            isLoading={loading}
            onClick={handleGoogleLogin}
          >
            <Image
              src="data:image/webp;base64,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"
              alt=""
              width="30"
              height={"30"}
              style={{ marginRight: "10px" }}
            />
            Sign in with Google
          </Button>
        ) : (
          <>
            <Text textColor={"black"}>Signed in as {session.user?.email}</Text>
            <Button
              onClick={() => signOut()}
              colorScheme="red"
              textColor={"white"}
            >
              Change Account
            </Button>
          </>
        )}
      </Stack>
    </Container>
  );
};

const Form2 = ({ handleChange, input }: any) => {
  return (
    <>
      <SignUpField
        onChange={handleChange}
        value={input.teamname}
        id="teamname"
        label="Team Name"
        placeholder="Ex: Loid hyperloop"
        type="text"
      />

      <SignUpField
        onChange={handleChange}
        value={input.homeUniversity}
        id="homeUniversity"
        label="Home University"
        placeholder="Ex: MIT"
        type="text"
      />
      <Stack display={"flex"} flexDirection={"row"} spacing={2}>
        <SignUpField
          onChange={handleChange}
          value={input.country}
          id="country"
          label="Country"
          placeholder="Ex: India"
          type="text"
        />
        <SignUpField
          onChange={handleChange}
          value={input.postalcode}
          id="postalcode"
          label="Postal Code"
          placeholder="Ex: 540056"
          type="text"
        />
      </Stack>
      <Text color={"gray.600"} fontSize={"sm"}>
        *The above details cannot be changed once submitted
      </Text>
    </>
  );
};

const Form3 = ({ handleChange, input }: any) => {
  return (
    <>
      <Stack display={"flex"} flexDirection={"row"} spacing={2}>
        <SignUpField
          onChange={handleChange}
          value={input.activemembers}
          id="activemembers"
          label="Active Members"
          placeholder="50"
          type="number"
        />
        <SignUpField
          onChange={handleChange}
          value={input.attendeventmembers}
          id="attendeventmembers"
          label="Event Members"
          placeholder="15"
          type="number"
        />
      </Stack>
      <SignUpField
        onChange={handleChange}
        value={input.phone}
        id="phone"
        label="WhatsApp Number (with country code)"
        placeholder="Ex: +91 9876543210"
        type="number"
      />

      <Stack display={"flex"} flexDirection={"row"} spacing={2}>
        <SignUpField
          onChange={handleChange}
          value={input.teamrepresentetive}
          id="teamrepresentetive"
          label="Team Rep"
          placeholder="Ex: Shaun"
          type="text"
        />
        <SignUpField
          onChange={handleChange}
          value={input.emailrepresentetive}
          id="emailrepresentetive"
          label="Rep Email"
          placeholder="firstname@provider.io"
          type="email"
        />
      </Stack>
      <Text color={"gray.600"} fontSize={"sm"}>
        *Team details entered here are not final, and can be edited later.
      </Text>
    </>
  );
};

const Form4 = ({ setInput, handleImageChange, handleChange, input }: any) => {
  console.log(input);
  return (
    <>
      {/* <SignUpField
        onChange={handleImageChange}
        value={undefined}
        id="teamlogo"
        label="Logo File"
        placeholder=""
        type="file"
      /> */}
      <FormLabel color={"gray.600"}>Choose competition type</FormLabel>
      <CheckboxGroup
        colorScheme="purple"
        value={input.category}
        onChange={(values) =>
          setInput((prevFormData: any) => ({
            ...prevFormData,
            category: values as string[],
          }))
        }
      >
        <Stack textColor={"gray.600"} spacing={[1, 5]} direction={["column"]}>
          <Checkbox value="Demonstration">Demonstration</Checkbox>
          <Checkbox value="Hyperloop Blueprint Competition">
            Hyperloop Blueprint Competition
          </Checkbox>
          <Checkbox value="Hyperloop Innoquest">Hyperloop Innoquest</Checkbox>
        </Stack>
      </CheckboxGroup>
      <Text mt={2} color={"gray.600"} fontSize={"sm"}>
        *You can select multiple options
      </Text>
    </>
  );
};

export default function JoinOurTeam() {
  const { data: session } = useSession();
  const [step, setStep] = useState<number>(1);
  const [input, setInput] = useState({
    email: "",
    teamname: "",
    homeUniversity: "",
    activemembers: undefined,
    attendeventmembers: undefined,
    teamrepresentetive: "",
    emailrepresentetive: "",
    phone: undefined,
    country: "",
    postalcode: undefined,
    category: [],
    emailUpdates: true,
  });
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useRouter();
  const [team, teamLoading, isError] = useGetTeam();

  const mutation = useMutation(signup);

  //   function handleImageChange(e: any) {
  //     let reader = new FileReader();
  //     reader.readAsDataURL(e.target.files[0]);
  //     reader.onloadend = function () {
  //       var dataUrl = reader.result;
  //       var base64data = dataUrl;
  //       // var base64data = (dataUrl as string)?.split(',')[1];
  //       console.log(base64data);

  //       if (base64data) {
  //         setInput({
  //           ...input,
  //           teamlogo: (base64data as string) || "",
  //         });
  //       }
  //     };
  //   }

  function handleChange(e: any) {
    const { name, value } = e.target;
    setError(undefined);
    setLoading(false);
    setInput((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    setLoading(true);
    console.log(input);

    // Add check to see if all fields are filled
    if (
      !input.email ||
      !input.teamname ||
      !input.homeUniversity ||
      !input.activemembers ||
      !input.attendeventmembers ||
      !input.teamrepresentetive ||
      !input.emailrepresentetive ||
      !input.phone ||
      !input.country ||
      !input.postalcode ||
      !input.category.length
    ) {
      setError("Please fill all the fields");
      setLoading(false);
      return;
    }

    const response = await mutation.mutateAsync(input);
    console.log(response);

    if (response.success) {
      navigate.push("/dashboard");
    } else {
      setError(response.message);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (session) {
      setInput((prevFormData) => ({
        ...prevFormData,
        email: session.user?.email || "",
      }));
    }
  }, [session]);

  useEffect(() => {
    if (!teamLoading && !isError && team) {
      if (
        !team.email ||
        !team.teamname ||
        !team.homeUniversity ||
        !team.activemembers ||
        !team.attendeventmembers ||
        !team.teamrepresentetive ||
        !team.emailrepresentetive ||
        !team.phone ||
        !team.country ||
        !team.postalcode ||
        !team.category.length
      ) {
        // Stay on the same page
        setStep(2);
        return;
      } else {
        navigate.push("/dashboard");
      }
    }
  }, [team, teamLoading, isError, navigate]);

  return (
    <Box
      position={"relative"}
      h={"100vh"}
      overflowY={useBreakpointValue({ md: "hidden" })}
    >
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 16 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            zIndex={100}
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          >
            Compete at GHC 2025: Register Now!
            <Text
              as={"span"}
              bgGradient="linear(to-r, red.400,purple.400)"
              bgClip="text"
            >
              !
            </Text>
          </Heading>
          <Stack direction={"row"} spacing={4} align={"center"}>
            <AvatarGroup gap={6}>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  size={useBreakpointValue({ base: "lg", md: "xl" })}
                  position={"relative"}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: "full",
                    height: "full",
                    rounded: "full",
                    transform: "scale(1.125)",
                    bgGradient: "linear(to-bl, red.400,purple.400)",
                    position: "absolute",
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={"heading"} fontSize={{ base: "4xl", md: "6xl" }}>
              +
            </Text>
            <Flex
              align={"center"}
              justify={"center"}
              fontFamily={"heading"}
              fontSize={{ base: "sm", md: "lg" }}
              bg={"gray.800"}
              color={"white"}
              rounded={"full"}
              minWidth={useBreakpointValue({ base: "44px", md: "60px" })}
              minHeight={useBreakpointValue({ base: "44px", md: "60px" })}
              position={"relative"}
              _before={{
                content: '""',
                width: "full",
                height: "full",
                rounded: "full",
                transform: "scale(1.125)",
                bgGradient: "linear(to-bl, orange.400,yellow.400)",
                position: "absolute",
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            >
              YOU
            </Flex>
          </Stack>
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 0 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={2}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Join our journey
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,purple.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
          </Stack>
          <Box as={"form"} mt={6}>
            <Stack key={step} spacing={2}>
              {step === 1 ? (
                <Form1 handleChange={handleChange} input={input} />
              ) : step === 2 ? (
                <Form2 handleChange={handleChange} input={input} />
              ) : step === 3 ? (
                <Form3 handleChange={handleChange} input={input} />
              ) : (
                <Form4
                  handleChange={handleChange}
                  //   handleImageChange={handleImageChange}
                  setInput={setInput}
                  input={input}
                />
              )}
            </Stack>
            {/* <img src={file} /> */}
            <Text align={"center"} style={{ color: "red" }} pt={2} pb={"-4px"}>
              {error}
            </Text>
            {step === 4 ? (
              <Stack display={"flex"} flexDirection={"row"} spacing={4}>
                <Button
                  fontFamily={"heading"}
                  mt={4}
                  w={"full"}
                  variant={"outline"}
                  colorScheme={"red"}
                  _hover={{
                    bgGradient: "linear(to-r, red.400,purple.400)",
                    boxShadow: "xl",
                    color: "white",
                  }}
                  onClick={() => setStep((prev) => prev - 1)}
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  fontFamily={"heading"}
                  mt={4}
                  w={"full"}
                  bgGradient="linear(to-r, red.400,purple.400)"
                  color={"white"}
                  _hover={{
                    bgGradient: "linear(to-r, red.400,purple.400)",
                    boxShadow: "xl",
                  }}
                  isLoading={loading}
                >
                  Submit
                </Button>
              </Stack>
            ) : (
              <Stack display={"flex"} flexDirection={"row"} spacing={4}>
                <Button
                  fontFamily={"heading"}
                  mt={4}
                  w={"full"}
                  variant={"outline"}
                  colorScheme={"red"}
                  _hover={{
                    bgGradient: "linear(to-r, red.400,purple.400)",
                    boxShadow: "xl",
                    color: "white",
                  }}
                  onClick={() => setStep((prev) => prev - 1)}
                  isDisabled={step === 1}
                >
                  Back
                </Button>
                <Button
                  fontFamily={"heading"}
                  mt={4}
                  w={"full"}
                  bgGradient="linear(to-r, red.400,purple.400)"
                  color={"white"}
                  _hover={{
                    bgGradient: "linear(to-r, red.400,purple.400)",
                    boxShadow: "xl",
                  }}
                  onClick={() => setStep((prev) => prev + 1)}
                  isDisabled={!session}
                >
                  Next
                </Button>
              </Stack>
            )}
          </Box>
        </Stack>
      </Container>
      <Blur
        position={"absolute"}
        top={-100}
        left={-50}
        style={{ filter: "blur(70px)" }}
      />
    </Box>
  );
}