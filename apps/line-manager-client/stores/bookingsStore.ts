import { create } from "zustand";
import { type Booking } from "@line-manager/types";

type BookingsActions = {
	addBooking: (booking: Omit<Booking, "id" | "createdAt" | "status">) => void;
	cancelBooking: (id: string) => void;
};
type BookingsState = {
	bookings: Booking[];
	actions: BookingsActions;
};

// Mock data — represents bookings fetched from the DB in the future
const MOCK_BOOKINGS: Booking[] = [
	{
		id: "mock-1",
		serviceId: "haircut-men",
		serviceName: "תספורת גברים",
		date: "2026-02-24",
		time: "10:00",
		status: "confirmed",
		createdAt: "2026-02-20T08:00:00Z",
	},
	{
		id: "mock-2",
		serviceId: "beard-trim",
		serviceName: "עיצוב זקן",
		date: "2026-02-20",
		time: "14:30",
		status: "confirmed",
		createdAt: "2026-02-21T12:00:00Z",
	},
	{
		id: "mock-3",
		serviceId: "hair-color",
		serviceName: "צביעת שיער",
		date: "2026-02-19",
		time: "11:00",
		status: "confirmed",
		createdAt: "2026-02-15T09:00:00Z",
	},
];

let nextId = 1;

// TODO: refactor.
export const useBookingsStore = create<BookingsState>((set) => ({
	bookings: MOCK_BOOKINGS,
	actions: {
		addBooking: (booking) =>
			set((state) => ({
				bookings: [
					...state.bookings,
					{
						...booking,
						id: `line-${Date.now()}-${nextId++}`,
						status: "confirmed" as const,
						createdAt: new Date().toISOString(),
					},
				],
			})),

		cancelBooking: (id) =>
			set((state) => ({
				bookings: state.bookings.map((booking) =>
					booking.id === id
						? { ...booking, status: "cancelled" as const }
						: booking,
				),
			})),
	},
}));
export const useBookingActions = () => useBookingsStore((s) => s.actions);
export const useBookings = () => useBookingsStore((s) => s.bookings);
