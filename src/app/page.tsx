import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center justify-center text-center">
      <Head>
        <title>Intelligent Content Platform</title>
      </Head>
      <h1 className="text-3xl font-bold mb-4">Welcome to the Platform</h1>
      <p className="text-gray-700 mb-6">
        Start building your intelligent recommendations!
      </p>
      <Link
        href="/login"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Go to Login
      </Link>
    </div>
  );
}
