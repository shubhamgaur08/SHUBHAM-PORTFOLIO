import { Badge, Box, Button, Flex, Heading, HStack, Link, Text, VStack, useColorModeValue } from '@chakra-ui/react'
import PropTypes from 'prop-types'; 
import { BiLinkExternal } from "react-icons/bi";
import { BiImage } from 'react-icons/bi';
import { BiCloudDownload } from "react-icons/bi";
import { VscGithub } from "react-icons/vsc";
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const ProjectCard = ({ title, type, image, Screenshot, description, techStack, github, liveDemo, downloadLink }) => {
  const cardBg = useColorModeValue('rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.05)');
  const cardBorder = useColorModeValue('rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.1)');
  
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
          backgroundImage={`url(${image})`}
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          h="220px"
          position="relative"
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bg: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)',
            zIndex: 1
          }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3 }
          }}
        >
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