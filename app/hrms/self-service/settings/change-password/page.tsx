export default function ChangePassword() {
  return (
    <div className="fun-page p-8">
      <h1 className="text-3xl font-bold mb-4">Change Password</h1>
      <p className="text-gray-600 mb-6">Update login credentials</p>
      <div className="border rounded p-6 max-w-md">
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-semibold">Current Password</label>
            <input type="password" className="border px-4 py-2 rounded w-full" />
          </div>
          <div>
            <label className="block mb-2 font-semibold">New Password</label>
            <input type="password" className="border px-4 py-2 rounded w-full" />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Confirm New Password</label>
            <input type="password" className="border px-4 py-2 rounded w-full" />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full">Update Password</button>
        </div>
      </div>
    </div>
  );
}
