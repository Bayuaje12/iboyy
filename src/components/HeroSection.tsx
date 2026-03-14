import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import bayuPhoto from "@/assets/bayu-photo.png";

// 3D floating shapes
function FloatingShapes({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const group = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (group.current) {
      const t = clock.getElapsedTime();
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

  const matteBlue = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#0EA5E9"),
    roughness: 0.7,
    metalness: 0.1,
  });
  const matteLightBlue = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#38BDF8"),
    roughness: 0.8,
    metalness: 0.05,
  });
  const matteDeep = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#0284C7"),
    roughness: 0.6,
    metalness: 0.15,
  });

  return (
    <group ref={group}>
      {/* Back large torus */}
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh position={[-2.2, 0.8, -2]} material={matteBlue}>
          <torusGeometry args={[0.6, 0.18, 16, 60]} />
        </mesh>
      </Float>
      {/* Octahedron top-right */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[2.4, 1.2, -1.5]} material={matteDeep}>
          <octahedronGeometry args={[0.45]} />
        </mesh>
      </Float>
      {/* Small sphere */}
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1.2}>
        <mesh position={[-1.6, -1.4, -1]} material={matteLightBlue}>
          <sphereGeometry args={[0.28, 32, 32]} />
        </mesh>
      </Float>
      {/* Box */}
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={0.6}>
        <mesh position={[1.8, -1, -1.8]} material={matteBlue} rotation={[0.5, 0.5, 0]}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
        </mesh>
      </Float>
      {/* Cone */}
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
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#e0f7ff" />
      <directionalLight position={[-3, -2, 2]} intensity={0.4} color="#bae6fd" />
      <FloatingShapes mouse={mouse} />
    </Canvas>
  );
}

// Typewriter hook
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
        } else {
          setIsDeleting(true);
        }
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

// Orbiting Text Ring
function OrbitingRing() {
  const text = "BAYU_IBOY · PYTHON · REACT · HTML5 · CSS3 · JS · MAN 2 INDRAMAYU · ";
  const r = 155;
  const circumference = 2 * Math.PI * r;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg
        className="orbit-ring"
        viewBox="0 0 360 360"
        width="360"
        height="360"
        style={{ position: "absolute" }}
      >
        <defs>
          <path
            id="orbit-path"
            d={`M 180,180 m -${r},0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`}
          />
        </defs>
        <text
          fill="#0EA5E9"
          fontSize="11.5"
          fontFamily="Space Grotesk, sans-serif"
          fontWeight="600"
          letterSpacing="2.5"
          opacity="0.85"
        >
          <textPath href="#orbit-path" startOffset="0%">
            {text}{text}
          </textPath>
        </text>
      </svg>
    </div>
  );
}

const HeroSection = () => {
  const mouse = useRef<[number, number]>([0, 0]);
  const typeText = useTypewriter(
    ["Hi, I'm Bayu, known as 'Iboy'.", "Student Developer & Innovator.", "Crafting Digital Solutions."],
    65,
    2000
  );

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
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Background decorative blobs */}
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none">
        <div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, hsl(199 89% 48%), transparent)" }}
        />
      </div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(199 89% 48%), transparent)" }} />

      <div className="container-max w-full section-padding py-0 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen">
          {/* Left Column */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary pulse-glow" />
              <span className="font-mono text-sm text-primary tracking-wider">Grade 11 · MAN 2 Indramayu</span>
            </motion.div>

            {/* Typewriter heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.1] text-navy">
                <span className="text-gradient">{typeText}</span>
                <span className="terminal-cursor text-primary">|</span>
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-xl md:text-2xl text-muted-foreground font-light mb-8 leading-relaxed"
            >
              Crafting Digital Innovations &amp;{" "}
              <span className="text-primary font-medium">Automation.</span>
            </motion.p>

            {/* Info pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              {["React", "Python", "HTML5", "CSS3", "JavaScript"].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-1.5 rounded-full font-mono text-xs font-medium border border-primary/20 text-primary bg-primary/5"
                >
                  {skill}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="https://chat.whatsapp.com/Dfl4xKPiJoAH01YtWTlB97"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                Join Community
              </a>
              <a
                href="#contact"
                className="btn-outline flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm"
              >
                Contact Me
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-16 flex items-center gap-3 text-muted-foreground"
            >
              <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center pt-1.5">
                <div className="w-1.5 h-2.5 rounded-full bg-primary scroll-bounce" />
              </div>
              <span className="font-mono text-xs tracking-wider">Scroll to explore</span>
            </motion.div>
          </div>

          {/* Right Column — 3D Visual Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative flex items-center justify-center order-1 lg:order-2 h-[480px] md:h-[560px] lg:h-[620px]"
          >
            {/* Three.js canvas background layer */}
            <div className="absolute inset-0 z-0 rounded-3xl overflow-hidden">
              <ThreeScene mouse={mouse} />
            </div>

            {/* Orbiting text ring layer */}
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <OrbitingRing />
            </div>

            {/* Photo layer — center focal */}
            <div className="relative z-20 flex items-center justify-center">
              <div
                className="relative rounded-full overflow-hidden"
                style={{
                  width: 220,
                  height: 220,
                  boxShadow: "0 0 0 6px hsl(199 89% 48% / 0.2), 0 0 0 12px hsl(199 89% 48% / 0.08), var(--shadow-lg)",
                }}
              >
                <img
                  src={bayuPhoto}
                  alt="Bayu (Iboy)"
                  className="w-full h-full object-cover object-top"
                  style={{ objectPosition: "center 10%" }}
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
              </div>
              {/* Pulsing glow ring around photo */}
              <div
                className="absolute rounded-full pointer-events-none pulse-glow"
                style={{
                  width: 240,
                  height: 240,
                  border: "2px solid hsl(199 89% 48% / 0.4)",
                }}
              />
            </div>

            {/* Floating badge cards */}
            <motion.div
              className="absolute top-8 left-4 glass-card px-4 py-2.5 rounded-xl z-30"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="font-mono text-xs text-muted-foreground">Status</p>
              <p className="font-semibold text-sm text-primary flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 pulse-glow" />
                Online & Coding
              </p>
            </motion.div>

            <motion.div
              className="absolute bottom-8 right-4 glass-card px-4 py-2.5 rounded-xl z-30"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <p className="font-mono text-xs text-muted-foreground">Location</p>
              <p className="font-semibold text-sm text-navy">Indramayu, ID 🇮🇩</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
