import { motion } from "framer-motion";

const partners = [
  { 
    name: "Rahmat", 
    role: "Partner", 
    logo: "https://i.supaimg.com/68c888e6-6e70-4c6b-ad66-32c43f4309df/d385909d-6056-4882-8039-87509cec42f1.jpg" 
  },
  { 
    name: "iboyCloud", 
    role: "Partner", 
    logo: "https://i.supaimg.com/68c888e6-6e70-4c6b-ad66-32c43f4309df/0146604d-d602-4dcd-8355-3e8cf0f0996e.png" 
  },
  { 
    name: "Tenko Official", 
    role: "Partner", 
    logo: "https://i.supaimg.com/68c888e6-6e70-4c6b-ad66-32c43f4309df/f2df86e4-c61f-4315-98c7-78e31756e194.jpg" 
  }
];

const PartnersSection = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-slate-50/50 dark:bg-black/20">
      <div className="container-max relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-primary font-mono text-xs tracking-widest uppercase mb-2">Collaboration</h2>
            <h3 className="text-2xl md:text-4xl font-display font-bold text-navy mb-4">My Partners</h3>
            <div className="h-1 w-16 bg-primary mx-auto rounded-full mb-6" />
            <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
              Terima kasih kepada para partner hebat yang telah berkolaborasi dan mendukung perjalanan saya.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 justify-center">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -3 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-5 rounded-2xl flex flex-col items-center text-center border border-primary/10 hover:border-primary/40 transition-all shadow-sm hover:shadow-md"
            >
              {/* Ukuran div foto diperkecil menjadi w-16 h-16 untuk HP dan w-20 h-20 untuk desktop */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-inner flex items-center justify-center mb-4 overflow-hidden border-[3px] border-white dark:border-slate-800 transition-transform hover:scale-105">
                <img src={partner.logo} alt={partner.name} className="w-full h-full object-cover" />
              </div>
              <h4 className="text-base md:text-lg font-bold text-navy mb-1">{partner.name}</h4>
              <p className="text-primary font-mono text-[10px] md:text-xs font-medium uppercase tracking-tighter">{partner.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
