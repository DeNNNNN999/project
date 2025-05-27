import HeroSection from '../components/HeroSection';
import ProjectsSection from '../components/ProjectsSection';
import SkillsSection from '../components/SkillsSection';
import SoftSkillsSection from '../components/SoftSkillsSection';
import ContactSection from '../components/ContactSection';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <div className="bg-slate-900/50 backdrop-blur-lg">
        <ProjectsSection />
        <SkillsSection />
        <SoftSkillsSection />
      </div>
      <ContactSection />
    </>
  );
};

export default HomePage;
