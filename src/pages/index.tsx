import { GenerateEmailSection } from "@/components/GenerateEmailSection";
import { InboxSection } from "@/components/InboxSection";
import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react";

export default function Home(){
    return(
        <Flex
            w="100vw"
            h="100vh" 
            direction={"column"}
        >
            <Box p={10}>
                <Heading 
                    fontWeight="bold"
                    letterSpacing="tight"
                >
                  Natan Borges <Text as={"span"} ml={1} color={"yellow.400"}>  Dropmail</Text> 
                </Heading>
            </Box>
            <Center mb={36}>
                <GenerateEmailSection/>
            </Center>
            <InboxSection/>
        
        </Flex>
    )
}