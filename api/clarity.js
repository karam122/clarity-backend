export default async function handler(req, res) {
  console.log('API handler called with query:', req.query);

  const { input } = req.query;

  if (!input) {
    console.error('Missing input parameter');
    return res.status(400).json({ error: 'Missing input parameter' });
  }

  const GOOGLE_API_KEY = 'AIzaSyBZUlA6YY8998nbFVsE_VuXZ4JpQRJwgHY';
  if (!GOOGLE_API_KEY) {
    console.error('Google API key not set');
    return res.status(500).json({ error: 'Google API key not set' });
  }

  try {
    console.log('Calling Google API with input:', input);
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

    console.log('Google API response status:', response.data.status);

    if (response.data.status !== 'OK') {
      console.error('Google API returned error:', response.data);
      return res.status(400).json({
        error: 'Google API Error',
        message: response.data.error_message || response.data.status
      });
    }

    console.log('Returning successful response');
    return res.status(200).json(response.data);
  } catch (error) {
    console.error(
      'Google autocomplete node error:',
      error.response?.data || error.message
    );
    return res.status(500).json({ error: 'Internal Server Error Node JS' });
  }
}
