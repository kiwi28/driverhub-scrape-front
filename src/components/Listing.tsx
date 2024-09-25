import {
	Box,
	Button,
	Divider,
	Heading,
	Image,
	Link,
	ListItem,
	SimpleGrid,
	Tag,
	Tooltip,
	UnorderedList,
	useMediaQuery,
	VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { IListing } from "../types/types";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export const Listing = ({
	car,
	isDetails = true,
	isMoblie = false,
	isHistory = false, //used in history page, removes the button
}: {
	car: IListing;
	isDetails?: boolean;
	isMoblie?: boolean;
	isHistory?: boolean;
}) => {
	const navigate = useNavigate();
	const [isSmallerThan800] = useMediaQuery("(max-width: 800px)");

	const handleNavigate = useCallback(() => {
		navigate(`/history/${car.hash}`);
	}, [navigate, car.hash]);

	return (
		<VStack
			w={isSmallerThan800 ? "100%" : 64}
			p={2}
			border={"1px solid darkgray"}
			borderRadius={"lg"}
			boxShadow={"md"}
			alignItems={"flex-start"}
			fontSize={isSmallerThan800 ? "sm" : undefined}
		>
			<Image
				src={car.img}
				alt={car.hash}
				w={"100%"}
				h={40}
				objectFit={"cover"}
				position={"relative"}
				borderRadius={"lg"}
			/>
			<Tag
				bgColor={"blackAlpha.700"}
				position={"absolute"}
				m={2}
			>
				{car.price}
			</Tag>
			{!isHistory && (
				<Button
					w={"100%"}
					colorScheme="green"
					onClick={handleNavigate}
				>
					Listing History
				</Button>
			)}
			<Divider />

			<VStack
				p={2}
				alignItems={"flex-start"}
			>
				<Tooltip
					label={car.title + " - " + "click to view listing on driverhub.ro"}
				>
					<Link href={car.url}>
						<Heading
							as="h3"
							size="md"
							h={20}
							wordBreak={"break-word"}
						>
							<ExternalLinkIcon
								mr={1}
								mb={1}
							/>

							{car.title}
						</Heading>
					</Link>
				</Tooltip>
				{isDetails && (
					<>
						{!isMoblie && (
							<>
								<Divider />
								<VStack alignItems={"flex-start"}>
									{car.seller.map((seller) => (
										<Box
											lineHeight={1}
											key={seller}
										>
											{seller}
										</Box>
									))}
								</VStack>
							</>
						)}
						<Divider />
						<SimpleGrid columns={isSmallerThan800 ? 2 : 1}>
							{Object.entries(car.technicalInfo).map(([key, value]) => (
								<Box
									lineHeight={1.2}
									key={key}
								>
									<strong>{key}:</strong> {value}
								</Box>
							))}
						</SimpleGrid>
						{!isMoblie && (
							<>
								<Divider />
								<UnorderedList>
									{car.benefits.map((benefit) => (
										<ListItem key={benefit}>{benefit}</ListItem>
									))}
								</UnorderedList>
							</>
						)}
					</>
				)}
			</VStack>
		</VStack>
	);
};

// export const ListingMobile = ({
// 	car,
// 	isDetails = true,
// }: {
// 	car: IListing;
// 	isDetails?: boolean;
// }) => {
// 	const navigate = useNavigate();

// 	const handleNavigate = useCallback(() => {
// 		navigate(`/history/${car.hash}`);
// 	}, [navigate, car.hash]);

// 	return (
// 		<VStack
// 			fontSize={"sm"}
// 			w={"100%"}
// 			p={2}
// 			border={"1px solid lightgray"}
// 			borderRadius={"lg"}
// 			boxShadow={"md"}
// 			alignItems={"flex-start"}
// 		>
// 			<Image
// 				src={car.img}
// 				alt={car.hash}
// 				w={"100%"}
// 				h={40}
// 				objectFit={"cover"}
// 				position={"relative"}
// 				borderRadius={"lg"}
// 			/>
// 			<Tag
// 				bgColor={"blackAlpha.700"}
// 				position={"absolute"}
// 				m={2}
// 			>
// 				{car.price}
// 			</Tag>
// 			<Button
// 				w={"100%"}
// 				colorScheme="green"
// 				onClick={handleNavigate}
// 			>
// 				Listing History
// 			</Button>
// 			<Divider />

// 			<VStack
// 				p={2}
// 				alignItems={"flex-start"}
// 			>
// 				<Tooltip
// 					label={car.title + " - " + "click to view listing on driverhub.ro"}
// 				>
// 					<Link href={car.url}>
// 						<Heading
// 							as="h3"
// 							size="md"
// 							wordBreak={"break-word"}
// 						>
// 							<ExternalLinkIcon
// 								mr={1}
// 								mb={1}
// 							/>
// 							{car.title}
// 						</Heading>
// 					</Link>
// 				</Tooltip>

// 				{isDetails && (
// 					<>
// 						<Divider />
// 						<SimpleGrid columns={2}>
// 							{Object.entries(car.technicalInfo).map(([key, value]) => (
// 								<Box
// 									lineHeight={1.2}
// 									key={key}
// 								>
// 									<strong>{key}:</strong> {value}
// 								</Box>
// 							))}
// 						</SimpleGrid>
// 					</>
// 				)}
// 			</VStack>
// 		</VStack>
// 	);
// };
