import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      <div className="flex items-center justify-center min-h-screen bg-neutral-950 text-gray-300">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-red-900 flex flex-col items-center justify-center text-white px-6 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-wide">Choose an Event</h1>
        <p className="text-sm text-gray-400 mt-2">Explore and participate in exciting events</p>
      </div>

      {/* Event Cards */}
      <div className="grid gap-6 w-full max-w-3xl">
        {events.map((event) => (
          <Link
            key={event._id}
            to={`/event/${event._id}`}
            state={{ eventName: event.name }}
            className="block transform transition-all duration-300 hover:scale-105"
          >
            <div className="bg-[#5F2B2BDB] bg-opacity-80 backdrop-blur-md rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-5 text-center">
                <h2 className="text-2xl font-bold">{event.name}</h2>
                <p className="text-sm text-gray-300 mt-2">{event.description}</p>
                <div className="mt-4">
                  <span className="inline-block bg-red-700 px-4 py-2 rounded-full text-sm font-semibold tracking-wide">
                    View Event
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WelcomePage;
