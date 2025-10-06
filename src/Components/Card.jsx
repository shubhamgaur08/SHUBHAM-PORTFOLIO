import { Badge, Box, Button, Flex, Heading, HStack, Link, Text, VStack, useColorModeValue, Image } from '@chakra-ui/react'
import PropTypes from 'prop-types'; 
import { BiLinkExternal } from "react-icons/bi";
import { BiImage } from 'react-icons/bi';
import { BiCloudDownload } from "react-icons/bi";
import { VscGithub } from "react-icons/vsc";
import { motion } from 'framer-motion';
import { useState } from 'react';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const ProjectCard = ({ title, type, image, Screenshot, description, techStack, github, liveDemo, downloadLink }) => {
  const cardBg = useColorModeValue('rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.05)');
  const cardBorder = useColorModeValue('rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.1)');
  
  // State for image loading and error handling
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Function to get the correct image path
  const getImagePath = (imagePath) => {
    if (!imagePath) return null;
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // Handle relative paths - remove leading slash and ensure it points to public folder
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    return `/${cleanPath}`;
  };

  // Fallback image - a simple gradient or placeholder
  const fallbackImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='220' viewBox='0 0 400 220'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2358b845;stop-opacity:0.3' /%3E%3Cstop offset='100%25' style='stop-color:%2358b845;stop-opacity:0.1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grad)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial, sans-serif' font-size='16' fill='%23ffffff' text-anchor='middle' dy='.3em'%3E${encodeURIComponent(title)}%3E%3C/text%3E%3C/svg%3E";

  const finalImagePath = getImagePath(image);

  return (
    <MotionBox
      className="project-card-container"
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Flex 
        flexDirection="column" 
        className='project-card'
        bg={cardBg}
        backdropFilter="blur(20px)"
        border={`1px solid ${cardBorder}`}
        borderRadius="10px"
        overflow="hidden"
        h="100%"
        position="relative"
        _hover={{
          bg: "rgba(88, 184, 69, 0.08)",
          borderColor: "rgba(88, 184, 69, 0.3)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(88, 184, 69, 0.2)"
        }}
        transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
        boxShadow="0 8px 32px rgba(0, 0, 0, 0.3)"
      >
        {/* Project Image */}
        <MotionBox 
          className='project-card-image'
          h={["210px", "250px"]}
          w="100%"
          // pa={2}

          alignSelf="center"
          position="relative"
          overflow="hidden"
          bg="rgba(88, 184, 69, 0.1)"
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3 }
          }}
        >
          {/* Hidden image for preloading and error handling */}
          {finalImagePath && (
            <Image
              src={finalImagePath}
              alt={title}
              position="absolute"
              // p={3}
              top="0"
              left="0"
              w="100%"
              h="100%"
              objectFit="contain"
              opacity={imageLoaded && !imageError ? 1 : 0}
              transition="opacity 0.3s ease"
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(false);
              }}
            />
          )}
          
          {/* Fallback image */}
          {(imageError || !finalImagePath || !imageLoaded) && (
            <Image
              src={fallbackImage}
              alt={`${title} placeholder`}
              position="absolute"
              top="0"
              left="0"
              w="100%"
              h="100%"
              objectFit="cover"
              opacity={1}
            />
          )}

          {/* Gradient overlay */}
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg="linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)"
            zIndex={1}
          />

          {/* Project Type Badge */}
          <Badge
            position="absolute"
            top="16px"
            right="16px"
            zIndex={2}
            bg="rgba(88, 184, 69, 0.9)"
            color="white"
            px={3}
            py={1}
            borderRadius="full"
            fontSize="xs"
            fontWeight="600"
            textTransform="uppercase"
            letterSpacing="0.5px"
            backdropFilter="blur(10px)"
            border="1px solid rgba(255, 255, 255, 0.2)"
          >
            {type}
          </Badge>
        </MotionBox>

        {/* Card Content */}
        <VStack 
          align="stretch" 
          spacing={4} 
          p={6} 
          flex="1"
          justify="space-between"
        >
          {/* Title and Description */}
          <VStack align="stretch" spacing={3}>
            <Heading 
              size="lg" 
              color="white"
              fontWeight="700"
              lineHeight="1.2"
              className="project-title"
            >
              {title}
            </Heading>
            
            <Text 
              color="gray.300" 
              fontSize="sm" 
              lineHeight="1.6"
              className="project-description"
            >
              {description}
            </Text>
          </VStack>

          {/* Tech Stack */}
          <Box>
            <Text 
              fontSize="xs" 
              color="green.400" 
              fontWeight="600" 
              mb={2}
              textTransform="uppercase"
              letterSpacing="0.5px"
            >
              Tech Stack
            </Text>
            <Flex flexWrap="wrap" gap={2}>
              {techStack.map((tech, index) => (
                <Badge
                  key={index}
                  bg="rgba(255, 255, 255, 0.1)"
                  color="gray.200"
                  px={2}
                  py={1}
                  borderRadius="md"
                  fontSize="xs"
                  fontWeight="500"
                  border="1px solid rgba(255, 255, 255, 0.1)"
                  _hover={{
                    bg: "rgba(88, 184, 69, 0.2)",
                    borderColor: "green.400"
                  }}
                  transition="all 0.2s ease"
                >
                  {tech}
                </Badge>
              ))}
            </Flex>
          </Box>

          {/* Action Buttons */}
          <HStack spacing={3} pt={2}>
            {liveDemo ? (
              <Link href={liveDemo} target="_blank" _hover={{ textDecoration: 'none' }}>
                <Button
                  size="sm"
                  bg="green.400"
                  color="white"
                  _hover={{ 
                    bg: "green.500",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 20px rgba(88, 184, 69, 0.3)"
                  }}
                  leftIcon={<BiLinkExternal />}
                  borderRadius="full"
                  px={4}
                  fontWeight="600"
                  fontSize="xs"
                  transition="all 0.3s ease"
                  boxShadow="0 4px 12px rgba(88, 184, 69, 0.2)"
                >
                  Live Demo
                </Button>
              </Link>
            ) : downloadLink ? (
              <Link href={downloadLink} download target="_blank" _hover={{ textDecoration: 'none' }}>
                <Button
                  size="sm"
                  bg="green.400"
                  color="white"
                  _hover={{ 
                    bg: "green.500",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 20px rgba(88, 184, 69, 0.3)"
                  }}
                  leftIcon={<BiCloudDownload />}
                  borderRadius="full"
                  px={4}
                  fontWeight="600"
                  fontSize="xs"
                  transition="all 0.3s ease"
                  boxShadow="0 4px 12px rgba(88, 184, 69, 0.2)"
                >
                  Download
                </Button>
              </Link>
            ) : null}

            {github ? (
              <Link href={github} target="_blank" _hover={{ textDecoration: 'none' }}>
                <Button
                  size="sm"
                  variant="outline"
                  borderColor="rgba(255, 255, 255, 0.3)"
                  color="gray.200"
                  _hover={{ 
                    borderColor: "green.400",
                    color: "green.400",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 20px rgba(88, 184, 69, 0.15)"
                  }}
                  leftIcon={<VscGithub />}
                  borderRadius="full"
                  px={4}
                  fontWeight="600"
                  fontSize="xs"
                  transition="all 0.3s ease"
                >
                  Code
                </Button>
              </Link>
            ) : Screenshot ? (
              <Link href={Screenshot} target="_blank" _hover={{ textDecoration: 'none' }}>
                <Button
                  size="sm"
                  variant="outline"
                  borderColor="rgba(255, 255, 255, 0.3)"
                  color="gray.200"
                  _hover={{ 
                    borderColor: "green.400",
                    color: "green.400",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 20px rgba(88, 184, 69, 0.15)"
                  }}
                  leftIcon={<BiImage />}
                  borderRadius="full"
                  px={4}
                  fontWeight="600"
                  fontSize="xs"
                  transition="all 0.3s ease"
                >
                  Preview
                </Button>
              </Link>
            ) : null}
          </HStack>
        </VStack>
      </Flex>
    </MotionBox>
  )
}

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  techStack: PropTypes.arrayOf(PropTypes.string).isRequired,
  Screenshot: PropTypes.string, // now optional
  github: PropTypes.string, // now optional
  liveDemo: PropTypes.string, // now optional
  downloadLink: PropTypes.string, // new optional prop
};

export default ProjectCard