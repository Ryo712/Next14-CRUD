import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const itemsCol = collection(db, 'items');
      const itemsSnapshot = await getDocs(itemsCol);
      const items = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong', details: error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
