export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="p-8 rounded-xl shadow-lg bg-white">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">
          Bloodline DNA Testing Service
        </h1>
        <p className="text-lg mb-4">
          Welcome to the Bloodline DNA Testing Service Management System!
        </p>
        <ul className="list-disc ml-4 text-gray-600">
          <li>Book DNA tests online</li>
          <li>Manage your appointments and personal information</li>
          <li>Track test progress and results</li>
        </ul>
      </div>
    </div>
  );
}
