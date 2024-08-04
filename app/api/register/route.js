import { db } from "../../../firebase/config";
import { NextResponse } from "next/server";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";

export async function POST(request) {
  const body = await request.json();
  const {
    email,
    teamname,
    homeUniversity,
    activemembers,
    attendeventmembers,
    teamrepresentetive,
    emailrepresentetive,
    country,
    postalcode,
    category,
    phone,
    emailUpdates,
  } = body;

  try {
    // Check whether user exists or not
    const user_db = collection(db, "users");
    const check_user = query(user_db, where("email", "==", email));
    const get_user = await getDocs(check_user);
    const user_details = get_user.docs.map((doc) => doc.data())[0];

    if (
      !get_user.empty &&
      user_details.email &&
      user_details.teamname &&
      user_details.homeUniversity
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Registration completed, to edit your details please login.",
        },
        { status: 400 }
      );
    }

    // Update the user details in the exisiting doc
    if (!get_user.empty) {
      const doc_id = get_user.docs[0].id;

      const doc_ref = doc(db, "users", doc_id);

      await setDoc(
        doc_ref,
        {
          teamname: teamname,
          homeUniversity: homeUniversity,
          activemembers: activemembers,
          attendeventmembers: attendeventmembers,
          teamrepresentetive: teamrepresentetive,
          emailrepresentetive: emailrepresentetive,
          country: country,
          postalcode: postalcode,
          category: category,
          phone: phone,
          emailUpdates: emailUpdates,
        },
        { merge: true }
      ); // Merge to update existing fields without overwriting the entire document

      return NextResponse.json(
        { success: true, message: "User details updated successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
    console.warn(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
