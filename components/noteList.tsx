import { useState, useEffect } from 'react';
import Note from './note'
import { useLocalStorage } from 'usehooks-ts';

export interface NoteType {
  title: string;
  description: string;
  category: string;
  completed: boolean;
  date: string;
}

interface NoteListProps {
  state: string;
  searchText: string;
}

const NoteList: React.FC<NoteListProps> = ({ state, searchText }) => {
  const [notes] = useLocalStorage("notes", [] as NoteType[])
  const [notesToDisplay, setNotesToDisplay] = useState<NoteType[]>()

  useEffect(() => {
    if (searchText) {
      setNotesToDisplay(notes.filter((note) => note.title.toLowerCase().includes(searchText)))
    } else {
      setNotesToDisplay(notes)
    }
  }, [setNotesToDisplay, notes, searchText])

  let chosenNotes: NoteType[] | undefined;

  if (state == "completed") {
    chosenNotes = notesToDisplay?.filter(el => el.completed)
  } else if (state == "pending") {
    chosenNotes = notesToDisplay?.filter(el => !el.completed)
  } else {
    chosenNotes = notesToDisplay
  }

  return (
    <>
      {chosenNotes?.length ? (
        <ul className="flex flex-wrap -mx-4">
          {chosenNotes?.map((note) => (
            <li key={note.title} className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-4">
              <Note
                title={note.title}
                description={note.description}
                category={note.category}
                completed={note.completed}
                date={note.date}
              />
            </li>
          ))}
        </ul>
      ) : (<span>You have not added any notes yet</span>)}
    </>
  )
}


export default NoteList