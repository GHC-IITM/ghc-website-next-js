// import { NextResponse } from "next/server";
// import { db, app } from "../../../firebase/config";
// import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';

// const uploaddate = () => {
//   const date = new Date();
//   const day = date.getDate().toString().padStart(2, '0');
//   const month = (date.getMonth() + 1).toString().padStart(2, '0');
//   const year = date.getFullYear().toString().slice(-2);
//   const hours = date.getHours().toString().padStart(2, '0');
//   const minutes = date.getMinutes().toString().padStart(2, '0');
//   return `${day}-${month}-${year} ${hours}:${minutes}`;
// };

// // Helper function to handle file upload to Firebase Storage
// const uploadFile = async (teamname, file) => {
//   const date = uploaddate();
//   const storage = getStorage(app);
//   const filename = `${file.name}-${Date.now()}`;

//   const fileRef = ref(storage, `${teamname}/${filename}`);
//   const uploadResult = await uploadBytes(fileRef, file);
//   return getDownloadURL(uploadResult.ref);
// };

// // post request function

// export async function POST(req, res) {
//   const formData = await req.formData();
//   const email = formData.get("email")
//   const demonstration = formData.get("demonstration")
//   const design = formData.get("design")
//   try {
//     // Query Firestore to find the user
//     const user_db = collection(db, "users");
//     const check_user = query(user_db, where("email", "==", email));
//     const get_user = await getDocs(check_user);
//     const user_details = get_user.docs.map((doc) => doc.data())[0];

//     // Extract team details from user
//     const teamname = user_details.teamname;
//     const uid = user_details.uid;

//     let demonstration_file_url = null; // Declare variables in the outer scope
//     let design_file_url = null;

//     if (demonstration && demonstration.size > 0) {
//        demonstration_file_url = await uploadFile(teamname, demonstration);
//     }

//     if (design && design.size > 0) {
//        design_file_url = await uploadFile(teamname, design);
//     }
//     // Save file URLs in Firestore
//     const user_file_db = collection(db, "userfiles");
//     const data = {
//       email: email,
//       teamname: teamname,
//       uid: uid,
//     };

//     if (demonstration_file_url) {
//       data.demonstrationfile = demonstration_file_url;
//     }
//     if (design_file_url) {
//       data.designfile = design_file_url;
//     }
//     await addDoc(user_file_db, data);
//     return NextResponse.json({ success: true, message: "Files uploaded successfully" });
//   } catch (error) {
//     console.error("Error fetching documents: ", error);
//   }
// }

import { NextResponse } from "next/server";
import { db } from "../../../firebase/config";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

// POST request handler
export async function POST(req) {
  try {
    const body = await req.json();
    const { email,files}=body
    const { demonstrationFile, design,cdr,pds,technology, network,business} = files;

    

    // Query Firestore to find the user based on email
    const userDb = collection(db, "users");
    const userQuery = query(userDb, where("email", "==", email));
    const getUser = await getDocs(userQuery);

    if (getUser.empty) {
      return NextResponse.json({ success: false, message: "User not found." });
    }

    // Get the first user's data
    const userDetails = getUser.docs.map((doc) => doc.data())[0];
    const { teamname, uid } = userDetails;
    // console.log("User details:", userDetails);

    // const submissionType = demonstrationFileUrl ? "demonstration" : "design";

    // Save the file URLs in Firestore
    const data = {
      email: email,
      teamname: teamname,
      uid: uid,
      created_at: new Date().toISOString(),
    };

    // Explicitly add the file URLs to the data object if they exist
    if (demonstrationFile) {
      data.demonstrationFile = demonstrationFile;
    }
    if (design) {
      data.designfile = design;
    }
    if (cdr) {
      data.cdr = cdr;
    }
    if (pds) {
      data.pds = pds;
    }
    if (technology) {
      data.technology = technology;
    }
    if (network) {
      data.network = network;
    }
    if (business) {
      data.business = business;
    }

    console.log("data :",data);
    
    
    const userFileDb = collection(db, "submissions");

    const submittedDoc = await addDoc(userFileDb, data);
    console.log("File URLs saved successfully:", submittedDoc.id);

    return NextResponse.json({
      success: true,
      message: "Files uploaded successfully",
    });
  } catch (error) {
    console.error("Error saving file URLs:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to save file URLs.",
    });
  }
}
