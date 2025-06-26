import { Box, Button, Flex, Heading, HStack, Link, Tooltip, Image, Text } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import  { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Aos from 'aos';
import 'aos/dist/aos.css'
// import GitHubCalendar from 'react-github-calendar';
// import { Tooltip as ReactTooltip } from 'react-tooltip';
import { useEffect } from 'react';
import { LuCloudDownload } from 'react-icons/lu'
import { FaPhoneAlt } from 'react-icons/fa'
import { SiGmail } from 'react-icons/si'

import { projects, skills } from '../Utils/data';

import ProjectCard from '../Components/Card';
import Svg1 from '../Components/Svg1';
import Svg2 from '../Components/Svg2';
import Svg3 from '../Components/Svg3';
import Resume from '../Resume/Shubham_Gond_Resume.pdf'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 2200 },
        items: 5
    },
    largeDesktop: {
        breakpoint: { max: 2200, min: 1920 },
        items: 4
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
};

const Home = () => {

    const form = useRef();
    const toast = useToast()

    useEffect(() => {
        // * it's from Aos library to to use scroll designing
        Aos.init()
    }, [])

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_SERVICE_TEMPLATE, form.current, import.meta.env.VITE_SERVICE_SECRET).then(() => {

            toast({
                position: 'top-right',
                title: 'Email Sent ✔',
                description: `Thank You ${form.current.from_name.value.split(" ")[0]} for the message!`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            })

            form.current.reset();
        }, (error) => {
            console.log(error.text);
            toast({
                position: 'top-right',
                title: 'Email Not sent.',
                description: "There is some error",
                status: 'warning',
                duration: 5000,
                isClosable: true,
            })
        });;

    };

    return (
        <Box>
            <Box id='home'>
                <Flex flexDirection={['column-reverse', 'column-reverse', 'row']} m="auto" justifyContent="space-around" alignItems="center" h="100%">
                    <Box data-aos="fade-down">
                        <Heading>Hey! <span className='themeText'>I am</span></Heading>
                        <Box className='content'>
                            <Heading fontSize="3.3em" className='text' data-text="Shubham Gaur"><span className='themeText'>Shubham Gaur</span></Heading>
                        </Box>
                        <Text>I am a MERN Stack & React Native Developer, passionate and experienced in building modern Web and Mobile Applications.</Text>
                        <HStack className='hireMe' onClick={() => { window.open("https://drive.google.com/file/d/1DNC4mQpszhVrDQY0qzv6ZaIs345NT3RX/view?usp=drive_link", '_blank') }}>
                            <a href={Resume} download="Shubham_Gond_Resume">
                                <Button>Resume <LuCloudDownload /></Button>
                            </a>
                        </HStack>
                    </Box>
                    <Box data-aos="fade-down">
                        <Svg1 />
                    </Box>
                </Flex>
            </Box>

            {/* About me */}

            <Box id="aboutMe" >
                <Heading size={"3xl"} mb={10}>About <span className='themeText'>Me</span></Heading>
                <Flex flexDirection={['column-reverse', 'column-reverse', 'column-reverse', 'row']} alignItems="center" mt={5} h="100%">
                    <div data-aos="fade-right">
                        <Svg3 />
                    </div>

                    <Flex data-aos="fade-left">
                        
                        <Box>
                            <Text fontSize={"2xl"}> Full Stack Developer with hands-on experience in building web and mobile applications using the MERN stack and React Native. Completed a 7-month internship, contributing to both frontend and backend development, including REST APIs and database integration. Proficient in JavaScript, React, Node.js, Express, MongoDB, and React Native, with a focus on clean code, scalable architecture, and performance optimization.</Text>
                        </Box>
                    </Flex>
                </Flex>
            </Box>

            {/* Educational history */}
            <Box className="education-timeline">
                <Heading>Education
                    <span className="themeText"> History</span>
                </Heading>
                <Box className='timeline'>
                    <ul>
                        <li>
                            <Box className='content'>
                                <Heading size="lg">ALLAHABAD STATE UNIVERSITY , PRAYAGRAJ</Heading>
                                <Text>
                                Bachelor of Computer Application (BCA)</Text>
                            </Box>
                            <Box className='time'>
                                <Text> 2017 - 2020</Text>
                            </Box>
                        </li>
                        <li>
                            <Box className='content'>
                                <Heading size="lg">J.S UNIVERSITY SIKOHABAD, U.P</Heading>
                                <Text>
                                Master of Computer Application (MCA)</Text>
                            </Box>
                            <Box className='time'>
                                <Text> 2021 - 2023</Text>
                            </Box>
                        </li>
                    </ul>
                </Box>
            </Box>

            {/* Technical Skills section */}
            <Box id="skills">
                <Heading>
                    Technical
                    <span className="themeText"> Skills</span>
                </Heading>
                <Flex className='skills'>
                    <Flex>
                        <Heading size="lg">Front<span className='themeText'>end</span></Heading>
                        <Box>
                            {
                                skills.filter((el) => el.tag === "frontend").map(skill => <Box
                                    key={skill.id}
                                    className="skill"
                                    data-aos="zoom-in-up">
                                    <Box>
                                        <Image src={skill.icon} alt={`${skill.title} icon`} />
                                    </Box>
                                    <Text>{skill.title}</Text>
                                </Box>)
                            }
                        </Box>
                    </Flex>
                    <Flex>
                        <Heading size="lg">Back<span className='themeText'>end</span></Heading>
                        <Box>
                            {
                                skills.filter((el) => el.tag === "backend").map(skill => <Box
                                    key={skill.id}
                                    className="skill"
                                    data-aos="zoom-in-down">
                                    <Box>
                                        <Image src={skill.icon} alt={`${skill.title} icon`} />
                                    </Box>
                                    <Text>{skill.title}</Text>
                                </Box>)
                            }
                        </Box>
                    </Flex>
                    <Flex>
                        <Heading size="lg">Platforms <span className='themeText'>& Tools</span></Heading>
                        <Box>
                            {
                                skills.filter((el) => el.tag === "platform").map(skill => <Box
                                    key={skill.id} className="skill"
                                    data-aos="zoom-in">
                                    <Box>
                                        <Image src={skill.icon} alt={`${skill.title} icon`} />
                                    </Box>
                                    <Text>{skill.title}</Text>
                                </Box>)
                            }
                        </Box>
                    </Flex>
                </Flex>
            </Box>

            {/* Professional experience */}
            <Box className="experience-timeline">
                <Heading>Professional
                    <span className="themeText"> Experience</span>
                </Heading>
                <Box className='timeline'>
                    <ul>
                        <li>
                            <Box className='content'>
                                <Heading size="lg">REACT NATIVE DEVELOPER INTERN</Heading>
                                <Text>
                                Growwlancer Pvt. Ltd </Text>
                            </Box>
                            <Box className='time'>
                                <Text>Apr 2024 - Sep 2024</Text>
                            </Box>
                        </li>
                      
                        <li>
                            <Box className='content'>
                                <Heading size="lg"> SOFTWARE DEVELOPER INTERN</Heading>
                                <Text>Kipss AI</Text>
                            </Box>
                            <Box className='time'>
                                <Text>Oct 2024 - Nov 2024</Text>
                            </Box>
                        </li>
                    </ul>
                </Box>
            </Box>

            {/* show projects */}
            <Box id="projects">
                <Heading textAlign="center">Featured <span className='themeText'>Projects</span></Heading>
                <Carousel data-aos="fade-up" 
                    containerClass="carousel-container"
                    swipeable={true}
                    draggable={true}
                    showDots={true}
                    keyBoardControl={true}
                    responsive={responsive}
                    infinite={true}>
                    {
                        projects.map((project) => <ProjectCard key={project.id} {...project} />)
                    }
                </Carousel>
            </Box>


            {/* Contact me */}
            <Box id='contactMe'>
                <Heading textAlign="center">Contact <span className='themeText'>Me</span></Heading>
                <Flex flexDirection={["column", "column", "column", "row"]} alignItems="center">

                    <Box>
                        <Svg2 />
                    </Box>


                    <Box className='form-section'>
                        <form ref={form} onSubmit={sendEmail}>
                            <div className='inputBox'>
                                <input type="text" name="from_name" required />
                                <span>Full Name</span>
                            </div>
                            <div className='inputBox'>
                                <input type="email" name="from_mail" required />
                                <span>Email</span>
                            </div>
                            <div>
                                <textarea placeholder='Message 📧' name="message" />
                            </div>
                            <input type="submit" value="Send Message" />
                        </form>
                        <Flex className='contact-info'>
                            <HStack>
                                <SiGmail color="#e34133" />
                                <Text>shubhamgaur672@gmail.com</Text>
                            </HStack>
                            <HStack>
                                <FaPhoneAlt color="#00a14f" />
                                <Text>+919118708250</Text>
                            </HStack>
                        </Flex>
                        <Flex gap={["10px", "20px", "20px", "40px"]}>
                            <Link href='https://wa.me/919118708250' target="_blank">
                                <Tooltip label='+91 9118708250'>
                                    <Box className='social-icons'>
                                        <Box>
                                            <Image w="100%" src="https://brandlogos.net/wp-content/uploads/2018/10/whatsapp-logo.png" alt='Whatsapp brand logo' />
                                        </Box>
                                    </Box>
                                </Tooltip>
                            </Link>

                            <Link href='https://www.linkedin.com/in/shubhamgaur07/' target="_blank">
                                <Tooltip label='LinkedIn'>
                                    <Box className='social-icons'>
                                        <Box>
                                            <Image w="100%" src="https://openvisualfx.com/wp-content/uploads/2019/10/linkedin-icon-logo-png-transparent.png" alt='Linkedin brand logo' />
                                        </Box>
                                    </Box>
                                </Tooltip>
                            </Link>

                            <Link href="https://github.com/shubhamgaur08" target="_blank">
                                <Tooltip label='Github'>
                                    <Box className='social-icons'>
                                        <Box>
                                            <Image w="100%" src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt='Github brand logo' />
                                        </Box>
                                    </Box>
                                </Tooltip>
                            </Link>

                            <Link href="mailto:shubhamgaur672@gmail.com" target="_blank">
                                <Tooltip label='Gmail'>
                                    <Box className='social-icons'>
                                        <Box>
                                            <Image w="100%" src="https://1000logos.net/wp-content/uploads/2021/05/Gmail-logo.png" alt='Gmail brand logo' />
                                        </Box>
                                    </Box >
                                </Tooltip>
                            </Link>
                        </Flex >
                    </Box >
                </Flex >
            </Box >

            {/* footer */}
            <Flex id='footer'>
                <Text>© Portfolio by Shubham Gaur | All rights reserved.</Text>
                <Text>Made with ❤️ by Shubham Gaur</Text>
            </Flex>
        </Box >
    )
}

export default Home