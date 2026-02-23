export default function MyPayslips() {
  return (
    <div className="fun-page p-8">
      <h1 className="text-3xl font-bold mb-4">My Payslips</h1>
      <p className="text-gray-600 mb-6">Download payslips by month</p>
      <div className="mb-4 flex gap-4">
        <select className="border px-4 py-2 rounded">
          <option>Select Year</option>
        </select>
        <select className="border px-4 py-2 rounded">
          <option>Select Month</option>
        </select>
      </div>
      <div className="border rounded">
        <p className="p-8 text-center text-gray-500">Payslips will be displayed here</p>
      </div>
    </div>
  );
}
