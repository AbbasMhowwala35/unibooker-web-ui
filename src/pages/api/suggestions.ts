import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SUGGESTION_API_URL}?input=${query}&types=(regions)&components=country:IN&key=${process.env.NEXT_PUBLIC_API_KEY}`
    );

    const predictions = response.data?.predictions || [];
    
    if (predictions.length === 0) {
      return res.status(404).json({ message: 'No locations found' });
    }
    const detailsPromises = predictions.map(async (place: any) => {
      const detailsResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,geometry,address_component&key=${process.env.NEXT_PUBLIC_API_KEY}`
      );

      const details = detailsResponse.data?.result || {};
      return {
        name: details.name,
        address: details.address_components?.map((comp: any) => comp.long_name).join(', '),
        lat: details.geometry?.location?.lat,
        lng: details.geometry?.location?.lng,
      };
    });

    const locations = await Promise.all(detailsPromises);

    res.status(200).json({ locations });
  } catch (error: any) {
    console.error('Error fetching location details:', error?.response?.data || error?.message || error);
    res.status(500).json({ message: 'Failed to fetch location details', error: error?.response?.data || error?.message });
  }
}