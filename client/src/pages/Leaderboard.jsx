import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function Leaderboard() {
  const location = useLocation();
  const eventName = location.state?.eventName || "Event Name";
  const { eventId } = useParams();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentItem, setCurrentItem] = useState("");
  const [currentItemError, setCurrentItemError] = useState("");
  

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/positions-count/${eventId}`);
        setLeaderboard(response.data);
      } catch (err) {
        setError("Failed to fetch leaderboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const fetchCurrentItem = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/current-item/${eventId}`);
        setCurrentItem(response.data.currentItem || "No item running currently");
      } catch (err) {
        setCurrentItemError("Failed to fetch the current item.");
      }
    };

    fetchLeaderboard();
    fetchCurrentItem();
  }, [eventId]);

  const leadingDepartment =
    leaderboard.length > 0
      ? leaderboard.reduce((max, dept) => (dept.points > max.points ? dept : max))
      : null;

  return (
    <div className="bg-gradient-to-b from-neutral-950 to-red-900 text-white min-h-screen">
      <NavBar eventName={eventName}/>

      {/* Main Section */}
      <main className="px-6 lg:px-20">
        {/* Event Section */}
        <section className="grid grid-cols-2 items-center md:space-x-10 mt-10">
          <div className="p-8 text-center mb-10 md:mb-0">
            <p className="text-yellow-500 font-semibold">On live</p>
            <h1 className="text-4xl font-bold">{currentItem || "N/A"}</h1>
            {currentItemError && (
              <p className="text-red-500">{currentItemError}</p>
            )}
          </div>
          <div className="bg-[#431D1D75] p-8 rounded-lg text-center">
            {leadingDepartment ? (
              <>
                <p className="text-5xl font-bold">{leadingDepartment.points}</p>
                <p className="mt-2">{leadingDepartment.department}</p>
              </>
            ) : (
              <p className="text-gray-300">No leading department yet.</p>
            )}
          </div>
        </section>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && leaderboard.length === 0 && (
          <p>No data available for this event.</p>
        )}

        {/* Event Scores */}
        {!loading && !error && leaderboard.length > 0 && (
          <section className="mt-10 space-y-6">
            {leaderboard.map((dept, index) => (
              <div
                key={index}
                className="bg-[#5F2B2BDB] grid grid-cols-6 items-center py-2 gap-1 rounded-md"
              >
                <h2 className="col-span-3 px-4 font-bold">{dept.department}</h2>
                <div className="text-xs col-span-2">
                  <p className="text-sm">{dept.firstPrizes} First Position</p>
                  <p className="text-sm">{dept.secondPrizes} Second Position</p>
                  <p className="text-sm">{dept.thirdPrizes} Third Position</p>
                </div>
                <div className="text-center">
                  <p className="font-extrabold text-3xl">{dept.points}</p>
                  <p>Points</p>
                </div>
              </div>
            ))}
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Leaderboard;
