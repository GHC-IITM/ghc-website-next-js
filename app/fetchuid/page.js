"use client"
import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config"; // Adjust import based on your file structure

const UserSearch = () => {
    const [email, setEmail] = useState("");
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (!email) {
            setError("Please enter an email address.");
            return;
        }
        setError("");

        try {
            const usersCollection = collection(db, "users");
            const q = query(usersCollection, where("email", "==", email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                // Assuming you have a field named 'uid' in your user documents
                const data = {
                    uid: userDoc.data().uid, // Get the UID from the document
                    ...userDoc.data(), // Spread the other fields
                };
                setUserData(data);
            } else {
                setUserData(null);
                setError("No user found with that email.");
            }
        } catch (err) {
            console.error("Error fetching user:", err);
            setError("Failed to fetch user. Please try again.");
        }
    };

    return (
        <div>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter user email"
            />
            <button onClick={handleSearch}>Search</button>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {userData && (
                <div>
                    <h3>User Found:</h3>
                    <p>UID: {userData.uid}</p> {/* Display UID instead of ID */}
                    <p>Name: {userData.name}</p>
                    <p>Email: {userData.email}</p>
                    {/* Add other user fields as needed */}
                </div>
            )}
        </div>
    );
};

export default UserSearch;
