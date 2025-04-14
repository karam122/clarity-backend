// api/clarity.js
export default async function handler(req, res) {
  const token = process.env.CLARITY_API_TOKEN;

  try {
    const response = await fetch(
      'https://www.clarity.ms/export-data/api/v1/project-live-insights',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from Clarity' });
  }
}
