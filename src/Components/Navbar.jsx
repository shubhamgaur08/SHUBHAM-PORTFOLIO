import { 
    Box, 
    Button, 
    Drawer, 
    DrawerBody, 
    DrawerCloseButton, 
    DrawerContent, 
    DrawerHeader, 
    DrawerOverlay, 
    Heading, 
    Image, 
    Link, 
    useDisclosure,
    Flex,
    Text,
    IconButton,
    VStack,
    HStack
} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import logo from '../Images/favicon.webp'
import { GiHamburgerMenu } from 'react-icons/gi'
import { VscChromeClose } from 'react-icons/vsc'
import { FiHome, FiUser, FiCode, FiFolder, FiFileText, FiMail } from 'react-icons/fi'

import Resume from '../Resume/Shubham_Gond_Resume.pdf'

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('home')

    // Smooth scroll to section with offset
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
            const navbarHeight = 80 // Adjust based on your navbar height
            const elementPosition = element.offsetTop - navbarHeight
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            })
        }
    }

    // Handle scroll effect for navbar and active section detection
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50
            setScrolled(isScrolled)

            // Detect active section
            const sections = ['home', 'aboutMe', 'skills', 'projects', 'contactMe']
            const navbarHeight = 80
            
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i])
                if (section) {
                    const sectionTop = section.offsetTop - navbarHeight - 100
                    const sectionBottom = sectionTop + section.offsetHeight
                    
                    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                        setActiveSection(sections[i])
                        break
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Navigation items with icons
    const navItems = [
        { id: 'home', label: 'Home', href: '#home', icon: FiHome },
        { id: 'aboutMe', label: 'About', href: '#aboutMe', icon: FiUser },
        { id: 'skills', label: 'Skills', href: '#skills', icon: FiCode },
        { id: 'projects', label: 'Projects', href: '#projects', icon: FiFolder },
        { id: 'contactMe', label: 'Contact', href: '#contactMe', icon: FiMail }
    ]

    const handleNavClick = (sectionId, e) => {
        e.preventDefault()
        setActiveSection(sectionId)
        scrollToSection(sectionId)
        if (isOpen) onClose()
    }

    const handleResumeClick = () => {
        window.open("https://drive.google.com/file/d/1DNC4mQpszhVrDQY0qzv6ZaIs345NT3RX/view?usp=drive_link", '_blank')
    }

    return (
        <Box 
            className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
            position="fixed"
            top="0"
            left="0"
            right="0"
            zIndex="1000"
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        >
            <Flex 
                align="center" 
                justify="space-between" 
                maxW="1200px" 
                mx="auto" 
                px={[4, 6, 8]} 
                py={4}
                h={["65px", "80px"]}
            >
                {/* Logo Section */}
                <Flex align="center" className="navbar-logo">
                    <Image 
                        src={logo} 
                        alt="Shubham Gaur Portfolio" 
                        w="45px" 
                        h="45px" 
                        borderRadius="12px"
                        mr={3}
                        className="logo-image"
                    />
                    <Box className="logo-text">
                        <Text 
                            fontSize={["lg", "xl"]} 
                            fontWeight="700" 
                            className="gradient-text"
                            lineHeight="1.2"
                        >
                            SHUBHAM GAUR
                        </Text>
                        <Text 
                            fontSize="xs" 
                            color="rgba(255, 255, 255, 0.7)" 
                            fontWeight="500"
                            letterSpacing="0.5px"
                        >
                            Full Stack Developer
                        </Text>
                    </Box>
                </Flex>

                {/* Desktop Navigation */}
                <HStack 
                    spacing={1} 
                    display={["none", "none", "none", "flex"]} 
                    className="nav-options"
                >
                    {navItems.map((item) => (
                        <Button
                            key={item.id}
                            variant="ghost"
                            className={`nav-item ${activeSection === item.id ? 'nav-item-active' : ''}`}
                            onClick={(e) => handleNavClick(item.id, e)}
                            leftIcon={<item.icon size="16" />}
                            size="md"
                            px={4}
                            py={2}
                            borderRadius="12px"
                            fontWeight="500"
                            fontSize="sm"
                            color="#ffffff"
                            bg="rgba(255, 255, 255, 0.08)"
                            border="1px solid rgba(255, 255, 255, 0.12)"
                            _hover={{
                                bg: "rgba(88, 184, 69, 0.15)",
                                color: "#ffffff",
                                borderColor: "rgba(88, 184, 69, 0.4)",
                                transform: "translateY(-2px)",
                                boxShadow: "0 4px 15px rgba(88, 184, 69, 0.2)"
                            }}
                            _active={{
                                bg: "rgba(88, 184, 69, 0.2)",
                                color: "#ffffff"
                            }}
                            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                        >
                            {item.label}
                        </Button>
                    ))}
                    
                    {/* Resume Button */}
                    <Button
                        className="resume-btn"
                        onClick={handleResumeClick}
                        leftIcon={<FiFileText size="16" />}
                        size="md"
                        px={6}
                        py={2}
                        ml={2}
                        borderRadius="12px"
                        fontWeight="600"
                        fontSize="sm"
                        bg="linear-gradient(135deg, #58b845, #7dd55c)"
                        color="#ffffff"
                        border="1px solid rgba(88, 184, 69, 0.3)"
                        _hover={{
                            bg: "linear-gradient(135deg, #7dd55c, #58b845)",
                            color: "#ffffff",
                            transform: "translateY(-2px)",
                            boxShadow: "0 8px 25px rgba(88, 184, 69, 0.4)",
                            borderColor: "rgba(88, 184, 69, 0.5)"
                        }}
                        _active={{
                            transform: "translateY(0)",
                            bg: "linear-gradient(135deg, #4a9a37, #6bc249)"
                        }}
                        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    >
                        Resume
                    </Button>
                </HStack>

                {/* Mobile Menu Button */}
                <IconButton
                    ref={btnRef}
                    display={["flex", "flex", "flex", "none"]}
                    onClick={isOpen ? onClose : onOpen}
                    icon={isOpen ? <VscChromeClose size="20" /> : <GiHamburgerMenu size="20" />}
                    variant="ghost"
                    className="mobile-menu-btn"
                    size="md"
                    borderRadius="12px"
                    color="#ffffff"
                    bg="rgba(255, 255, 255, 0.08)"
                    border="1px solid rgba(255, 255, 255, 0.12)"
                    _hover={{
                        bg: "rgba(88, 184, 69, 0.15)",
                        color: "#ffffff",
                        borderColor: "rgba(88, 184, 69, 0.4)",
                        boxShadow: "0 4px 15px rgba(88, 184, 69, 0.2)"
                    }}
                    _active={{
                        bg: "rgba(88, 184, 69, 0.2)"
                    }}
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                />
            </Flex>

            {/* Mobile Drawer */}
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
                size="sm"
            >
                <DrawerOverlay bg="rgba(0, 0, 0, 0.8)" />
                <DrawerContent className="mobile-drawer">
                    <DrawerCloseButton 
                        size="lg"
                        color="#ffffff"
                        bg="rgba(255, 255, 255, 0.08)"
                        border="1px solid rgba(255, 255, 255, 0.12)"
                        _hover={{ 
                            color: "#ffffff", 
                            bg: "rgba(88, 184, 69, 0.15)",
                            borderColor: "rgba(88, 184, 69, 0.4)"
                        }}
                        top={6}
                        right={6}
                    />
                    
                    <DrawerHeader pt={8} pb={4}>
                        <Flex align="center" className="mobile-logo">
                            <Image 
                                src={logo} 
                                alt="Shubham Gaur Portfolio" 
                                w="40px" 
                                h="40px" 
                                borderRadius="10px"
                                mr={3}
                            />
                            <Box>
                                <Text 
                                    fontSize="lg" 
                                    fontWeight="700" 
                                    className="gradient-text"
                                    lineHeight="1.2"
                                >
                                    SHUBHAM GAUR
                                </Text>
                                <Text 
                                    fontSize="xs" 
                                    color="rgba(255, 255, 255, 0.7)" 
                                    fontWeight="500"
                                >
                                    Full Stack Developer
                                </Text>
                            </Box>
                        </Flex>
                    </DrawerHeader>

                    <DrawerBody px={6}>
                        <VStack spacing={4} align="stretch">
                            {navItems.map((item) => (
                                <Button
                                    key={item.id}
                                    variant="ghost"
                                    className="mobile-nav-item"
                                    onClick={(e) => handleNavClick(item.id, e)}
                                    leftIcon={<item.icon size="18" />}
                                    size="lg"
                                    justifyContent="flex-start"
                                    px={4}
                                    py={3}
                                    h="auto"
                                    borderRadius="12px"
                                    fontWeight="500"
                                    fontSize="md"
                                    color="#ffffff"
                                    bg="rgba(255, 255, 255, 0.08)"
                                    border="1px solid rgba(255, 255, 255, 0.12)"
                                    _hover={{
                                        bg: "rgba(88, 184, 69, 0.15)",
                                        color: "#ffffff",
                                        borderColor: "rgba(88, 184, 69, 0.4)",
                                        transform: "translateX(8px)",
                                        boxShadow: "0 4px 15px rgba(88, 184, 69, 0.2)"
                                    }}
                                    _active={{
                                        bg: "rgba(88, 184, 69, 0.2)"
                                    }}
                                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                                >
                                    {item.label}
                                </Button>
                            ))}
                            
                            {/* Mobile Resume Button */}
                            <Button
                                className="mobile-resume-btn"
                                onClick={() => {
                                    handleResumeClick()
                                    onClose()
                                }}
                                leftIcon={<FiFileText size="18" />}
                                size="lg"
                                justifyContent="flex-start"
                                px={4}
                                py={3}
                                h="auto"
                                mt={4}
                                borderRadius="12px"
                                fontWeight="600"
                                fontSize="md"
                                bg="linear-gradient(135deg, #58b845, #7dd55c)"
                                color="#ffffff"
                                border="1px solid rgba(88, 184, 69, 0.3)"
                                _hover={{
                                    bg: "linear-gradient(135deg, #7dd55c, #58b845)",
                                    color: "#ffffff",
                                    transform: "translateX(8px)",
                                    boxShadow: "0 8px 25px rgba(88, 184, 69, 0.4)"
                                }}
                                _active={{
                                    bg: "linear-gradient(135deg, #4a9a37, #6bc249)"
                                }}
                                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                            >
                                Download Resume
                            </Button>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    )
}

export default Navbar