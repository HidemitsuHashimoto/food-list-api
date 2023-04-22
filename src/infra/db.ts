import { PrismaClient, Prisma } from '@prisma/client'

let prisma: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

function getInstance() {
  if (!prisma) {
    prisma = new PrismaClient()
  }
  return prisma
}

const instance = getInstance()

export default instance