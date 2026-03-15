import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import bayuPhoto from "@/assets/bayu-photo.png";

// 1. 3D Floating Shapes (Lengkap dengan Cone dan Box)
function FloatingShapes({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const group = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        mouse.current[0] * 0.3,
        0.05
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        mouse.current[1] * 0.2,
        0.05
      );
    }
  });

  const matteBlue = new THREE.MeshStandardMaterial({ color: new THREE.Color("#0EA5E9"), roughness: 0.7, metalness: 0.1 });
  const matteLightBlue = new THREE.MeshStandardMaterial({ color: new THREE.Color("#38BDF8"), roughness: 0.8, metalness: 0.05 });
  const matteDeep = new THREE.MeshStandardMaterial({ color: new THREE.Color("#0284C7"), roughness: 0.6, metalness: 0.15 });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh position={[-2.2, 0.8, -2]} material={matteBlue}>
          <torusGeometry args={[0.6, 0.18, 16, 60]} />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[2.4, 1.2, -1.5]} material={matteDeep}>
          <octahedronGeometry args={[0.45]} />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1.2}>
        <mesh position={[-1.6, -1.4, -1]} material={matteLightBlue}>
          <sphereGeometry args={[0.28, 32, 32]} />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={0.6}>
        <mesh position={[1.8, -1, -1.8]} material={matteBlue} rotation={[0.5, 0.5, 0]}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
        </mesh>
      </Float>
      <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.9}>
        <mesh position={[0.5, 2, -2.2]} material={matteLightBlue}>
          <coneGeometry args={[0.25, 0.6, 16]} />
        </mesh>
      </Float>
    </group>
  );
}

function ThreeScene({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ background: "transparent" }} dpr={[1, 2]}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#e0f7ff" />
      <directionalLight position={[-3, -2, 2]} intensity={0.4} color="#bae6fd" />
      <FloatingShapes mouse={mouse} />
    </Canvas>
  );
}

// 2. Typewriter Hook
function useTypewriter(texts: string[], speed = 60, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    const delay = isDeleting ? speed / 2 : charIdx === current.length ? pause : speed;
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIdx < current.length) {
          setDisplayed(current.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        } else { setIsDeleting(true); }
      } else {
        if (charIdx > 0) {
          setDisplayed(current.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        } else {
          setIsDeleting(false);
          setTextIdx((i) => (i + 1) % texts.length);
        }
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, textIdx, texts, speed, pause]);
  return displayed;
}

// 3. Orbiting Ring (Disesuaikan radiusnya agar pas dengan foto besar)
function OrbitingRing() {
  const text = "BAYU_IBOY · PYTHON · REACT · HTML5 · CSS3 · JS · MAN 2 INDRAMAYU · ";
  const r = 210; // Radius diperbesar untuk foto profil 320px
  
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg className="orbit-ring" viewBox="0 0 500 500" width="500" height="500" style={{ position: "absolute" }}>
        <defs>
          <path id="orbit-path" d={`M 250,250 m -${r},0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`} />
        </defs>
        <text fill="#0EA5E9" fontSize="11" fontFamily="Space Grotesk, sans-serif" fontWeight="600" letterSpacing="2.5" opacity="0.8">
          <textPath href="#orbit-path" startOffset="0%">{text}{text}</textPath>
        </text>
      </svg>
    </div>
  );
}

const HeroSection = () => {
  const mouse = useRef<[number, number]>([0, 0]);
  const typeText = useTypewriter(["Hi, I'm Bayu, known as 'Iboy'.", "Student Developer & Innovator.", "Crafting Digital Solutions."], 65, 2000);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = -(e.clientY / window.innerHeight - 0.5) * 2;
      mouse.current = [x, y];
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="container-max w-full section-padding pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary pulse-glow" />
              <span className="font-mono text-sm text-primary tracking-wider">Grade 11 · MAN 2 Indramayu</span>
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-navy mb-4">
              <span className="text-gradient">{typeText}</span><span className="terminal-cursor text-primary">|</span>
            </h1>
            <p className="text-xl text-muted-foreground font-light mb-8">Crafting Digital Innovations & <span className="text-primary font-medium">Automation.</span></p>
            <div className="flex flex-wrap gap-4">
              <a href="https://chat.whatsapp.com/Dfl4xKPiJoAH01YtWTlB97" target="_blank" className="btn-primary flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold">Join Community</a>
              <a href="#contact" className="btn-outline px-7 py-3.5 rounded-xl font-semibold">Contact Me</a>
            </div>
            {/* Scroll Indicator */}
            <div className="mt-16 flex items-center gap-3 text-muted-foreground">
              <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center pt-1.5">
                <div className="w-1.5 h-2.5 rounded-full bg-primary scroll-bounce" />
              </div>
              <span className="font-mono text-xs">Scroll to explore</span>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative flex items-center justify-center order-1 lg:order-2 h-[500px] md:h-[650px]">
            <div className="absolute inset-0 z-0"><ThreeScene mouse={mouse} /></div>
            <div className="absolute inset-0 z-10"><OrbitingRing /></div>
            <div className="relative z-20">
              {/* Ukuran Foto yang Diperbesar (320px) */}
              <div className="relative rounded-full overflow-hidden border-[8px] border-primary/10 shadow-2xl" style={{ width: 320, height: 320 }}>
                <img src={bayuPhoto} alt="Bayu" className="w-full h-full object-cover object-top" style={{ objectPosition: "center 10%" }} />
              </div>
              <div className="absolute inset-[-12px] rounded-full border-2 border-primary/40 pulse-glow pointer-events-none" />
            </div>
            {/* Badge Status & Location */}
            <motion.div className="absolute top-8 left-4 glass-card px-4 py-2 rounded-xl z-30" animate={{ y: [0, -8, 0] }} transition={{ duration: 3.5, repeat: Infinity }}>
              <p className="font-mono text-[10px] text-muted-foreground">Status</p>
              <p className="font-bold text-xs text-primary flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Online & Coding</p>
            </motion.div>
            <motion.div className="absolute bottom-12 right-4 glass-card px-4 py-2 rounded-xl z-30" animate={{ y: [0, 8, 0] }} transition={{ duration: 4, repeat: Infinity }}>
              <p className="font-mono text-[10px] text-muted-foreground">Location</p>
              <p className="font-bold text-xs text-navy">Indramayu, ID 🇮🇩</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

