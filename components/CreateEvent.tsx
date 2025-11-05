'use client'
import { X } from "lucide-react"
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify";

const CreateEvent = () => {
    const {data: session} = useSession();
    const email = session?.user?.email || "";
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    overview: "",
    image: "",
    venue: "",
    location: "",
    date: "",
    time: "",
    mode: "online" as "online" | "offline" | "hybrid",
    audience: "",
    agenda: [] as string[],
    organizer: "",
    tags: [] as string[],
    bookedSeats: 0,
    userEmail: email ,
    agendaInput: "",
    tagsInput: "",
  })

  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
    }
  }
const addAgendaItem = () => {
    if (formData.agendaInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        agenda: [...prev.agenda, prev.agendaInput.trim()],
        agendaInput: "",
      }))
    }
  }

  const removeAgendaItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      agenda: prev.agenda.filter((_, i) => i !== index),
    }))
  }

  const addTag = () => {
    if (formData.tagsInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, prev.tagsInput.trim()],
        tagsInput: "",
      }))
    }
  }

  const removeTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault(); // prevent page reload

  const fd = new FormData();

  // Agar image file hai to use append karo
  if (imageFile) {
    fd.append("image", imageFile);
  }

  // Baaki fields
  fd.append("title", formData.title);
  fd.append("description", formData.description);
  fd.append("overview", formData.overview);
  fd.append("venue", formData.venue);
  fd.append("location", formData.location);
  fd.append("date", formData.date);
  fd.append("time", formData.time);
  fd.append("mode", formData.mode);
  fd.append("audience", formData.audience);
  fd.append("organizer", formData.organizer);
  fd.append("bookedSeats", formData.bookedSeats.toString());
  fd.append("userEmail", "m.alishahzad2004@gmail.com");
  fd.append("agenda", JSON.stringify(formData.agenda));
  fd.append("tags", JSON.stringify(formData.tags));

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events`, {
      headers:{"x-api-key": process.env.NEXT_PUBLIC_API_KEY!},
      method: "POST",
      body: fd,
      cache: "no-store" 
    });

    const data = await res.json();
    toast(data.message);
    setFormData({
    title: "",
    slug: "",
    description: "",
    overview: "",
    image: "",
    venue: "",
    location: "",
    date: "",
    time: "",
    mode: "online" as "online" | "offline" | "hybrid",
    audience: "",
    agenda: [] as string[],
    organizer: "",
    tags: [] as string[],
    bookedSeats: 0,
    userEmail: email,
    agendaInput: "",
    tagsInput: ""})
    setImageFile(null);
    
  } catch (err) {
    console.error(err);
  }
};


  return (
    <div className="min-h-screen  sm:p-8">
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
  />
      <div className="max-w-2xl mx-auto">
        <Link href={'/create-event'} className="cursor-pointer">
        <button  className="mb-6 text-slate-400 hover:text-slate-300 transition-colors text-sm cursor-pointer">
          ← Back
        </button>
        </Link>

        <div className=" backdrop-blur-sm rounded-xl border border-slate-700 p-8">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">Create an Event</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Title */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Event Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter event title (max 100 characters)"
                maxLength={100}
                className="w-full bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 rounded-lg px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                required
              />
              <p className="text-xs text-slate-400 mt-1">{formData.title.length}/100</p>
            </div>

            {/* Overview */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Overview <span className="text-red-400">*</span>
              </label>
              <textarea
                name="overview"
                value={formData.overview}
                onChange={handleInputChange}
                placeholder="Brief overview of the event (max 500 characters)"
                maxLength={500}
                className="w-full bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 rounded-lg px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 resize-none h-20"
                required
              />
              <p className="text-xs text-slate-400 mt-1">{formData.overview.length}/500</p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Event Description <span className="text-red-400">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Detailed event description (max 1000 characters)"
                maxLength={1000}
                className="w-full bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 rounded-lg px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 resize-none h-24"
                required
              />
              <p className="text-xs text-slate-400 mt-1">{formData.description.length}/1000</p>
            </div>

            {/* Venue & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Venue <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                  placeholder="Event venue name"
                  className="w-full bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 rounded-lg px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Location <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, Country"
                  className="w-full bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 rounded-lg px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                  required
                />
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Date <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Time <span className="text-red-400">*</span>
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                  required
                />
              </div>
            </div>

            {/* Mode */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Booked Seats <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                name="bookedSeats"
                value={formData.bookedSeats}
                onChange={handleInputChange}
                className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                required
              >
                </input>
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Mode <span className="text-red-400">*</span>
              </label>
              <select
                name="mode"
                value={formData.mode}
                onChange={handleInputChange}
                className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                required
              >
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            </div>

            {/* Audience & Organizer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Audience <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="audience"
                  value={formData.audience}
                  onChange={handleInputChange}
                  placeholder="Target audience"
                  className="w-full bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 rounded-lg px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Organizer <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="organizer"
                  value={formData.organizer}
                  onChange={handleInputChange}
                  placeholder="Event organizer name"
                  className="w-full bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 rounded-lg px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                  required
                />
              </div>
            </div>

            {/* User Email */}
            

            {/* Agenda */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Agenda <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={formData.agendaInput}
                  onChange={(e) => setFormData((prev) => ({ ...prev, agendaInput: e.target.value }))}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addAgendaItem())}
                  placeholder="Add agenda item"
                  className="flex-1 w-40 sm:w-auto bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 rounded-lg px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
                <button
                  type="button"
                  onClick={addAgendaItem}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-3 rounded-lg transition-colors font-medium"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.agenda.map((item, index) => (
                  <div
                    key={index}
                    className="bg-teal-600/30 border border-teal-600 text-teal-300 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => removeAgendaItem(index)}
                      className="text-teal-300 hover:text-teal-100"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                {formData.agenda.length > 0 ? "✓ Agenda added" : "Add at least 1 agenda item"} |  This is the array so please press add after typing each tag
              </p>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Tags <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={formData.tagsInput}
                  onChange={(e) => setFormData((prev) => ({ ...prev, tagsInput: e.target.value }))}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  placeholder="Add tag"
                  className="flex-1 w-40 sm:w-auto bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 rounded-lg px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-3 rounded-lg transition-colors font-medium"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-teal-600/30 border border-teal-600 text-teal-300 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="text-teal-300 hover:text-teal-100"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                {formData.tags.length > 0 ? "✓ Tags added" : "Add at least 1 tag"} |  This is the array so please press add after typing each tag
              </p>
            </div>

            {/* Event Image Upload */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Event Image / Banner</label>
              <div className="w-full border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-teal-500 transition-colors cursor-pointer">
                <input type="file" onChange={handleFileChange} accept="image/*" className="hidden" id="image-upload" />
                <label htmlFor="image-upload" className="cursor-pointer block">
                  <div className="text-slate-400 text-sm">
                    {imageFile ? (
                      <span className="text-teal-400">✓ {imageFile.name}</span>
                    ) : (
                      <span>📤 Upload event image or banner (for Cloudinary)</span>
                    )}
                  </div>
                </label>
              </div>
              <p className="text-xs text-slate-400 mt-2">File will be sent to Cloudinary for processing</p>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition-colors mt-8"
            >
              Save Event
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateEvent
