import { AuthContext } from "@/contexts/AuthContext";
import { HStack, Text, Icon, Button, Box, Spinner } from "@chakra-ui/react";
import { useContext, useState } from "react";
import {MdRefresh} from "react-icons/md"
type RefresEmailProps = {
    counter: number
}
export function RefreshEmail({counter}: RefresEmailProps) {
  const {refreshInbox,} = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
    async function fetchMails() {
      try {
        setIsLoading(true)
        await refreshInbox()
      } catch (error) {
        console.log(error)
      }
      finally{
        setIsLoading(false)
      }
    }
    return (
        <Box>
            <HStack fontSize={{base:"2xl", md:"lg"}}>
              <Text>{`Autorefresh in ${counter}`}</Text>
              <Button onClick={fetchMails} variant={"ghost"} backgroundColor={"yellow.400"} color={"black"} _hover={{
                backgroundColor: "yellow.500"
              }}>
                {isLoading ? <Spinner/> : <>
                  <Icon as={MdRefresh} boxSize={6}/>
                  <Text ml={2}>Refresh</Text>
                </>}
              </Button>
            </HStack>
        </Box>
    )
}