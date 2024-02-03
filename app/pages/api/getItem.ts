import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const { id } = req.query;
      const itemRef = doc(db, 'items', id as string);
      const itemSnap = await getDoc(itemRef);

      if (!itemSnap.exists()) {
        res.status(404).json({ error: 'Item not found' });
      } else {
        res.status(200).json({ id: itemSnap.id, ...itemSnap.data() });
      }
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong', details: error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
