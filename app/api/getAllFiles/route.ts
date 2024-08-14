import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: 'ap-southeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
  },
});

export  async function GET(request: Request) {
  const bucketName = 'clipvaulttemp';
  const params = {
    Bucket: bucketName,
    Prefix: 'user_2jfAnV2Io5SGJOHA0QJXR1GdclT/',
  };

  try {
    const data = await s3Client.send(new ListObjectsV2Command(params));

    if (!data.Contents || data.Contents.length === 0) {
      return new Response('No files found in the specified subfolder', { status: 404 });
    }

    const files = await Promise.all(
      data.Contents.map(async (file: any) => {
        const fileParams = {
          Bucket: bucketName,
          Key: file.Key,
        };
        const command = new GetObjectCommand(fileParams);
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        return { key: file.Key, url };
      })
    );

    return new Response(JSON.stringify({ files }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error retrieving files from S3:', err);
    return new Response('Error retrieving files from S3', { status: 500 });
  }
}
