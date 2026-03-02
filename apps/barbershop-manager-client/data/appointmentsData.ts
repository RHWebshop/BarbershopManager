export type AppointmentType = {
	id: string;
	name: string;
	duration: number;
	price: number;
};

export const AppointmentsData: AppointmentType[] = [
	{ id: "haircut-men", name: "תספורת גברים", duration: 30, price: 80 },
	{ id: "haircut-women", name: "תספורת נשים", duration: 60, price: 150 },
	{ id: "beard-trim", name: "עיצוב זקן", duration: 20, price: 50 },
	{ id: "haircut-beard", name: "תספורת + זקן", duration: 45, price: 120 },
	{ id: "hair-color", name: "צביעת שיער", duration: 90, price: 350 },
	{ id: "highlights", name: "גוונים / הייליטס", duration: 120, price: 400 },
	{ id: "styling", name: "עיצוב לאירוע", duration: 60, price: 250 },
];

export const TIME_SLOTS = [
	"09:00",
	"09:30",
	"10:00",
	"10:30",
	"11:00",
	"11:30",
	"12:00",
	"12:30",
	"13:00",
	"13:30",
	"14:00",
	"14:30",
	"15:00",
	"15:30",
	"16:00",
	"16:30",
	"17:00",
	"17:30",
	"18:00",
	"18:30",
	"19:00",
	"19:30",
	"20:00",
];
