"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Box,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const gridRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

  const translateY1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const translateY2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const translateY3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const openLightbox = (src: string) => {
    setSelectedImage(src);
    onOpen();
  };

  const third = Math.ceil(images.length / 3);
  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  return (
    <Box
      ref={gridRef}
      px={{ base: 4, md: 12 }}
      py={20}
      overflow="visible"
      className={className}
      bgGradient="linear(to-b, gray.900, gray.800, gray.700)"
    >
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={10}
        maxW="6xl"
        mx="auto"
      >
        {[firstPart, secondPart, thirdPart].map((part, index) => (
          <Box key={index} display="grid" gap={8}>
            {part.map((src, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                viewport={{ once: true }}
                style={{
                  y:
                    index === 0
                      ? translateY1
                      : index === 1
                      ? translateY2
                      : translateY3,
                }}
              >
                <Box
                  position="relative"
                  cursor="pointer"
                  onClick={() => openLightbox(src)}
                  overflow="hidden"
                  borderRadius="lg"
                  boxShadow="lg"
                  transition="all 0.3s ease"
                  _hover={{ transform: "scale(1.03)" }}
                >
                  <Image
                    src={src}
                    alt={`GHC image ${idx + 1}`}
                    objectFit="cover"
                    w="100%"
                    h="320px"
                    transition="all 0.3s ease"
                  />
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    w="full"
                    h="full"
                    bgGradient="linear(to-b, rgba(0,0,0,0.0), rgba(0,0,0,0.6))"
                    display="flex"
                    alignItems="flex-end"
                    justifyContent="center"
                    px={4}
                    pb={4}
                    opacity="0"
                    _hover={{ opacity: 1 }}
                    transition="all 0.3s ease"
                  >
                    <Text color="white" fontWeight="bold" fontSize="lg">
                      Tap to Expand
                    </Text>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>
        ))}
      </SimpleGrid>

      {/* Lightbox Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
        <ModalOverlay backdropFilter="blur(10px) brightness(0.5)" />
        <ModalContent bg="transparent" boxShadow="none">
          <ModalCloseButton color="white" zIndex="10" />
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                key="lightbox"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={selectedImage}
                  alt="Enlarged"
                  w="100%"
                  maxH="90vh"
                  objectFit="contain"
                  borderRadius="md"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </ModalContent>
      </Modal>

      {/* Back to Top Button */}
      <Box position="fixed" bottom="5" right="5" zIndex="99">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-teal-400 text-white px-4 py-2 rounded-full shadow-lg"
        >
          ↑ Top
        </motion.button>
      </Box>
    </Box>
  );
};
