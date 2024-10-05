"use client";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config"; // Adjust import based on your file structure
import React, { useEffect, useState } from "react";

interface User {
  id: string;
  profilePictureUrl?: string;
  email: string;
  uid: string;
  name: string;
  emailVerified: boolean;
  phone?: string;
  country?: string;
  category?: string[];
  homeUniversity?: string;
  teamname?: string;
  activemembers?: string;
  postalcode?: string;
  attendeventmembers?: string;
}

const AdminViewUsers = () => {
  const [entries, setEntries] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [emailInput, setEmailInput] = useState(""); // State for email input
  const [isAuthorized, setIsAuthorized] = useState(false); // Track if the user is authorized
  const VALID_EMAIL = "ghc@smail.iitm.ac.in"; // Replace with the specific email you want to check
  const [error, setError] = useState('');


  // Listen for real-time updates
  useEffect(() => {
    const usersCollection = collection(db, "users");

    // Real-time listener
    const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
      const fetchedUsers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];

      // Sort users: fully filled users will come first
      const sortedUsers = fetchedUsers.sort((a: User, b: User) => {
        const aFullyFilled = isFullyFilled(a);
        const bFullyFilled = isFullyFilled(b);

        return (bFullyFilled ? 1 : 0) - (aFullyFilled ? 1 : 0);
      });

      setEntries(sortedUsers);
      setLoading(false); // Set loading to false after fetching data
    });

    return () => unsubscribe();
  }, []);

  // Function to check if the entry is "fully filled"
  const isFullyFilled = (entry: User) => {
    const fullyFilledKeys = [
      "phone",
      "country",
      "category",
      "homeUniversity",
      "teamname",
      "activemembers",
      "postalcode",
      "attendeventmembers",
    ];

    return fullyFilledKeys.every((key) => key in entry && entry[key as keyof User]);
  };

  // Function to handle email verification
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (emailInput === VALID_EMAIL) {
      setIsAuthorized(true);
      setError(''); // Clear any previous errors
    } else {
      setError('You have no access.');
      setIsAuthorized(false);

    }
  };


  return (
    <>
      <div className="flex flex-col items-center justify-center p-4">
        {/* Render email input and button only if not authorized */}
        {!isAuthorized ? (
          <form onSubmit={handleSubmit} className="mb-4">
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)} // Update email input state
              placeholder="Enter your email"
              required
              className="border p-2 rounded"
            />
            <button type="submit" className="ml-2 p-2 bg-blue-600 text-white rounded">
              Sign In
            </button>
          </form>
        ) : null}
          {error && <p className="text-red-500">{error}</p>}


        {isAuthorized && (
          <div className="flex items-center justify-center p-4">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-3 py-3">Sl</th>
                    <th scope="col" className="px-3 py-3">Image</th>
                    <th scope="col" className="px-3 py-3">Team</th>
                    <th scope="col" className="px-3 py-3">University</th>
                    <th scope="col" className="px-3 py-3">Team Rep</th>
                    <th scope="col" className="px-3 py-3">Members</th>
                    <th scope="col" className="px-3 py-3">Country</th>
                    <th scope="col" className="px-3 py-3">Name</th>
                    <th scope="col" className="px-3 py-3">Phone</th>
                    <th scope="col" className="px-3 py-3">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, index) => (
                    <tr key={entry.id} className="text-white dark:border-gray-700">
                      <td className="px-3 py-4">{index + 1}</td>
                      <td className="px-3 py-4">
                        <img
                          src={entry.profilePictureUrl}
                          alt={entry.name}
                          width="50"
                          height="50"
                        />
                      </td>
                      <td className="px-3 py-4">{entry.teamname}</td>
                      <td className="px-3 py-4">{entry.homeUniversity}</td>
                      <td className="px-3 py-4">{entry.activemembers}</td>
                      <td className="px-3 py-4">{entry.country}</td>
                      <td className="px-3 py-4">{entry.name}</td>
                      <td className="px-3 py-4">{entry.phone}</td>
                      <td className="px-3 py-4">{entry.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminViewUsers;
