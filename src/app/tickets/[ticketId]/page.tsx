import Link from "next/link";
import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { initialTickets } from "@/data";
import { ticketsPath } from "@/paths";

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;

  const ticket = initialTickets.find(
    (ticket) => ticket.id === ticketId
  );

  if (!ticket) {
    return (
      <Placeholder
        label="Ticket Not Found"
        button={
          <Button
            asChild
            variant="outline"
          >
            <Link href={ticketsPath()}>Back to Tickets</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold">{ticket.title}</h2>
      <p className="text-sm">{ticket.content}</p>
    </div>
  );
};

export default TicketPage;
