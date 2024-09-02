import {
   Box,
   Image,
   Heading,
   Button,
   Text,
   IconButton,
   HStack,
   VStack,
   Input,
   useColorModeValue,
   useToast,
   Modal,
   useDisclosure,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalBody,
   ModalFooter,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product";
import { useState } from "react";

const ProductCard = ({ product }) => {
   const [updatedProduct, setUpdatedProduct] = useState(product);
   const { deleteProduct, updateProduct } = useProductStore();
   const { isOpen, onOpen, onClose } = useDisclosure();
   const textColor = useColorModeValue("gray.600,gray.200");
   const bg = useColorModeValue("white", "gray.800 ");
   const toast = useToast();

   const handleDelete = async (pid) => {
      const { success, message } = await deleteProduct(pid);
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
   };

   const handleUpdateProduct = async (pid, updatedProduct) => {
      const { success, message } = await updateProduct(pid, updatedProduct);
      onClose();
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
            title: "Updated",
            description: message,
            status: "success",
            duration: 3000,
            isClosable: true,
         });
      }
   };

   return (
      <Box
         shadow={"lg"}
         rounded={"lg"}
         overflow={"hidden"}
         transition={"all 0.3s "}
         _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
         bg={bg}
      >
         <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={"cover"} />
         <Box p={4}>
            <Heading as={"h3"} size={"md"} mb={2}>
               {product.name}
            </Heading>
            <Text fontWeight="bold" fontSize="xl" color={textColor} mb={1}>
               &#8377; {product.price}
            </Text>
            <HStack spacing={3}>
               <IconButton icon={<EditIcon />} colorScheme="blue" onClick={onOpen} />
               <IconButton
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => {
                     handleDelete(product._id);
                  }}
               />
            </HStack>
         </Box>
         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Update Product</ModalHeader>
               <ModalBody>
                  <VStack spacing={4} pb={5}>
                     <Input
                        placeholder="product name"
                        name="name"
                        value={updatedProduct.name}
                        onChange={(e) => {
                           setUpdatedProduct({ ...updatedProduct, name: e.target.value });
                        }}
                     />
                     <Input
                        placeholder="product price"
                        name="price"
                        type="number"
                        value={updatedProduct.price}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                     />
                     <Input
                        placeholder="image"
                        name="image"
                        value={updatedProduct.image}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                     />
                  </VStack>
               </ModalBody>
               <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
                     Update
                  </Button>
                  <Button colorScheme="gost" mr={3} onClick={onClose}>
                     Cancel
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </Box>
   );
};

export default ProductCard;
