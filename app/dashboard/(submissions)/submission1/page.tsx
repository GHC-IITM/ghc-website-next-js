"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  Box,
  Button,
  Text,
  VStack,
  useDisclosure,
  Heading,
  HStack,
  Divider,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import useGetTeam from "../../../../utils/useGetTeam";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../../../firebase/config";

interface User {
  id: string;
  email: string;
  uid: string;
  teamname?: string;
  designfile?: string;
  demonstrationfile?: string;
}

const Submissions = () => {
  const storage = getStorage(app);
  const [demonstrationFile, setDemonstrationFile] = useState<File | null>(null);
  const [cdrFile, setCdrFile] = useState<File | null>(null);
  const [team] = useGetTeam();
  const [loading, setLoading] = useState(false); // Loading state

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

  const handleSubmit = async (e: React.FormEvent) => {
    if (!cdrFile) {
      alert("Please Upload CDR File");
    }
    setLoading(true); // Set loading state to true
    let uploadedFiles = [];  // Track which files were uploaded successfully
    let failedfiles=[]


    e.preventDefault();
    const [demurl, cdrUrl] = await Promise.all([
      uploadFile(demonstrationFile, "demonstration"),
      uploadFile(cdrFile, "cdr"),
    ]);
    if (cdrFile && cdrUrl) {
      
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
              cdr: cdrUrl,  // Pass the CDR file URL here
            },
          }),
        });
    
        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`Failed to upload CDR file. Status: ${response.status}`);
        }
    
        const data = await response.json();
    
        // Check if the server returned a success flag
        if (!data.success) {
          throw new Error(`Server failed to upload CDR file. Message: ${data.message || 'Unknown error'}`);
        }

        uploadedFiles.push("CDR file");

        // alert("CDR file uploaded successfully!");
      } catch (error) {
        console.error("Error uploading CDR file:", error);
        // alert(`Failed to upload CDR file. Error`);
        failedfiles.push("CDR file")
      } finally {
        setLoading(false); // Always reset loading state
      }
    }
    
    if (demonstrationFile) {
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
              demonstrationFile: demurl,  // Pass the CDR file URL here
            },
          }),
        });
    
        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`Failed to upload demonstration file. Status: ${response.status}`);
        }
    
        const data = await response.json();
    
        // Check if the server returned a success flag
        if (!data.success) {
          throw new Error(`Server failed to upload demonstration file. Message: ${data.message || 'Unknown error'}`);
        }
    
        // alert("demonstration file uploaded successfully!");
        uploadedFiles.push("Demonstration file");
    
      } catch (error) {
        console.error("Error uploading demonstration file:", error);
        failedfiles.push("CDR file")
      } finally {
        setLoading(false); // Always reset loading state
      }

    }
    if (uploadedFiles.length === 2) {
      alert("Both files uploaded successfully!");
    } else if (uploadedFiles.length === 1) {
      alert(`${uploadedFiles[0]} uploaded successfully!`);
    }    
  };

  return (
    <VStack spacing={8} p={8}>
      <Heading as="h1" size="lg">
        Submission Dashboard
      </Heading>
      <Divider />
      <Heading as="h1" size="lg" fontWeight="semibold" color="teal.500">
        Demonstration
      </Heading>
      <Box
        w="full"
        maxW="600px"
        bg={"gray.700"}
        p={6}
        boxShadow="lg"
        borderRadius="md"
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={6}>
            <FormControl>
              <FormLabel>Demonstration Proposal Document (DPD)</FormLabel>
              <Input
                type="file"
                accept=".pdf"
                onChange={(e) =>
                  setDemonstrationFile(e.target.files?.[0] || null)
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Comprehensive Demonstration Report (CDR)</FormLabel>
              <Input
                type="file"
                accept=".pdf"
                onChange={(e) => setCdrFile(e.target.files?.[0] || null)}
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
            >
              Submit
            </Button>
          </VStack>
        </form>
      </Box>
    </VStack>
  );
};

export default Submissions;
