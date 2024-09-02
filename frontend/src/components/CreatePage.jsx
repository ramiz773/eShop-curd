import { useState } from "react";
import { useProductStore } from "../store/product";
import { Container, VStack, Heading, Box, useColorModeValue, Input, Button, useToast } from "@chakra-ui/react";
const CreatePage = () => {
   const [newProduct, setNewProduct] = useState({
      name: "",
      price: "",
      image: "",
   });
   const toast = useToast();

   const { createProduct } = useProductStore();
   const handleAddProduct = async () => {
      const { success, message } = await createProduct(newProduct);
      if (!success) {
         toast({
            title: "Error",
            description: message,
            status: "error",
            duration: 3000,
            isClosable: true,
         });
      } else {
         toast({
            title: "Success",
            description: message,
            status: "success",
            duration: 3000,
            isClosable: true,
         });
      }
      setNewProduct({
         name: "",
         price: "",
         image: "",
      });
   };
   return (
      <Container maxW={"container.sm"}>
         <VStack spacing={8}>
            <Heading as={"h1"} fontSize={"2xl"} textAlign={"center"}>
               Create new product
            </Heading>

            <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
               <VStack spacing={4}>
                  <Input
                     placeholder="product name"
                     name="name"
                     value={newProduct.name}
                     onChange={(e) => {
                        setNewProduct({ ...newProduct, name: e.target.value });
                     }}
                  ></Input>
                  <Input
                     placeholder="product price"
                     name="price"
                     type="number"
                     value={newProduct.price}
                     onChange={(e) => {
                        setNewProduct({ ...newProduct, price: e.target.value });
                     }}
                  ></Input>
                  <Input
                     placeholder="product image url"
                     name="image"
                     value={newProduct.image}
                     onChange={(e) => {
                        setNewProduct({ ...newProduct, image: e.target.value });
                     }}
                  ></Input>
                  <Button colorScheme="blue" onClick={handleAddProduct}>
                     Add
                  </Button>
               </VStack>
            </Box>
         </VStack>
      </Container>
   );
};

export default CreatePage;
