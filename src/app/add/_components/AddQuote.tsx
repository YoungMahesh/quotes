"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useActionState } from "react";

const formSchema = z.object({
  quote: z.string().min(2, {
    message: "Quote must be at least 2 characters.",
  }),
  author: z.object({
    id: z.number(),
    name: z.string().min(2, {
      message: "Author must be at least 2 characters.",
    }),
  }),
});

export default function AddQuote({
  authorsList,
  addQuote,
}: {
  authorsList: { id: number; name: string }[];
  addQuote: (quote: string, authorId: number) => Promise<void>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quote: "",
      author: { id: 0, name: "" },
    },
  });

  const storeQuote = async (
    _prevState: undefined,
    _formData: FormData,
  ): Promise<undefined> => {
    try {
      const values = form.getValues();
      if (!values.quote) throw new Error("Quote is empty");
      if (!values.author.id) throw new Error("Author is empty");
      await addQuote(values.quote.trim(), values.author.id);
      toast.success("Quote added successfully!");
      form.reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add quote");
    }
  };

  const [, formAction, isPending] = useActionState(storeQuote, undefined);

  return (
    <Form {...form}>
      <form action={formAction} className="mx-auto max-w-2xl space-y-6 p-6">
        <FormField
          control={form.control}
          name="quote"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quote</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter quote here"
                  className="min-h-[150px] resize-y md:text-lg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    const selectedAuthor = authorsList.find(
                      (author) => author.id.toString() === value,
                    );
                    field.onChange(selectedAuthor ?? { id: 0, name: "" });
                  }}
                  value={field.value.id !== 0 ? field.value.id.toString() : ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an author" />
                  </SelectTrigger>
                  <SelectContent>
                    {authorsList.map((author) => (
                      <SelectItem key={author.id} value={author.id.toString()}>
                        {author.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
