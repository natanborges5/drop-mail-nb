import { Box, Divider, Text, VStack } from '@chakra-ui/react'

type ShortEmailCardProps = {
    author: string
    title: string
    content: string
    onClick: () => void
}
export function ShortEmailCard({
    author,
    title,
    content,
    onClick,
}: ShortEmailCardProps) {
    return (
        <Box
            onClick={onClick}
            cursor={'pointer'}
            bg="gray.900"
            border={'1px solid'}
            borderRadius={'xl'}
            borderColor={'yellow.400'}
            py={6}
            px={3}
            mb={4}
            _hover={{
                transform: 'scale(1.03)',
                borderWidth: '2px',
            }}
            transition={'transform 0.5s'}
        >
            <VStack textAlign={'left'} align={'start'}>
                <Text fontSize={{ base: 'lg', md: 'md' }} fontWeight={'bold'}>
                    {author}
                </Text>
                <Divider borderColor={'yellow.400'} />
                <Text
                    fontSize={{ base: 'xl', md: 'lg' }}
                    fontWeight={'bold'}
                    color={'yellow.400'}
                >
                    {title}
                </Text>
                <Text fontSize={{ base: 'lg', md: 'md' }} noOfLines={2}>
                    {content}
                </Text>
            </VStack>
        </Box>
    )
}
