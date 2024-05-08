import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';


export default function Navbar() {
    const [scrollY, setScrollY] = useState(0);

    const buttonsLeft = [
        { id: 0, text: "Company" },
        { id: 1, text: "Partners" },
        { id: 2, text: "About" },
    ]
    const buttonsRight = [
        { id: 3, text: "Get A Route" },
    ]

    useEffect(() => {
        const handleScroll = () => {
          setScrollY(window.scrollY);
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);
    
      const navbarColor = scrollY > 200 ? "gray.800" : "green.800"; // Change color based on scroll position

    return (
        <>
            <Flex
                as="nav"
                align="center"
                justify="space-between"
                padding="3xl"
                bg={navbarColor}
                color="white"
                position="sticky"
                top="0"
                zIndex="999"
                height={"8em"}
                transition="background-color 0.3s ease"
            >
                <HStack ml="10%" spacing="3%">
                    {buttonsLeft.map((item) => (
                        <Button
                            key={item.id}
                            size="md"
                            colorScheme="teal"
                            variant="ghost"
                            color={"whitesmoke"}
                            // hover eklenebilir - siyaha dönsün yazılar
                        >
                            {item.text}
                        </Button>
                    ))}
                </HStack>
                <HStack mr="10%" spacing="3%">
                    {buttonsRight.map((item) => (
                        <Button
                            key={item.id}
                            size="md"
                            variant="outline"
                            color={"whitesmoke"}
                            // hover eklenebilir - siyaha dönsün yazılar
                        >
                            {item.text}
                        </Button>
                    ))}
                </HStack>
            </Flex>
        </>
    );
}
