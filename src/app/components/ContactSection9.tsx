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
import { useTheme } from "./ThemeProvider"; // Adjust import path as needed

interface Contact {
  name: string;
  phoneNumber: string;
  email: string;
}

const ContactPage = () => {
  const { isDarkMode } = useTheme();
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
      email: <Mail className="w-5 h-5" />,
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
        <div
          className={`backdrop-blur-xl rounded-3xl p-8 max-w-md w-full border shadow-2xl ${
            isDarkMode
              ? "bg-slate-800/20 border-white/10"
              : "bg-white/90 border-gray-300"
          }`}
        >
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
              <h3
                className={`text-2xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {titles[type]}
              </h3>
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className={`p-2 rounded-full transition-all ${
                isDarkMode
                  ? "text-gray-400 hover:text-white hover:bg-white/10"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-200"
              }`}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p
            className={`mb-6 text-center ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Ready to connect with us?
          </p>
          <div className="space-y-4">
            {contacts.map((contact, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden backdrop-blur-sm rounded-2xl p-4 cursor-pointer transition-all duration-300 border ${
                  isDarkMode
                    ? "bg-white/5 hover:bg-white/10 border-white/10"
                    : "bg-gray-100 hover:bg-gray-200 border-gray-200"
                } hover:border-${colors[type]}-400/50`}
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
                    <p
                      className={`font-semibold text-lg ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {contact.name}
                    </p>
                    <p
                      className={`text-sm mt-1 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
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
                    } p-3 rounded-full backdrop-blur-sm border ${
                      isDarkMode ? "border-white/20" : "border-gray-300"
                    }`}
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
        className={`group relative overflow-hidden backdrop-blur-xl rounded-3xl p-8 border shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer h-full hover:scale-105 ${
          isDarkMode
            ? "bg-white/5 border-white/10"
            : "bg-gray-50 border-gray-200"
        }`}
        onClick={() => setActiveModal(type)}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${
            gradients[type]
          } opacity-0 group-hover:opacity-${
            isDarkMode ? "20" : "10"
          } transition-opacity duration-500`}
        ></div>

        <div
          className={`absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300 ${
            isDarkMode ? "text-white" : "text-gray-600"
          }`}
        >
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>

        <div className="relative z-10">
          <div className="flex items-start mb-6">
            <div
              className={`bg-gradient-to-br ${gradients[type]} p-4 rounded-2xl mr-6 shadow-lg`}
            >
              {icons[type]}
            </div>
            <div>
              <h3
                className={`text-2xl font-bold mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {title}
              </h3>
              <p
                className={`text-base ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {description}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div
              className={`flex items-center text-transparent bg-gradient-to-r ${gradients[type]} bg-clip-text font-semibold text-lg`}
            >
              <span>Get in touch</span>
              <MoveRight
                className={`ml-3 w-5 h-5 group-hover:translate-x-1 transition-all duration-300 ${
                  isDarkMode
                    ? "text-white/70 group-hover:text-white"
                    : "text-gray-600 group-hover:text-gray-900"
                }`}
              />
            </div>

            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Zap
                className={`w-5 h-5 animate-pulse ${
                  isDarkMode ? "text-yellow-400" : "text-yellow-500"
                }`}
              />
            </div>
          </div>
        </div>

        <div
          className={`absolute -inset-1 bg-gradient-to-r ${
            gradients[type]
          } rounded-3xl opacity-0 group-hover:opacity-${
            isDarkMode ? "20" : "10"
          } blur-xl transition-opacity duration-500 -z-10`}
        ></div>
      </div>
    );
  };

  return (
    <section
      id="contact"
      className="py-20 relative min-h-screen overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeModal === "whatsapp" && <ContactModal type="whatsapp" />}
        {activeModal === "call" && <ContactModal type="call" />}
        {activeModal === "email" && <ContactModal type="email" />}

        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center justify-center p-2 backdrop-blur-sm rounded-full mb-6 ${
              isDarkMode ? "bg-white/10" : "bg-gray-200"
            }`}
          >
            <Sparkles
              className={`w-6 h-6 mr-2 ${
                isDarkMode ? "text-yellow-400" : "text-yellow-500"
              }`}
            />
            <span
              className={`font-medium ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Get In Touch
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black mb-6">
            <span
              className={`bg-gradient-to-r bg-clip-text text-transparent ${
                isDarkMode
                  ? "from-blue-400 via-purple-400 to-pink-400"
                  : "from-blue-500 via-purple-500 to-pink-500"
              }`}
            >
              Contact Us
            </span>
          </h2>

          <p
            className={`text-xl max-w-3xl mx-auto leading-relaxed ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
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
