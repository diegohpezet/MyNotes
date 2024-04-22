import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"

import { NoteType } from "./noteList"
import { useLocalStorage } from "usehooks-ts"


const Note: React.FC<NoteType> = ({ title, description, category, completed, date }) => {
  const [notes, setNotes] = useLocalStorage("notes", [] as NoteType[])

  const handleCompleteTask = (title: string) => {
    // Get element index in array
    const noteIndex = notes.findIndex(el => el.title == title)

    // Work on top of auxiliary variable
    let tempNotes = notes
    if (tempNotes[noteIndex].completed) {
      tempNotes[noteIndex].completed = false
    } else {
      tempNotes[noteIndex].completed = true
    }

    // Store array with note completion changed
    setNotes(tempNotes)
  }

  const categoryStyles: Record<string, { textColor: string, bgColor: string }> = {
    Personal: { textColor: '#ef4444', bgColor: '#fca5a5' },
    Work: { textColor: '#6366f1', bgColor: '#a5b4fc' },
    Other: { textColor: '#eab308', bgColor: '#fde047' },
  };

  const cardOpacity = completed ? 0.6 : 1

  return (
    <Card className="bg-white rounded-lg shadow h-full mt-auto" style={{opacity: cardOpacity}}>
      <CardHeader>
        <div className="flex justify-between">
          <Badge className="text-xs py-1 px-2.5 rounded-full hover:bg-white" style={{ color: categoryStyles[category].textColor, borderColor: categoryStyles[category].textColor, backgroundColor: categoryStyles[category].bgColor }}>
            {category}
          </Badge>
          <div className="flex  space-x-3">
            <Checkbox className="rounded-lg border-gray-400 data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500" checked={completed} onClick={() => handleCompleteTask(title)} />
            <Link href={`?edit=true&title=${title}`}>
              <PenIcon className="h-4 w-4 text-gray-400 hover:text-yellow-400" />
            </Link>
            <Link href={`?delete=true&title=${title}`}>
              <TrashIcon className="h-4 w-4 text-gray-400 hover:text-red-400" />
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardContent style={{minHeight: 100}}>
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-sm text-gray-600 mt-1">
          {description}
        </p>
      </CardContent>
      <CardFooter className="justify-end jus">
        <p className="text-xs text-gray-400 mt-3 text-end">{date}</p>
      </CardFooter>
    </Card>
  )
}

function PenIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  )
}


function SquareIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
    </svg>
  )
}


function TrashIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}

export default Note