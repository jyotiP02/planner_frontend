// src/pages/AdminDashboard.js
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [summaries, setSummaries] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    start_time: "",
    end_time: "",
    location: "",
    image: ""
  });

  const fetchSummary = async (eventId) => {
    try {
      const res = await axios.get(`http://localhost:5000/rsvp-summary/${eventId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSummaries((prev) => ({ ...prev, [eventId]: res.data }));
    } catch (err) {
      console.error("Error fetching RSVP summary:", err);
    }
  };

  const fetchEvents = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/events", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setEvents(res.data.events);
      res.data.events.forEach((event) => fetchSummary(event.id));
    } catch (err) {
      console.error("Error loading events:", err);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/events/${eventId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Event deleted");
      fetchEvents();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { title, description, date, start_time, end_time, location, image } = form;

    if (!title || !description || !date || !start_time || !end_time || !location || !image) {
      toast.error("Please fill in all event fields!");
      return;
    }

    try {
      if (editingEvent) {
        await axios.put(`http://localhost:5000/events/${editingEvent.id}`, form, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        toast.success("Event updated!");
      } else {
        await axios.post("http://localhost:5000/events", form, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        toast.success("Event created!");
      }

      setForm({
        title: "",
        description: "",
        date: "",
        start_time: "",
        end_time: "",
        location: "",
        image: ""
      });
      setEditingEvent(null);
      fetchEvents();
    } catch (err) {
      toast.error("Request failed");
    }
  };

  const startEdit = (event) => {
    setForm(event);
    setEditingEvent(event);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6 text-indigo-600">🛠 Admin Dashboard</h2>

      {/* Event Creation/Update Form */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">{editingEvent ? "✏️ Update Event" : "📆 Create New Event"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="input" name="title" placeholder="Title" value={form.title} onChange={handleChange} />
          <input className="input" name="description" placeholder="Description" value={form.description} onChange={handleChange} />
          <input className="input" name="date" type="date" value={form.date} onChange={handleChange} />
          <input className="input" name="start_time" type="time" value={form.start_time} onChange={handleChange} />
          <input className="input" name="end_time" type="time" value={form.end_time} onChange={handleChange} />
          <input className="input" name="location" placeholder="Location" value={form.location} onChange={handleChange} />
          <input className="input" name="image" placeholder="Image file name" value={form.image} onChange={handleChange} />
        </div>
        <button
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          onClick={handleSubmit}
        >
          {editingEvent ? "Update Event" : "Create Event"}
        </button>
      </div>

      {/* Event List */}
      <h3 className="text-2xl font-semibold mb-4">📋 All Events</h3>
      {events.length === 0 ? (
        <p>No events available</p>
      ) : (
        events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow p-4 mb-4 cursor-pointer hover:bg-gray-100"
            onClick={() => setSelectedEvent(event)}
          >
            {event.image && (
              <img
                src={event.image_url || `/images/${event.image}`}
                alt={event.title}
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
            )}
            <h4 className="text-lg font-bold text-indigo-700">{event.title}</h4>
            <p>{event.date} | {event.start_time} - {event.end_time}</p>
            <p>📍 {event.location}</p>
            <div className="flex gap-3 mt-2">
              <button
                className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                onClick={(e) => {
                  e.stopPropagation();
                  startEdit(event);
                }}
              >
                ✏️ Edit
              </button>
              <button
                className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(event.id);
                }}
              >
                🗑 Delete
              </button>
            </div>

            {summaries[event.id] && (
              <div className="mt-3 text-sm">
                <strong>RSVP Summary:</strong>
                <p>✅ Going: {summaries[event.id].Going}</p>
                <p>🤔 Maybe: {summaries[event.id].Maybe}</p>
                <p>❌ Decline: {summaries[event.id].Decline}</p>
              </div>
            )}
          </div>
        ))
      )}

      {/* Modal for Event Description */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-11/12 md:w-2/3 lg:w-1/2 relative">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-3 right-3 text-xl text-gray-600 hover:text-black"
            >
              ✖
            </button>
            {selectedEvent.image && (
              <img
                src={selectedEvent.image_url || `/images/${selectedEvent.image}`}
                alt={selectedEvent.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <h3 className="text-2xl font-bold mb-2 text-indigo-700">{selectedEvent.title}</h3>
            <p className="mb-2">{selectedEvent.description}</p>
            <p className="text-sm text-gray-500">{selectedEvent.date} | {selectedEvent.start_time} - {selectedEvent.end_time}</p>
            <p className="text-sm text-gray-500">📍 {selectedEvent.location}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
