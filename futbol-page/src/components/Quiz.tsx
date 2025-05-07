import { useState, useEffect } from 'react';
import { Box, Button, Radio, RadioGroup, Stack, Text, VStack, useToast, Container, Heading } from '@chakra-ui/react';

const STORAGE_KEY = 'futbol-quiz-scores';

const questions = [
  {
    question: "¿Quién ha ganado más Balones de Oro?",
    options: ["Lionel Messi", "Cristiano Ronaldo", "Johan Cruyff", "Michel Platini"],
    correct: "Lionel Messi"
  },
  {
    question: "¿Quién tiene más goles en la historia del fútbol?",
    options: ["Lionel Messi", "Cristiano Ronaldo", "Pelé", "Maradona"],
    correct: "Cristiano Ronaldo"
  },
  {
    question: "¿Quién ha ganado más Champions League?",
    options: ["Lionel Messi", "Cristiano Ronaldo", "Karim Benzema", "Raúl"],
    correct: "Cristiano Ronaldo"
  }
];

export const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [value, setValue] = useState('');
  const [highScores, setHighScores] = useState<number[]>(() => {
    const savedScores = localStorage.getItem(STORAGE_KEY);
    return savedScores ? JSON.parse(savedScores) : [];
  });
  const toast = useToast();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(highScores));
  }, [highScores]);

  const handleAnswer = () => {
    if (value === questions[currentQuestion].correct) {
      setScore(score + 1);
      toast({
        title: "¡Correcto!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Incorrecto",
        description: `La respuesta correcta era: ${questions[currentQuestion].correct}`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setValue('');
    } else {
      setShowScore(true);
      const newHighScores = [...highScores, score + (value === questions[currentQuestion].correct ? 1 : 0)];
      setHighScores(newHighScores.sort((a, b) => b - a).slice(0, 5));
    }
  };

  return (
    <Container maxW="container.xl" minH="100vh" py={8}>
      <VStack spacing={8}>
        <Heading size="xl" color="blue.600">Quiz del Mejor Jugador</Heading>
        
        <Box 
          w="full" 
          maxW="800px" 
          p={8} 
          bg="white" 
          borderRadius="lg" 
          shadow="lg"
        >
          {showScore ? (
            <VStack spacing={6}>
              <Heading size="lg">¡Quiz completado!</Heading>
              <Text fontSize="2xl">
                Tu puntuación: {score} de {questions.length}
              </Text>
              
              {highScores.length > 0 && (
                <Box w="full" p={4} borderWidth={1} borderRadius="md">
                  <Heading size="md" mb={4}>Mejores Puntuaciones</Heading>
                  <VStack align="stretch">
                    {highScores.map((score, index) => (
                      <Text key={index} fontSize="lg">
                        {index + 1}. {score} puntos
                      </Text>
                    ))}
                  </VStack>
                </Box>
              )}

              <Button 
                size="lg" 
                colorScheme="blue" 
                onClick={() => {
                  setCurrentQuestion(0);
                  setScore(0);
                  setShowScore(false);
                  setValue('');
                }}
              >
                Reiniciar Quiz
              </Button>
            </VStack>
          ) : (
            <VStack spacing={8} align="stretch">
              <Box>
                <Text fontSize="2xl" mb={2}>
                  Pregunta {currentQuestion + 1} de {questions.length}
                </Text>
                <Text fontSize="xl" fontWeight="bold">
                  {questions[currentQuestion].question}
                </Text>
              </Box>

              <RadioGroup onChange={setValue} value={value}>
                <Stack spacing={4}>
                  {questions[currentQuestion].options.map((option, index) => (
                    <Radio 
                      key={index} 
                      value={option}
                      size="lg"
                      colorScheme="blue"
                    >
                      <Text fontSize="lg">{option}</Text>
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>

              <Button
                colorScheme="blue"
                onClick={handleAnswer}
                isDisabled={!value}
                size="lg"
                height="60px"
              >
                Siguiente
              </Button>
            </VStack>
          )}
        </Box>
      </VStack>
    </Container>
  );
}; 