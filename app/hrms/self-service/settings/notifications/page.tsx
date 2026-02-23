export default function NotificationPreferences() {
  return (
    <div className="fun-page p-8">
      <h1 className="text-3xl font-bold mb-4">Notification Preferences</h1>
      <p className="text-gray-600 mb-6">Manage email/push notifications</p>
      <div className="border rounded p-6 max-w-2xl">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border-b">
            <div>
              <p className="font-semibold">Email Notifications</p>
              <p className="text-sm text-gray-600">Receive updates via email</p>
            </div>
            <input type="checkbox" className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-between p-3 border-b">
            <div>
              <p className="font-semibold">Push Notifications</p>
              <p className="text-sm text-gray-600">Receive browser notifications</p>
            </div>
            <input type="checkbox" className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-between p-3 border-b">
            <div>
              <p className="font-semibold">Leave Approvals</p>
              <p className="text-sm text-gray-600">Notify on leave status changes</p>
            </div>
            <input type="checkbox" className="w-5 h-5" />
          </div>
        </div>
        <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Preferences</button>
      </div>
    </div>
  );
}
