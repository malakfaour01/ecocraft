import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

// Remove color env vars that may be injected by Windows/terminals.
if (typeof process !== "undefined") {
  try {
    if (Object.prototype.hasOwnProperty.call(process.env, "FORCE_COLOR")) {
      delete process.env.FORCE_COLOR;
    }
    if (Object.prototype.hasOwnProperty.call(process.env, "NO_COLOR")) {
      delete process.env.NO_COLOR;
    }
  } catch {
    // ignore
  }
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL ?? "",
});

export const prisma: PrismaClient =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    errorFormat: "minimal",
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;