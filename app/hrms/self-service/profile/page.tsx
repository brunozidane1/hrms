export default function MyProfile() {
  return (
    <div className="fun-page p-8">
      <h1 className="text-3xl font-bold mb-4">My Profile</h1>
      <p className="text-gray-600 mb-6">View personal information</p>
      <div className="border rounded p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold">Personal Information</h3>
          <a href="/hrms/self-service/profile/edit-request" className="px-4 py-2 border rounded hover:bg-gray-50">Request Edit</a>
        </div>
        <p className="text-center text-gray-500 py-8">Profile information will be displayed here</p>
      </div>
    </div>
  );
}
