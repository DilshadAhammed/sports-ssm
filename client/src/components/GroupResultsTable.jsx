const GroupResultsTable = ({ results }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6 backdrop-blur-3xl bg-transparent p-4 rounded-lg">
      <h3 className="text-xl font-bold text-center text-white">Group Results</h3>
      <table className="w-full text-sm text-left mt-4">
        <thead className="text-xs text-white/80 uppercase border border-white/10 bg-black/20">
          <tr>
            <th scope="col" className="px-6 py-3">Item</th>
            <th scope="col" className="px-6 py-3">First</th>
            <th scope="col" className="px-6 py-3">Second</th>
            <th scope="col" className="px-6 py-3">Third</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result._id} className="border border-white/10 bg-black/10 backdrop-blur-3xl">
              <td className="px-6 py-4 font-medium">{result.item}</td>
              <td className="px-6 py-4">{result.first.map((pos) => pos.section.name).join(", ") || "-"}</td>
              <td className="px-6 py-4">{result.second.map((pos) => pos.section.name).join(", ") || "-"}</td>
              <td className="px-6 py-4">{result.third.map((pos) => pos.section.name).join(", ") || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupResultsTable;
