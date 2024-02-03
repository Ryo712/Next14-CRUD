import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { name, description } = req.body;
      const itemsCol = collection(db, 'items');
      const newItemRef = await addDoc(itemsCol, {
        name,
        description,
        createdAt: new Date()
      });
      res.status(200).json({ id: newItemRef.id });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong', details: error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
