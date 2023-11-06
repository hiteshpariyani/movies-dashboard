// MovieList.jsx

import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  VStack,
  HStack,
  Text,
} from '@chakra-ui/react';

const MovieList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const searchInputRef = useRef(null);

  // Sample data
  const movies = [
    { title: 'Movie 1', genre: 'Action', ratings: '4.5', year: '2022', metacritic: '75', runtime: '120 min', poster: 'https://via.placeholder.com/150' },
    // Add more movie data
  ];

  const initializeMovies = () => {
    // Initialize filteredMovies state with all movies
    setFilteredMovies(movies);
  };

  useEffect(() => {
    initializeMovies();
    // Focus on the search input when the component mounts
    searchInputRef.current.focus();

    // Add event listener for 'Esc' key to clear search
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setSearchTerm('');
      }
    };

    document.addEventListener('keydown', handleEscKey);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  useEffect(() => {
    // Call handleSearch whenever searchTerm is updated
    handleSearch();
  }, [searchTerm]);

  const handleSearch = () => {
    const searchTermLower = searchTerm.toLowerCase();
    const filtered = movies.filter(movie => movie.title.toLowerCase().includes(searchTermLower));
    setFilteredMovies(filtered);
  };

  const handleReset = () => {
    setSearchTerm('');
    initializeMovies(); // Reset to all movies
  };

  return (
    <Box>
      <Box
        bgGradient="linear(to-r, teal.500, teal.700)"
        p={4}
        mb={8}
        boxShadow="md"
      >
        <Flex
          align="center"
          justify="space-between"
          color="white"
          maxW="1200px"
          mx="auto"
        >
          <Heading fontSize="2xl" fontWeight="bold">
            MovieHub
          </Heading>
          <HStack spacing={4}>
            <Input
              type="text"
              placeholder="Search for a movie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              ref={searchInputRef}
              bg="white"
              color="teal.800"
              border="none"
              rounded="md"
              px={2}
              py={1}
            />
            {searchTerm && (
              <Button colorScheme="red" onClick={handleReset}>
                Reset
              </Button>
            )}
          </HStack>
          <Flex>
            <Box ml={4}>
              <Select
                variant="filled"
                color="teal.800"
                bg="white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              >
                <option value="all">All Genres</option>
                <option value="action">Action</option>
                <option value="comedy">Comedy</option>
                {/* Add more genres */}
              </Select>
            </Box>
            <Button ml={2} colorScheme="yellow" onClick={handleSearch}>
              Apply Filters
            </Button>
          </Flex>
        </Flex>
      </Box>

      {filteredMovies.length > 0 ? (
        <Box m={4}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Genre(s)</Th>
                <Th>Ratings</Th>
                <Th>Year of release</Th>
                <Th>Metacritic Rating</Th>
                <Th>Runtime</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredMovies.map((movie, index) => (
                <Tr key={index}>
                  <Td>
                    <Flex align="center">
                      <Image src={movie.poster} alt={movie.title} boxSize="50px" objectFit="cover" borderRadius="md" mr={2} />
                      <Box>{movie.title}</Box>
                    </Flex>
                  </Td>
                  <Td>{movie.genre}</Td>
                  <Td>{movie.ratings}</Td>
                  <Td>{movie.year}</Td>
                  <Td>{movie.metacritic}</Td>
                  <Td>{movie.runtime}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      ) : (
        searchTerm && (
          <Text textAlign="center" mt={4} color="red.500" fontWeight="bold">
            No movies found
          </Text>
        )
      )}

      <Flex align="center" justify="center" bg="teal.700" color="white" p={4}>
        <VStack spacing={2}>
          {/* Add social media links here */}
        </VStack>
        <VStack spacing={2}>
          {/* About Us and Contact links here */}
        </VStack>
      </Flex>
    </Box>
  );
};

export default MovieList;
