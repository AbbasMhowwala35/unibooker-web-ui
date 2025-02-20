// pages/api/suggestions.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SUGGESTION_API_URL}?input=${query}&types=(cities)&key=${process.env.NEXT_PUBLIC_API_KEY}`
    );

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error('Error fetching suggestions:', error);
    res.status(500).json({ message: 'Failed to fetch suggestions' });
  }
}
