import AddQuote from "./_components/AddQuote";
import { db } from "@/server/db";
import { authorsTable, quotesTable } from "@/server/db/schema";
import { revalidatePath } from "next/cache";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Add | Quote",
};

export default async function AddPage() {
  const authorsList = await db.select().from(authorsTable);
  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <div className="flex w-full items-center justify-between">
        <Link href="/">
          <Button variant="default">Home</Button>
        </Link>

        <form
          action={async () => {
            "use server";
            (await cookies()).delete("admin-key");
            redirect("/authenticate");
          }}
        >
          <Button variant="destructive">
            Sign Out
          </Button>
        </form>
      </div>
      <div className="w-full max-w-xl mt-8">
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
