import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../firebase';
import { doc, updateDoc } from 'firebase/firestore';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    try {
      const { id, name, description } = req.body;
      const itemDocRef = doc(db, 'items', id);
      
      await updateDoc(itemDocRef, {
        name,
        description,
        updatedAt: new Date()
      });

      res.status(200).json({ message: 'Item updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong', details: error });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
