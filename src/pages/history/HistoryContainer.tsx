import { useParams } from "react-router-dom";
import { HistoryView } from "./HistoryView";
import { IListingExtended, ISnapshot } from "../../types/types";
import { pb } from "../../utils/pb";
import { Box, Center, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const HistoryContainer = () => {
	const [filteredCars, setFilteredCars] = useState<IListingExtended[] | null>(
		null
	);

	const { hash } = useParams();

	const query = useQuery({
		queryKey: ["snapshots"],
		queryFn: async () =>
			(await pb.collection("driverhub").getFullList({
				sort: "-created",
			})) as ISnapshot[],
	});

	useEffect(() => {
		if (hash && query.data) {
			const snapshots: IListingExtended[] = query.data
				.filter((snapshot) => snapshot.cars.some((car) => car.hash === hash))
				.map((snapshot) => {
					return {
						...snapshot.cars.filter((car) => car.hash === hash)[0],
						createdAt: snapshot.created,
					};
				});

			setFilteredCars(snapshots);
		}
	}, [hash, query.data]);

	if (query.isFetching) {
		return (
			<Center py={20}>
				<Spinner />
			</Center>
		);
	}

	if (!query.data || !hash) {
		return null;
	}

	if (!filteredCars) {
		return <Box>{`Snapshot with car hash ${hash} not found`}</Box>;
	}

	return <HistoryView listings={filteredCars} />;
};
