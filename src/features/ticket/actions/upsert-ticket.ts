"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";
import { setCookieByKey } from "@/actions/cookies";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";

const upsertTicketSchema = z.object({
  title: z.string().min(1, "Title must contain at least 1 character").max(191),
  content: z
    .string()
    .min(1, "Content must contain at least 1 character")
    .max(1024),
});

export const upsertTicket = async (
  id: string | undefined,
  _actionState: ActionState, // second param is required by useActionState
  formData: FormData
) => {
  try {
    const data = upsertTicketSchema.parse({
      title: formData.get("title"), // no longer require "as string" since we are using zod
      content: formData.get("content"),
    });

    await prisma.ticket.upsert({
      where: {
        id: id || "", // we need to pass an empty string if id is undefined
      },
      update: data, // update if id exists
      create: data, // create if id does not exist
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(ticketsPath());

  // if id exists, redirect to ticket detail page
  if (id) {
    setCookieByKey("toast", "Ticket updated");
    redirect(ticketPath(id));
  }

  return toActionState("SUCCESS", "Ticket created");
};
