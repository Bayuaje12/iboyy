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
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh position={[-2.5, 1.2, -2]} material={matteBlue}>
          <torusGeometry args={[0.6, 0.18, 16, 60]} />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[2.8, 1.5, -1.5]} material={matteDeep}>
          <octahedronGeometry args={[0.45]} />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1.2}>
        <mesh position={[-2, -1.8, -1]} material={matteLightBlue}>
          <sphereGeometry args={[0.28, 32, 32]} />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={0.6}>
        <mesh position={[2.2, -1.2, -1.8]} material={matteBlue} rotation={[0.5, 0.5, 0]}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
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

function OrbitingRing() {
  const text = "BAYU_IBOY · PYTHON · REACT · HTML5 · CSS3 · JS · MAN 2 INDRAMAYU · ";
  const r = 190; 
  
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg
        className="orbit-ring"
        viewBox="0 0 440 440"
        width="440"
        height="440"
        style={{ position: "absolute" }}
      >
        <defs>
          <path
            id="orbit-path"
            d={`M 220,220 m -${r},0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`}
          />
        </defs>
        <text
          fill="#0EA5E9"
          fontSize="12"
          fontFamily="Space Grotesk, sans-serif"
          fontWeight="600"
          letterSpacing="3"
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
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary pulse-glow" />
              <span className="font-mono text-sm text-primary tracking-wider">Grade 11 · MAN 2 Indramayu</span>
            </motion.div>

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

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-xl md:text-2xl text-muted-foreground font-light mb-8 leading-relaxed"
            >
              Crafting Digital Innovations &amp;{" "}
              <span className="text-primary font-medium">Automation.</span>
            </motion.p>

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
                Join Community
              </a>
              <a
                href="#contact"
                className="btn-outline flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm"
              >
                Contact Me
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative flex items-center justify-center order-1 lg:order-2 h-[500px] md:h-[600px] lg:h-[700px]"
          >
            <div className="absolute inset-0 z-0 rounded-3xl overflow-hidden">
              <ThreeScene mouse={mouse} />
            </div>

            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <OrbitingRing />
            </div>

            <div className="relative z-20 flex items-center justify-center">
              <div
                className="relative rounded-full overflow-hidden transition-all duration-500 hover:scale-105"
                style={{
                  width: 280, 
                  height: 280,
                  boxShadow: "0 0 0 8px hsl(199 89% 48% / 0.15), 0 0 0 16px hsl(199 89% 48% / 0.05), var(--shadow-2xl)",
                }}
              >
                <img
                  src={bayuPhoto}
                  alt="Bayu (Iboy)"
                  className="w-full h-full object-cover object-top"
                  style={{ objectPosition: "center 10%" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
              
              <div
                className="absolute rounded-full pointer-events-none pulse-glow"
                style={{
                  width: 310, 
                  height: 310,
                  border: "2px solid hsl(199 89% 48% / 0.3)",
                }}
              />
            </div>

            <motion.div
              className="absolute top-12 left-0 glass-card px-4 py-2.5 rounded-xl z-30"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="font-mono text-xs text-muted-foreground">Status</p>
              <p className="font-semibold text-sm text-primary flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 pulse-glow" />
                Online & Coding
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
