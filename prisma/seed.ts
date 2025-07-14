import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const tickets = [
  {
    title: "Ticket 1",
    content: "This is the first ticket from the database",
    status: "DONE" as const,
  },
  {
    title: "Ticket 2",
    content: "This is the second ticket from the database",
    status: "IN_PROGRESS" as const,
  },
  {
    title: "Ticket 3",
    content: "This is the third ticket from the database",
    status: "OPEN" as const,
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
