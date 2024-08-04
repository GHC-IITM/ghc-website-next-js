import { NextResponse } from "next/server"

export async function POST(request) {
    let body=await request.json()
    // const googleFormUrl="" // form url and replace entry numbers of input tah

    const googleFormData = new URLSearchParams();
    googleFormData.append('entry.1295608869', body.name); 
    googleFormData.append('entry.1785136976', body.email);
    googleFormData.append('entry.1787056158', body.message); 



    try {
        const googleFormResponse = await fetch(googleFormUrl, {
            method: 'POST',
            body: googleFormData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    
        return NextResponse.json({success:true})
        
    } catch (error) {
        console.error(error)
    }



}
