export interface IListing {
	benefits: string[];
	hash: string;
	img: string;
	seller: string[];
	technicalInfo: Record<string, string>;
	url: string;
	title: string;
	price: string;
}

export interface IListingExtended extends IListing {
	createdAt: string;
}

export interface ISnapshot {
	cars: IListing[];
	collectionId: string;
	collectionName: string;
	created: string;
	id: string;
	updated: string;
}

// "benefits": [
//   "Autorizare Bolt",
//   "Autorizare Uber",
//   "Colant Bolt"
// ],
// "hash": "67b4a854ac34ad545c6cf43d87aefcd2",
// "img": "https://driverhub.ro/uploads/custom-images/car--2024-09-13-11-19-40-6215.webp",
// "seller": [
//   "SC ELY ACTIVE AUTO SRL",
//   "0748606819",
//   "eliodor_cosmin@yahoo.com",
//   "Sos. Valea Rediului"
// ],
// "technicalInfo": {
//   "An Fabricatie": "2015",
//   "Capacitate Cilindrica": "1.6",
//   "Caroserie": "Hatchback",
//   "Cine inchiriaza?": "Flota",
//   "Combustibil": "Diesel",
//   "Garantie (LEI)": "Da",
//   "Numar Locuri": "5",
//   "Posibilitate Ramanere": "Da",
//   "Transmisie": "Manuala"
// },
// "url": "https://driverhub.ro/listing/seat-toledo-16-tdi"
