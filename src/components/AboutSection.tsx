import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const terminalLines = [
  { key: "user", value: "bayu_iboy" },
  { key: "school", value: "MAN 2 Indramayu" },
  { key: "location", value: "Indramayu, ID" },
  { key: "skills", value: "[html, css, js, react, python, hosting]" },
  { key: "status", value: "online_and_coding" },
];

function TerminalEmulator() {
  const [lines, setLines] = useState<Array<{ key: string; value: string; typed: string; done: boolean }>>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const init = terminalLines.map((l) => ({ ...l, typed: "", done: false }));
    setLines(init);

    let line = 0;
    let char = 0;

    const tick = setInterval(() => {
      if (line >= terminalLines.length) {
        clearInterval(tick);
        return;
      }

      const target = terminalLines[line];
      const full = `${target.key}: ${target.value}`;

      if (char < full.length) {
        char++;
        setLines((prev) =>
          prev.map((l, i) =>
            i === line ? { ...l, typed: full.slice(0, char), done: false } : l
          )
        );
      } else {
        setLines((prev) =>
          prev.map((l, i) => (i === line ? { ...l, done: true } : l))
        );
        line++;
        char = 0;
        setCurrentLine(line);
      }
    }, 45);

    return () => clearInterval(tick);
  }, [inView]);

  return (
    <div ref={ref} className="font-mono text-sm rounded-2xl overflow-hidden shadow-md-blue border border-primary/10">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-5 py-3.5 bg-navy">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
        <span className="ml-3 text-xs text-white/40 tracking-wider">bayu@iboy ~ terminal</span>
      </div>

      {/* Terminal body */}
      <div className="bg-navy/95 p-6 min-h-[220px]">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-primary font-semibold">$</span>
          <span className="text-white/70">whoami</span>
        </div>

        {lines.map((line, i) => (
          <div key={i} className="flex gap-2 mb-1.5 min-h-[1.5rem]">
            <span className="text-primary/60">{">"}</span>
            {line.typed ? (
              <>
                <span className="text-primary/80">{line.key}:</span>
                <span className="text-green-300">{line.value.startsWith("[") ? line.typed.slice(line.key.length + 2) : line.value === line.typed.slice(line.key.length + 2) ? line.value : line.typed.slice(line.key.length + 2)}</span>
                {i === currentLine && !line.done && (
                  <span className="terminal-cursor text-primary">█</span>
                )}
              </>
            ) : null}
          </div>
        ))}

        {currentLine >= terminalLines.length && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-primary font-semibold">$</span>
            <span className="terminal-cursor text-primary">█</span>
          </div>
        )}
      </div>
    </div>
  );
}

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="section-padding bg-background relative overflow-hidden">
      {/* Subtle bg grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container-max" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-primary tracking-[0.2em] uppercase">Get to know me</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-display font-bold text-navy">
            About <span className="text-gradient">Me</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="space-y-5 text-muted-foreground leading-relaxed text-lg">
              <p>
                Hey there! I'm{" "}
                <span className="text-primary font-semibold">Bayu</span>, better known online as{" "}
                <span className="text-navy font-semibold">Iboy</span> — a 17-year-old Grade 11 student
                proudly based in{" "}
                <span className="text-primary font-medium">Tanjakan Blok Panggang Jero, Indramayu</span>.
              </p>
              <p>
                My journey into tech started from pure curiosity — tinkering with websites, automating
                repetitive tasks, and learning how the digital world actually works. As a student at{" "}
                <span className="text-navy font-semibold">MAN 2 Indramayu</span>, I balance academics
                with building real projects and exploring new technologies.
              </p>
              <p>
                I'm passionate about{" "}
                <span className="text-primary font-medium">web development, Python automation</span>, and
                creating tools that solve everyday problems. My goal is to bring digital innovation
                to my community and beyond.
              </p>
            </div>

            {/* Quick facts */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                { label: "Age", value: "17 Years" },
                { label: "School", value: "MAN 2 Indramayu" },
                { label: "Class", value: "Grade 11" },
                { label: "City", value: "Indramayu, ID" },
              ].map((item) => (
                <div key={item.label} className="glass-card rounded-xl p-4">
                  <p className="font-mono text-xs text-muted-foreground mb-1">{item.label}</p>
                  <p className="font-semibold text-navy">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <TerminalEmulator />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
