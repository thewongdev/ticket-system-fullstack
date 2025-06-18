import { initialTickets } from "@/data";

type TicketPageProps = {
  params: {
    ticketId: string;
  };
};

const TicketPage = ({ params }: TicketPageProps) => {
  const ticket = initialTickets.find(
    (ticket) => ticket.id === params.ticketId
  );

  if (!ticket) {
    return <div>Ticket Not Found</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold">{ticket.title}</h2>
      <p className="text-sm">{ticket.content}</p>
    </div>
  );
};

export default TicketPage;
