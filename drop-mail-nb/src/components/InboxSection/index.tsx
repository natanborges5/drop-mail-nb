import {
    Box,
    Divider,
    Flex,
    Grid,
    GridItem,
    useBreakpointValue,
    useDisclosure,
} from '@chakra-ui/react'
import { useContext, useEffect, useState, useRef, memo } from 'react'
import { ShortEmailCard } from './shortEmailCard'
import { LongEmailCard } from './longEmailCard'
import { Email } from '@/types/Emails'
import { AreaTitle } from '../AreaTitle'
import { AuthContext } from '@/contexts/AuthContext'
import React from 'react'
import EmailDrawer from './DrawerCard'



const MemoizedShortEmailCard = memo(ShortEmailCard)
const MemoizedLongEmailCard = memo(LongEmailCard)

export function InboxSection() {
    const [selectedEmail, setSelectedEmail] = useState<Email>({
        toAddr: '',
        text: '',
        headerSubject: '',
        fromAddr: '',
        downloadUrl: '',
    })
    const [localMails, setLocalMails] = useState<Email[]>()
    const { user } = useContext(AuthContext)
    const size = useBreakpointValue({
        base: 'small',
        md: 'medium',
        lg: 'large',
    })
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    function handleEmailClick(email: Email, onOpen: () => void) {
        setSelectedEmail(email)
        onOpen()
    }
    useEffect(() => {
        setLocalMails(user?.mails ?? [])
    }, [])

    return (
        <Flex direction={'column'} bg="gray.700">
            <Divider borderColor={'yellow.400'} />
            <AreaTitle title="Inbox" />
            <Grid
                h="100vh"
                templateRows="repeat(6, 1fr)"
                templateColumns="repeat(6, 1fr)"
                gap={4}
                ml={2}
            >
                <GridItem
                    css={{
                        '&::-webkit-scrollbar': {
                            width: '0px', // Largura da barra de rolagem
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: 'teal.500', // Cor da alça da barra de rolagem
                            borderRadius: '6px', // Borda arredondada
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: 'teal.700', // Cor da alça ao passar o mouse
                        },
                    }}
                    rowSpan={{ base: 6, md: 5 }}
                    colSpan={{ base: 6, md: 2 }}
                    w={'auto'}
                    overflowY="auto"
                    bg="gray.800"
                    borderRadius={'md'}
                    p={4}
                >
                    <Box mt={6}>
                        {localMails?.map((email, index) => (
                            <MemoizedShortEmailCard
                                key={index}
                                author={email.fromAddr}
                                title={email.headerSubject}
                                content={email.text}
                                onClick={() => handleEmailClick(email, onOpen)}
                            />
                        ))}
                    </Box>
                </GridItem>
                {size !== 'small' ? (
                    <GridItem
                        colSpan={4}
                        rowSpan={4}
                        bg="gray.800"
                        p={6}
                        borderRadius={'md'}
                        w={'95%'}
                    >
                        {selectedEmail !== null && (
                            <MemoizedLongEmailCard
                                author={selectedEmail.fromAddr}
                                title={selectedEmail.headerSubject}
                                content={selectedEmail.text}
                            />
                        )}
                    </GridItem>
                ) : (
                    <EmailDrawer
                        author={selectedEmail.fromAddr}
                        title={selectedEmail.headerSubject}
                        content={selectedEmail.text}
                        isOpen={isOpen}
                        onClose={onClose}
                    />
                )}
            </Grid>
        </Flex>
    )
}
