import { api } from "@/services/api";
import { Email } from "@/types/Emails";
import { useToast } from "@chakra-ui/react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { ReactNode, createContext, useState } from "react";

type ApiResponse = {
    data: {
        session: {
            mails: Email[];
            addresses: {
                address: string;
            }[];
        };
    }
}
type IntroduceApiResponse = {
    data: {
        introduceSession: {
            id: string;
            expiresAt: string;
        };
    }
}
type UserSession = {
    id: string
    mails: Email[],
    addresses: {
        address: string;
    }[];
}
type AuthContextData = {
    getSession(): Promise<void>;
    user?: UserSession;
  };
type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<UserSession>();
    const toast = useToast()
    const apiSecret = process.env.REACT_APP_API_SECRET;
    const [isLoading, setIsLoading] = useState<boolean>()
    async function getSession() {
        try {
            setIsLoading(true)
            const { 'userSession.id': sessionId } = parseCookies();
            //const sessionId = "U2Vzc2lvbjoAEjMU7JRCUINQxigZexGi"
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
                const responseData = response.data.data.session
                if(responseData === null){
                    destroyCookie(undefined, 'userSession.id')
                    await getNewSession()
                }else{
                    const {mails, addresses} = responseData
                    const updatedUser: UserSession = {
                        id: sessionId,
                        mails,
                        addresses,
                    };
                    setUser(updatedUser)
                }
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
            getSession()
        } catch (error) {
            console.log(error)
            toast({
                title: "Não foi possivel carregar a nova sessão",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }
    }
    return (
        <AuthContext.Provider value={{getSession,user}}>
        {children}
        </AuthContext.Provider>
    )
}