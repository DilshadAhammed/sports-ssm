import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ssmlogo from "../assets/ssmlogo.png";
import { useLocation } from "react-router-dom";


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
        setCurrentItem(
          response.data.currentItem || "No item running currently"
        );
      } catch (err) {
        setCurrentItemError("Failed to fetch the current item.");
      }
    };

    fetchLeaderboard();
    fetchCurrentItem();
  }, [eventId]);

  const leadingDepartment =
    leaderboard.length > 0
      ? leaderboard.reduce((max, dept) =>
          dept.points > max.points ? dept : max
        )
      : null;

  return (
    <div className="bg-gradient-to-b from-neutral-950 to-red-900 text-white">
      {/* Header */}
      <header className=" flex justify-between items-center py-8 mx-4 lg:px-20  text-lg font-bold">
        <nav className="flex space-x-8">
          <Link to="/" className="hover:text-yellow-500">
            Home
          </Link>
          <Link to="./programs" className="hover:text-yellow-500">
            Programs
          </Link>
        </nav>
        <nav>
          <Link to="/" className="hover:text-yellow-500">
            {eventName}
          </Link>
        </nav>
      </header>

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

      {/* Footer */}
      <footer className="bg-[#411313] py-10 px-6 lg:px-20 mt-10">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
          {/* Left Section */}
          <div className="text-center lg:text-left">
            <div className="flex items-center space-x-4">
              <img src={ssmlogo} alt="SSM Logo" className="h-12" />
              <h2 className="text-lg font-bold">
                SEETHI SAHIB MEMORIAL
                <br /> POLYTECHNIC COLLEGE TIRUR
              </h2>
            </div>
            <p className="text-sm mt-2">
              <i className="fas fa-phone mr-2"></i>Phone: +91 494-2422234
            </p>
            <p className="text-sm">
              <i className="fas fa-envelope mr-2"></i>Email: ssmtirur@gmail.com
            </p>
          </div>

          {/* Right Section */}
          <div className="text-center lg:text-right">
            <p className="text-sm">Powered by</p>
            <h2 className="text-lg font-bold">COMPUTER ENGINEERING</h2>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Leaderboard;
