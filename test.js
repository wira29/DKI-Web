const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Fetching certifications...");
  try {
    const certs = await prisma.certification.findMany();
    console.log("Certifications fetched successfully:", certs.length);
    
    console.log("Trying to insert a test certification with description...");
    const testCert = await prisma.certification.create({
      data: {
        id: 'test-' + Date.now(),
        slug: 'test-' + Date.now(),
        title: 'Test Cert',
        short_description: 'Test Subtitle',
        image: 'https://example.com/image.jpg',
        issuing_body: 'Test Body',
        price: 1000,
        description: 'Test Description HTML',
        requirements: 'Test Requirements HTML'
      }
    });
    console.log("Created successfully:", testCert);
    
    // Clean up
    await prisma.certification.delete({ where: { id: testCert.id } });
    console.log("Cleaned up successfully.");
  } catch (error) {
    console.error("Prisma Error:", error);
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
