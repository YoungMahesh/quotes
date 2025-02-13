import { redirect } from "next/navigation";
import { env } from "@/env";
import { cookies } from "next/headers";
import AuthenticationForm from "./_components/AuthenticationForm";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Authenticate | Quote",
};

export default function AuthenticatePage() {
  async function validateKey(_prevState: any, formData: FormData) {
    "use server";

    const key = formData.get("key");
    if (key === env.ADMIN_KEY) {
      (await cookies()).set("admin-key", key, {
        // allow cookies to be sent over http for development
        httpOnly: true,
        // allow cookies only over secure/https if app is deployed in production
        secure: process.env.NODE_ENV === "production",
        // after 1 week, the cookie will be be automatically deleted by the browser
        maxAge: 60 * 60 * 24 * 7, // 1 week
        // set the cookie to be available on the whole domain, as we are going to verify at /add page
        path: "/",
      });
      redirect("/add");
    } else {
      return { error: "Invalid admin key" };
    }
  }

  return (
    <div>
      <nav className="flex w-full items-center justify-between p-4">
        <Link href="/">
          <Button variant="default">Home</Button>
        </Link>
      </nav>
      <AuthenticationForm validateKey={validateKey} />
    </div>
  );
}
