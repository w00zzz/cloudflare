import { ChakraProvider, Box, Heading, VStack, Flex, Link as ChakraLink } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Quiz } from './components/Quiz'
import { Comments } from './components/Comments'
import { TopTeams } from './components/TopTeams'

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Flex minH="100vh" minW="100vw">
          {/* Sidebar */}
          <Box
            w={{ base: '100%', md: '350px' }}
            minH="100vh"
            bg="#f6fcfd"
            px={8}
            py={10}
            boxShadow="md"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Heading as="h1" size="2xl" color="blue.600" mb={8} textAlign="center">
              Mundo del Fútbol
            </Heading>
            <VStack spacing={6} w="100%" as="nav">
              <ChakraLink as={Link} to="/" fontSize="lg" fontWeight="medium" w="100%" textAlign="center" _hover={{ color: 'blue.500' }}>
                Inicio
              </ChakraLink>
              <ChakraLink as={Link} to="/quiz" fontSize="lg" fontWeight="medium" w="100%" textAlign="center" _hover={{ color: 'blue.500' }}>
                Quiz del Mejor Jugador
              </ChakraLink>
              <ChakraLink as={Link} to="/teams" fontSize="lg" fontWeight="medium" w="100%" textAlign="center" _hover={{ color: 'blue.500' }}>
                Mejores Equipos
              </ChakraLink>
              <ChakraLink as={Link} to="/comments" fontSize="lg" fontWeight="medium" w="100%" textAlign="center" _hover={{ color: 'blue.500' }}>
                Comentarios
              </ChakraLink>
            </VStack>
          </Box>

          {/* Contenido principal */}
          <Box flex={1} minH="100vh" bg="white" p={{ base: 4, md: 12 }}>
            <Routes>
              <Route path="/" element={
                <Box textAlign="center" mt={20}>
                  <Heading mb={4} size="2xl" color="gray.700">Bienvenido al Mundo del Fútbol</Heading>
                  <Box fontSize="xl" color="gray.600">
                    Explora nuestro contenido sobre el mejor deporte del mundo
                  </Box>
                </Box>
              } />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/teams" element={<TopTeams />} />
              <Route path="/comments" element={<Comments />} />
            </Routes>
          </Box>
        </Flex>
      </Router>
    </ChakraProvider>
  )
}

export default App
