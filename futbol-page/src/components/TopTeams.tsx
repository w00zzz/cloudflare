import {
  Box,
  SimpleGrid,
  Image,
  Text,
  VStack,
  Heading,
  Badge,
  Container,
} from '@chakra-ui/react';

interface Team {
  id: number;
  name: string;
  country: string;
  trophies: number;
  image: string;
  description: string;
}

const teams: Team[] = [
  {
    id: 1,
    name: "Real Madrid",
    country: "España",
    trophies: 14,
    image: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    description: "El club más laureado de la historia de la Champions League"
  },
  {
    id: 2,
    name: "Manchester City",
    country: "Inglaterra",
    trophies: 1,
    image: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
    description: "El equipo más dominante de la Premier League en los últimos años"
  },
  {
    id: 3,
    name: "Bayern Munich",
    country: "Alemania",
    trophies: 6,
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg",
    description: "El gigante alemán con más títulos de Bundesliga"
  }
];

export const TopTeams = () => {
  return (
    <Container maxW="container.xl" minH="100vh" py={8}>
      <VStack spacing={12}>
        <Heading size="2xl" color="blue.600">Mejores Equipos del Mundo</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
          {teams.map((team) => (
            <Box
              key={team.id}
              borderWidth={1}
              borderRadius="xl"
              overflow="hidden"
              p={6}
              bg="white"
              shadow="md"
              _hover={{ 
                shadow: "lg", 
                transform: "translateY(-4px)", 
                transition: "all 0.3s ease" 
              }}
            >
              <VStack spacing={6}>
                <Image
                  src={team.image}
                  alt={team.name}
                  boxSize="180px"
                  objectFit="contain"
                  p={4}
                />
                <VStack spacing={3}>
                  <Heading size="lg">{team.name}</Heading>
                  <Badge colorScheme="blue" fontSize="md" px={3} py={1}>
                    {team.country}
                  </Badge>
                  <Text fontSize="lg" color="blue.600" fontWeight="bold">
                    Champions League: {team.trophies}
                  </Text>
                  <Text textAlign="center" fontSize="md" color="gray.600">
                    {team.description}
                  </Text>
                </VStack>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
}; 