import { Box, Divider, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useState } from "react";
import { ShortEmailCard } from "./shortEmailCard";
import { LongEmailCard } from "./longEmailCard";
type EmailProps = {
    author: string
    title: string
    content: string
}
const emailContent = `
Caro [Nome do Destinatário],

Espero que você esteja bem. Estou escrevendo para discutir a tarefa que mencionamos anteriormente. Quero compartilhar algumas informações importantes relacionadas a ela.

[Adicione aqui os detalhes ou informações específicas sobre a tarefa.]

Ficarei feliz em responder a qualquer pergunta que você possa ter. Por favor, entre em contato comigo para discutirmos mais.

Atenciosamente,
[Seu Nome]
`;
export function InboxSection() {
    const [emails, setEmails] = useState<EmailProps[]>([
        {
            author: "Natan Borges",
            title: "Realizar Tarefa Tal e Tal",
            content: emailContent
        },
        {
            author: "Victor Hugo",
            title: "Realizar reparo no carro hb20",
            content: emailContent
        },
        {
            author: "Desiree B",
            title: "Realizar entrevista com canditado x",
            content: emailContent
        }
    ])
    const [selectedEmail, setSelectedEmail] = useState<EmailProps | null>(null);

    const handleEmailClick = (email: EmailProps) => {
        setSelectedEmail(email);
    };
    
    return (
        <Flex direction={"column"}>
            <Divider/>
            <Text fontSize={{base:"3xl", md:"2xl"}} p={8}>Inbox</Text>
            <Grid 
                h='auto'
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(5, 1fr)'
                gap={4}
            >
                <GridItem rowSpan={2} colSpan={1} bg='tomato'>
                    {emails.map((email, index) => (
                        <ShortEmailCard key={index} author={email.author} title={email.title} content={email.content} onClick={() => handleEmailClick(email)}/>
                    ))}
                </GridItem>
                <GridItem colSpan={4} bg='tomato'>
                    {selectedEmail !== null &&  <LongEmailCard author={selectedEmail.author} title={selectedEmail.title} content={selectedEmail.content}/>}
                </GridItem>
            </Grid>
        </Flex>
    )
}