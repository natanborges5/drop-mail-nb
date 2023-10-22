import { Box, Text} from "@chakra-ui/react";
type LongEmailCardProps = {
    author: string
    title: string
    content: string
}
export function LongEmailCard({author, title, content}:LongEmailCardProps){
    return (
        <Box color={"gray.100"}>
            <Text fontSize={{base:"2xl", md:"xl"}} color={"yellow.400"} fontWeight={"bold"}>{title}</Text>
            <Text fontSize={{base:"xl", md:"lg"}}>From: <Text as={"span"} color={"blue.600"} fontWeight={"bold"}>{author}</Text></Text>
            <Text fontSize={{base:"lg", md:"md"}}>{content}</Text>
        </Box>
    )
}