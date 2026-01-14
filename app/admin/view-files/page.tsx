"use client";

import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";

    interface User {
        id: string;
        email: string;
        uid: string;
        teamname?: string;
        designfile?: string;
        demonstrationfile?: string;
        pds?: string;
        cdr?: string;
        technology?: string;
        business?: string;
        network?: string;
    }

const AdminViewUsers = () => {
    const [entries, setEntries] = useState<User[]>([]);
    const [email, setEmail] = useState('');
    const [isAuthorized, setIsAuthorized] = useState(false); // Track if the user is authorized
    const [error, setError] = useState('');

    const VALID_EMAIL = "ghc@smail.iitm.ac.in"; // Replace with the specific email you want to check

    // Function to group and merge users by uid
    const groupUsers = (fetchedUsers: User[]) => {
        const groupedUsers: { [uid: string]: User } = {};

        fetchedUsers.forEach((user) => {
            if (!groupedUsers[user.uid]) {
                // Initialize with the first user doc for each uid
                groupedUsers[user.uid] = { ...user };
            } else {
                // Merge designfile and demonstrationfile if they exist
                groupedUsers[user.uid] = {
                    ...groupedUsers[user.uid],
                    designfile: user.designfile || groupedUsers[user.uid].designfile,
                    demonstrationfile: user.demonstrationfile || groupedUsers[user.uid].demonstrationfile,
                    pds: user.pds || groupedUsers[user.uid].pds,
                    cdr: user.cdr || groupedUsers[user.uid].cdr,
                    technology: user.technology || groupedUsers[user.uid].technology,
                    business: user.business || groupedUsers[user.uid].business,
                    network: user.network || groupedUsers[user.uid].network
                };
            }
        });

        return Object.values(groupedUsers);
    };

    // Listen for real-time updates
    useEffect(() => {
        const usersCollection = collection(db, "submissions");

        const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
            const fetchedUsers = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as User[];

            const groupedUsers = groupUsers(fetchedUsers);
            setEntries(groupedUsers);
            console.log(groupedUsers);
            
            
        });

        return () => unsubscribe();
    }, []);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setError('');
        setIsAuthorized(false); // Reset authorization status on email change
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (email === VALID_EMAIL) {
            setIsAuthorized(true); // Set authorization status to true
            setError(''); // Clear any previous errors
        } else {
            setIsAuthorized(false); // User is not authorized
            setError('You have no access.');
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
                            value={email}
                            onChange={handleEmailChange}
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
            </div>

            {isAuthorized && ( // Only display the table if the user is authorized
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-3 py-3">Sl</th>
                                <th scope="col" className="px-3 py-3">Team Name</th>
                                <th scope="col" className="px-3 py-3">Design File</th>
                                <th scope="col" className="px-3 py-3">Demonstration File</th>
                                <th scope="col" className="px-3 py-3">PDS</th>
                                <th scope="col" className="px-3 py-3">CDR</th>
                                <th scope="col" className="px-3 py-3">Technical</th>
                                <th scope="col" className="px-3 py-3">Buisness</th>
                                <th scope="col" className="px-3 py-3">Network</th>


                            </tr>
                        </thead>
                        <tbody>
                            {entries.map((entry, index) => (
                                <tr key={entry.id} className="text-white dark:border-gray-700">
                                    <td className="px-3 py-4">{index + 1}</td>
                                    <td className="px-3 py-4">{entry.teamname}</td>
                                    <td className="px-3 py-4">
                                        {entry.designfile ? (
                                            <a
                                                href={entry.designfile}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 underline hover:text-blue-800"
                                            >
                                                View Design File
                                            </a>
                                        ) : (
                                            <span className="text-red-500">not uploaded yet</span>
                                        )}
                                    </td>
                                    <td className="px-3 py-4">
                                        {entry.demonstrationfile ? (
                                            <a
                                                href={entry.demonstrationfile}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 underline hover:text-blue-800"
                                            >
                                                View Demonstration File
                                            </a>
                                        ) : (
                                            <span className="text-red-500">not uploaded yet</span>
                                        )}
                                    </td>
                                    <td className="px-3 py-4">
                                        {entry.pds ? (
                                            <a
                                                href={entry.pds}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 underline hover:text-blue-800"
                                            >
                                                View PDS File
                                            </a>
                                        ) : (
                                            <span className="text-red-500">not uploaded yet</span>
                                        )}
                                    </td>
                                    <td className="px-3 py-4">
                                        {entry.cdr ? (
                                            <a
                                                href={entry.cdr}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 underline hover:text-blue-800"
                                            >
                                                View CDR File
                                            </a>
                                        ) : (
                                            <span className="text-red-500">not uploaded yet</span>
                                        )}
                                    </td>
                                    <td className="px-3 py-4">
                                        {entry.technology ? (
                                            <a
                                                href={entry.technology}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 underline hover:text-blue-800"
                                            >
                                                View Technical File
                                            </a>
                                        ) : (
                                            <span className="text-red-500">not uploaded yet</span>
                                        )}
                                    </td>
                                    <td className="px-3 py-4">
                                        {entry.business ? (
                                            <a
                                                href={entry.business}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 underline hover:text-blue-800"
                                            >
                                                View Business File
                                            </a>
                                        ) : (
                                            <span className="text-red-500">not uploaded yet</span>
                                        )}
                                    </td>
                                    <td className="px-3 py-4">
                                        {entry.network ? (
                                            <a
                                                href={entry.network}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 underline hover:text-blue-800"
                                            >
                                                View Network File
                                            </a>
                                        ) : (
                                            <span className="text-red-500">not uploaded yet</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default AdminViewUsers;
