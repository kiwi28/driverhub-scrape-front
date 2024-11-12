export function convertToRomanianDateTime(dateString: string): string {
	const date = new Date(dateString);
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		timeZone: "Europe/Bucharest",
		timeZoneName: "short",
	};
	return new Intl.DateTimeFormat("ro-RO", options).format(date);
}

export function getDifferenceInDays(
	dateString1: string,
	dateString2: string
): number {
	const date1 = new Date(dateString1);
	const date2 = new Date(dateString2);
	const timeDifference = Math.abs(date2.getTime() - date1.getTime());
	const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
	return dayDifference;
}
