import { prisma } from '@/lib/db';
import ProgramsList from '@/components/ui/ProgramsList';

export const dynamic = 'force-dynamic';

export default async function ProgramsPage() {
  const programsData = await prisma.program.findMany();

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <h1 className="text-5xl md:text-6xl font-semibold text-black tracking-tight mb-6 leading-tight">Program Pelatihan.</h1>
          <p className="text-xl text-gray-500 font-light leading-relaxed">
            Pilih program yang sesuai dengan passion Anda dan mulailah membangun karir di industri teknologi melalui kurikulum intensif kami.
          </p>
        </div>
        <ProgramsList programsData={programsData} />
      </div>
    </div>
  );
}
