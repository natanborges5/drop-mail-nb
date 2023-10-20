import { GenerateEmailSection } from "@/components/GenerateEmailSection";
import { InboxSection } from "@/components/InboxSection";
import { api } from "@/services/api";
import { Email } from "@/types/Emails";
import { Box, Center, Flex, Heading, Text, Spinner, useToast } from "@chakra-ui/react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { use, useEffect, useState } from "react";
interface ApiResponse {
    data: {
        session: {
            mails: Email[];
            addresses: {
                address: string;
            }[];
        };
    }
}
interface IntroduceApiResponse {
    data: {
        introduceSession: {
            id: string;
            expiresAt: string;
        };
    }
    
}
export type UserSession = {
    id: string
    expiresAt: string
}
export default function Home(){
    const [userSession, setUserSession] = useState<ApiResponse>()
    const [isLoading, setIsLoading] = useState<boolean>()
    const toast = useToast()
    async function getSession() {
        try {
            setIsLoading(true)
            //const { 'userSession.id': sessionId } = parseCookies();
            const sessionId = "U2Vzc2lvbjoAEjMU7JRCUINQxigZexGi"
            if(!sessionId){
                await getNewSession()
            }else{
                const queryToload = {
                    query: `
                      query ($id: ID!) {
                        session(id: $id) {
                          addresses { address }
                          mails {
                            rawSize
                            fromAddr
                            toAddr
                            downloadUrl
                            text
                            headerSubject
                          }
                        }
                      }
                    `,
                    variables: { id: sessionId }
                };
                const response = await api.post<ApiResponse>('/https://dropmail.me/api/graphql/web-test-202310203KeHM', queryToload)
                if(response.data.data.session === null){
                    destroyCookie(undefined, 'userSession.id')
                    await getNewSession()
                }else{
                    setUserSession(response.data)
                }
                console.log(response.data)
            }
        } catch (error) {
            console.error('Erro na solicitação:', error);
        }
        finally{
            setIsLoading(false)
        }
    }
    async function getNewSession() {
        try {
            const response = await api.post<IntroduceApiResponse>('/https://dropmail.me/api/graphql/web-test-202310203KeHM', {
                query: "mutation {introduceSession {id, expiresAt, addresses {address}}}",
            });
            const { id, expiresAt} = response.data.data.introduceSession;
            const sessionProps = {
                id,
                expiresAt,
            };
            setCookie(undefined, 'userSession.id', sessionProps.id, {
                maxAge: 60 * 60 * 24 * 50,
                path: '/'
            })
        } catch (error) {
            toast({
                title: "Não foi possivel carregar a nova sessão",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }
    }
    useEffect(() => {
        getSession()
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
                {isLoading  ? <Spinner/> : <GenerateEmailSection email={userSession?.data.session.addresses[0]}/>}
            </Center>
            <InboxSection/>
        
        </Flex>
    )
}