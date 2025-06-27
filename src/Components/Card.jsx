import { Badge, Box, Button, Flex, Heading, HStack, Link, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'; 
import { BiLinkExternal } from "react-icons/bi";
import { BiImage } from 'react-icons/bi';
import { BiCloudDownload } from "react-icons/bi";
import { VscGithub } from "react-icons/vsc";

const ProjectCard = ({ title, type, image, Screenshot, description, techStack, github, liveDemo, downloadLink }) => {
  return (
    <Flex flexDirection="column" className='ProjectCard'>
      <Box className='cardImg' backgroundImage={image} />
      <Box>
        <Flex flexWrap={'wrap'} gap={'5px'}>
          <Heading size="md">{title}</Heading>
          <Badge variant='outline' colorScheme='green'>{type}</Badge>
        </Flex>
        <Text>
          <span style={{ fontWeight: 700 }}>Tech Stack:</span> {
            techStack.join(", ")
          }</Text>
        <Text>{description}</Text>
      </Box>
      <Box>
        <HStack>
          {liveDemo ? (
            <Link href={liveDemo} target="_blank">
              <Button>Live Demo<BiLinkExternal /></Button>
            </Link>
          ) : downloadLink ? (
            <Link href={downloadLink} download>
              <Button>Download <BiCloudDownload /></Button>
            </Link>
          ) : null}

          {github ? (
            <Link href={github} target="_blank">
              <Button>Code Base<VscGithub /></Button>
            </Link>
          ) : Screenshot ? (
            <Link href={Screenshot} target="_blank">
              <Button>Screenshot<BiImage /></Button>
            </Link>
          ) : null}
        </HStack>
      </Box>
    </Flex>
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