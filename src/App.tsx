import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CrossScene from './components/sacred/CrossScene';
import Mission from './components/landing/Mission';
import Features from './components/landing/Features';
import ScholarsMarquee from './components/landing/ScholarsMarquee';
import Tiers from './components/landing/Tiers';
import BurningBushScene from './components/sacred/BurningBushScene';
import FormulaKey from './components/academy/FormulaKey';
import EmptyTombScene from './components/sacred/EmptyTombScene';
import DailyWord from './components/academy/DailyWord';
import PentecostScene from './components/sacred/PentecostScene';
import ApologistChat from './components/academy/ApologistChat';
import VideoAcademy from './components/academy/VideoAcademy';
import ScholarLibrary from './components/academy/ScholarLibrary';

export default function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen font-sans">
        <Navbar />
        
        <main className="flex-1">
          {/* Page 1: Landing & The Cross */}
          <CrossScene />
          
          {/* Mission & Features */}
          <Mission />
          <Features />
          <ScholarsMarquee />
          
          {/* Page 2: Burning Bush & The Academy Threshold */}
          <section id="burning-bush">
            <BurningBushScene />
          </section>
          
          {/* The Formula Key Deep Dive */}
          <section id="formula">
            <FormulaKey />
          </section>

          {/* New: Video Academy */}
          <VideoAcademy />
          
          {/* Page 3: Resurrection & The Empty Tomb */}
          <section id="empty-tomb">
            <EmptyTombScene />
          </section>

          {/* New: Scholar Library */}
          <ScholarLibrary />
          
          {/* Daily Word Feature */}
          <DailyWord />
          
          {/* Page 4: Holy Spirit & Pentecost */}
          <section id="pentecost">
            <PentecostScene />
          </section>
          
          {/* AI Chat Agent */}
          <ApologistChat />
          
          {/* Join/Pricing */}
          <Tiers />
        </main>
        
        <Footer />
      </div>
    </AuthProvider>
  );
}
