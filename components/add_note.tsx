"use client"

import { useRouter } from "next/navigation"
import { useSearchParams, usePathname } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"

import { NoteType } from "./noteList"
import { useLocalStorage } from "usehooks-ts"

// Define form schema
const formSchema = z.object({
  title: z.string().min(2, { message: "Title must have at least 2 characters" }),
  category: z.string().min(1, { message: "Select a category" }),
  description: z.string(),
  completed: z.boolean(),
  date: z.string()
})

const AddNote: React.FC = () => {
  const searchParams = useSearchParams()
  const modal = searchParams.get("add")
  const pathname = usePathname()
  const router = useRouter()

  const [notes, setNotes] = useLocalStorage("notes", [] as NoteType[])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      completed: false,
      date: new Date().toLocaleDateString()
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Add new values at the end of array
    setNotes(previousNotes => [...previousNotes, values])
    // Clear form
    form.reset()
    // Go back
    router.push(pathname)
  }

  return (
    <>
      {modal && <div className="fixed inset-0 bg-gray-500 bg-opacity-25 flex items-center justify-center p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-lg p-6 space-y-4 w-full max-w-md">
            <h3 className="text-xl font-semibold">Add note</h3>
            <hr />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Add title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Category..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Personal">Personal</SelectItem>
                            <SelectItem value="Work">Work</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Add description (optional)" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Link href={pathname}>
                <Button variant="ghost">Cancel</Button>
              </Link>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
      }
    </>
  )
}

export default AddNote
