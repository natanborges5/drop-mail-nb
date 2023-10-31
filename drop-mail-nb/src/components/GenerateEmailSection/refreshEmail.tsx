import { AuthContext } from '@/contexts/AuthContext'
import { AppError } from '@/utils/AppErro'
import {
    HStack,
    Text,
    Icon,
    Button,
    Box,
    Spinner,
    useToast,
} from '@chakra-ui/react'
import { useContext, useEffect, useState, useCallback, useMemo } from 'react'
import { MdRefresh, MdNotificationsOff, MdNotifications } from 'react-icons/md'

export function RefreshEmail() {
    const { refreshInbox } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const [counter, setCounter] = useState(15)
    const [allowNotification, setAllowNotification] = useState<boolean>(false)
    const toast = useToast()

    const fetchMails = useCallback(async () => {
        try {
            setIsLoading(true)
            await refreshInbox(allowNotification)
            setCounter(15)
        } catch (error) {
            if (error instanceof AppError) {
                toast({
                    title: error.message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
            }
        } finally {
            setIsLoading(false)
        }
    }, [refreshInbox, allowNotification, toast])

    const handleShowNotification = useCallback(() => {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    console.log(
                        'Permissão concedida para mostrar notificações!',
                    )
                }
            })
        }
        setAllowNotification(!allowNotification)
    }, [allowNotification])

    useEffect(() => {
        const interval = setInterval(() => {
            if (counter > 0) {
                setCounter((prevCounter) => prevCounter - 1)
            } else {
                clearInterval(interval)
                fetchMails()
                setCounter(15)
            }
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [counter, fetchMails])

    const notificationIcon = useMemo(() => {
        return allowNotification ? <Icon as={MdNotifications} /> : <Icon as={MdNotificationsOff} />
    }, [allowNotification])

    return (
        <Box>
            <HStack fontSize={{ base: 'xl', md: 'lg' }}>
                <Text>
                    Autorefresh in{' '}
                    <Text as={'span'} fontWeight={'bold'} color={'yellow.500'}>
                        {counter}
                    </Text>
                </Text>
                <Button
                    onClick={fetchMails}
                    variant={'ghost'}
                    backgroundColor={'yellow.400'}
                    color={'black'}
                    _hover={{
                        backgroundColor: 'yellow.500',
                    }}
                >
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <>
                            <Icon as={MdRefresh} boxSize={6} />
                            <Text ml={2}>Refresh</Text>
                        </>
                    )}
                </Button>
                <Button
                    onClick={handleShowNotification}
                    variant={'ghost'}
                    backgroundColor={'yellow.400'}
                    color={'black'}
                    _hover={{
                        backgroundColor: 'yellow.500',
                    }}
                >
                    {notificationIcon}
                </Button>
            </HStack>
        </Box>
    )
}
