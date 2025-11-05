"use client";

import { useState } from "react";

const BookEvent = ({ eventId, slug }: { eventId: string; slug: string }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    // 1️⃣ Get all bookings (with API key)
    const emailCheck = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bookings`, {
      headers: { "x-api-key": process.env.NEXT_PUBLIC_API_KEY! },
      cache: "no-store" 
    });
    const bookingsData = await emailCheck.json();

    // 2️⃣ Check if same email + eventId already exist
    const isAlreadyBooked = bookingsData.events.some(
      (booking: { email: string; eventId: string }) =>
        booking.email === email && booking.eventId === eventId
    );

    // 3️⃣ If not already booked → create new booking
    if (!isAlreadyBooked) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
        },
        body: JSON.stringify({ eventId, slug, email }),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setMessage("✅ Booking successful! See you at the event.");
      } else {
        console.error("Booking creation failed");
        setMessage(" Booking failed. Please try again.");
      }

      return;
    }

    // 4️⃣ If already booked → show message
    setSubmitted(true);
    setMessage("You have already booked this event with this email address.");
  } catch (error) {
    console.error("Error submitting booking:", error);
    setMessage("❌ Something went wrong. Please try again later.");
  }
};


  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-sm">{message}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Enter your email address"
            />
          </div>
          <button type="submit" className="button-submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
