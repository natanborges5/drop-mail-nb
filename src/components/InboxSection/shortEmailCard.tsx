import { Box, Divider, Text, VStack } from "@chakra-ui/react"

type ShortEmailCardProps = {
    author: string
    title: string
    content: string
    onClick: () => void
}
export function ShortEmailCard({author, title, content, onClick}: ShortEmailCardProps){
    return(
        <Box onClick={onClick} cursor={"pointer"}>
            <Divider/>
            <VStack textAlign={"left"} align={"start"} p={2}>
                <Text fontWeight={"bold"} color={"black"}>{author}</Text>
                <Text fontWeight={"bold"} color={"blue.500"}>{title}</Text>
                <Text noOfLines={2}>{content}</Text>
            </VStack>
            <Divider/>
        </Box>
    )
}