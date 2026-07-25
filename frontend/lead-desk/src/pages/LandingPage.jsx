import Navbar from "../components/Navbar";
import HeroText from "../components/HeroText";
import LeadForm from "../components/LeadForm";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-indigo-50">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">
        <HeroText />
        <LeadForm />
      </section>
      <Footer/>
    </div>
  );
}
   