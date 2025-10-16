import { 
  Box, 
  Button, 
  Flex, 
  Heading, 
  HStack, 
  VStack,
  Link, 
  Tooltip, 
  Image, 
  Text,
  Container,
  SimpleGrid,
  Badge,
  IconButton,
  useColorModeValue,
  Divider
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { 
  FaDownload, 
  FaPhone, 
  FaEnvelope, 
  FaGithub, 
  FaLinkedin, 
  FaWhatsapp,
  FaExternalLinkAlt,
  FaCode,
  FaGraduationCap,
  FaBriefcase,
  FaUser,
  FaProjectDiagram
} from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi'
import { BiCodeAlt } from 'react-icons/bi'

import { projects, skills } from '../Utils/data'
import ProjectCard from '../Components/Card'
// import Svg1 from '../Components/Svg1'
import Svg2 from '../Components/Svg2'
// import Svg3 from '../Components/Svg3'
import Resume from '../Resume/Shubham_Gound_Resume.pdf'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

// Framer Motion components
const MotionBox = motion(Box)
const MotionFlex = motion(Flex)
const MotionText = motion(Text)
const MotionHeading = motion(Heading)
const MotionContainer = motion(Container)

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
}

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
}

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 2200 },
    items: 4
  },
  largeDesktop: {
    breakpoint: { max: 2200, min: 1920 },
    items: 3
  },
  desktop: {
    breakpoint: { max: 1920, min: 1075 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1075, min: 780 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 780, min: 0 },
    items: 1
  }
}

// Animated Section Component
const AnimatedSection = ({ children, id, ...props }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <MotionBox
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      {...props}
    >
      {children}
    </MotionBox>
  )
}

// Skill Card Component
const SkillCard = ({ skill, index }) => {
  return (
    <MotionBox
      variants={scaleIn}
      whileHover={{ 
        scale: 1.05, 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="skill-card"
    //   bg="rgba(255, 255, 255, 0.05)"
    bg="#3E5879"
      backdropFilter="blur(10px)"
      border="1px solid rgba(255, 255, 255, 0.1)"
      borderRadius="xl"
      p={4}
      textAlign="center"
      cursor="pointer"
      _hover={{
        bg: "rgba(88, 184, 69, 0.1)",
        borderColor: "green.400"
      }}
      transition="all 0.3s ease"
    >
      <Box mb={3}>
        <Image 
          src={skill.icon} 
          alt={skill.title} 
          w="50px" 
          h="50px" 
          mx="auto"
          filter="drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
        />
      </Box>
      <Text fontSize="sm" fontWeight="600" color="white">
        {skill.title}
      </Text>
    </MotionBox>
  )
}

const Home = () => {
  const form = useRef()
  const toast = useToast()
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  const sendEmail = (e) => {
    e.preventDefault()
    
    emailjs.sendForm(
      import.meta.env.VITE_SERVICE_ID, 
      import.meta.env.VITE_SERVICE_TEMPLATE, 
      form.current, 
      import.meta.env.VITE_PUBLIC_KEY
    ).then(() => {
      toast({
        position: 'top-right',
        title: 'Message Sent Successfully! ✨',
        description: `Thank you ${form.current.from_name.value.split(" ")[0]} for reaching out!`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      form.current.reset()
    }, (error) => {
      console.log(error)
      toast({
        position: 'top-right',
        title: 'Failed to send message',
        description: "Please try again later",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    })
  }

  return (
    <Box className="portfolio-container">
      {/* Hero Section */}
      <AnimatedSection 
        id="home" 
        minH="100vh" 
        position="relative" 
        display="flex" 
        alignItems="center"
        overflow="hidden"
      >
        {/* Animated Background */}
        <MotionBox
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          style={{ y }}
          className="hero-bg"
        />
        
        <Container maxW="7xl" zIndex={2} position="relative">
          <Flex
            direction={{ base: 'column-reverse', lg: 'row' }}
            align="center"
            justify="space-between"
            minH="80vh"
            gap={8}
          >
            {/* Hero Content */}
            <MotionBox 
              flex="1" 
              maxW={{ base: "100%", lg: "600px" }}
              variants={fadeInLeft}
            >
              <MotionText
                fontSize={{ base: "lg", md: "xl" }}
                color="green.400"
                fontWeight="600"
                mb={2}
                variants={fadeInUp}
              >
                <HiSparkles style={{ display: 'inline', marginRight: '8px' }} />
                Hello, I'm
              </MotionText>
              
              <MotionHeading
                fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                fontWeight="800"
                lineHeight="1.1"
                mb={4}
                variants={fadeInUp}
                className="gradient-text"
              >
                Shubham Gaur
              </MotionHeading>
              
              <MotionText
                fontSize={{ base: "xl", md: "2xl" }}
                color="gray.300"
                mb={6}
                variants={fadeInUp}
              >
                Full Stack Developer
              </MotionText>
              
              <MotionText
                fontSize={{ base: "md", md: "lg" }}
                color="gray.400"
                lineHeight="1.8"
                mb={8}
                maxW="500px"
                variants={fadeInUp}
              >
                Passionate MERN Stack & React Native Developer with expertise in building 
                modern, scalable web and mobile applications. I create digital experiences 
                that make a difference.
              </MotionText>
              
              <MotionFlex
                gap={4}
                direction={{ base: "column", sm: "row" }}
                variants={fadeInUp}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    as="a"
                    href={Resume}
                    download="Shubham_Gound_Resume_FullStackDeveloper"
                    size="lg"
                    bg="green.400"
                    color="white"
                    _hover={{ bg: "green.500", transform: "translateY(-2px)" }}
                    leftIcon={<FaDownload />}
                    borderRadius="full"
                    px={8}
                    py={6}
                    fontSize="md"
                    fontWeight="600"
                    boxShadow="0 10px 25px rgba(88, 184, 69, 0.3)"
                    transition="all 0.3s ease"
                  >
                    Download Resume
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    as="a"
                    href="https://wa.me/919118708250"
                    target="_blank"
                    rel="noopener noreferrer"
                    size="lg"
                    variant="outline"
                    borderColor="green.400"
                    color="green.400"
                    _hover={{ 
                      bg: "green.400", 
                      color: "white",
                      transform: "translateY(-2px)"
                    }}
                    borderRadius="full"
                    px={8}
                    py={6}
                    fontSize="md"
                    fontWeight="600"
                    transition="all 0.3s ease"
                  >
                    Get In Touch
                  </Button>
                </motion.div>
              </MotionFlex>
            </MotionBox>
            
            {/* Hero Image */}
            <MotionBox 
              flex="1" 
              mt={[20, 0]}
              maxW={{ base: "100%", lg: "500px" }}
              variants={fadeInRight}
            >
              <motion.div
                // animate={{ 
                //   y: [0, -10, 0],
                //   scale: [1, 1.02, 1]
                // }}
                // transition={{ 
                //   duration: 4,
                //   repeat: Infinity,
                //   ease: "easeInOut"
                // }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                <Box
                  position="relative"
                  w={{ base: "280px", md: "350px", lg: "400px" }}
                  h={{ base: "280px", md: "350px", lg: "400px" }}
                  mx="auto"
                  borderRadius="full"
                  overflow="hidden"
                  boxShadow="0 20px 40px rgba(79, 172, 254, 0.3), 0 0 0 4px rgba(79, 172, 254, 0.1)"
                  bg="linear-gradient(135deg, rgba(79, 172, 254, 0.1), rgba(0, 242, 254, 0.1))"
                  p={2}
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    // background: 'linear-gradient(135deg, rgba(79, 172, 254, 0.3), rgba(0, 242, 254, 0.3))',
                    borderRadius: 'full',
                    zIndex: 1,
                    opacity: 1,
                    transition: ' 0.3s ease'
                  }}
                  _hover={{
                 
                  }}
                >
                  <Image
                    src="/pics/me1.jpg"
                    alt="Shubham Gond - Portfolio"
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    borderRadius="full"
                    filter="brightness(1.1) contrast(1.1) saturate(1.1)"
                    transition="all 0.3s ease"
                    _hover={{
                      filter: "brightness(1.2) contrast(1.2) saturate(1.2)",
                      transform: "scale(1.05)"
                    }}
                  />
                  {/* <Box
                    position="absolute"
                    bottom={100}
                    right={5}
                    bg="rgba(79, 172, 254, 0.9)"
                    backdropFilter="blur(10px)"
                    borderRadius="full"
                    p={3}
                    zIndex={2}
                    boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)"
                    _hover={{
                      bg: "rgba(0, 242, 254, 0.9)",
                      transform: "scale(1.1)"
                    }}
                    transition="all 0.3s ease"
                  >
                    <HiSparkles color="white" size="18px" />
                  </Box> */}
                </Box>
              </motion.div>
            </MotionBox>
          </Flex>
        </Container>
      </AnimatedSection>

      {/* About Section */}
      <AnimatedSection id="aboutMe" py={20} bg="rgba(0, 0, 0, 0.3)">
        <Container maxW="7xl">
          <MotionHeading
            textAlign="center"
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            mb={ [0, 20]}
               color="white"
            variants={fadeInUp}
          >
            About <Text as="span" color="green.400">Me</Text>
          </MotionHeading>
          
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            align="center"
            gap={12}
          >
             <MotionBox 
              flex="1" 
              mt={[20, 0]}
              maxW={{ base: "100%", lg: "500px" }}
              variants={fadeInRight}
            >
              <motion.div
                // animate={{ 
                //   y: [0, -10, 0],
                //   scale: [1, 1.02, 1]
                // }}
                // transition={{ 
                //   duration: 4,
                //   repeat: Infinity,
                //   ease: "easeInOut"
                // }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                <Box
                  position="relative"
                  w={{ base: "280px", md: "350px", lg: "350px" }}
                  h={{ base: "400px", md: "400px", lg: "480px" }}
                  mx="auto"
                  borderRadius="2xl"
                  overflow="hidden"
                  boxShadow="0 20px 40px rgba(79, 172, 254, 0.3), 0 0 0 4px rgba(79, 172, 254, 0.1)"
                  bg="linear-gradient(135deg, rgba(79, 172, 254, 0.1), rgba(0, 242, 254, 0.1))"
                  p={2}
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    // background: 'linear-gradient(135deg, rgba(79, 172, 254, 0.3), rgba(0, 242, 254, 0.3))',
                    borderRadius: '2xl',
                    zIndex: 1,
                    opacity: 1,
                    transition: ' 0.3s ease'
                  }}
                  _hover={{
                 
                  }}
                >
                  <Image
                    src="/pics/me4.jpg"
                    alt="Shubham Gond - Portfolio"
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    borderRadius="2xl"
                    filter="brightness(1.1) contrast(1.1) saturate(1.1)"
                    transition="all 0.3s ease"
                    _hover={{
                      filter: "brightness(1.2) contrast(1.2) saturate(1.2)",
                      transform: "scale(1.05)"
                    }}
                  />
                  {/* <Box
                    position="absolute"
                    bottom={100}
                    right={5}
                    bg="rgba(79, 172, 254, 0.9)"
                    backdropFilter="blur(10px)"
                    borderRadius="full"
                    p={3}
                    zIndex={2}
                    boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)"
                    _hover={{
                      bg: "rgba(0, 242, 254, 0.9)",
                      transform: "scale(1.1)"
                    }}
                    transition="all 0.3s ease"
                  >
                    <HiSparkles color="white" size="18px" />
                  </Box> */}
                </Box>
              </motion.div>
            </MotionBox>
            
            <MotionBox flex="1" variants={fadeInRight}>
              <VStack align="start" spacing={6}>
                <Box>
                  <Flex align="center" mb={4}>
                    <FaUser color="#58b845" size="24px" />
                    <Heading size="lg" ml={3} color="white">
                      Who I Am
                    </Heading>
                  </Flex>
                  <Text fontSize="lg" color="gray.300" lineHeight="1.8">
                    Full Stack Developer with hands-on experience in building web and mobile 
                    applications using the MERN stack and React Native. I've completed a 
                    7-month internship, contributing to both frontend and backend development, 
                    including REST APIs and database integration.
                  </Text>
                </Box>
                
                <Box>
                  <Flex align="center" mb={4}>
                    <BiCodeAlt color="#58b845" size="24px" />
                    <Heading size="lg" ml={3} color="white">
                      What I Do
                    </Heading>
                  </Flex>
                  <Text fontSize="lg" color="gray.300" lineHeight="1.8">
                    Proficient in JavaScript, React, Node.js, Express, MongoDB, and React Native, 
                    with a focus on clean code, scalable architecture, and performance optimization. 
                    I love turning complex problems into simple, beautiful solutions.
                  </Text>
                </Box>
              </VStack>
            </MotionBox>
          </Flex>
        </Container>
      </AnimatedSection>

      {/* Skills Section */}
      <AnimatedSection id="skills" py={20}>
        <Container maxW="7xl">
          <MotionHeading
            textAlign="center"
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            mb={16}
               color="white"
            variants={fadeInUp}
          >
            Technical <Text as="span" color="green.400">Skills</Text>
          </MotionHeading>
          
          <VStack spacing={12}>
            {/* Frontend Skills */}
            <MotionBox w="100%" variants={fadeInUp}>
              <Flex align="center" justify="center" mb={8}>
                <FaCode color="#58b845" size="24px" />
                <Heading size="lg" ml={3} color="white">
                  Front<Text as="span" color="green.400">end</Text>
                </Heading>
              </Flex>
              <SimpleGrid columns={{ base: 3, md: 4, lg: 6 }} spacing={6}>
                {skills.filter(skill => skill.tag === "frontend").map((skill, index) => (
                  <SkillCard key={skill.id} skill={skill} index={index} />
                ))}
              </SimpleGrid>
            </MotionBox>
            
            {/* Backend Skills */}
            <MotionBox w="100%" variants={fadeInUp}>
              <Flex align="center" justify="center" mb={8}>
                <FaCode color="#58b845" size="24px" />
                <Heading size="lg" ml={3} color="white">
                  Back<Text as="span" color="green.400">end</Text>
                </Heading>
              </Flex>
              <SimpleGrid columns={{ base: 3, md: 4, lg: 6 }} spacing={6}>
                {skills.filter(skill => skill.tag === "backend").map((skill, index) => (
                  <SkillCard key={skill.id} skill={skill} index={index} />
                ))}
              </SimpleGrid>
            </MotionBox>
            
            {/* Tools & Platforms */}
            <MotionBox w="100%" variants={fadeInUp}>
              <Flex align="center" justify="center" mb={8}>
                <FaCode color="#58b845" size="24px" />
                <Heading size="lg" ml={3} color="white">
                  Tools & <Text as="span" color="green.400">Platforms</Text>
                </Heading>
              </Flex>
              <SimpleGrid columns={{ base: 3, md: 4, lg: 6 }} spacing={6}>
                {skills.filter(skill => skill.tag === "platform").map((skill, index) => (
                  <SkillCard key={skill.id} skill={skill} index={index} />
                ))}
              </SimpleGrid>
            </MotionBox>
          </VStack>
        </Container>
      </AnimatedSection>

      {/* Education Section */}
      <AnimatedSection py={20} bg="rgba(0, 0, 0, 0.3)">
        <Container maxW="7xl">
          <MotionHeading
            textAlign="center"
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            mb={16}
               color="white"
            variants={fadeInUp}
          >
            Education <Text as="span" color="green.400">History</Text>
          </MotionHeading>
          
          <VStack spacing={8} maxW="4xl" mx="auto">
            <MotionBox
              w="100%"
              bg="rgba(255, 255, 255, 0.05)"
              backdropFilter="blur(10px)"
              border="1px solid rgba(255, 255, 255, 0.1)"
              borderRadius="xl"
              p={8}
              variants={fadeInLeft}
              _hover={{
                bg: "rgba(88, 184, 69, 0.1)",
                borderColor: "green.400"
              }}
              transition="all 0.3s ease"
            >
              <Flex align="center" mb={4}>
                <FaGraduationCap color="#58b845" size="24px" />
                <Badge colorScheme="green" ml={3} px={3} py={1} borderRadius="full">
                  2021 - 2023
                </Badge>
              </Flex>
              <Heading size="lg" color="white" mb={2}>
                Master of Computer Application (MCA)
              </Heading>
              <Text color="gray.300" fontSize="lg">
                J.S UNIVERSITY SIKOHABAD, U.P
              </Text>
            </MotionBox>
            
            <MotionBox
              w="100%"
              bg="rgba(255, 255, 255, 0.05)"
              backdropFilter="blur(10px)"
              border="1px solid rgba(255, 255, 255, 0.1)"
              borderRadius="xl"
              p={8}
              variants={fadeInRight}
              _hover={{
                bg: "rgba(88, 184, 69, 0.1)",
                borderColor: "green.400"
              }}
              transition="all 0.3s ease"
            >
              <Flex align="center" mb={4}>
                <FaGraduationCap color="#58b845" size="24px" />
                <Badge colorScheme="green" ml={3} px={3} py={1} borderRadius="full">
                  2017 - 2020
                </Badge>
              </Flex>
              <Heading size="lg" color="white" mb={2}>
                Bachelor of Computer Application (BCA)
              </Heading>
              <Text color="gray.300" fontSize="lg">
                ALLAHABAD STATE UNIVERSITY, PRAYAGRAJ
              </Text>
            </MotionBox>
          </VStack>
        </Container>
      </AnimatedSection>

      {/* Experience Section */}
      <AnimatedSection py={20}>
        <Container maxW="7xl">
          <MotionHeading
            textAlign="center"
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            mb={16}
            color="white"
            variants={fadeInUp}
          >
            Professional <Text as="span" color="green.400">Experience</Text>
          </MotionHeading>
          
          <VStack spacing={8} maxW="4xl" mx="auto">
            <MotionBox
              w="100%"
              bg="rgba(255, 255, 255, 0.05)"
              backdropFilter="blur(10px)"
              border="1px solid rgba(255, 255, 255, 0.1)"
              borderRadius="xl"
              p={8}
              variants={fadeInLeft}
              _hover={{
                bg: "rgba(88, 184, 69, 0.1)",
                borderColor: "green.400"
              }}
              transition="all 0.3s ease"
            >
              <Flex align="center" mb={4}>
                <FaBriefcase color="#58b845" size="24px" />
                <Badge colorScheme="green" ml={3} px={3} py={1} borderRadius="full">
                  Oct 2024 - Nov 2024
                </Badge>
              </Flex>
              <Heading size="lg" color="white" mb={2}>
                SOFTWARE DEVELOPER INTERN
              </Heading>
              <Text color="gray.300" fontSize="lg">
                Kipss AI
              </Text>
            </MotionBox>
            
            <MotionBox
              w="100%"
              bg="rgba(255, 255, 255, 0.05)"
              backdropFilter="blur(10px)"
              border="1px solid rgba(255, 255, 255, 0.1)"
              borderRadius="xl"
              p={8}
              variants={fadeInRight}
              _hover={{
                bg: "rgba(88, 184, 69, 0.1)",
                borderColor: "green.400"
              }}
              transition="all 0.3s ease"
            >
              <Flex align="center" mb={4}>
                <FaBriefcase color="#58b845" size="24px" />
                <Badge colorScheme="green" ml={3} px={3} py={1} borderRadius="full">
                  Apr 2024 - Sep 2024
                </Badge>
              </Flex>
              <Heading size="lg" color="white" mb={2}>
                REACT NATIVE DEVELOPER INTERN
              </Heading>
              <Text color="gray.300" fontSize="lg">
                Growwlancer Pvt. Ltd
              </Text>
            </MotionBox>
          </VStack>
        </Container>
      </AnimatedSection>

      {/* Projects Section */}
      <AnimatedSection id="projects" py={20} bg="rgba(0, 0, 0, 0.3)">
        <Container maxW="7xl">
          <VStack spacing={10}>
            {/* Section Header */}
            <MotionBox variants={fadeInUp} textAlign="center">
              <Flex align="center" justify="center" mb={4}>
                <FaProjectDiagram color="#58b845" size="32px" />
                <MotionHeading
                  fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                  ml={4}
                  fontWeight="800"
                  className="gradient-text"
                >
                  Featured <Text as="span" color="green.400">Projects</Text>
                </MotionHeading>
              </Flex>
              <MotionText
                fontSize={{ base: "lg", md: "xl" }}
                color="gray.400"
                maxW="600px"
                mx="auto"
                lineHeight="1.6"
                variants={fadeInUp}
              >
                Explore my latest work showcasing modern web and mobile applications 
                built with cutting-edge technologies and best practices.
              </MotionText>
            </MotionBox>

            {/* Projects Grid/Carousel */}
            <MotionBox 
              w="100%" 
              variants={fadeInUp}
              className="projects-showcase"
            >
              {/* Desktop Grid View */}
              <Box display={{ base: "none", lg: "block" }}>
                <SimpleGrid columns={{ lg: 2, xl: 3 }} spacing={8}>
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.1,
                        ease: "easeOut"
                      }}
                      whileHover={{ 
                        y: -5,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <ProjectCard {...project} />
                    </motion.div>
                  ))}
                </SimpleGrid>
              </Box>

              {/* Mobile/Tablet Carousel View */}
              <Box display={{ base: "block", lg: "none" }}>
                <Carousel
                  responsive={responsive}
                  infinite={true}
                  autoPlay={true}
                  autoPlaySpeed={4000}
                  keyBoardControl={true}
                  customTransition="transform 400ms ease-in-out"
                  transitionDuration={400}
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={["mobile"]}
                  dotListClass="custom-dot-list-style"
                  itemClass="carousel-item-padding-20-px"
                  arrows={true}
                  showDots={true}
                  pauseOnHover={true}
                  swipeable={true}
                  draggable={true}
                >
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.1 
                      }}
                      style={{ padding: "10px 0" }}
                    >
                      <ProjectCard {...project} />
                    </motion.div>
                  ))}
                </Carousel>
              </Box>
            </MotionBox>

            {/* Call to Action */}
            <MotionBox variants={fadeInUp} textAlign="center">
              <Text color="gray.400" mb={6} fontSize="lg">
                Want to see more of my work?
              </Text>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  as="a"
                  href="https://github.com/shubhamgaur08"
                  target="_blank"
                  size="lg"
                  variant="outline"
                  borderColor="green.400"
                  color="green.400"
                  _hover={{ 
                    bg: "green.400", 
                    color: "white",
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 25px rgba(88, 184, 69, 0.3)"
                  }}
                  leftIcon={<FaGithub />}
                  borderRadius="full"
                  px={8}
                  py={6}
                  fontSize="md"
                  fontWeight="600"
                  transition="all 0.3s ease"
                >
                  View All Projects on GitHub
                </Button>
              </motion.div>
            </MotionBox>
          </VStack>
        </Container>
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection id="contactMe" py={20}>
        <Container maxW="7xl">
          <MotionHeading
            textAlign="center"
            color="white"
            
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            mb={16}
            variants={fadeInUp}
          >
            Get In <Text as="span" color="green.400">Touch</Text>
          </MotionHeading>
          
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            align="center"
            gap={12}
            maxW="6xl"
            mx="auto"
          >
            {/* Contact Animation */}
            <MotionBox flex="1" variants={fadeInLeft}>
              <motion.div
                // animate={{ 
                //   y: [0, -10, 0],
                //   rotate: [0, 1, -1, 0]
                // }}
                // transition={{ 
                //   duration: 4,
                //   repeat: Infinity,
                //   ease: "easeInOut"
                // }}
              >
                <Svg2 />
              </motion.div>
            </MotionBox>
            
            {/* Contact Form */}
            <MotionBox 
              flex="1" 
              maxW="500px"
              minW="300px"
              variants={fadeInRight}
            >
              <Box
                bg="rgba(255, 255, 255, 0.05)"
                backdropFilter="blur(10px)"
                border="1px solid rgba(255, 255, 255, 0.1)"
                borderRadius="2xl"
                p={8}
                boxShadow="0 25px 50px rgba(0, 0, 0, 0.3)"
              >
                <form ref={form} onSubmit={sendEmail}>
                  <VStack spacing={6}>
                    <Box w="100%" className="input-group">
                      <input
                        type="text"
                        name="from_name"
                        required
                        className="modern-input"
                        placeholder=" "
                      />
                      <label className="modern-label">Full Name</label>
                    </Box>
                    
                    <Box w="100%" className="input-group">
                      <input
                        type="email"
                        name="from_mail"
                        required
                        className="modern-input"
                        placeholder=" "
                      />
                      <label className="modern-label">Email Address</label>
                    </Box>
                    
                    <Box w="100%" className="input-group">
                      <textarea
                        name="message"
                        required
                        className="modern-textarea"
                        placeholder="Your message here..."
                        rows={5}
                      />
                    </Box>
                    
                    <motion.div 
                      style={{ width: '100%' }}
                      whileHover={{ scale: 1.02 }} 
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        size="lg"
                        w="100%"
                        bg="green.400"
                        color="white"
                        _hover={{ bg: "green.500" }}
                        borderRadius="xl"
                        py={6}
                        fontSize="lg"
                        fontWeight="600"
                        leftIcon={<FaEnvelope />}
                        boxShadow="0 10px 25px rgba(88, 184, 69, 0.3)"
                        transition="all 0.3s ease"
                      >
                        Send Message
                      </Button>
                    </motion.div>
                  </VStack>
                </form>
                
                <Divider my={8} borderColor="rgba(255, 255, 255, 0.1)" />
                
                {/* Contact Info */}
                <VStack spacing={6}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <HStack spacing={4}>
                      <Box
                        p={3}
                        bg="linear-gradient(135deg, rgba(88, 184, 69, 0.15), rgba(88, 184, 69, 0.05))"
                        borderRadius="full"
                        border="1px solid rgba(88, 184, 69, 0.3)"
                        boxShadow="0 8px 25px rgba(88, 184, 69, 0.2)"
                        _hover={{
                          boxShadow: "0 12px 35px rgba(88, 184, 69, 0.3)",
                          transform: "translateY(-2px)"
                        }}
                        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                      >
                        <FaEnvelope size={24} color="#58b845" />
                      </Box>
                      <Text color="gray.300" fontSize="lg" fontWeight="500">shubhamgaur672@gmail.com</Text>
                    </HStack>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <HStack spacing={4}>
                      <Box
                        p={3}
                        bg="linear-gradient(135deg, rgba(88, 184, 69, 0.15), rgba(88, 184, 69, 0.05))"
                        borderRadius="full"
                        border="1px solid rgba(88, 184, 69, 0.3)"
                        boxShadow="0 8px 25px rgba(88, 184, 69, 0.2)"
                        _hover={{
                          boxShadow: "0 12px 35px rgba(88, 184, 69, 0.3)",
                          transform: "translateY(-2px)"
                        }}
                        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                      >
                        <FaPhone size={24} color="#58b845" />
                      </Box>
                      <Text color="gray.300" fontSize="lg" fontWeight="500">+91 9118708250</Text>
                    </HStack>
                  </motion.div>
                </VStack>
                
                {/* Social Links */}
                <HStack justify="center" spacing={8} mt={9}>
                  {[
                    { icon: FaWhatsapp, href: 'https://wa.me/919118708250', label: 'WhatsApp', color: '#25D366' },
                    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/shubhamgaur07/', label: 'LinkedIn', color: '#0077B5' },
                    { icon: FaGithub, href: 'https://github.com/shubhamgaur08', label: 'GitHub', color: '#333' },
                    { icon: FaEnvelope, href: 'mailto:shubhamgaur672@gmail.com', label: 'Email', color: '#EA4335' }
                  ].map((social, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.15, y: -8 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Tooltip 
                        label={social.label} 
                        bg="rgba(0, 0, 0, 0.8)" 
                        color="white" 
                        borderRadius="md"
                        fontSize="sm"
                      >
                        <IconButton
                          as="a"
                          href={social.href}
                          target="_blank"
                          icon={<social.icon size={28} />}
                          size="xl"
                          variant="ghost"
                          color={social.color}
                          bg="#FFFDF6"
                          border="1px solid rgba(255, 255, 255, 0.1)"
                          _hover={{ 
                            bg: `rgba(${social.color === '#25D366' ? '37, 211, 102' : social.color === '#0077B5' ? '0, 119, 181' : social.color === '#333' ? '51, 51, 51' : '234, 67, 53'}, 0.15)`,
                            color: social.color,
                            borderColor: social.color,
                            boxShadow: `0 8px 25px rgba(${social.color === '#25D366' ? '37, 211, 102' : social.color === '#0077B5' ? '0, 119, 181' : social.color === '#333' ? '51, 51, 51' : '234, 67, 53'}, 0.3)`,
                            transform: 'translateY(-2px)'
                          }}
                          borderRadius="full"
                          p={0}
                          h={["50px", "60px"]}
                          w={["50px", "60px"]}
                          transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                          boxShadow="0 4px 15px rgba(0, 0, 0, 0.1)"
                        />
                      </Tooltip>
                    </motion.div>
                  ))}
                </HStack>
              </Box>
            </MotionBox>
          </Flex>
        </Container>
      </AnimatedSection>

      {/* Footer */}
      <Box 
        bg="rgba(0, 0, 0, 0.8)" 
        py={8} 
        borderTop="1px solid rgba(255, 255, 255, 0.1)"
      >
        <Container maxW="7xl">
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align="center"
            gap={4}
          >
            <Text color="gray.400" fontSize="sm">
              © 2025 Portfolio by Shubham Gaur | All rights reserved.
            </Text>
            <Text color="gray.400" fontSize="sm">
              Made with ❤️ and React
            </Text>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}

export default Home