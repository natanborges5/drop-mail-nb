import { Button, Input , InputGroup, InputRightElement, Text, Icon, VStack, useToast} from "@chakra-ui/react";
import {MdContentCopy} from "react-icons/md"
import { RefreshEmail } from "./refreshEmail";
type GenerateEmailSection = {
    email: string
}
export function GenerateEmailSection({email}:GenerateEmailSection) {
    const toast = useToast()
    async function copyToclipboard(){
        try {
            await navigator.clipboard.writeText(email)
            toast({
                title: "Email copiado!",
                status: "success",
                duration: 2000,
                isClosable: true,
            })
        } catch (error) {
            
        }
    }
    return(
        <VStack width={{base:"auto",md:"500px"}}>
            <Text mr={"auto"} fontSize={{base:"2xl", md:"md"}}>Your temporary email</Text>
            <InputGroup size={"md"} mb={2}>
                <Input defaultValue={email}/>
                <InputRightElement>
                    <Button onClick={copyToclipboard} backgroundColor={"yellow.400"} _hover={{
                        backgroundColor: "yellow.500"
                    }}>
                        <Icon as={MdContentCopy}></Icon>
                    </Button>
                </InputRightElement>
            </InputGroup>
            <RefreshEmail/>
        </VStack>
    )
}