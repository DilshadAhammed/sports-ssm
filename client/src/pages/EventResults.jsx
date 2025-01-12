import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import IndividualResultsTable from "../components/IndividualResultsTable";
import GroupResultsTable from "../components/GroupResultsTable";

const EventResults = () => {
  const { eventId } = useParams();
  const [results, setResults] = useState({ individualResults: [], groupResults: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  const handleAddResult = () => {
    navigate(`/admin/${eventId}/add-result`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Event Results</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && results.individualResults.length === 0 && results.groupResults.length === 0 && (
        <p>No results found for this event.</p>
      )}

      {/* Individual Results Table */}
      {!loading && !error && results.individualResults.length > 0 && (
        <IndividualResultsTable results={results.individualResults} />
      )}

      {/* Group Results Table */}
      {!loading && !error && results.groupResults.length > 0 && (
        <GroupResultsTable results={results.groupResults} />
      )}

      <button
        onClick={handleAddResult}
        className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
      >
        Add Result
      </button>
    </div>
  );
};

export default EventResults;
