import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black/90 text-white px-4 text-center">
            <div className="max-w-md w-full p-8 bg-[#212121] rounded-lg shadow-lg">
                <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
                <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
                <p className="mb-8">
                    Sorry, we couldn't find the page you're looking for.
                </p>
                <Link
                    href="/chat"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
                >
                    Return Home
                </Link>
            </div>
        </div>
    )
}