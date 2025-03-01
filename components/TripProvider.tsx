import { createContext } from "react";

export interface Trip {
    id: string;
    title: string;
    description: string;
}

export const TripContext = createContext<Trip|undefined>(undefined);
