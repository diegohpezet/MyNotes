"use client"

import { useRouter } from "next/navigation"
import { useSearchParams, usePathname } from "next/navigation"

import Link from "next/link"
import { Button } from "@/components/ui/button"

import { NoteType } from "./noteList"
import { useLocalStorage } from "usehooks-ts"

const DeleteNote: React.FC = () => {
  const searchParams = useSearchParams()
  const modal = searchParams.get("delete")
  const title = searchParams.get("title")
  const pathname = usePathname()
  const router = useRouter()

  const [notes, setNotes] = useLocalStorage("notes", [] as NoteType[])

  const handleRemove = (title: string) => {
    // Remove filtered note from array
    setNotes(notes.filter(el => el.title !== title))
    router.push(pathname)
  }

  return (
    <>
      {modal && <div className="fixed inset-0 bg-gray-500 bg-opacity-25 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 space-y-4 w-full max-w-md">
          <h3 className="text-xl font-semibold">Delete note</h3>
          <hr />
          <p>Are you sure you want to delete this note?</p>
          <div className="flex justify-end space-x-2">
            <Link href={pathname}>
              <Button variant="ghost">Cancel</Button>
            </Link>
            <Button variant="destructive" onClick={() => handleRemove(title || '')}>Delete</Button>
          </div>
        </div>
      </div>
      }
    </>
  )
}

export default DeleteNote