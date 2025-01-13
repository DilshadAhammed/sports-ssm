import React from "react";

const IndividualResultsTable = ({ results }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mt-6">Individual Results</h3>
      <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Item</th>
            <th className="border border-gray-300 p-2">First</th>
            <th className="border border-gray-300 p-2">Second</th>
            <th className="border border-gray-300 p-2">Third</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result._id}>
              <td className="border border-gray-300 p-2">{result.item}</td>
              <td className="border border-gray-300 p-2">
                {result.first
                  .map((pos) => `${pos.name} - ${pos.section.code}`)
                  .join(", ")}
              </td>
              <td className="border border-gray-300 p-2">
                {result.second
                  .map((pos) => `${pos.name} - ${pos.section.code}`)
                  .join(", ")}
              </td>
              <td className="border border-gray-300 p-2">
                {result.third
                  .map((pos) => `${pos.name} - ${pos.section.code}`)
                  .join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IndividualResultsTable;
