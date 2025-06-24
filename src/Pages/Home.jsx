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
import Resume from '../Resume/Yaroslav_Bilko.pdf'
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
                            <Heading fontSize="3.3em" className='text' data-text="Yaroslav Bilko"><span className='themeText'>Yaroslav Bilko</span></Heading>
                        </Box>
                        <Text>Am a Web & mobile Developer, passionate and experienced in building Web applications.</Text>
                        <HStack className='hireMe' onClick={() => { window.open("https://drive.google.com/file/d/161wJ3vB9M4IF8qtbn_Eeky6kN6e3JfYS/view?usp=sharing", '_blank') }}>
                            <a href={Resume} download="Yaroslav_Bilko">
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

            <Box id="aboutMe">
                <Heading size={"3xl"}>About <span className='themeText'>Me</span></Heading>
                <Flex flexDirection={['column-reverse', 'column-reverse', 'column-reverse', 'row']} alignItems="center" h="100%">
                    <div data-aos="fade-right">
                        <Svg3 />
                    </div>

                    <Flex data-aos="fade-left">
                        
                        <Box>
                            <Text fontSize={"2xl"}> Full Stack Developer with 8+ years of experience in designing and
 developing innovative web applications across diverse industries.
 Proficient in Python, Django, React, and other modern frameworks,
 delivering efficient and scalable solutions that enhance user satisfaction
 and operational performance. Committed to leveraging cutting-edge
 technologies and collaborative efforts to drive forward-thinking
 projects and achieve transformative results.</Text>
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
                                <Heading size="lg">KYIV NATIONAL UNIVERSITY OF CONSTRUCTION AND ARCHITECTURE</Heading>
                                <Text>
                                Bachelor of Computer Science</Text>
                            </Box>
                            <Box className='time'>
                                <Text> 2011 - 2015</Text>
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
                                <Heading size="lg">Senior Python/Django Developer</Heading>
                                <Text>
                                AnvilEight | Kharkiv</Text>
                            </Box>
                            <Box className='time'>
                                <Text>2022- 2023</Text>
                            </Box>
                        </li>
                        <li>
                            <Box className='content'>
                                <Heading size="lg"> Backend Engineer</Heading>
                                <Text>Yalantis | Dnipro</Text>
                            </Box>
                            <Box className='time'>
                                <Text> 2019 - 2020</Text>
                            </Box>
                        </li>
                        <li>
                            <Box className='content'>
                                <Heading size="lg"> Full Stack Developer</Heading>
                                <Text>SoftServe | Lviv</Text>
                            </Box>
                            <Box className='time'>
                                <Text>2017- 2018</Text>
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
                    showDots={false}
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
                                <Text>bilko.yaroslavv@gmail.com</Text>
                            </HStack>
                            <HStack>
                                <FaPhoneAlt color="#00a14f" />
                                <Text>+380 98 771 8801</Text>
                            </HStack>
                        </Flex>
                        <Flex gap={["10px", "20px", "20px", "40px"]}>
                            <Link href='https://wa.me/380987718801' target="_blank">
                                <Tooltip label='+380 98 771 8801'>
                                    <Box className='social-icons'>
                                        <Box>
                                            <Image w="100%" src="https://brandlogos.net/wp-content/uploads/2018/10/whatsapp-logo.png" alt='Whatsapp brand logo' />
                                        </Box>
                                    </Box>
                                </Tooltip>
                            </Link>

                            {/* <Link href='https://www.linkedin.com/in/atanu-karmakar-dev/' target="_blank">
                                <Tooltip label='Atanu Karmakar'>
                                    <Box className='social-icons'>
                                        <Box>
                                            <Image w="100%" src="https://openvisualfx.com/wp-content/uploads/2019/10/linkedin-icon-logo-png-transparent.png" alt='Linkedin brand logo' />
                                        </Box>
                                    </Box>
                                </Tooltip>
                            </Link> */}

                            <Link href="https://github.com/Atanu8250" target="_blank">
                                <Tooltip label='yaroslav414'>
                                    <Box className='social-icons'>
                                        <Box>
                                            <Image w="100%" src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt='Github brand logo' />
                                        </Box>
                                    </Box>
                                </Tooltip>
                            </Link>

                            <Link href="mailto:bilko.yaroslavv@gmail.com" target="_blank">
                                <Tooltip label='bilko.yaroslavv@gmail.com'>
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
                <Text>© Portfolio by Yaroslav B. | All rights reserved.</Text>
                <Text>Made with by Yaroslav</Text>
            </Flex>
        </Box >
    )
}

export default Home