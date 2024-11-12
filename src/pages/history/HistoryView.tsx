import {
	Box,
	Button,
	Divider,
	Flex,
	HStack,
	Tag,
	Text,
	useMediaQuery,
	VStack,
} from "@chakra-ui/react";
import { IListingExtended } from "../../types/types";
import { Listing } from "../../components/Listing";
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
	convertToRomanianDateTime,
	getDifferenceInDays,
} from "../../utils/utils";
import { useMemo } from "react";

export const HistoryView = ({ listings }: { listings: IListingExtended[] }) => {
	const [isSmallerThan800] = useMediaQuery("(max-width: 800px)");
	const navigate = useNavigate();

	const daysOld = useMemo(
		() =>
			getDifferenceInDays(
				listings[listings.length - 1].createdAt,
				listings[0].createdAt
			),
		[listings]
	);

	return (
		<Box w={"100%"}>
			<HStack
				justifyContent={"space-between "}
				mb={10}
			>
				<Button
					mb={4}
					leftIcon={<ArrowBackIcon />}
					onClick={() => navigate("/")}
				>
					Go Back
				</Button>
				<Tag
					p={2}
					colorScheme="teal"
				>
					Listing is days {daysOld} old
				</Tag>
			</HStack>
			<Flex
				flexWrap={"wrap"}
				gap={4}
				w={"100%"}
			>
				<Box>
					<Text>First appearance</Text>
					<Text>
						{convertToRomanianDateTime(listings[listings.length - 1].createdAt)}
					</Text>
					{isSmallerThan800 && (
						<>
							<Divider />
							<Box pb={4}>
								<Text>Latest appearance</Text>
								<Text>{listings[0].createdAt}</Text>
							</Box>
						</>
					)}
					<Listing
						isHistory
						car={listings[listings.length - 1]}
					/>
				</Box>
				{!!(listings.length - 1) && !isSmallerThan800 && (
					<Box>
						<Text>Latest appearance</Text>
						<Text>{convertToRomanianDateTime(listings[0].createdAt)}</Text>
						<Listing
							isHistory
							car={listings[0]}
						/>
					</Box>
				)}
			</Flex>
		</Box>
	);
};
