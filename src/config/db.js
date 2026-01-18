import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import {PrismaPg} from '@prisma/adapter-pg';

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const connectDB = async () => {
    try{
        await prisma.$connect();
        console.log("DB connected via prisma.");
    }catch(error){
        console.error(`DB failed to connect via prisma. Error: ${error.message}`);
        process.exit(1);
    }
};

const disconnectDB = async () => {
    await prisma.$disconnect();
};

export {prisma, connectDB, disconnectDB};