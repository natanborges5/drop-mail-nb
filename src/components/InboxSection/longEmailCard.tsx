import { Box, Text} from "@chakra-ui/react";
type LongEmailCardProps = {
    author: string
    title: string
    content: string
}
export function LongEmailCard({author, title, content}:LongEmailCardProps){
    return (
        <Box color={"gray.100"}>
            <Text>{author}</Text>
            <Text>{title}</Text>
            <Text>{content}</Text>
        </Box>
    )
}