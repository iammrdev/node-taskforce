import { ConfigService, registerAs } from '@nestjs/config';
import { join } from 'path';

export const staticOptions = registerAs('static', () => ({
  upload: process.env.UPLOAD,
}));

export function getStaticConfig(configService: ConfigService) {
  const uploadFolder = configService.get<string>('static.upload');

  return [
    {
      rootPath: join(__dirname, uploadFolder),
      serveRoot: `/aws`,
    },
  ];
}
