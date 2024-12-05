const { PrismaClient } = require("@prisma/client");

/**
 * @type {PrismaClient}
 */
let prisma;
const getDbInstance = () => {
  if (!prisma) prisma = new PrismaClient();
  return prisma;
};

module.exports = getDbInstance;
