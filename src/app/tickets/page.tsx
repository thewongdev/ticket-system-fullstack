import clsx from "clsx";
import Link from "next/link";
import { initialTickets } from "@/data";
import { ticketPath } from "@/paths";

const TICKET_ICONS = {
  DONE: "X",
  IN_PROGRESS: ">",
  OPEN: "O",
};

const TicketsPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          TicketsPage
        </h2>
        <p className="text-sm text-muted-foreground">
          All your tickets in one place
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center gap-y-4">
        {initialTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="w-full max-w-[420px] p-4 border border-slate-100 rounded"
          >
            <div>{TICKET_ICONS[ticket.status]}</div>
            <h3 className="text-lg font-semibold truncate">
              {ticket.title}
            </h3>
            <p
              className={clsx("text-sm text-slate-500 truncate", {
                "line-through": ticket.status === "DONE",
              })}
            >
              {ticket.content}
            </p>

            <Link
              href={ticketPath(ticket.id)}
              className="text-sm underline"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketsPage;
