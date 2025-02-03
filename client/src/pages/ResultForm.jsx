import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ResultForm = () => {
  const { eventId } = useParams();
  const [item, setItem] = useState("");
  const [category, setCategory] = useState("");
  const [first, setFirst] = useState([{ chestNo: "", name: "", section: "" }]);
  const [second, setSecond] = useState([{ chestNo: "", name: "", section: "" }]);
  const [third, setThird] = useState([{ chestNo: "", name: "", section: "" }]);
  const [status, setStatus] = useState("Running");
  const [isGroup, setIsGroup] = useState(false); // isGroup state
  const [departments, setDepartments] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/departments`)
      .then((response) => setDepartments(response.data))
      .catch((err) => console.error("Error fetching departments:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Ensure that all positions have a valid section
    const validatePositions = (positions) =>
      positions.filter(p => p.section !== "");
  
    try {
      const token = localStorage.getItem("token");
      const resultData = {
        event: eventId,
        item,
        category,
        first: validatePositions(first),
        second: validatePositions(second),
        third: validatePositions(third),
        status,
        isGroup,
      };
  
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/results`, 
        resultData, 
        {
          headers: { 
            "Content-Type": "application/json",
            'x-auth-token': token,
          },
        }
      );
  
      setMessage(response.data.message);
      setError("");
    } catch (error) {
      setError(error.response?.data.error || "Error occurred");
      setMessage("");
    }
  };

  const handleFieldChange = (e, index, position) => {
    const { name, value } = e.target;
    const updatedData = [...position];
    updatedData[index][name] = value;
    switch (position) {
      case first:
        setFirst(updatedData);
        break;
      case second:
        setSecond(updatedData);
        break;
      case third:
        setThird(updatedData);
        break;
      default:
        break;
    }
  };

  const handleAddField = (position) => {
    const newField = { chestNo: "", name: "", section: "" };
    switch (position) {
      case "first":
        setFirst([...first, newField]);
        break;
      case "second":
        setSecond([...second, newField]);
        break;
      case "third":
        setThird([...third, newField]);
        break;
      default:
        break;
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 border rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add/Update Result</h2>
      {message && <div className="text-green-500 mb-4">{message}</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Item</label>
          <input
            type="text"
            className="w-full p-2 mt-1 border rounded-md"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            className="w-full p-2 mt-1 border rounded-md"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option>Select Category</option>
            <option value="Sports">Sports</option>
            <option value="Games">Games</option>
            <option value="Arts">Arts</option>
          </select>
        </div>

        {/* isGroup Checkbox */}
        <div className="mb-4">
          <label className="block text-gray-700">Is Group?</label>
          <input
            type="checkbox"
            className="p-2 mt-1"
            checked={isGroup}
            onChange={() => setIsGroup(!isGroup)}
          />
        </div>

        {/* First Position */}
        <div className="mb-4">
          <label className="block text-gray-700">First Position</label>
          {first.map((field, index) => (
            <div key={index} className="mb-2">
              {!isGroup && (
                <>
                  <input
                    type="text"
                    name="chestNo"
                    placeholder="Chest No"
                    className="w-full p-2 mt-1 border rounded-md"
                    value={field.chestNo}
                    onChange={(e) => handleFieldChange(e, index, first)}
                    required
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full p-2 mt-1 border rounded-md"
                    value={field.name}
                    onChange={(e) => handleFieldChange(e, index, first)}
                    required
                  />
                </>
              )}
              <select
                name="section"
                className="w-full p-2 mt-1 border rounded-md"
                value={field.section}
                onChange={(e) => handleFieldChange(e, index, first)}
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button
            type="button"
            className="bg-green-500 text-white py-2 px-4 rounded-md mt-2"
            onClick={() => handleAddField("first")}
          >
            Add First Position
          </button>
        </div>

        {/* Second Position */}
        <div className="mb-4">
          <label className="block text-gray-700">Second Position</label>
          {second.map((field, index) => (
            <div key={index} className="mb-2">
              {!isGroup && (
                <>
                  <input
                    type="text"
                    name="chestNo"
                    placeholder="Chest No"
                    className="w-full p-2 mt-1 border rounded-md"
                    value={field.chestNo}
                    onChange={(e) => handleFieldChange(e, index, second)}
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full p-2 mt-1 border rounded-md"
                    value={field.name}
                    onChange={(e) => handleFieldChange(e, index, second)}
                  />
                </>
              )}
              <select
                name="section"
                className="w-full p-2 mt-1 border rounded-md"
                value={field.section}
                onChange={(e) => handleFieldChange(e, index, second)}
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button
            type="button"
            className="bg-green-500 text-white py-2 px-4 rounded-md mt-2"
            onClick={() => handleAddField("second")}
          >
            Add Second Position
          </button>
        </div>

        {/* Third Position */}
        <div className="mb-4">
          <label className="block text-gray-700">Third Position</label>
          {third.map((field, index) => (
            <div key={index} className="mb-2">
              {!isGroup && (
                <>
                  <input
                    type="text"
                    name="chestNo"
                    placeholder="Chest No"
                    className="w-full p-2 mt-1 border rounded-md"
                    value={field.chestNo}
                    onChange={(e) => handleFieldChange(e, index, third)}
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full p-2 mt-1 border rounded-md"
                    value={field.name}
                    onChange={(e) => handleFieldChange(e, index, third)}
                  />
                </>
              )}
              <select
                name="section"
                className="w-full p-2 mt-1 border rounded-md"
                value={field.section}
                onChange={(e) => handleFieldChange(e, index, third)}
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button
            type="button"
            className="bg-green-500 text-white py-2 px-4 rounded-md mt-2"
            onClick={() => handleAddField("third")}
          >
            Add Third Position
          </button>
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <select
            className="w-full p-2 mt-1 border rounded-md"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Running">Running</option>
            <option value="Finished">Finished</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit Result
        </button>
      </form>
    </div>
  );
};

export default ResultForm;
