export default function MyLeaveHistory() {
  return (
    <div className="fun-page p-8">
      <h1 className="text-3xl font-bold mb-4">My Leave History</h1>
      <p className="text-gray-600 mb-6">Past leave requests and balances</p>
      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Annual Leave</p>
            <p className="text-xl font-bold">- days</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Sick Leave</p>
            <p className="text-xl font-bold">- days</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Casual Leave</p>
            <p className="text-xl font-bold">- days</p>
          </div>
        </div>
      </div>
      <div className="border rounded">
        <p className="p-8 text-center text-gray-500">Leave history will be displayed here</p>
      </div>
    </div>
  );
}
