import * as React from "react";
import { useState } from "react";
import {
  ChakraProvider,
  Stack,
  Button,
  Flex,
  Text,
  Box,
} from "@chakra-ui/react";

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function selectSquare(square) {
    if (calculateWinner(squares) || squares[square]) {
      return;
    }
    const squaresCopy = [...squares];
    squaresCopy[square] = xIsNext ? "X" : "O";
    setSquares(squaresCopy);
    setXIsNext(!xIsNext);
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  function renderSquare(i) {
    return (
      <Button
        size="md"
        fontSize="3xl"
        fontWeight="bold"
        colorScheme="blue"
        variant="outline"
        className="square"
        onClick={() => selectSquare(i)}
        m={1}
        h="50px"
        w="50px"
      >
        {squares[i]}
      </Button>
    );
  }

  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, calculateNextValue(squares));

  return (
    <Stack
      direction="column"
      spacing={4}
      alignItems="center"
      justifyContent="center"
      bg="black"
      p={6}
      rounded="md"
      boxShadow="md"
    >
      <Text fontSize="3xl" fontWeight="bold">
        Tic Tac Toe
      </Text>
      <Box bg="black" p={4} rounded="md" shadow="md" w="fit-content">
        <Flex direction="column" wrap="wrap" justifyContent="center">
          <Flex direction="column" alignItems="center">
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              STATUS:
            </Text>
            <Text>{status}</Text>
          </Flex>
          <Flex direction="column" alignItems="center">
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              GAME BOARD:
            </Text>
            <Flex direction="column" alignItems="center">
              <Flex>
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
              </Flex>
              <Flex>
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
              </Flex>
              <Flex>
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
              </Flex>
            </Flex>
          </Flex>
          <Flex direction="column" alignItems="center">
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              WINNER:
            </Text>
            <Text>{winner}</Text>
          </Flex>
          <Button colorScheme="teal" variant="outline" onClick={restart} mt={4}>
            RESTART
          </Button>
        </Flex>
      </Box>
    </Stack>
  );
}

function Game() {
  return (
    <Stack
      direction="column"
      spacing={4}
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="gray.900"
      color="white"
      p={6}
    >
      <Board />
    </Stack>
  );
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next value: ${nextValue}`;
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return (
    <ChakraProvider>
      <Game />
    </ChakraProvider>
  );
}

export default App;
