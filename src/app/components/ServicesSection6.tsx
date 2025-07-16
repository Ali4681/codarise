import { Code, Cog, Palette, Smartphone } from "lucide-react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const ServicesSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const services = [
    {
      icon: Code,
      title: t("servicess.webDev.title"),
      description: t("servicess.webDev.description"),
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Smartphone,
      title: t("servicess.mobileApps.title"),
      description: t("servicess.mobileApps.description"),
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Palette,
      title: t("servicess.uiUx.title"),
      description: t("servicess.uiUx.description"),
      color: "from-green-500 to-teal-500",
    },
    {
      icon: Cog,
      title: t("servicess.customSolutions.title"),
      description: t("servicess.customSolutions.description"),
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section
      id="services"
      className="py-20 relative"
      aria-labelledby="servicess-title"
      dir={isRTL ? "rtl" : "ltr"} // for native RTL support
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            id="servicess-title"
            className="inline-block pb-1 text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent leading-[1.2]"
          >
            {t("servicess.title")}
          </h2>
          <p className="text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("servicess.subtitle")}
          </p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {services.map(({ icon: Icon, title, description, color }, idx) => (
            <motion.div key={idx} variants={cardVariants}>
              <Tilt
                glareEnable={true}
                glareMaxOpacity={0.15}
                glareColor="#9f7aea"
                glarePosition="bottom"
                scale={1.05}
                transitionSpeed={400}
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                className={`group bg-white/70 dark:bg-slate-800/60 backdrop-blur-lg rounded-3xl p-8 border border-slate-200/50 dark:border-transparent hover:border-purple-300/60 dark:hover:border-purple-500/60 transition-all duration-500 shadow-lg hover:shadow-purple-400/30 dark:hover:shadow-purple-600/50 cursor-pointer ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${color} flex items-center justify-center mb-6
                    transition-transform duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(147,51,234,0.7)]`}
                >
                  <Icon className="text-white w-8 h-8" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-800 dark:text-white mb-3 select-none">
                  {title}
                </h3>
                <p className="text-slate-600 dark:text-gray-300 leading-relaxed">
                  {description}
                </p>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
