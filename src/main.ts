import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const PORT = process.env.PORT || 2244;

(async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
})();
