import { db } from "@/server/db";
import { quotesTable, authorsTable } from "@/server/db/schema";
import { sql } from "drizzle-orm";
import HomeBtns from "./_components/HomeBtns";

// By default, Next.js will attempt to render a static page. But we want to ensure a new random quote is fetched
// on each request. This can be done by setting the dynamic property to 'force-dynamic'.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const quoteFromDb = await db
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
    <main className="grid min-h-screen place-items-center">
      {/* by using 'absolute', we stop <HomeBtns> component affecting the center position of the quote */}
      <nav className="absolute left-0 right-0 top-0">
        <HomeBtns quote={quoteFromDb} />
      </nav>

      <div className="text-center p-2">
        {quoteFromDb ? (
          <>
            <blockquote className="mb-4 text-2xl italic">
              &quot;{quoteFromDb.content}&quot;
            </blockquote>
            <p className="mb-4 text-xl font-semibold">
              - {quoteFromDb.authorName}
            </p>
          </>
        ) : (
          <p>No quotes found</p>
        )}
      </div>
    </main>
  );
}
