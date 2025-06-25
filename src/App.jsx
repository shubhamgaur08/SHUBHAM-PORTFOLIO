import { Box } from '@chakra-ui/react'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'

function App() {

  return (
    <div className="App" 
    >
      {/* <Box display={{ md: "block", base: "none" }} className=''></Box> */}
      <Navbar />
      <Home />
    </div>
  )
}

export default App
