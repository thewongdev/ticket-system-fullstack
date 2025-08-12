import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const tickets = [
  {
    title: "Ticket 1",
    content: "First ticket from DB.",
    status: "DONE" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 499,
  },
  {
    title: "Ticket 2",
    content: "Second ticket from DB.",
    status: "OPEN" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 399,
  },
  {
    title: "Ticket 3",
    content: "Third ticket from DB.",
    status: "IN_PROGRESS" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 599,
  },
];

const seed = async () => {
  const t0 = performance.now();
  console.log("Seeding started...");

  // Delete all tickets to ensure table is empty
  await prisma.ticket.deleteMany();

  // Option 1: Create tickets one by one
  // for (const ticket of tickets) {
  //   await prisma.ticket.create({
  //     data: ticket,
  //   });
  // }

  // Option 2: Create tickets in parallel
  // const promises = tickets.map((ticket) =>
  //   prisma.ticket.create({
  //     data: ticket,
  //   })
  // );
  // await Promise.all(promises);

  // Option 3: Create tickets in bulk
  await prisma.ticket.createMany({
    data: tickets,
  });

  const t1 = performance.now();
  console.log(`Seeding finished in ${t1 - t0}ms`);
};

seed();
