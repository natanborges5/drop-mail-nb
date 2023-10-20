import { GenerateEmailSection } from "@/components/GenerateEmailSection";
import { InboxSection } from "@/components/InboxSection";
import { api } from "@/services/api";
import { Box, Center, Flex, Heading, Text, Spinner } from "@chakra-ui/react";
import { use, useEffect, useState } from "react";
interface ApiResponse {
    data: {
        introduceSession: {
            id: string;
            expiresAt: string;
            addresses: {
                address: string;
            }[];
        };
    }
    
}
export type EmailProps = {
    id: string
    expiresAt: string
    address: string
}
export default function Home(){
    const [userEmail, setUserEmail] = useState<EmailProps>()
    const [isLoading, setIsLoading] = useState<boolean>()
    async function getNewEmail() {
        try {
            setIsLoading(true)
            // console.log("eNTROU AQ")
            // const response = await api.post<ApiResponse>('/https://dropmail.me/api/graphql/web-test-202310203KeHM', {
            //   query: "mutation {introduceSession {id, expiresAt, addresses {address}}}",
            // });
            // const { id, expiresAt, addresses } = response.data.data.introduceSession;
            // const { address } = addresses[0];
            const emailProps = {
                id: "dsaodjasokdjasopk",
                expiresAt: "dsaodjasokdjasopk",
                address: "rando@gmail.com"
            };
            setUserEmail(emailProps)
        } catch (error) {
            console.error('Erro na solicitação:', error);
        }
        finally{
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getNewEmail()
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
                {isLoading ? <Spinner/> : <GenerateEmailSection email={userEmail?.address}/>}
            </Center>
            <InboxSection/>
        
        </Flex>
    )
}