import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Método não permitido');

  const { code } = req.body;
  if (!code) return res.status(400).send('Código não fornecido');

  const client = await connectToDatabase();
  const db = client.db('jrizzDB');
  const collection = db.collection('scripts');

  const result = await collection.insertOne({ code });

  res.status(200).json({ id: result.insertedId.toString() });
}
