export default function EmployeeProfile() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Employee Profile</h1>
      <p className="text-gray-600 mb-6">Complete employee record (tabs: Personal, Job, Salary, Documents)</p>
      <div className="border rounded p-6">
        <div className="flex gap-4 mb-6 border-b">
          <button className="px-4 py-2 border-b-2 border-blue-600">Personal</button>
          <button className="px-4 py-2">Job</button>
          <button className="px-4 py-2">Salary</button>
          <button className="px-4 py-2">Documents</button>
        </div>
        <p className="text-center text-gray-500 py-8">Employee profile details will be displayed here</p>
      </div>
    </div>
  );
}
