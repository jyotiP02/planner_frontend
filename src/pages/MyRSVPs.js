import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyRSVPs = () => {
  const [rsvps, setRsvps] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchMyRSVPs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/my-rsvps", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRsvps(Array.isArray(res.data.rsvps) ? res.data.rsvps : []);
    } catch (err) {
      toast.error("Failed to load RSVPs");
    }
  };

  useEffect(() => {
    fetchMyRSVPs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6 text-purple-700">📌 My RSVP Responses</h2>

      {rsvps.length === 0 ? (
        <p className="text-gray-600">You haven't RSVP'd to any events yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rsvps.map(({ event, status }, index) => {
            if (!event) return null;
            return (
              <div
                key={event.id || index}
                className="bg-white p-4 rounded-lg shadow hover:bg-gray-100 cursor-pointer"
                onClick={() => setSelected(event)}
              >
                {event.image_url && (
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-40 object-cover rounded-lg mb-2"
                  />
                )}
                <h3 className="text-xl font-semibold text-indigo-700">{event.title}</h3>
                <p>{event.date} | {event.start_time} - {event.end_time}</p>
                <p className="text-sm text-gray-600">📍 {event.location}</p>
                <p className="mt-2">
                  Your RSVP:{" "}
                  <span className={`font-bold ${
                    status === "Going"
                      ? "text-green-600"
                      : status === "Maybe"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}>
                    {status || "Not Responded"}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-11/12 md:w-2/3 lg:w-1/2 relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 text-xl text-gray-600 hover:text-black"
            >
              ✖
            </button>
            {selected.image_url && (
              <img
                src={selected.image_url}
                alt={selected.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            <h3 className="text-2xl font-bold text-purple-700 mb-2">{selected.title}</h3>
            <p className="mb-2 text-gray-700">{selected.description}</p>
            <p className="text-sm text-gray-500">
              {selected.date} | {selected.start_time} - {selected.end_time}
            </p>
            <p className="text-sm text-gray-500">📍 {selected.location}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRSVPs;
