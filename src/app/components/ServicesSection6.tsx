import { Code, Cog, Palette, Smartphone } from "lucide-react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description:
      "Modern, responsive websites built with cutting-edge technologies",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications that enchant users",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Beautiful, intuitive designs that create magical user experiences",
    color: "from-green-500 to-teal-500",
  },
  {
    icon: Cog,
    title: "Custom Solutions",
    description:
      "Tailored software solutions that perfectly fit your unique needs",
    color: "from-orange-500 to-red-500",
  },
];

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
  return (
    <section
      id="services"
      className="py-20 relative"
      aria-labelledby="services-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            id="services-title"
            className="inline-block pb-1 text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent leading-[1.2]"
          >
            Our Magical Services
          </h2>

          <p className="text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto">
            We offer a complete suite of digital services to help your business
            rise to new heights
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
                className="group bg-white/70 dark:bg-slate-800/60 backdrop-blur-lg rounded-3xl p-8 border border-slate-200/50 dark:border-transparent hover:border-purple-300/60 dark:hover:border-purple-500/60 transition-all duration-500 shadow-lg hover:shadow-purple-400/30 dark:hover:shadow-purple-600/50 cursor-pointer"
              >
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${color} flex items-center justify-center mb-6
                  transition-transform duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(147,51,234,0.7)]`}
                >
                  <Icon
                    className="text-white w-8 h-8"
                    aria-hidden="true"
                    focusable="false"
                  />
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
