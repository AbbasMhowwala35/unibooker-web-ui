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
      `${process.env.NEXT_PUBLIC_SUGGESTION_API_URL}?input=${query}&types=(cities)&key=${process.env.NEXT_PUBLIC_API_KEY}`
    );

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error('Error fetching suggestions:', error?.response?.data || error?.message || error);
    res.status(500).json({ message: 'Failed to fetch suggestions', error: error?.response?.data || error?.message });
  }
}