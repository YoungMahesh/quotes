"use client";
import { Button } from "@/components/ui/button";
import type { TQuote } from "@/lib/types";
import Link from "next/link";
import { useState } from "react";

export default function HomeBtns({ quote }: { quote?: TQuote }) {
  const [refresh, setRefresh] = useState("Refresh");
  return (
    <div className="flex items-center justify-between p-4">
      <Link href="/add">
        <Button variant="default">Add</Button>
      </Link>

      {/* by using 'absolute', we stop text update of next button ('Refresh' to 'Refreshing...') affecting 
      the center position of Copy button */}
      <div className="absolute left-1/2 -translate-x-1/2 transform">
        <Button
          variant="outline"
          onClick={() => {
            navigator.clipboard
              .writeText(`"${quote?.content}" - ${quote?.authorName}`)
              .then(() => {
                alert("Copied");
              })
              .catch(() => alert("Failed to copy"));
          }}
        >
          Copy
        </Button>
      </div>

      <Button
        variant="outline"
        onClick={() => {
          setRefresh("Refreshing...");
          window.location.reload();
        }}
      >
        {refresh}
      </Button>
    </div>
  );
}
