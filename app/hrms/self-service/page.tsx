export default function SelfServicePortal() {
  return (
    <div className="fun-page p-8">
      <h1 className="text-3xl font-bold mb-4">Self-Service Portal</h1>
      <p className="text-gray-600 mb-6">Employee self-service features</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a href="/hrms/self-service/dashboard" className="p-4 border rounded hover:bg-gray-50">
          <h3 className="font-semibold">My Dashboard</h3>
          <p className="text-sm text-gray-600">Personal overview</p>
        </a>
        <a href="/hrms/self-service/profile" className="p-4 border rounded hover:bg-gray-50">
          <h3 className="font-semibold">My Profile</h3>
          <p className="text-sm text-gray-600">View personal information</p>
        </a>
        <a href="/hrms/self-service/documents" className="p-4 border rounded hover:bg-gray-50">
          <h3 className="font-semibold">My Documents</h3>
          <p className="text-sm text-gray-600">Access personal documents</p>
        </a>
        <a href="/hrms/self-service/attendance" className="p-4 border rounded hover:bg-gray-50">
          <h3 className="font-semibold">My Attendance</h3>
          <p className="text-sm text-gray-600">Personal attendance calendar</p>
        </a>
        <a href="/hrms/self-service/leave-history" className="p-4 border rounded hover:bg-gray-50">
          <h3 className="font-semibold">My Leave History</h3>
          <p className="text-sm text-gray-600">Past leave requests and balances</p>
        </a>
        <a href="/hrms/self-service/payslips" className="p-4 border rounded hover:bg-gray-50">
          <h3 className="font-semibold">My Payslips</h3>
          <p className="text-sm text-gray-600">Download payslips by month</p>
        </a>
        <a href="/hrms/self-service/loans" className="p-4 border rounded hover:bg-gray-50">
          <h3 className="font-semibold">My Loans</h3>
          <p className="text-sm text-gray-600">View loan applications and EMI</p>
        </a>
        <a href="/hrms/self-service/performance" className="p-4 border rounded hover:bg-gray-50">
          <h3 className="font-semibold">My Performance</h3>
          <p className="text-sm text-gray-600">View reviews and OKRs</p>
        </a>
        <a href="/hrms/self-service/schedule" className="p-4 border rounded hover:bg-gray-50">
          <h3 className="font-semibold">My Schedule</h3>
          <p className="text-sm text-gray-600">View shifts and meetings</p>
        </a>
        <a href="/hrms/self-service/settings" className="p-4 border rounded hover:bg-gray-50">
          <h3 className="font-semibold">Settings</h3>
          <p className="text-sm text-gray-600">Password & notifications</p>
        </a>
      </div>
    </div>
  );
}
