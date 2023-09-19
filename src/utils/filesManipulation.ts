import { existsSync } from 'fs';

export const editFileName = (req: any, file: any, callback: any) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = file.originalname.split('.')[1];
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}.${fileExtName}`);
};

export const imageFileFilter = (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|svg)$/)) {
    return callback(
      new Error('Only files like: JPG, JPEG, PNG, GIF is allowed.'),
      false,
    );
  }
  callback(null, true);
};

function fileExists(filePath: string): boolean {
  // Use a função existsSync do módulo fs para verificar se o arquivo existe
  return existsSync(filePath);
}

export default fileExists;
