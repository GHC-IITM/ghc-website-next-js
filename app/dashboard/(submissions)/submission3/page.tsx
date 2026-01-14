"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Button,
  Text,
  VStack,
  Heading,
  HStack,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";

import useGetTeam from "../../../../utils/useGetTeam";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../../../firebase/config";

const Submissions = () => {
  const storage = getStorage(app);
  const [techfile, settechfile] = useState<File | null>(null);
  const [netfile, setnetfile] = useState<File | null>(null);
  const [busfile, setbusfile] = useState<File | null>(null);
  const [team] = useGetTeam();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const uploadFile = async (file: File | null, folderName: string) => {
    if (!file) return null;

    const fileId = uuidv4();
    try {
      const fileRef = ref(
        storage,
        `submissions/${folderName}/${team?.uid}/${fileId}`
      );
      const snapshot = await uploadBytes(fileRef, file);
      return await getDownloadURL(snapshot.ref);
    } catch (error) {
      console.error(`Error uploading ${folderName} file:`, error);
      alert(`Failed to upload ${folderName} file`);
      return null;
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const urls = await Promise.all([
  //       handleUpload(file1, "technical"),
  //       handleUpload(file2, "network"),
  //       handleUpload(file3, "business"),
  //     ]);

  //     if (urls.some((url) => url === null)) {
  //       throw new Error("Some files failed to upload");
  //     }

  //     const response = await fetch("/api/filesubmission", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email: team?.email,
  //         files: {
  //           technical: urls[0],
  //           network: urls[1],
  //           business: urls[2],
  //         },
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to submit files");
  //     }

  //     toast({
  //       title: "Submission Successful",
  //       description: "Your files have been uploaded successfully!",
  //       status: "success",
  //       duration: 4000,
  //       isClosable: true,
  //     });
  //   } catch (error) {
  //     console.error("Submission Error:", error);
  //     toast({
  //       title: "Submission Failed",
  //       description: "Please try again later.",
  //       status: "error",
  //       duration: 4000,
  //       isClosable: true,
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    let uploadedFiles = [];  // Track which files were uploaded successfully


    const [techurl,neturl,busurl] = await Promise.all([
      uploadFile(techfile, "technical"),
      uploadFile(netfile, "network"),
      uploadFile(busfile, "business"),

    ])
    
    if (techfile) {
      try {
        // Assuming cdrUrl is already available from the upload function
        const response = await fetch("/api/filesubmission", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: team?.email,
            files: {
              technology: techurl,  // Pass the CDR file URL here
            },
          }),
        });

        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`Failed to upload technology file. Status: ${response.status}`);
        }

        const data = await response.json();

        // Check if the server returned a success flag
        if (!data.success) {
          throw new Error(`Server failed to upload technology file. Message: ${data.message || 'Unknown error'}`);
        }

        uploadedFiles.push("technology file");

        // alert("CDR file uploaded successfully!");
      } catch (error) {
        console.error("Error uploading technology file:", error);
        alert(`Failed to upload technology file. Error`);
      } finally {
        setLoading(false); // Always reset loading state
      }
    }

    if (netfile) {
      try {
        // Assuming cdrUrl is already available from the upload function
        const response = await fetch("/api/filesubmission", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: team?.email,
            files: {
              network: neturl,  // Pass the CDR file URL here
            },
          }),
        });

        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`Failed to upload Network file. Status: ${response.status}`);
        }

        const data = await response.json();

        // Check if the server returned a success flag
        if (!data.success) {
          throw new Error(`Server failed to upload Network file. Message: ${data.message || 'Unknown error'}`);
        }

        // alert("demonstration file uploaded successfully!");
        uploadedFiles.push("Network file");

      } catch (error) {
        console.error("Error uploading Network file:", error);
        alert(`Failed to upload Network file. Error`);
      } finally {
        setLoading(false); // Always reset loading state
      }

    }


    if (busfile) {
      try {

        const response = await fetch("/api/filesubmission", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: team?.email,
            files: {
              business: busurl,  // Pass the CDR file URL here
            },
          }),
        });
    
        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`Failed to upload business file. Status: ${response.status}`);
        }
    
        const data = await response.json();
    
        // Check if the server returned a success flag
        if (!data.success) {
          throw new Error(`Server failed to upload business file. Message: ${data.message || 'Unknown error'}`);
        }
    
        // alert("demonstration file uploaded successfully!");
        uploadedFiles.push("business file");
    
      } catch (error) {
        console.error("Error uploading business file:", error);
        alert(`Failed to upload business file. Error`);
      } finally {
        setLoading(false); // Always reset loading state
      }

    }
    if (uploadedFiles.length === 3) {
      alert("All files uploaded successfully!");
    } else if (uploadedFiles.length > 0) {
      const uploadedFilesList = uploadedFiles.join(", ");
      alert(`The following file(s) uploaded successfully: ${uploadedFilesList}`);
    } else {
      alert("No files uploaded successfully.");
    }
    



  };

  return (
    <VStack spacing={6} p={8}>
      <Heading as="h1" size="lg">
        Submission Dashboard
      </Heading>
      <Divider />
      <Heading as="h1" size="lg" fontWeight="semibold" color="teal.500">
        Hyperloop Innoquest
      </Heading>
      <Box
        w="full"
        maxW="600px"
        bg={"gray.700"}
        boxShadow="lg"
        p={6}
        borderRadius="md"
      >
        <Heading as="h4" size="md" marginBottom={4}>
          Solution Proposal Document (SPD)
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={6}>
            <FormControl>
              <FormLabel>Technical </FormLabel>
              <Input
                type="file"
                accept=".pdf"
                onChange={(e) => settechfile(e.target.files?.[0] || null)}
                variant="flushed"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Hyperloop Network</FormLabel>
              <Input
                type="file"
                accept=".pdf"
                onChange={(e) => setnetfile(e.target.files?.[0] || null)}
                variant="flushed"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Business & Social Impact</FormLabel>
              <Input
                type="file"
                accept=".pdf"
                onChange={(e) => setbusfile(e.target.files?.[0] || null)}
                variant="flushed"
              />
            </FormControl>
            <Text fontSize="sm" color="gray.500">
              Note: Please upload files in PDF format only.
            </Text>
            <Button
              type="submit"
              colorScheme="teal"
              isLoading={loading}
              loadingText="Submitting"
              w="full"
              mt={4}
            >
              {loading ? <Spinner /> : "Submit"}
            </Button>
          </VStack>
        </form>
      </Box>
    </VStack>
  );
};

export default Submissions;
