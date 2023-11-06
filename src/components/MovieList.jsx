import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Flex,
  Heading,
  Input,
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
  Button,
} from '@chakra-ui/react';

const MovieList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('All Genres');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [originalMovies, setOriginalMovies] = useState([]); // New state for original unfiltered movies
  const searchInputRef = useRef(null);

  // Updated sample data with dates
  const movieData = [
    {
        "date": "2019-06-21T11:10:04.781Z",
        "movies": [
            {
                "title": "In the Mood for Love",
                "year": "2000",
                "rated": "PG",
                "released": "09 Mar 2001",
                "runtime": "98 min",
                "genre": [
                    "Drama",
                    "Romance"
                ],
                "director": "Kar-Wai Wong",
                "writer": "Kar-Wai Wong",
                "actors": "Maggie Cheung, Tony Chiu-Wai Leung, Ping Lam Siu, Tung Cho 'Joe' Cheung",
                "plot": "Two neighbors, a woman and a man, form a strong bond after both suspect extramarital activities of their spouses. However, they agree to keep their bond platonic so as not to commit similar wrongs.",
                "language": "Cantonese, Shanghainese, French, Spanish",
                "country": "Hong Kong, China",
                "awards": "Nominated for 1 BAFTA Film Award. Another 44 wins & 47 nominations.",
                "poster": "https://m.media-amazon.com/images/M/MV5BYjZjODRlMjQtMjJlYy00ZDBjLTkyYTQtZGQxZTk5NzJhYmNmXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
                "Ratings": [
                    {
                        "source": "Internet Movie Database",
                        "value": "8.1/10"
                    },
                    {
                        "source": "Rotten Tomatoes",
                        "value": "90%"
                    },
                    {
                        "source": "Metacritic",
                        "value": "85/100"
                    }
                ],
                "meta_score": "85",
                "imdb_rating": "8.1",
                "imdb_votes": "105,461",
                "imdb_id": "tt0118694",
                "type": "movie",
                "dvd": "05 Mar 2002",
                "box_office": "N/A",
                "production": "USA Films",
                "website": "http://www.wkw-inthemoodforlove.com"
            },
            {
                "title": "Fantastic Planet",
                "year": "1973",
                "rated": "PG",
                "released": "01 Dec 1973",
                "runtime": "72 min",
                "genre": [
                    "Animation",
                    "Sci-Fi"
                ],
                "director": "René Laloux",
                "writer": "Stefan Wul (novel), Roland Topor (adaptation), René Laloux (adaptation)",
                "actors": "Jennifer Drake, Eric Baugin, Jean Topart, Jean Valmont",
                "plot": "On a faraway planet where blue giants rule, oppressed humanoids rebel against their machine-like leaders.",
                "language": "French, Czech",
                "country": "France, Czechoslovakia",
                "awards": "1 win & 2 nominations.",
                "poster": "https://m.media-amazon.com/images/M/MV5BYjhhMDFlZDctYzg1Mi00ZmZiLTgyNTgtM2NkMjRkNzYwZmQ0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
                "Ratings": [
                    {
                        "source": "Internet Movie Database",
                        "value": "7.8/10"
                    },
                    {
                        "source": "Rotten Tomatoes",
                        "value": "89%"
                    }
                ],
                "meta_score": "N/A",
                "imdb_rating": "7.8",
                "imdb_votes": "20,216",
                "imdb_id": "tt0070544",
                "type": "movie",
                "dvd": "23 Oct 2007",
                "box_office": "N/A",
                "production": "New World Pictures",
                "website": "N/A"
            }
        ]
    },
    {
        "date": "2019-06-28T11:10:04.781Z",
        "movies": [
            {
                "title": "The Love Witch",
                "year": "2016",
                "rated": "Unrated",
                "released": "10 Mar 2017",
                "runtime": "120 min",
                "genre": [
                    "Romance",
                    "Thriller"
                ],
                "director": "Anna Biller",
                "writer": "Anna Biller",
                "actors": "Samantha Robinson, Gian Keys, Laura Waddell, Jeffrey Vincent Parise",
                "plot": "A modern-day witch uses spells and magic to get men to fall in love with her.",
                "language": "English",
                "country": "USA",
                "awards": "3 wins & 3 nominations.",
                "poster": "https://m.media-amazon.com/images/M/MV5BMjA5NDEyMjQwNV5BMl5BanBnXkFtZTgwNDQ1MjMwMDI@._V1_SX300.jpg",
                "Ratings": [
                    {
                        "source": "Internet Movie Database",
                        "value": "6.2/10"
                    },
                    {
                        "source": "Rotten Tomatoes",
                        "value": "95%"
                    },
                    {
                        "source": "Metacritic",
                        "value": "82/100"
                    }
                ],
                "meta_score": "82",
                "imdb_rating": "6.2",
                "imdb_votes": "9,153",
                "imdb_id": "tt3908142",
                "type": "movie",
                "dvd": "14 Mar 2017",
                "box_office": "$226,223",
                "production": "Oscilloscope Laboratories",
                "website": "N/A"
            },
            {
                "title": "The Craft",
                "year": "1996",
                "rated": "R",
                "released": "03 May 1996",
                "runtime": "101 min",
                "genre": [
                    "Drama",
                    "Fantasy",
                    "Horror",
                    "Thriller"
                ],
                "director": "Andrew Fleming",
                "writer": "Peter Filardi (story), Peter Filardi (screenplay), Andrew Fleming (screenplay)",
                "actors": "Robin Tunney, Fairuza Balk, Neve Campbell, Rachel True",
                "plot": "A newcomer to a Catholic prep high school falls in with a trio of outcast teenage girls who practice witchcraft, and they all soon conjure up various spells and curses against those who anger them.",
                "language": "English, French",
                "country": "USA",
                "awards": "1 win & 2 nominations.",
                "poster": "https://m.media-amazon.com/images/M/MV5BZTBkMWE1NGItZTgxMi00ZTE0LWIzZjAtNzQ5ZGZlZTQxN2EwXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
                "Ratings": [
                    {
                        "source": "Internet Movie Database",
                        "value": "6.3/10"
                    },
                    {
                        "source": "Rotten Tomatoes",
                        "value": "57%"
                    }
                ],
                "meta_score": "N/A",
                "imdb_rating": "6.3",
                "imdb_votes": "68,363",
                "imdb_id": "tt0115963",
                "type": "movie",
                "dvd": "02 Jul 1997",
                "box_office": "N/A",
                "production": "Sony Pictures Home Entertainment",
                "website": "N/A"
            },
            {
                "title": "Ganja & Hess",
                "year": "1973",
                "rated": "R",
                "released": "20 Apr 1973",
                "runtime": "110 min",
                "genre": [
                    "Drama",
                    "Fantasy",
                    "Horror"
                ],
                "director": "Bill Gunn",
                "writer": "Bill Gunn",
                "actors": "Duane Jones, Marlene Clark, Bill Gunn, Sam L. Waymon",
                "plot": "After being stabbed with an ancient, germ-infested knife, a doctor's assistant finds himself with an insatiable desire for blood.",
                "language": "English",
                "country": "USA",
                "awards": "N/A",
                "poster": "https://m.media-amazon.com/images/M/MV5BMTgxNjI5OTI1NF5BMl5BanBnXkFtZTgwNTI2OTY0NTM@._V1_SX300.jpg",
                "Ratings": [
                    {
                        "source": "Internet Movie Database",
                        "value": "6.2/10"
                    },
                    {
                        "source": "Rotten Tomatoes",
                        "value": "86%"
                    }
                ],
                "meta_score": "N/A",
                "imdb_rating": "6.2",
                "imdb_votes": "999",
                "imdb_id": "tt0068619",
                "type": "movie",
                "dvd": "14 Jul 1998",
                "box_office": "N/A",
                "production": "Kelly/Jordan Enterprises",
                "website": "N/A"
            }
        ]
    }
  ];

  const initializeMovies = () => {
    const flatMovies = movieData.flatMap((data) =>
      data.movies.map((movie) => ({ ...movie, date: data.date }))
    );
    
    const genresSet = new Set(
      flatMovies.flatMap((movie) => movie.genre)
    );
      
    // Adding 'All Genres' to the beginning of the genres array
    setAllGenres(['All Genres', ...Array.from(genresSet)]);

    setTimeout(() => {
      setFilteredMovies(flatMovies);
      setOriginalMovies(flatMovies); // Save the original unfiltered movies
    }, 300);
  };

  useEffect(() => {
    initializeMovies();
  }, []);

  useEffect(() => {
    // Focus on the search input when the component mounts
    searchInputRef.current.focus();

    // Add event listener for 'Esc' key to clear search
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        handleReset();
      }
    };

    document.addEventListener('keydown', handleEscKey);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  useEffect(() => {
    // Call handleSearch whenever searchTerm or genreFilter is updated
    console.log('searchTerm, genreFilter', searchTerm, genreFilter)
    handleSearch();
  }, [searchTerm, genreFilter]);

  const handleSearch = () => {
    const searchTermLower = searchTerm.toLowerCase();
    const filtered = originalMovies.filter(
      (movie) =>
        (movie.title.toLowerCase().includes(searchTermLower) ||
          searchTermLower === '') &&
        (genreFilter === 'All Genres' || movie.genre.includes(genreFilter))
    );
    setFilteredMovies(filtered);
  };

  const handleReset = () => {
    setSearchTerm('');
    setGenreFilter('All Genres');
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
                value={genreFilter}
                onChange={(e) => setGenreFilter(e.target.value)}
              >
                {allGenres.map((genre, index) => (
                  <option key={index} value={genre}>
                    {genre}
                  </option>
                ))}
              </Select>
            </Box>
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
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredMovies.map((movie, index) => (
                <Tr key={index}>
                  <Td>
                    <Flex align="center">
                      <Image
                        src={movie.poster}
                        alt={movie.title}
                        boxSize="50px"
                        objectFit="cover"
                        borderRadius="md"
                        mr={2}
                      />
                      <Box>{movie.title}</Box>
                    </Flex>
                  </Td>
                  <Td>
                    {Array.isArray(movie.genre) ? (
                      movie.genre.join(', ')
                    ) : (
                      movie.genre
                    )}
                  </Td>
                  <Td>{movie.ratings}</Td>
                  <Td>{movie.year}</Td>
                  <Td>{movie.metacritic}</Td>
                  <Td>{movie.runtime}</Td>
                  <Td>{new Date(movie.date).toLocaleDateString()}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      ) : (
        (searchTerm || genreFilter !== 'All Genres') && (
          <Text textAlign="center" mt={4} color="red.500" fontWeight="bold">
            No movies found
          </Text>
        )
      )}

      <Flex
        align="center"
        justify="center"
        bg="teal.700"
        color="white"
        p={4}
      >
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
