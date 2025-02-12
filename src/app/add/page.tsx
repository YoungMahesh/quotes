import AddQuote from "./_components/AddQuote";
import { db } from "@/server/db";
import { authorsTable, quotesTable } from "@/server/db/schema";
import { revalidatePath } from "next/cache";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Quote",
};

export default async function AddPage() {
  const authersList = await db.select().from(authorsTable);
  return <AddQuote authorsList={authersList} addQuote={addQuote} />;
}

async function addQuote(quote: string, authorId: number) {
  "use server";
  await db.insert(quotesTable).values({
    content: quote,
    authorId,
  });

  revalidatePath("/");
}
