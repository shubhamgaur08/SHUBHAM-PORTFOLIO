import { Badge, Box, Button, Flex, Heading, HStack, Link, Text } from '@chakra-ui/react'
// import React from 'react'
import PropTypes from 'prop-types'; 
import { BiLinkExternal } from "react-icons/bi";
import { VscGithub } from "react-icons/vsc";

const ProjectCard = ({ title, type, image, description, techStack, github, liveDemo }) => {
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
          <Link href={liveDemo} target="_blank">
            <Button>Live Demo<BiLinkExternal /></Button>
          </Link>
          <Link href={github} target="_blank">
            <Button>Code Base<VscGithub /></Button>
          </Link>
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
  github: PropTypes.string.isRequired,
  liveDemo: PropTypes.string.isRequired,
};

export default ProjectCard