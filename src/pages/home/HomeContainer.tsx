import { HomeView } from "./HomeView";
import { ISnapshot } from "../../types/types";
import { pb } from "../../utils/pb";
import { Box, Center, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

export const HomeContainer = () => {
	const query = useQuery({
		queryKey: ["snapshots"],
		queryFn: async () =>
			(await pb.collection("driverhub").getFullList({
				sort: "-created",
			})) as ISnapshot[],
	});

	if (query.isFetching) {
		return (
			<Center py={20}>
				<Spinner />
			</Center>
		);
	}

	if (!query.data) {
		return null;
	}

	return (
		<Box>
			<HomeView snapshots={query.data} />
		</Box>
	);
};
