"use client"

import { useEffect, useState } from "react"

import { IEvent } from "@/database"
import { useSession, signIn, signOut } from "next-auth/react";

import Image from "next/image"
import Link from "next/link";
import DeleteEvent from "@/components/DeleteEvent";

export default function EventManagement() {
    const { data: session, status } = useSession();
  const [events, setEvents] = useState<IEvent[]>([])
  const [showDel, setShowDel] = useState(false)
  const [delData, setDelData] = useState({id: '', title: ''})
useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events`, {
  headers: {
    "x-api-key": process.env.NEXT_PUBLIC_API_KEY!, // agar public key use karni hai
  },
});
        const data = await res.json()
        
        if (!session?.user?.email) return // wait until session is ready

        const filtered = data.events.filter(
          (event: IEvent) => event?.userEmail === session.user?.email
        )
        setEvents(filtered)
      } catch (err) {
        console.error("Failed to fetch events:", err)
      }
    }

    if (status === "authenticated") {
      fetchEvents()
    }
  }, [session, status, showDel])
  

  
  return (
    <div className="min-h-screen  sm:p-8">
      {showDel &&
      <DeleteEvent id={delData.id} title={delData.title} setShow={setShowDel}/>
}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl">Event Management</h1>
          </div>
          <Link href={"/create-event/new"}>
          <button className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-black px-4 py-2 rounded-lg font-medium transition-colors">
            Add New Event
          </button>
          </Link>
        </div>

        {/* Table */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-auto border border-slate-700">
                    {events.length === 0 ? (
                <div className="h-[60vh] text-center items-center flex justify-center w-fu">
                <h3 className="text-center  ">No Event Found Please Create a new event</h3>
                </div>
            ): (

          <table className="w-full ">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-800/70">
                <th className="px-6 py-4 text-left text-slate-300 font-semibold text-sm">Events</th>
                <th className="px-6 py-4 text-left text-slate-300 font-semibold text-sm">Location</th>
                <th className="px-6 py-4 text-left text-slate-300 font-semibold text-sm">Date</th>
                <th className="px-6 py-4 text-left text-slate-300 font-semibold text-sm">Time</th>
                <th className="px-6 py-4 text-left text-slate-300 font-semibold text-sm">Booked-spot</th>
                <th className="px-6 py-4 text-left text-slate-300 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
<tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b border-slate-700 hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Image src={event.image} alt={event.image} width={40} height={40} className="rounded-full h-10 w-10 object-cover"/>
                      <span className="text-slate-200 font-medium">{event.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{event.location}</td>
                  <td className="px-6 py-4 text-slate-300">{event.date}</td>
                  <td className="px-6 py-4 text-slate-300">{event.time}</td>
                  <td className="px-6 py-4 text-slate-300 font-medium">{event.bookedSeats ? event.bookedSeats : 0 }</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                     
                      <button
                        onClick={() => {setShowDel(true); setDelData({id: (event._id as string), title: event.title})}}
                        className="text-red-400 hover:text-red-300 transition-colors font-medium text-sm"
                      >
                        Delete
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
        
            
          </table>)}
        </div>
      </div>
    </div>
  )
}
