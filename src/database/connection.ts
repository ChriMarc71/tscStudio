import { PrismaClient } from "@prisma/client";
import { fieldEncryptionMiddleware } from 'prisma-field-encryption';
import dotenv from 'dotenv';

dotenv.config();

const Prisma = new PrismaClient();

const decryptionKeys:string = process.env.PRISMA_FIELD_ENCRYPTION_KEY+"";

// This is a function, don't forget to call it:
Prisma.$use(fieldEncryptionMiddleware({ decryptionKeys: [decryptionKeys] }))

export default Prisma;
