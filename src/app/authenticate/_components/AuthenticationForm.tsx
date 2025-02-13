"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";

export default function AuthenticationForm({
  validateKey,
}: {
  validateKey: (
    _prevState: { error: string },
    formData: FormData,
  ) => Promise<{ error: string }>;
}) {
  const [state, formAction, isPending] = useActionState(validateKey, {
    error: "",
  });

  return (
    <div className="mx-auto mt-20 max-w-md rounded-lg border p-6">
      <h1 className="mb-4 text-2xl font-bold">Admin Verification</h1>
      <form action={formAction} className="space-y-4">
        <Input
          name="key"
          type="password"
          placeholder="Enter admin key"
          className="w-full"
          required
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Authenticating..." : "Authenticate"}
        </Button>
        {state.error.length > 0 && (
          <p className="text-center text-red-500">{state.error}</p>
        )}
      </form>
    </div>
  );
}
