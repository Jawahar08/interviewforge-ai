import { Footer } from "@/shared/components/layout/Footer";
import { Navbar } from "@/shared/components/layout/Navbar";
import { Container } from "@/shared/components/layout/Container";
import { GlassCard } from "@/shared/components/common/GlassCard";
import { GradientButton } from "@/shared/components/common/GradientButton";
import { SectionTitle } from "@/shared/components/common/SectionTitle";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050816]">
      <Navbar />

      <section className="interviewforge-grid relative overflow-hidden pb-24 pt-40">
        <div className="interviewforge-glow left-[-100px] top-20 h-80 w-80 bg-violet-600/20" />

        <div className="interviewforge-glow right-[-100px] top-40 h-80 w-80 bg-blue-600/20" />

        <Container>
          <SectionTitle
            eyebrow="Phase 2 Design System"
            title="Prepare smarter with InterviewForge AI"
            description="Reusable components, consistent layouts, and a scalable frontend foundation are now coming together."
          />

          <div className="mx-auto mt-10 max-w-xl">
            <GlassCard className="p-8 text-center">
              <h3 className="text-xl font-semibold text-white">
                Frontend Foundation
              </h3>

              <p className="mt-3 text-slate-400">
                Next.js, Tailwind CSS, Shadcn UI,
                Framer Motion and reusable design components.
              </p>

              <GradientButton className="mt-6">
                Start Preparing
              </GradientButton>
            </GlassCard>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}