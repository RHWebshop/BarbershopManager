export type AppointmentStatus = "confirmed" | "cancelled";

export interface Appointment {
	id: string;
	serviceId: string;
	serviceName: string;
	date: string; // YYYY-MM-DD
	time: string; // HH:mm
	status: AppointmentStatus;
	createdAt: string; // ISO string
}
