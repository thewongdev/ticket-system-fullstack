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
import { toCent } from "@/utils/currency";

const upsertTicketSchema = z.object({
  title: z.string().min(1, "Title must contain at least 1 character").max(191),
  content: z
    .string()
    .min(1, "Content must contain at least 1 character")
    .max(1024),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Is Required"),
  bounty: z.coerce.number().positive(),
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
      deadline: formData.get("deadline"),
      bounty: formData.get("bounty"),
    });

    const dbData = {
      ...data,
      bounty: toCent(data.bounty), // insert cent amount into db instead of $ amount
    };

    await prisma.ticket.upsert({
      where: {
        id: id || "", // we need to pass an empty string if id is undefined
      },
      update: dbData, // update if id exists
      create: dbData, // create if id does not exist
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
