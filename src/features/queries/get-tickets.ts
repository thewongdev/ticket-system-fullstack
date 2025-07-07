import { initialTickets } from "@/data";
import { Ticket } from "../ticket/types";

export const getTickets = async (): Promise<Ticket[]> => {
  // Simulate a delay of 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return new Promise((resolve) => {
    resolve(initialTickets);
  });
};
