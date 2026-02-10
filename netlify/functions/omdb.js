export async function handler(event) {
  try {
    const params = event.queryStringParameters;
    const apiKey = process.env.OMDB_API_KEY;

    const query = new URLSearchParams({
      apikey: apiKey,
      ...params,
    }).toString();

    const response = await fetch(`https://www.omdbapi.com/?${query}`);

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error" }),
    };
  }
}
