import COS from 'cos-nodejs-sdk-v5';
import { env } from '@/config/env';

const cos = new COS({
  SecretId: env.cos.secretId,
  SecretKey: env.cos.secretKey,
});

export const uploadFile = (file: Buffer, fileName: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    cos.putObject(
      {
        Bucket: env.cos.bucket,
        Region: `ap-${env.cos.region}`,
        Key: `website-icons/${fileName}`,
        Body: file,
        ContentType: 'image/jpeg',
      },
      (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(`https://${env.cos.bucket}.cos.ap-${env.cos.region}.myqcloud.com/website-icons/${fileName}`);
      }
    );
  });
};
