import { useState } from "react";
import { Box, Button, Input, VStack, Text, useToast } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const sendMessage = () => {
    if (!inputValue.trim()) {
      toast({
        title: "Cannot send empty message.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    // Here you would typically send the input value to the GPT API
    // For now, we'll just simulate a response
    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
    };
    const botResponse = {
      id: messages.length + 2,
      text: `Echo: ${inputValue}`, // Simulated GPT response
      sender: "bot",
    };

    setMessages([...messages, newMessage, botResponse]);
    setInputValue("");
  };

  return (
    <VStack spacing={4} p={5}>
      <Box w="100%" p={4} borderWidth="1px" borderRadius="lg" overflowY="scroll" h="300px">
        {messages.map((message) => (
          <Text key={message.id} alignSelf={message.sender === "user" ? "flex-end" : "flex-start"}>
            {message.text}
          </Text>
        ))}
      </Box>
      <Input
        placeholder="Type your message here..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            sendMessage();
          }
        }}
      />
      <Button rightIcon={<FaPaperPlane />} colorScheme="blue" onClick={sendMessage}>
        Send
      </Button>
    </VStack>
  );
};

export default Index;
