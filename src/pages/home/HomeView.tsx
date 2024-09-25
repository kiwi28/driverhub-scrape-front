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

export const HomeView: React.FC<HomeViewProps> = ({ snapshots }) => {
	const [isDetails, setIsDetails] = useState<boolean>(true);
	const [isSmallerThan800] = useMediaQuery("(max-width: 800px)");

	const [selectedSnapshot, setSelectedSnapshot] = useState<ISnapshot>(
		snapshots[0]
	);

	const handleChangeSnapshot = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		const snapshot = snapshots.find((snapshot) =>
			event.target.value.includes(snapshot.created)
		);
		if (snapshot) {
			setSelectedSnapshot(snapshot);
		}
	};

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
				{selectedSnapshot.cars.map((car) => (
					<Listing
						key={car.hash}
						car={car}
						isDetails={isDetails}
						isMoblie={isSmallerThan800}
					/>
				))}
			</Flex>
		</Box>
	);
};
