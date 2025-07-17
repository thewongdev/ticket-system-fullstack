"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";

export const upsertTicket = async (
  id: string | undefined,
  formData: FormData
) => {
  const data = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  };

  await prisma.ticket.upsert({
    where: {
      id: id || "", // we need to pass an empty string if id is undefined
    },
    update: data, // update if id exists
    create: data, // create if id does not exist
  });

  revalidatePath(ticketsPath());

  // if id exists, redirect to ticket detail page
  if (id) {
    redirect(ticketPath(id));
  }
};
