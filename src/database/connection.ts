import { PrismaClient } from "@prisma/client";
import { fieldEncryptionMiddleware } from 'prisma-field-encryption';
import dotenv from 'dotenv';

dotenv.config();

const Prisma = new PrismaClient();

// This is a function, don't forget to call it:
Prisma.$use(fieldEncryptionMiddleware({ encryptionKey: process.env.PRISMA_FIELD_ENCRYPTION_KEY}))

export default Prisma;
