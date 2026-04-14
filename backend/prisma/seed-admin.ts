import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_SEED_EMAIL ?? 'admin@conecta.local';
  const password = process.env.ADMIN_SEED_PASSWORD ?? 'admin123';
  const name = process.env.ADMIN_SEED_NAME ?? 'Admin';

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: { role: Role.ADMIN, password: hashed, name },
    create: { email, name, password: hashed, role: Role.ADMIN },
    select: { id: true, email: true, name: true, role: true },
  });

  console.log('[seed-admin] upserted:', user);
  console.log(`[seed-admin] email: ${email}`);
  console.log(`[seed-admin] password: ${password}`);
}

main()
  .catch((err) => {
    console.error('[seed-admin] failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
