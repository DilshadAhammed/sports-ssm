import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const WelcomePage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch events from the API
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/events`)
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-red-900 flex flex-col items-center justify-center text-white px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-lg mt-2">Choose an Event</p>
      </div>
      {/* Options */}
      {events.map((event) => (
        <div key={event._id} className="space-y-6 w-full max-w-md">
          {/* Annual Games */}
          <Link
            to={`/event/${event._id}`}
            state={{ eventName: event.name }}
            className="text-lg text-blue-600 hover:underline"
          >
            <div className="bg-[#5F2B2BDB] rounded-lg overflow-hidden shadow-lg">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 text-center">
                <h2 className="text-2xl font-bold">{event.name}</h2>
                <p className="text-sm text-gray-300 mt-1">
                  {event.description}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default WelcomePage;
