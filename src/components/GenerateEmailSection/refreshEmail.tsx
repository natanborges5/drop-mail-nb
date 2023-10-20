import { HStack, Text, Icon, Button } from "@chakra-ui/react";
import {MdRefresh} from "react-icons/md"
type RefresEmailProps = {
    counter: number
}
export function RefreshEmail({counter}: RefresEmailProps) {
    return (
        <>
            <HStack fontSize={{base:"2xl", md:"lg"}}>
              <Text>{`Autorefresh in ${counter}`}</Text>
              <Button variant={"ghost"} backgroundColor={"yellow.400"} colorScheme="blue" color={"black"}>
                <Icon as={MdRefresh} boxSize={6}/>
                <Text ml={2}>Refresh</Text>
              </Button>
              
              
            </HStack>
        </>
    )
}