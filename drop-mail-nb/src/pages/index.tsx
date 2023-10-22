import { GenerateEmailSection } from "@/components/GenerateEmailSection";
import { InboxSection } from "@/components/InboxSection";
import { AuthContext } from "@/contexts/AuthContext";
import { Box, Center, Flex, Heading, Text, Spinner, useToast } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

export default function Home(){
    const [isLoading, setIsLoading] = useState<boolean>()
    const {getSession, user} = useContext(AuthContext)
    async function fetchSession() {
        setIsLoading(true)
        await getSession()
        setIsLoading(false)
    }
    useEffect(() => {
        fetchSession()
    }, [])
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
            <Center mb={20}>
                {isLoading  ? <Spinner/> : <GenerateEmailSection email={user?.addresses[0].address || ""}/>}
            </Center>
            {user !== undefined &&
                <InboxSection mails={user?.mails}/>
            }
            
        
        </Flex>
    )
}