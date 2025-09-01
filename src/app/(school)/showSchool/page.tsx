// frontend/app/show-schools/page.tsx

'use client';

import { useState, useEffect, useMemo } from 'react';

import { Search } from "lucide-react";

// Define a type for the school data we expect from the API
type School = {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  contact: number;
  email_id: string;
  image: string; 
};

// --- Main Component ---
const ShowSchoolsPage = () => {
  const [allSchools, setAllSchools] = useState<School[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- State for Search and Pagination ---
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const schoolsPerPage = 10; // Show 10 schools per page

  // Fetch all schools from the backend API when the component mounts
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setIsLoading(true);
        // Ensure you have this environment variable set in a .env.local file
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const response = await fetch(`${backendUrl}/schools`,{
  method: "GET",
});
        
        if (!response.ok) {
          throw new Error('Failed to fetch schools');
        }
        
        const data = await response.json();
        setAllSchools(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchools();
  }, []);

  // --- Memoized Filtering and Pagination Logic ---
  // This recalculates only when the search query or the list of schools changes.
  const filteredSchools = useMemo(() => {
    if (!searchQuery) return allSchools;

    return allSchools.filter(school => 
      school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.email_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(school.contact).includes(searchQuery)
    );
  }, [searchQuery, allSchools]);

  // --- Pagination Calculation ---
  const totalPages = Math.ceil(filteredSchools.length / schoolsPerPage);
  const paginatedSchools = filteredSchools.slice(
    (currentPage - 1) * schoolsPerPage,
    currentPage * schoolsPerPage
  );

  // --- Event Handlers ---
  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  return (
    <main className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header Section --- */}
        <div className="flex flex-row sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Registered Schools</h1>

            <a className="bg-indigo-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-indigo-700 transition-colors duration-300" href="/addSchool">
              + Add School
            </a>
         
        </div>

        {/* --- Search Bar --- */}
       <div className="flex items-center justify-between w-full mb-8">
  {/* Search Input with Icon */}
  <div className="relative flex-1"> {/* flex-1 makes it expand fully */}
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
    <input 
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search by name, city, state, email, or contact..."
      className="w-full pl-10 pr-4 py-3 border text-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>

  {/* Dropdown for items per page */}
  <div className="ml-4">
    <select
      value={pageSize}
      onChange={(e) => setPageSize(Number(e.target.value))}
      className="p-3 border rounded-lg shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <option value={10}>10 per page</option>
      <option value={20}>20 per page</option>
      <option value={30}>30 per page</option>
    </select>
  </div>
</div>

        
        {/* --- Content Display --- */}
        {isLoading && <p className="text-center text-gray-600">Loading schools...</p>}
        {error && <p className="text-center text-red-600">Error: {error}</p>}
        
        {!isLoading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedSchools.length > 0 ? (
                
                  paginatedSchools.map((school) => (
  // Main card container with shadow and rounded corners
  <div key={school.id} className="bg-slate-800 rounded-xl shadow-lg overflow-hidden flex flex-col transform hover:-translate-y-1 transition-transform duration-300">
    
    {/* Top section with light blue background */}
    <div className="bg-slate-200 p-4 relative">
     

      {/* School Image */}
      <div className=" mx-auto h-32 overflow-hidden border-4 border-white shadow-md">
        <img
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/schoolImages/${school.image}`}
          alt={`Image of ${school.name}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* School Name */}
      <h2 className="text-center text-2xl font-bold text-gray-800 mt-4 truncate">{school.name}</h2>
    </div>

    {/* Bottom section with white background */}
    <div className="bg-white p-6 flex-grow">
      
      {/* Board and Medium Tags */}
      <div className="flex justify-between gap-3 mb-4">
        <span className='text-black text-lg'>City: <span className="  text-lg font-semibold px-1 py-1 ">{school.city}</span></span>
        <span className='text-black text-lg'>State: <span className=" text-lg font-semibold px-1 py-1 ">{school.state}</span></span>
      </div>

      {/* Details Section */}
      <div className="space-y-3">
        {/* Location */}
        <div className="flex items-center text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span><strong>Location:</strong>{school.address} </span>
        </div>

        {/* Email */}
        <div className="flex items-center text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          <span className="truncate"><strong>Email:</strong> {school.email_id}</span>
        </div>

        {/* Phone */}
        <div className="flex items-center text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          <span><strong>Phone:</strong> {school.contact}</span>
        </div>
      </div>
    </div>
  </div>

                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">No schools found matching your search.</p>
              )}
            </div>

            {/* --- Pagination Controls --- */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-10 gap-4">
                <button 
                  onClick={handlePrevPage} 
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button 
                  onClick={handleNextPage} 
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default ShowSchoolsPage;