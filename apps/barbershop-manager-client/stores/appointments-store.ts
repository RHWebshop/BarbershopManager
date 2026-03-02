import type { Appointment} from "@barbershop-manager/types";
import { create } from "zustand";

type AppointmentsActions = {
	addAppointment: (appointment: Omit<Appointment, "id" | "createdAt" | "status">) => void;
	cancelAppointment: (id: string) => void;
};
type AppointmentsState = {
	appointments: Appointment[];
	actions: AppointmentsActions;
};

// Mock data — represents appointments fetched from the DB in the future
const MOCK_APPOINTMENTS: Appointment[] = [
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

const useAppointmentsStore = create<AppointmentsState>((set) => ({
	appointments: MOCK_APPOINTMENTS,
	actions: {
		addAppointment: (appointment) =>
			set((state) => ({
				appointments: [
					...state.appointments,
					{
						...appointment,
						id: `appointment-${Date.now()}-${nextId++}`,
						status: "confirmed" as const,
						createdAt: new Date().toISOString(),
					},
				],
			})),

		cancelAppointment: (id) =>
			set((state) => ({
				appointments: state.appointments.map((appointment) =>
					appointment.id === id ? { ...appointment, status: "cancelled" as const } : appointment
				),
			})),
	},
}));
export const useAppointmentActions = () => useAppointmentsStore((s) => s.actions);
export const useAppointments = () => useAppointmentsStore((s) => s.appointments);
