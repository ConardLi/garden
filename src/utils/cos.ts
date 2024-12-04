import COS from 'cos-nodejs-sdk-v5';
import secret from '@/config/secret.json';

const cos = new COS({
  SecretId: secret.cos.SecretId,
  SecretKey: secret.cos.SecretKey,
});

export const uploadFile = (file: Buffer, fileName: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    cos.putObject(
      {
        Bucket: secret.cos.Bucket,
        Region: `ap-${secret.cos.Region}`,
        Key: `website-icons/${fileName}`,
        Body: file,
        ContentType: 'image/jpeg',
      },
      (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(`https://${secret.cos.Bucket}.cos.ap-${secret.cos.Region}.myqcloud.com/website-icons/${fileName}`);
      }
    );
  });
};
