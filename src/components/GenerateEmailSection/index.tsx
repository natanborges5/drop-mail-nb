import { Button, Input , InputGroup, InputRightElement, Text, Icon, VStack} from "@chakra-ui/react";
import {MdContentCopy} from "react-icons/md"
import { RefreshEmail } from "./refreshEmail";
export function GenerateEmailSection() {
    return(
        <VStack width={"500px"}>
            <Text mr={"auto"} fontSize={{base:"2xl", md:"md"}}>Your temporary email</Text>
            <InputGroup size={"md"} mb={2}>
                <Input placeholder='Your temporary email'/>
                <InputRightElement>
                    <Button backgroundColor={"yellow.400"}>
                        <Icon as={MdContentCopy}></Icon>
                    </Button>
                </InputRightElement>
            </InputGroup>
            <RefreshEmail counter={10}/>
        </VStack>
    )
}