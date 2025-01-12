import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [category, setCategory] = useState('Sports');
  const [status, setStatus] = useState('Active');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  // Fetch events when the component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch events from the backend
  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/events`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Handle form submission to add an event
  const handleAddEvent = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("name", eventName);
    formData.append("category", category);
    formData.append("status", status);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/events`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchEvents();  // Refresh the event list
      setEventName('');
      setCategory('Sports');
      setStatus('Active');
      setDescription('');
      setImage(null);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  // Handle event deletion
  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/events/${eventId}`);
      fetchEvents();  // Refresh the event list
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Event Management</h1>

      {/* Add Event Form */}
      <form onSubmit={handleAddEvent} className="space-y-4 mb-8">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium">Event Name:</label>
          <input
            type="text"
            id="name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex flex-col w-full">
            <label htmlFor="category" className="text-sm font-medium">Category:</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md"
            >
              <option value="Sports">Sports</option>
              <option value="Games">Games</option>
              <option value="Arts">Arts</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="status" className="text-sm font-medium">Status:</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm font-medium">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="image" className="text-sm font-medium">Event Poster (Image):</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Event
        </button>
      </form>

      {/* Event List */}
      <h2 className="text-xl font-semibold mt-8">Event List</h2>
      <div className="mt-4 space-y-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="flex items-center justify-between p-4 border border-gray-300 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <img
                src={event.image}
                alt={event.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div>
                <h3 className="text-lg font-semibold">{event.name}</h3>
                <p className="text-sm text-gray-600">{event.category}</p>
                <p className="text-sm text-gray-600">{event.status}</p>
              </div>
            </div>
            <div className="space-x-4">
              <Link to={`/admin/${event._id}`} className="text-blue-600 hover:text-blue-800">
                View Results
              </Link>
              <button
                onClick={() => handleDeleteEvent(event._id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventManagement;
