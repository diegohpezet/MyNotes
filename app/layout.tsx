import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AddNote from "@/components/add_note";
import EditNote from "@/components/edit_note";
import DeleteNote from "@/components/delete_note";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MyNotes",
  description: "An application to manage your daily notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>
          {children}
          <AddNote />
          <EditNote />
          <DeleteNote />
        </Suspense>
      </body>
    </html>
  );
}
