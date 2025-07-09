import Link from "next/link";
import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { ticketsPath } from "@/paths";

export default function NotFound() {
  return (
    <Placeholder
      label="Ticket Not Found"
      button={
        <Button asChild variant="outline">
          <Link href={ticketsPath()}>Back to Tickets</Link>
        </Button>
      }
    />
  );
}
