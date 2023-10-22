import React from 'react'
import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Text,
    Button,
} from '@chakra-ui/react'
interface EmailDrawerProps {
    isOpen: boolean
    onClose: () => void
    author: string
    title: string
    content: string
}

export function EmailDrawer({
    isOpen,
    onClose,
    author,
    title,
    content,
}: EmailDrawerProps) {
    return (
        <Drawer
            isOpen={isOpen}
            placement="bottom"
            onClose={onClose}
            size="full"
        >
            <DrawerOverlay />
            <DrawerContent pt={20} backgroundColor={'gray.900'}>
                <DrawerCloseButton
                    size={'lg'}
                    mt={4}
                    backgroundColor={'yellow.400'}
                />
                <DrawerHeader>
                    <Text
                        fontSize={{ base: '2xl', md: 'xl' }}
                        color={'yellow.400'}
                        fontWeight={'bold'}
                    >
                        {title}
                    </Text>
                </DrawerHeader>

                <DrawerBody color={'gray.200'}>
                    <Text fontSize={{ base: 'xl', md: 'lg' }}>
                        From:{' '}
                        <Text
                            as={'span'}
                            color={'blue.600'}
                            fontWeight={'bold'}
                        >
                            {author}
                        </Text>
                    </Text>
                    <Text mt={6}>{content}</Text>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default EmailDrawer
