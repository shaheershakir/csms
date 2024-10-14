import multiparty from 'multiparty';
import { mongooseConnect } from '@/lib/mongoose';

export default async function handle(req, res) {
  await mongooseConnect();

  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
  console.log('length:', files.file.length);

  // Save the file paths to MongoDB
  const filePaths = files.file.map((file) => file.path);
  // Save filePaths to MongoDB using your preferred MongoDB library or ORM

  return res.json({ filePaths });
}

export const config = {
  api: { bodyParser: false },
};
