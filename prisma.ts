
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import { PrismaClientOptions } from "@prisma/client/runtime/library";

const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool, {
    schema: 'schema.prisma'
  })

export const prisma = new PrismaClient({adapter});

