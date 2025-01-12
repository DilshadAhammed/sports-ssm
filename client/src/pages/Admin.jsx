import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [currentItems, setCurrentItems] = useState({}); // To store current item for each event
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch events data and current items when the dashboard is loaded
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/events`);
        setEvents(response.data);

        // Fetch current items for each event
        const currentItemsPromises = response.data.map((event) =>
          axios.get(`${import.meta.env.VITE_API_URL}/api/current-item/${event._id}`).catch(() => null) // Handle errors gracefully
        );
        const currentItemsResponses = await Promise.all(currentItemsPromises);

        const itemsMap = {};
        response.data.forEach((event, index) => {
          const itemResponse = currentItemsResponses[index];
          if (itemResponse && itemResponse.data) {
            itemsMap[event._id] = itemResponse.data.currentItem;
          } else {
            itemsMap[event._id] = "Not Set";
          }
        });

        setCurrentItems(itemsMap);
      } catch (error) {
        console.error("Error fetching events or current items:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleCurrentItemChange = async (eventId, currentItem) => {
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/current-item/${eventId}`, { currentItem });
      setCurrentItems((prev) => ({
        ...prev,
        [eventId]: currentItem,
      }));
    } catch (error) {
      console.error("Error updating current item:", error);
      alert("Failed to update the current item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
      </div>

      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Event List</h2>
          <Link to="/admin/add-event">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Add Event
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold">{event.name}</h3>
              <p className="text-gray-500">{event.date}</p>

              {/* Current Item Management */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Current Item:
                </label>
                <input
                  type="text"
                  value={currentItems[event._id] || ""}
                  onChange={(e) =>
                    setCurrentItems((prev) => ({
                      ...prev,
                      [event._id]: e.target.value,
                    }))
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter current item"
                />
                <button
                  onClick={() =>
                    handleCurrentItemChange(event._id, currentItems[event._id])
                  }
                  className="bg-green-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-green-600 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Save Current Item"}
                </button>
              </div>

              <Link
                to={`/admin/${event._id}`}
                className="block mt-4 text-blue-500 hover:underline"
              >
                View Results
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
