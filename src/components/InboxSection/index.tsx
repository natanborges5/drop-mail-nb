import { Divider, Flex, SimpleGrid, Text } from "@chakra-ui/react";

export function InboxSection() {
    return (
        <Flex direction={"column"}>
            <Divider/>
            <Text fontSize={{base:"3xl", md:"2xl"}} p={8}>Inbox</Text>
            <SimpleGrid minChildWidth='120px'>
                
            </SimpleGrid>
        </Flex>
    )
}