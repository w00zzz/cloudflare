import { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Textarea,
  useToast,
  Container,
} from '@chakra-ui/react';

interface Comment {
  id: number;
  user: string;
  text: string;
  date: string;
}

const STORAGE_KEY = 'futbol-comments';

export const Comments = () => {
  const [comments, setComments] = useState<Comment[]>(() => {
    const savedComments = localStorage.getItem(STORAGE_KEY);
    return savedComments ? JSON.parse(savedComments) : [
      {
        id: 1,
        user: "Juan Pérez",
        text: "¡El Real Madrid es el mejor equipo del mundo!",
        date: "2024-03-20"
      },
      {
        id: 2,
        user: "María García",
        text: "Messi es el GOAT, no hay discusión.",
        date: "2024-03-19"
      }
    ];
  });
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const toast = useToast();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  }, [comments]);

  const handleSubmit = () => {
    if (!userName || !newComment) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const comment: Comment = {
      id: comments.length + 1,
      user: userName,
      text: newComment,
      date: new Date().toISOString().split('T')[0]
    };

    setComments([comment, ...comments]);
    setNewComment('');
    setUserName('');
    
    toast({
      title: "Comentario agregado",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl" minH="100vh" py={8}>
      <VStack spacing={8} align="stretch">
        <Text fontSize="3xl" fontWeight="bold" textAlign="center">Comentarios</Text>
        
        <Box borderWidth={1} p={6} borderRadius="lg" bg="white" shadow="md">
          <VStack spacing={4}>
            <Input
              placeholder="Tu nombre"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              size="lg"
            />
            <Textarea
              placeholder="Escribe tu comentario..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              size="lg"
              minH="150px"
            />
            <Button 
              colorScheme="blue" 
              onClick={handleSubmit}
              size="lg"
              width="full"
            >
              Publicar Comentario
            </Button>
          </VStack>
        </Box>

        <VStack spacing={4} align="stretch">
          {comments.map((comment) => (
            <Box 
              key={comment.id} 
              borderWidth={1} 
              p={6} 
              borderRadius="lg"
              bg="white"
              shadow="sm"
              _hover={{ shadow: "md", transform: "translateY(-2px)", transition: "all 0.2s" }}
            >
              <HStack justify="space-between">
                <Text fontWeight="bold" fontSize="lg">{comment.user}</Text>
                <Text fontSize="sm" color="gray.500">{comment.date}</Text>
              </HStack>
              <Text mt={3} fontSize="md">{comment.text}</Text>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
}; 