"use client"

import React, { useState } from 'react'
import Navbar from '@/components/navbar'
import NoteList from '@/components/noteList'
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs"

const Page: React.FC = () => {
  const [searchText, setSearchText] = useState('')

  const handleSearch = (text: string) => {
    setSearchText(text)
  }

  return (
    <>
      <Navbar onSearch={handleSearch}/>
      <div className="container my-5">
        <section>
          <h1 className="text-3xl font-bold">Your notes</h1>
        </section>
        <main className="py-5">
          <nav>
            <Tabs defaultValue="all">
              <div className="flex">
                <TabsList className="flex flex-row bg-transparent p-0">
                  <TabsTrigger className="w-1/5 text-center border-b-2 border-stone-200 rounded-none data-[state=active]:bg-transparent data-[state=active]:text-blue-500 data-[state=active]:border-b-2 data-[state=active]:border-blue-500" value="all">
                    All
                  </TabsTrigger>
                  <TabsTrigger className="w-1/2 text-center border-b-2 border-stone-200 rounded-none data-[state=active]:bg-transparent data-[state=active]:text-blue-500 data-[state=active]:border-b-2 data-[state=active]:border-blue-500" value="completed">
                    Completed
                  </TabsTrigger>
                  <TabsTrigger className="w-1/3 text-center border-b-2 border-stone-200 rounded-none data-[state=active]:bg-transparent data-[state=active]:text-blue-500 data-[state=active]:border-b-2 data-[state=active]:border-blue-500" value="pending">
                    Pending
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="all">
                <NoteList state="any" searchText={searchText} />
              </TabsContent>
              <TabsContent value="completed">
                <NoteList state="completed"  searchText={searchText} />
              </TabsContent>
              <TabsContent value="pending">
                <NoteList state="pending" searchText={searchText} />
              </TabsContent>
            </Tabs>
          </nav>
        </main>
      </div>
    </>
  )
}

export default Page