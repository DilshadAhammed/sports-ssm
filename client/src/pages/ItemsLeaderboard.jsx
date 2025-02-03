import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import IndividualResultsTable from "../components/IndividualResultsTable";
import GroupResultsTable from "../components/GroupResultsTable";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";


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
      <NavBar/>

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
        <Footer />
    </div>
  );
};

export default ItemsLeaderboard;
