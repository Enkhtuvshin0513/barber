import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';
import path from 'path';

const getR2Client = () => {
  return new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    },
  });
};

export class UploadService {
  static uploadFile = async (
    file: Express.Multer.File,
    type: 'public' | 'private' = 'public'
  ) => {
    const ext = path.extname(file.originalname);
    const key = `${randomUUID()}${ext}`;
    const client = getR2Client();

    await client.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    if (type === 'private') {
      const signedUrl = await getSignedUrl(
        client,
        new GetObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME,
          Key: key,
        }),
        { expiresIn: 3600 } // 1 hour
      );

      return { key, url: signedUrl, type };
    }

    return { key, url: `${process.env.R2_PUBLIC_URL}/${key}`, type };
  };

  static getSignedReadUrl = async (key: string, expiresIn = 3600) => {
    const client = getR2Client();

    const signedUrl = await getSignedUrl(
      client,
      new GetObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
      }),
      { expiresIn }
    );

    return { key, url: signedUrl };
  };
}
