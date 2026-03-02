import { create } from "zustand";
import { type Line } from "@line-manager/types";

interface LinesState {
  lines: Line[];
  addLine: (line: Omit<Line, "id" | "createdAt" | "status">) => void;
  cancelLine: (id: string) => void;
}

// Mock data — represents bookings fetched from the DB in the future
const MOCK_LINES: Line[] = [
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

export const useLinesStore = create<LinesState>((set) => ({
  lines: MOCK_LINES,

  addLine: (lineData) =>
    set((state) => ({
      lines: [
        ...state.lines,
        {
          ...lineData,
          id: `line-${Date.now()}-${nextId++}`,
          status: "confirmed" as const,
          createdAt: new Date().toISOString(),
        },
      ],
    })),

  cancelLine: (id) =>
    set((state) => ({
      lines: state.lines.map((l) =>
        l.id === id ? { ...l, status: "cancelled" as const } : l,
      ),
    })),
}));
