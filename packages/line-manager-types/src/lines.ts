export type LineStatus = "confirmed" | "cancelled";

export interface Line {
  id: string;
  serviceId: string;
  serviceName: string;
  date: string;   // YYYY-MM-DD
  time: string;   // HH:mm
  status: LineStatus;
  createdAt: string; // ISO string
}
