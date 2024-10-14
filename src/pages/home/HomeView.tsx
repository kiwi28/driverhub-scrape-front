import {
	Box,
	Flex,
	FormLabel,
	HStack,
	Select,
	Switch,
	useMediaQuery,
} from "@chakra-ui/react";
import { ISnapshot } from "../../types/types";
import { Listing } from "../../components/Listing";
import { useCallback, useState } from "react";

interface HomeViewProps {
	snapshots: ISnapshot[];
}

enum SortEnum {
	PRICE_ASC = "price_asc",
	PRICE_DESC = "price_desc",
}

export const HomeView: React.FC<HomeViewProps> = ({ snapshots }) => {
	const [selectedSnapshot, setSelectedSnapshot] = useState<ISnapshot>(
		snapshots[0]
	);
	const [isDetails, setIsDetails] = useState<boolean>(true);
	const [sort, setSort] = useState<SortEnum>(SortEnum.PRICE_ASC);

	const [isSmallerThan800] = useMediaQuery("(max-width: 800px)");

	const handleChangeSnapshot = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			const snapshot = snapshots.find((snapshot) =>
				event.target.value.includes(snapshot.created)
			);
			if (snapshot) {
				setSelectedSnapshot(snapshot);
			}
		},
		[snapshots]
	);

	const handleSort = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			setSort(event.target.value as SortEnum);
		},
		[]
	);

	const handleToggleDetails = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setIsDetails(e.target.checked);
		},
		[]
	);

	return (
		<Box p={2}>
			<FormLabel
				mb={4}
				w={"100%"}
				maxW={96}
			>
				Select a snapshot:
				<Select onChange={handleChangeSnapshot}>
					{snapshots.map((snapshot) => (
						<option key={snapshot.id}>
							{`${snapshot.created} - (${snapshot.cars.length}) cars`}
						</option>
					))}
				</Select>
			</FormLabel>
			<FormLabel
				mb={4}
				w={"100%"}
				maxW={96}
			>
				Sort by:
				<Select
					onChange={handleSort}
					defaultValue={sort}
				>
					<option value={SortEnum.PRICE_ASC}>Price ascending</option>
					<option value={SortEnum.PRICE_DESC}>Price descending</option>
				</Select>
			</FormLabel>
			<HStack
				mb={6}
				alignItems={"center"}
			>
				<FormLabel lineHeight={1}>
					{isDetails ? "Hide" : "Show"} details
				</FormLabel>
				<Switch
					defaultChecked={isDetails}
					checked={isDetails}
					mb={2}
					onChange={handleToggleDetails}
				/>
			</HStack>
			<Flex
				flexWrap={"wrap"}
				gap={4}
				w={"100%"}
			>
				{selectedSnapshot.cars
					.sort((a, b) => {
						if (sort === SortEnum.PRICE_ASC) {
							return parseInt(a.price) - parseInt(b.price);
						}
						return parseInt(b.price) - parseInt(a.price);
					})
					.map((car) => (
						<Listing
							key={car.hash}
							car={car}
							isDetails={isDetails}
							isMoblie={isSmallerThan800}
							isActive={!!snapshots[0].cars.find((c) => c.hash === car.hash)}
						/>
					))}
			</Flex>
		</Box>
	);
};
