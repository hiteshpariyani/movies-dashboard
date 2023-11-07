/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  HStack,
  Text,
  Button,
  SimpleGrid,
  Spinner,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Checkbox,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import logo from "../assets/movies-hub-logo.jpeg";

const MovieList = () => {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [originalMovies, setOriginalMovies] = useState([]); // New state for original unfiltered movies
  const searchInputRef = useRef(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [hasApiError, setApiError] = useState(false);

  const initializeMovies = async () => {
    setApiError(false);
    try {
      // throw new Error("Failed to fetch movie data");
      const response = await fetch(
        "https://raw.githubusercontent.com/Mariana-Tek/the-movies-at-mariana/master/movies/index.json"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movie data");
      }

      const data = await response.json();

      const flatMovies = data.flatMap((movie) =>
        movie.movies.map((m) => ({ ...m, date: new Date(movie.date) }))
      );

      // Sort movies by date in ascending order
      flatMovies.sort((a, b) => a.date.getTime() - b.date.getTime());

      const genresSet = new Set(flatMovies.flatMap((movie) => movie.genre));

      // Adding 'All Genres' to the beginning of the genres array
      setAllGenres([...Array.from(genresSet)]);

      setFilteredMovies(flatMovies);
      setOriginalMovies(flatMovies); // Save the original unfiltered movies
    } catch (error) {
      console.error("Error fetching movie data:", error.message);
      toast({
        title: "Error in fetching movies data",
        description: error.message,
        status: "error",
        isClosable: true,
        position: "top",
      });
      setApiError(true);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  const focusSearchInput = () => {
    searchInputRef.current.focus();
  };

  const handleEscKey = (event) => {
    if (event.key === "Escape") {
      handleReset();
    }
  };

  const addEscKeyListener = () => {
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  };

  useEffect(() => {
    initializeMovies();
  }, []);

  useEffect(focusSearchInput, []);

  useEffect(addEscKeyListener, []);

  useEffect(() => {
    // Call handleSearch whenever searchTerm or genreFilter is updated
    console.log("searchTerm, genreFilter", searchTerm, genreFilter);
    handleSearch();
  }, [searchTerm, genreFilter]);

  const handleSearch = () => {
    const searchTermLower = searchTerm.toLowerCase();
    const filtered = originalMovies.filter(
      (movie) =>
        (movie.title.toLowerCase().includes(searchTermLower) ||
          searchTermLower === "") &&
        (genreFilter.length === 0 ||
          movie.genre.some((g) => genreFilter.includes(g)))
    );
    // Sort filtered movies by date in ascending order
    filtered.sort((a, b) => a.date.getTime() - b.date.getTime());
    setFilteredMovies(filtered);
  };

  const handleReset = () => {
    setSearchTerm("");
    setGenreFilter([]);
    setFilteredMovies(originalMovies); // Reset to all movies
  };

  const renderMonthAndYear = (movie, index) => {
    const currentMonth = new Date(movie.date).toLocaleString("default", {
      month: "long",
    });
    const prevMonth =
      index > 0
        ? new Date(filteredMovies[index - 1].date).toLocaleString("default", {
            month: "long",
          })
        : null;
    const currentYear = new Date(movie.date).getFullYear();

    return currentMonth !== prevMonth ? `${currentMonth} ${currentYear}` : "";
  };

  const renderDay = (movie) => {
    return new Date(movie.date).toLocaleDateString(undefined, {
      day: "numeric",
    });
  };

  return (
    <Box minHeight="100vh">
      <Box
        bg={`url(${logo}) no-repeat center`}
        opacity={0.05}
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={-1}
      />
      {loading && (
        <Box
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <Spinner size="xl" color="teal.500" />
        </Box>
      )}
      {hasApiError && (
        <Box
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <Heading as="h3" size="lg" mb={2}>
            Failed to fetch movie data
          </Heading>
          <Button
            colorScheme="teal"
            variant="outline"
            onClick={initializeMovies}
          >
            Retry
          </Button>
        </Box>
      )}
      <Box
        bg="teal.700"
        color="white"
        p={4}
        mb={4}
        boxShadow="md"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Flex
          align="center"
          justify="space-between"
          color="white"
          maxW="1200px"
          mx="auto"
        >
          <Image
            src={logo}
            alt="MovieHub Logo"
            boxSize="40px"
            objectFit="contain"
            borderRadius="full"
            mr={4}
          />
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
              disabled={loading}
            />
            {searchTerm && (
              <Button colorScheme="red" onClick={handleReset}>
                Reset
              </Button>
            )}
          </HStack>
          <Flex>
            <Box ml={4}>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  px={4}
                  py={2}
                  maxW="150px" // Set a fixed width for the button
                  transition="all 0.2s"
                  borderRadius="md"
                  borderWidth="1px"
                  _focus={{ boxShadow: "outline" }}
                  className="genre-filter-button"
                  sx={{
                    '> span:first-child': {
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }
                  }}
                >
                  <Box as="span">
                    {genreFilter.length > 0
                      ? `${genreFilter.join(", ")}`
                      : `Genres`}
                  </Box>
                </MenuButton>
                <MenuList>
                  {allGenres.map((genre, index) => (
                    <MenuItem key={index}>
                      <Checkbox
                        isChecked={genreFilter.includes(genre)}
                        onChange={() => {
                          if (genreFilter.includes(genre)) {
                            setGenreFilter(
                              genreFilter.filter((g) => g !== genre)
                            );
                          } else {
                            setGenreFilter([...genreFilter, genre]);
                          }
                        }}
                        color={"black"}
                      >
                        {genre}
                      </Checkbox>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Box>
          </Flex>
        </Flex>
      </Box>

      <Box m={4} overflowX="auto">
        <Box m={4}>
          {/* Show table on larger screens (md and above) */}
          <Table
            variant="simple"
            size={["sm", "md", "lg"]}
            overflowX="auto"
            display={{ base: "none", md: "table" }}
          >
            <Thead>
              <Tr>
                <Th>Month</Th>
                <Th>Date</Th>
                <Th>Title</Th>
                <Th>Genre(s)</Th>
                <Th>Ratings (Out of 10)</Th>
                <Th>Year of release</Th>
                <Th>Metacritic Rating</Th>
                <Th>Runtime</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredMovies.map((movie, index) => (
                <Tr key={index}>
                  <Td>{renderMonthAndYear(movie, index)}</Td>
                  <Td>{renderDay(movie)}</Td>
                  <Td>
                    <Flex align="center">
                      <Image
                        src={movie.poster}
                        alt={movie.title}
                        boxSize="100px"
                        objectFit="cover"
                        borderRadius="md"
                        mr={2}
                        fallbackSrc="https://via.placeholder.com/80x100/eee?text=Movie Poster"
                      />
                      <Box>{movie.title}</Box>
                    </Flex>
                  </Td>
                  <Td>
                    {Array.isArray(movie.genre)
                      ? movie.genre.join(", ")
                      : movie.genre}
                  </Td>
                  <Td>
                    <span>⭐ </span>
                    {/* Dynamically convert ratings to out of 10 */}
                    {(
                      movie.Ratings.reduce((acc, rating) => {
                        const value = parseFloat(rating.value);
                        return acc + (value > 10 ? value / 10 : value);
                      }, 0) / movie.Ratings.length
                    )
                      .toFixed(2)
                      .replace(/\.00$/, "")}
                  </Td>
                  <Td>{movie.year}</Td>
                  <Td>
                    {/* Display Metacritic rating if present */}
                    {movie.meta_score ? movie.meta_score : "N/A"}
                  </Td>
                  <Td>{movie.runtime}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          {/* Responsive Movie Tiles (Visible only on mobile devices) */}
          <Box display={{ base: "block", md: "none" }}>
            <SimpleGrid columns={1} spacing={4} mt={4}>
              {filteredMovies.map((movie, index) => (
                <Box
                  key={index}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  boxShadow="md"
                >
                  <SimpleGrid columns={2} justifyItems="left">
                    <Box>
                      <Image
                        src={movie.poster}
                        alt={movie.title}
                        maxH="220px" // Set max height for the image
                        fallbackSrc="https://via.placeholder.com/150x200/eee?text=Movie Poster"
                      />
                    </Box>
                    <Box p={4} textAlign="left">
                      <Heading as="h3" size="sm" mb={2}>
                        {movie.title}
                      </Heading>
                      <Text fontSize="xs" color="gray.500" mb={2}>
                        {movie.year} | {movie.genre.join(", ")}
                      </Text>
                      {/* Render other details */}
                      <Text fontSize="xs" color="gray.700" mb={1}>
                        {`Ratings: ⭐ ${(
                          movie.Ratings.reduce((acc, rating) => {
                            const value = parseFloat(rating.value);
                            return acc + (value > 10 ? value / 10 : value);
                          }, 0) / movie.Ratings.length
                        )
                          .toFixed(2)
                          .replace(/\.00$/, "")}`}
                      </Text>
                      <Text fontSize="xs" color="gray.700" mb={1}>
                        {`Metacritic: ${
                          movie.meta_score ? movie.meta_score : "N/A"
                        }`}
                      </Text>
                      <Text fontSize="xs" color="gray.700" mb={1}>
                        {`Runtime: ${movie.runtime}`}
                      </Text>
                      <Text fontSize="xs" color="gray.700" mb={1}>
                        {`Date: ${new Date(movie.date).toLocaleDateString()}`}
                      </Text>
                    </Box>
                  </SimpleGrid>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </Box>
      </Box>

      {filteredMovies.length === 0 &&
        (searchTerm || genreFilter.length > 0) && (
          <Text textAlign="center" mt={4} color="red.500" fontWeight="bold">
            No movies found
          </Text>
        )}
    </Box>
  );
};

export default MovieList;
