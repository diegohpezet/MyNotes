"use client"
import { useState } from "react"

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  onSearch: (searchText: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("")

  const handleNoteSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
    onSearch(e.target.value.toLowerCase())
  }

  return (
    <div className="flex p-3 bg-white border rounded-md shadow-sm">
      <div className="flex flex-1 container">
        <Input className="bg-gray-100 p-2 mr-5 rounded-lg" placeholder="Search" onChange={handleNoteSearch} />
        <Link href="?add=true">
          <Button className="bg-blue-500 text-white rounded-xl">+ Add</Button>
        </Link>
      </div>
    </div>
  )
}

export default Navbar