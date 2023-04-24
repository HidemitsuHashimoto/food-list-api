import { PrismaClient } from '@prisma/client';
let prisma;
function getInstance() {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
}
const instance = getInstance();
export default instance;