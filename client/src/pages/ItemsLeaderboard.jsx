import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import IndividualResultsTable from "../components/IndividualResultsTable";
import GroupResultsTable from "../components/GroupResultsTable";
import ssmlogo from "../assets/ssmlogo.png";


const ItemsLeaderboard = () => {

  const [results, setResults] = useState({
    individualResults: [],
    groupResults: [],
  });
  const { eventId } = useParams(); // Get eventId from route params
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/results/${eventId}`);
        setResults({
          individualResults: response.data.individualResults,
          groupResults: response.data.groupResults,
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch results");
        setLoading(false);
      }
    };

    fetchResults();
  }, [eventId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-red-900 flex flex-col text-white">
      {/* Header */}
      <header className="flex flex-col lg:flex-row justify-between items-center py-6 px-4 lg:px-20 text-lg font-bold space-y-4 lg:space-y-0">
        <nav className="flex space-x-8">
          <Link to="/" className="hover:text-yellow-500">
            Home
          </Link>
          <Link  className="hover:text-yellow-500">
            Programs
          </Link>
        </nav>
      </header>

      {/* Individual Results Table */}
      <div className="px-4 lg:px-20 flex-grow">
        {loading && <p className="text-center text-lg">Loading results...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && results.individualResults.length > 0 && (
          <div className="mt-8">
            <IndividualResultsTable results={results.individualResults} />
          </div>
        )}

        {/* Group Results Table */}
        {!loading && !error && results.groupResults.length > 0 && (
          <div className="mt-8">
            <GroupResultsTable results={results.groupResults} />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-[#411313] py-10 px-6 lg:px-20 mt-10">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
          {/* Left Section */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-4">
              <img src={ssmlogo} alt="SSM Logo" className="h-12" />
              <h2 className="text-lg font-bold leading-tight">
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
};

export default ItemsLeaderboard;
