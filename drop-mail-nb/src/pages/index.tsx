import { GenerateEmailSection } from '@/components/GenerateEmailSection'
import { InboxSection } from '@/components/InboxSection'
import { AuthContext } from '@/contexts/AuthContext'
import { AppError } from '@/utils/AppErro'
import {
    Box,
    Center,
    Flex,
    Heading,
    Text,
    Spinner,
    useToast,
} from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'

export default function Home() {
    const [isLoading, setIsLoading] = useState<boolean>()
    const { getSession, user } = useContext(AuthContext)
    const toast = useToast()
    async function fetchSession() {
        try {
            setIsLoading(true)
            await getSession()
        } catch (error) {
            if (error instanceof AppError)
                toast({
                    title: error.message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchSession()
    }, [])
    return (
        <Flex w="100vw" h="100vh" direction={'column'}>
            <Box p={{ base: 10, md: 10 }}>
                <Heading fontWeight="bold" letterSpacing="tight">
                    Natan Borges{' '}
                    <Text as={'span'} ml={1} color={'yellow.400'}>
                        {' '}
                        Dropmail
                    </Text>
                </Heading>
            </Box>
            <Center mb={10}>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <GenerateEmailSection
                        email={user?.addresses[0].address || ''}
                    />
                )}
            </Center>
            {user !== undefined && <InboxSection />}
        </Flex>
    )
}
