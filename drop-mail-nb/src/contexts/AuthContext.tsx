import { api } from '@/services/api'
import { Email } from '@/types/Emails'
import { AppError, ErrorEntry } from '@/utils/AppErro'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { ReactNode, createContext, useState } from 'react'

type ApiResponse = {
    data: {
        session: {
            mails: Email[]
            addresses: {
                address: string
            }[]
        }
    }
}
type IntroduceApiResponse = {
    data: {
        introduceSession: {
            id: string
            expiresAt: string
        }
    }
}
type UserSession = {
    id: string
    mails: Email[]
    addresses: {
        address: string
    }[]
}
type AuthContextData = {
    getSession(): Promise<void>
    refreshInbox(allowNotification: boolean): Promise<void>
    user?: UserSession
}
type AuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserSession>()
    async function getSession() {
        try {
            const { 'userSession.id': sessionId } = parseCookies()
            if (!sessionId) {
                await getNewSession()
            } else {
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
                    variables: { id: sessionId },
                }
                const response = await api.post<ApiResponse>(
                    '/https://dropmail.me/api/graphql/web-test-202310203KeHM',
                    queryToload,
                )
                const responseData = response.data.data.session
                if (responseData === null) {
                    destroyCookie(undefined, 'userSession.id')
                    await getNewSession()
                } else {
                    const { mails, addresses } = responseData
                    const updatedUser: UserSession = {
                        id: sessionId,
                        mails,
                        addresses,
                    }
                    setUser(updatedUser)
                }
            }
        } catch (error) {
            const isAppError = error instanceof ErrorEntry
            const title = isAppError
                ? error.message
                : 'Não foi possível atualizar. Tente novamente mais tarde.'
            throw new AppError(title)
        }
    }
    async function getNewSession() {
        try {
            const response = await api.post<IntroduceApiResponse>(
                '/https://dropmail.me/api/graphql/web-test-202310203KeHM',
                {
                    query: 'mutation {introduceSession {id, expiresAt, addresses {address}}}',
                },
            )
            const { id, expiresAt } = response.data.data.introduceSession
            const sessionProps = {
                id,
                expiresAt,
            }
            setCookie(undefined, 'userSession.id', sessionProps.id, {
                maxAge: 60 * 60 * 24 * 50,
                path: '/',
            })
            getSession()
        } catch (error) {
            const isAppError = error instanceof ErrorEntry
            const title = isAppError
                ? error.message
                : 'Não foi possível atualizar. Tente novamente mais tarde.'
            throw new AppError(title)
        }
    }
    async function refreshInbox(allowNotification: boolean) {
        try {
            const queryToload = {
                query: `
                  query ($id: ID!) {
                    session(id: $id) {
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
                variables: { id: user?.id },
            }
            const response = await api.post<ApiResponse>(
                '/https://dropmail.me/api/graphql/web-test-202310203KeHM',
                queryToload,
            )
            const responseDataMails = response.data.data.session.mails

            if (user) {
                if (
                    user.mails.length !== responseDataMails.length &&
                    allowNotification
                ) {
                    new Notification(responseDataMails[0].fromAddr, {
                        body: responseDataMails[0].headerSubject.toUpperCase(),
                    })
                }
                const updatedUser = { ...user }
                updatedUser.mails = responseDataMails
                setUser(updatedUser)
            }
        } catch (error) {
            const isAppError = error instanceof ErrorEntry
            const title = isAppError
                ? error.message
                : 'Não foi possível atualizar. Tente novamente mais tarde.'
            throw new AppError(title)
        }
    }
    return (
        <AuthContext.Provider value={{ getSession, user, refreshInbox }}>
            {children}
        </AuthContext.Provider>
    )
}
