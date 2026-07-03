import { prisma } from '@/lib/db';
import CertificationsList from '@/components/ui/CertificationsList';

export const dynamic = 'force-dynamic';

export default async function CertificationsPage() {
  const certificationsData = await prisma.certification.findMany();

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <h1 className="text-5xl md:text-6xl font-semibold text-black tracking-tight mb-6">Jadwal Sertifikasi.</h1>
          <p className="text-xl text-gray-500 font-light leading-relaxed">
            Tingkatkan kredibilitas profesional Anda dengan sertifikasi kompetensi dari lembaga terkemuka berstandar nasional dan internasional.
          </p>
        </div>
        <CertificationsList certificationsData={certificationsData} />
      </div>
    </div>
  );
}
