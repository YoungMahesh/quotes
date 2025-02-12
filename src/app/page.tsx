import { Button } from "@/components/ui/button";
import { db } from "@/server/db";
import { quotesTable, authorsTable } from "@/server/db/schema";
import { sql } from "drizzle-orm";
import Link from "next/link";

export default async function HomePage() {
  const randomQuote = await db
    .select({
      content: quotesTable.content,
      authorName: authorsTable.name,
    })
    .from(quotesTable)
    .leftJoin(authorsTable, sql`${quotesTable.authorId} = ${authorsTable.id}`)
    .orderBy(sql`RANDOM()`)
    .limit(1)
    .get();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-24">
      <Link
        href="/add"
        className="absolute right-4 top-4 rounded px-4 py-2 font-bold"
      >
        <Button variant="default">Add</Button>
      </Link>
      {randomQuote ? (
        <div className="text-center">
          <blockquote className="mb-4 text-2xl italic">
            &quot;{randomQuote.content}&quot;
          </blockquote>
          <p className="text-xl font-semibold">- {randomQuote.authorName}</p>
        </div>
      ) : (
        <p>No quotes found</p>
      )}
    </main>
  );
}
