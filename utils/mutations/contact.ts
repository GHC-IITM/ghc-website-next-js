export default async function contact(values: any) {
    // const API_URL = process.env.REACT_APP_API_URL;
    const API_URL='/api'
    console.log(values);
    

    const res = await fetch(`${API_URL}/contact`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(values),
    });
    console.log(res.json());
    

    return res.json();
}