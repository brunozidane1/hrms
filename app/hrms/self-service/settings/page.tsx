export default function Settings() {
  return (
    <div className="fun-page p-8">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <p className="text-gray-600 mb-6">Manage your account settings</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a href="/hrms/self-service/settings/change-password" className="p-4 border rounded hover:bg-gray-50">
          <h3 className="font-semibold">Change Password</h3>
          <p className="text-sm text-gray-600">Update login credentials</p>
        </a>
        <a href="/hrms/self-service/settings/notifications" className="p-4 border rounded hover:bg-gray-50">
          <h3 className="font-semibold">Notification Preferences</h3>
          <p className="text-sm text-gray-600">Manage email/push notifications</p>
        </a>
      </div>
    </div>
  );
}
