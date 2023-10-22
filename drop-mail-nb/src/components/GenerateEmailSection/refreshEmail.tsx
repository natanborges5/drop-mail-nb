import { AuthContext } from "@/contexts/AuthContext";
import { HStack, Text, Icon, Button, Box, Spinner } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import {MdRefresh} from "react-icons/md"

export function RefreshEmail() {
  const {refreshInbox,} = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [counter, setCounter] = useState(15);
  async function fetchMails() {
    try {
      setIsLoading(true)
      await refreshInbox()
      setCounter(15); 
    } catch (error) {
      console.log(error)
    }
    finally{
      setIsLoading(false)
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      if (counter > 0) {
        setCounter(counter - 1);
      } else {
        clearInterval(interval); 
        fetchMails(); 
        setCounter(15); 
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [counter]);
  return (
      <Box>
          <HStack fontSize={{base:"2xl", md:"lg"}}>
            <Text>Autorefresh in <Text as={"span"} fontWeight={"bold"} color={"yellow.500"}>{counter}</Text></Text>
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