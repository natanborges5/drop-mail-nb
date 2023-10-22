import { Heading, Text } from '@chakra-ui/react'
type TitleProps = {
    title: string
}
export function AreaTitle({ title }: TitleProps) {
    return (
        <Heading
            fontSize={{ base: '4xl', md: '3xl' }}
            color={'yellow.400'}
            padding={'8'}
            ml={{ base: 2, md: 8 }}
        >
            <Text as={'span'} borderBottom={'2px solid'}>
                {title}
            </Text>
        </Heading>
    )
}
