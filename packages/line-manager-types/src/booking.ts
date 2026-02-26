export type BookingStatus = "confirmed" | "cancelled";

export interface Booking {
	id: string;
	serviceId: string;
	serviceName: string;
	date: string; // YYYY-MM-DD
	time: string; // HH:mm
	status: BookingStatus;
	createdAt: string; // ISO string
}
