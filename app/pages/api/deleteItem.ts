import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../firebase';
import { doc, deleteDoc } from 'firebase/firestore';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      const itemDocRef = doc(db, 'items', id as string);
      
      await deleteDoc(itemDocRef);

      res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong', details: error });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
