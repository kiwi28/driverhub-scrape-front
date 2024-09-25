import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import { HomeContainer } from "./pages/home/HomeContainer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import theme from "./theme";
import { HistoryContainer } from "./pages/history/HistoryContainer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomeContainer />,
	},
	{
		path: "history/:hash?",
		element: <HistoryContainer />,
	},
]);

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider theme={theme}>
				<Flex
					flex={1}
					direction="column"
					alignItems={"center"}
					justifyContent={"center"}
					py={10}
					color={"gray.300"}
				>
					<Box maxW={"1400px"}>
						<RouterProvider router={router} />
					</Box>
				</Flex>
			</ChakraProvider>
		</QueryClientProvider>
	);
}

export default App;
