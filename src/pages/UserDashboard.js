// src/pages/UserDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/events", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data.events || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const handleRSVP = async (eventId, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/rsvp/${eventId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`RSVP updated to ${status}`);
      fetchEvents(); // refresh after RSVP
    } catch (err) {
      console.error(err);
      toast.error("Failed to RSVP");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <ToastContainer />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-indigo-700">🎉 Upcoming Events</h2>
        <a
          href="/my-rsvps"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          My RSVPs
        </a>
      </div>

      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-gray-600">No upcoming events yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white shadow rounded-lg p-4">
              {event.image_url && (
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="w-full h-40 object-cover rounded-lg mb-2"
                />
              )}
              <h3 className="text-xl font-bold text-purple-700">{event.title}</h3>
              <p>{event.date} | {event.start_time} - {event.end_time}</p>
              <p className="text-sm text-gray-600">📍 {event.location}</p>
              <p className="text-sm mt-1 text-gray-700">{event.description}</p>

              <div className="mt-3 flex gap-2">
                {['Going', 'Maybe', 'Decline'].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleRSVP(event.id, status)}
                    className={`px-3 py-1 rounded text-white ${
                      status === "Going"
                        ? "bg-green-600 hover:bg-green-700"
                        : status === "Maybe"
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <div className="text-xs text-gray-500 mt-2">
                👍 {event.going} | 🤔 {event.maybe} | ❌ {event.decline}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
