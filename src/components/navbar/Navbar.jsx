import { useState, useEffect } from 'react';
import {
  Flex,
  HStack,
  Button,
} from '@chakra-ui/react';
import {Link} from "react-router-dom";


export default function Navbar() {
    const [scrollY, setScrollY] = useState(0);

    const buttonsLeft = [
        { id: 0, text: "Company" ,path : "/company"},
        { id: 1, text: "Partners", path : "/partners" },
        { id: 2, text: "About",path : "/about" },
    ]
    const buttonsRight = [
        { id: 3, text: "Get A Route", path : "/getRoute" },
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
                borderBottom={"1px solid white"}
            >
                <HStack ml="10%" spacing="3%">
                    {buttonsLeft.map((item) => (
                        <Link to={item.path}>
                            <Button
                            key={item.id}
                            size="md"
                            colorScheme="teal"
                            variant="ghost"
                            color={"whitesmoke"}
                            _hover={{ color: scrollY < 200 ? "black" : "green" }}
                            // hover eklenebilir - siyaha dönsün yazılar
                        >
                            {item.text}
                        </Button>
                        </Link>
                        
                    ))}
                </HStack>
                <HStack mr="10%" spacing="3%">
                    {buttonsRight.map((item) => (
                        <Link to={item.path}>
                            <Button
                            key={item.id}
                            size="md"
                            variant="outline"
                            color={"whitesmoke"}
                            _hover={{ color: scrollY < 200 ? "black" : "green" }}
                            // hover eklenebilir - siyaha dönsün yazılar
                        >
                            {item.text}
                        </Button>
                        </Link>
                        
                        
                    ))}
                </HStack>
            </Flex>
        </>
    );
}
