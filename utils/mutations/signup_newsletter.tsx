export default async function signup_newsletter(email: string) {
  const res = await fetch(`/api/subscription`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ email }),
  });

  return res.json();
}
