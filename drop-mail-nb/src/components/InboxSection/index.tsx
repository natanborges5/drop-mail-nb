import { Box, Divider, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useState } from "react";
import { ShortEmailCard } from "./shortEmailCard";
import { LongEmailCard } from "./longEmailCard";
import { Email } from "@/types/Emails";
import { AreaTitle } from "../AreaTitle";
type EmailProps = {
    mails: Email[],
}
export function InboxSection({mails}: EmailProps) {
    const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

    const handleEmailClick = (email: Email) => {
        setSelectedEmail(email);
    };
    
    return (
        <Flex direction={"column"} bg='gray.700'>
            <Divider borderColor={"yellow.400"}/>
            <AreaTitle title="Inbox"/>
            <Grid 
                h='100vh'
                templateRows='repeat(3, 1fr)'
                templateColumns='repeat(6, 1fr)'
                gap={4}
                ml={2}
            >
                <GridItem css={{
                    "&::-webkit-scrollbar": {
                    width: "12px", // Largura da barra de rolagem
                    },
                    "&::-webkit-scrollbar-thumb": {
                    background: "teal.500", // Cor da alça da barra de rolagem
                    borderRadius: "6px", // Borda arredondada
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                    background: "teal.700", // Cor da alça ao passar o mouse
                    },
                }} rowSpan={1} colSpan={2} w={"auto"} maxHeight="50vh" overflowY="auto"  borderRadius={"md"} p={2}>
                    {mails.map((email, index) => (
                        <ShortEmailCard key={index} author={email.fromAddr} title={email.headerSubject} content={email.text} onClick={() => handleEmailClick(email)}/>
                    ))}
                </GridItem>
                <GridItem colSpan={4} rowSpan={2} bg='gray.800' p={6} borderRadius={"md"} w={"95%"}>
                    {selectedEmail !== null &&  <LongEmailCard author={selectedEmail.fromAddr} title={selectedEmail.headerSubject} content={selectedEmail.text}/>}
                </GridItem>
            </Grid>
        </Flex>
    )
}