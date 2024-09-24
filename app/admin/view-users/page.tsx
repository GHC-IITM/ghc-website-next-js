"use client";

// import React from "react";

// interface User {
//   id: string;
//   profilePictureUrl?: string;
//   email: string;
//   uid: string;
//   name: string;
//   emailVerified: boolean;
//   phone?: string;
//   country?: string;
//   category?: string[];
//   homeUniversity?: string;
//   teamname?: string;
//   activemembers?: string;
//   postalcode?: string;
//   attendeventmembers?: string;
// }

// const AdminViewUsers = () => {

//   // Fetch users with react-query
//   const { data, error, isLoading } = useQuery("users", async () => {
//     const response = await fetch("/api/entry/getAll");
//     if (!response.ok) {
//       throw new Error("Failed to fetch users");
//     }
//     const data: User[] = await response.json();
//     return data;
//   });

//   React.useEffect(() => {
//     if (data && !isLoading && !error) {
//       // Sort users: fully filled users will come first
//       const sortedUsers = data.sort((a: User, b: User) => {
//         const aFullyFilled = isFullyFilled(a);
//         const bFullyFilled = isFullyFilled(b);

//         // Sort fully filled users before less filled users
//         return (bFullyFilled ? 1 : 0) - (aFullyFilled ? 1 : 0);
//       });

//       setUsers(sortedUsers);
//     }
//   }, [data, isLoading, error]);

//   // Function to check if the entry is "fully filled"
//   function isFullyFilled(entry: User) {
//     // Define a set of keys that indicate a fully filled entry
//     const fullyFilledKeys = [
//       "phone",
//       "country",
//       "category",
//       "homeUniversity",
//       "teamname",
//       "activemembers",
//       "postalcode",
//       "attendeventmembers",
//     ];

//     // Check if all fully filled keys are present and non-empty in the entry object
//     return fullyFilledKeys.every(
//       (key) => key in entry && entry[key as keyof User]
//     );
//   }

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Something went wrong!</div>;

//   return (
//     <>
//       <div className="flex items-center justify-center p-4">
//         <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//           <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//             <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//               <tr>
//                 <th scope="col" className="px-3 py-3">
//                   Sl
//                 </th>
//                 <th scope="col" className="px-3 py-3">
//                   Image
//                 </th>
//                 <th scope="col" className="px-3 py-3">
//                   Team
//                 </th>
//                 <th scope="col" className="px-3 py-3">
//                   University
//                 </th>
//                 <th scope="col" className="px-3 py-3">
//                   Team Rep
//                 </th>
//                 <th scope="col" className="px-3 py-3">
//                   Members
//                 </th>
//                 <th scope="col" className="px-3 py-3">
//                   Country
//                 </th>
//                 <th scope="col" className="px-3 py-3">
//                   Name
//                 </th>
//                 <th scope="col" className="px-3 py-3">
//                   Phone
//                 </th>
//                 <th scope="col" className="px-3 py-3">
//                   Email
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((entry: any, index) => (
//                 <tr key={entry.id} className="text-white dark:border-gray-700 ">
//                   <td className="px-3 py-4">{index + 1}</td>
//                   <td className="px-3 py-4">
//                     <img
//                       src={entry.profilePictureUrl}
//                       alt={entry.name}
//                       width="50"
//                       height="50"
//                     />
//                   </td>
//                   <td className=" px-3 py-4">{entry.teamname}</td>
//                   <td className=" px-3 py-4">{entry.homeUniversity}</td>
//                   <td className=" px-3 py-4">{entry.teamrepresentetive}</td>
//                   <td className=" px-3 py-4">{entry.attendeventmembers}</td>
//                   <td className=" px-3 py-4">{entry.country}</td>
//                   <td className="px-3 py-4">{entry.name}</td>
//                   <td className=" px-3 py-4">{entry.phone}</td>
//                   <td className=" px-3 py-4">{entry.email}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminViewUsers;
import { useQuery } from "react-query";

import React, { useEffect, useState } from "react";

import { collection, onSnapshot } from "firebase/firestore";
import {db} from '../../../firebase/config'

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
  const [entries, setentries] = React.useState<User[]>([]);

  // Fetch users with react-query
  const { data, error, isLoading } = useQuery("users", async () => {
    const response = await fetch("/api/user/getAll");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data: User[] = await response.json();
    return data;
  });

  React.useEffect(() => {
    if (data && !isLoading && !error) {
      // Sort users: fully filled users will come first
      const sortedUsers = data.sort((a: User, b: User) => {
        const aFullyFilled = isFullyFilled(a);
        const bFullyFilled = isFullyFilled(b);

        // Sort fully filled users before less filled users
        return (bFullyFilled ? 1 : 0) - (aFullyFilled ? 1 : 0);
      });

      setentries(sortedUsers);
    }
  }, [data, isLoading, error]);

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

      setentries(sortedUsers);
    });
    return () => unsubscribe();
  }, []);
  if (!entries.length) return <div>Loading...</div>;

  return (
    <>
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
    </>
  );
};

export default AdminViewUsers;

