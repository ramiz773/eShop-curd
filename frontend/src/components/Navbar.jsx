import { Text, Container, Flex, HStack, Button, useColorMode } from "@chakra-ui/react";
import { PlusSquareIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
   const { colorMode, toggleColorMode } = useColorMode();
   return (
      <Container maxW={"1140px"}>
         <Flex
            h={16}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDir={{
               base: "column",
               sm: "row",
            }}
         >
            <Text bgGradient="linear(to-r,cyan.400,blue.500)" bgClip="text" fontSize={{ base: "22", sm: "28" }} fontWeight="extrabold">
               <Link to={"/"}>eShop</Link>
            </Text>
            <HStack spacing={2} alignItems={"center"}>
               <Link to={"/create"}>
                  <Button>
                     <PlusSquareIcon fontSize={20} />
                  </Button>
               </Link>
               <Link>
                  <Button onClick={toggleColorMode}>{colorMode === "light" ? <MoonIcon /> : <SunIcon />}</Button>
               </Link>
            </HStack>
         </Flex>
      </Container>
   );
};

export default Navbar;
