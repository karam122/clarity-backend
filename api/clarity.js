import axios from 'axios';

export default async function handler(req, res) {
  const { input } = req.query;
  if (!input) {
    return res.status(400).json({ error: 'Missing input parameter' });
  }

  const GOOGLE_API_KEY = 'AIzaSyBZUlA6YY8998nbFVsE_VuXZ4JpQRJwgHY';
  if (!GOOGLE_API_KEY) {
    return res.status(500).json({ error: 'Google API key not set' });
  }
  console.log('check ');
  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/autocomplete/json',
      {
        params: {
          input,
          key: GOOGLE_API_KEY,
          types: 'address'
        }
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Google autocomplete node error:', error.message);
    res.status(500).json({ error: 'Internal Server Error Node JS' });
  }
}
