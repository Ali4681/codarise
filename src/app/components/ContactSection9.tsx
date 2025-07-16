import {
  MessageCircle,
  Phone,
  Mail,
  MoveRight,
  X,
  Sparkles,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface Contact {
  name: string;
  phoneNumber: string;
  email: string;
}

const ContactPage = () => {
  const [activeModal, setActiveModal] = useState<
    "whatsapp" | "call" | "email" | null
  >(null);

  const contacts: Contact[] = [
    {
      name: "Contact Us",
      phoneNumber: "+963994919720",
      email: "codarise468@gmail.com",
    },
  ];

  const handleWhatsAppClick = (phoneNumber: string) => {
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, "")}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleCallClick = (phoneNumber: string) => {
    window.open(`tel:${phoneNumber}`, "_blank");
  };

  const handleEmailClick = (email: string) => {
    // Always use default mailto
    window.open(`mailto:${email}`, "_blank");
  };

  const ContactModal = ({ type }: { type: "whatsapp" | "call" | "email" }) => {
    const titles = {
      whatsapp: "WhatsApp Chat",
      call: "Phone Call",
      email: "Send Email",
    };

    const icons = {
      whatsapp: <MessageCircle className="w-5 h-5 text-green-400" />,
      call: <Phone className="w-5 h-5 text-purple-400" />,
      email: <Mail className="w-5 h-5 " />,
    };

    const colors = {
      whatsapp: "green",
      call: "purple",
      email: "orange",
    };

    return (
      <div
        id="contact"
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
      >
        <div className="bg-slate-800/20 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full border border-white/10 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <div
                className={`bg-gradient-to-br ${
                  type === "whatsapp"
                    ? "from-green-400 to-emerald-500"
                    : type === "call"
                    ? "from-purple-400 to-violet-500"
                    : "from-orange-400 to-red-500"
                } p-2 rounded-xl`}
              >
                {icons[type]}
              </div>
              <h3 className="text-2xl font-bold text-white">{titles[type]}</h3>
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-gray-300 mb-6 text-center">
            Ready to connect with us?
          </p>
          <div className="space-y-4">
            {contacts.map((contact, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden bg-white/5 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/10 cursor-pointer transition-all duration-300 border border-white/10 hover:border-${colors[type]}-400/50`}
                onClick={() => {
                  if (type === "whatsapp")
                    handleWhatsAppClick(contact.phoneNumber);
                  if (type === "call") handleCallClick(contact.phoneNumber);
                  if (type === "email") handleEmailClick(contact.email);
                  setActiveModal(null);
                }}
              >
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <p className="font-semibold text-white text-lg">
                      {contact.name}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      {type === "email" ? contact.email : contact.phoneNumber}
                    </p>
                  </div>
                  <div
                    className={`bg-gradient-to-br ${
                      type === "whatsapp"
                        ? "from-green-400/30 to-emerald-500/30"
                        : type === "call"
                        ? "from-purple-400/30 to-violet-500/30"
                        : "from-orange-400/30 to-red-500/30"
                    } p-3 rounded-full backdrop-blur-sm border border-white/20`}
                  >
                    {icons[type]}
                  </div>
                </div>
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${
                    type === "whatsapp"
                      ? "from-green-400/0 to-emerald-500/5"
                      : type === "call"
                      ? "from-purple-400/0 to-violet-500/5"
                      : "from-orange-400/0 to-red-500/5"
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const ContactCard = ({
    type,
    title,
    description,
  }: {
    type: "whatsapp" | "call" | "email";
    title: string;
    description: string;
  }) => {
    const icons = {
      whatsapp: <MessageCircle className="w-8 h-8" />,
      call: <Phone className="w-8 h-8" />,
      email: <Mail className="w-8 h-8" />,
    };

    const gradients = {
      whatsapp: "from-green-400 to-emerald-500",
      call: "from-purple-400 to-violet-500",
      email: "from-orange-400 to-red-500",
    };

    return (
      <div
        className="group relative overflow-hidden bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer h-full hover:scale-105"
        onClick={() => setActiveModal(type)}
      >
        {/* Animated background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradients[type]} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        ></div>

        {/* Floating particles effect */}
        <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
          <Sparkles className="w-6 h-6 text-white animate-pulse" />
        </div>

        <div className="relative z-10">
          <div className="flex items-start mb-6">
            <div
              className={`bg-gradient-to-br ${gradients[type]} p-4 rounded-2xl mr-6 shadow-lg`}
            >
              {icons[type]}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
              <p className="text-gray-300 text-base">{description}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div
              className={`flex items-center text-transparent bg-gradient-to-r ${gradients[type]} bg-clip-text font-semibold text-lg`}
            >
              <span>Get in touch</span>
              <MoveRight className="ml-3 w-5 h-5 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
            </div>

            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Glow effect */}
        <div
          className={`absolute -inset-1 bg-gradient-to-r ${gradients[type]} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}
        ></div>
      </div>
    );
  };

  return (
    <section
      id="contact"
      className="py-20 relative bg-slate-900/30 backdrop-blur-sm min-h-screen overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Modals */}
        {activeModal === "whatsapp" && <ContactModal type="whatsapp" />}
        {activeModal === "call" && <ContactModal type="call" />}
        {activeModal === "email" && <ContactModal type="email" />}

        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
            <Sparkles className="w-6 h-6 text-yellow-400 mr-2" />
            <span className="text-white font-medium">Get In Touch</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Contact Us
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Connect with our expert team through your preferred communication
            channel. We&rsquo;re here to help you achieve your goals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          <ContactCard
            type="whatsapp"
            title="WhatsApp Chat"
            description="Instant messaging for quick responses and real-time communication"
          />

          <ContactCard
            type="call"
            title="Phone Call"
            description="Direct voice communication for immediate assistance"
          />

          <ContactCard
            type="email"
            title="Email Us"
            description="Detailed correspondence for complex inquiries"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
