import AddQuote from "./_components/AddQuote";
import { db } from "@/server/db";
import { authorsTable, quotesTable } from "@/server/db/schema";
import { revalidatePath } from "next/cache";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Add Quote",
};

export default async function AddPage() {
  const authorsList = await db.select().from(authorsTable);
  return (
    <main className="relative flex min-h-screen flex-col items-center p-24">
      <Link
        href="/"
        className="absolute right-4 top-4 rounded px-4 py-2 font-bold"
      >
        <Button variant="default">Home</Button>
      </Link>
      <div className="w-full max-w-xl">
        <AddQuote authorsList={authorsList} addQuote={addQuote} />
      </div>
    </main>
  );
}

async function addQuote(quote: string, authorId: number) {
  "use server";
  await db.insert(quotesTable).values({
    content: quote,
    authorId,
  });

  revalidatePath("/");
}
