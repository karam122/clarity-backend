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

    // Google API might return a status other than OK
    if (response.data.status !== 'OK') {
      return res.status(400).json({
        error: 'Google API Error',
        message: response.data.error_message || response.data.status
      });
    }

    return res.status(200).json(response.data);
  } catch (error) {
    console.error(
      'Google autocomplete node error:',
      error.response?.data || error.message
    );
    return res.status(500).json({ error: 'Internal Server Error Node JS' });
  }
}
