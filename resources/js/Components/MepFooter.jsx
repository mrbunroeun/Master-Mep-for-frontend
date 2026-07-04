import { Link } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTelegram,
  faWhatsapp,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export default function MepFooter() {
  return (
    <footer
      className="text-white"
      style={{
        background: "linear-gradient(to right, #0C2D4F, #1E5BA8)",
      }}
    >
      <div className="w-full max-w-[1680px] mx-auto px-8 lg:px-16 py-14 grid lg:grid-cols-[2.5fr_1fr_1fr_1fr] gap-16">

        {/* Company Info */}
        <div className="lg:pr-6">

          {/* Logo + Company Name */}
          <div className="flex items-center gap-6 mb-8">
            <img
              src="/logo.png"
              alt="Master MEP Solution"
              className="w-36 h-36 object-contain shrink-0"
            />

            <div>
              <h2 className="text-5xl font-bold tracking-[0.08em] leading-none">
                MASTER MEP
              </h2>

              <p className="mt-3 text-sm tracking-[0.8em] text-white/70 uppercase">
                SOLUTION
              </p>
            </div>
          </div>

          <h4 className="text-[22px] font-bold leading-tight max-w-[520px] mb-6">
            Professional MEP Engineering &
            Installation Company in Cambodia
          </h4>

          <p className="text-base text-white/85 leading-8 max-w-[560px] mb-10">
            Master MEP Solution Co., Ltd provides professional Mechanical,
            Electrical, Plumbing (MEP), HVAC, ELV, Fire Protection, and
            Maintenance Services for commercial buildings, villas, banks,
            restaurants, hospitals, and industrial projects across Cambodia.
          </p>

          <div className="flex gap-4">
            <a
              href="#"
              aria-label="Facebook"
              className="w-11 h-11 rounded-full bg-[#1877F2] flex items-center justify-center hover:scale-110 transition"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>

            <a
              href="#"
              aria-label="Telegram"
              className="w-11 h-11 rounded-full bg-[#229ED9] flex items-center justify-center hover:scale-110 transition"
            >
              <FontAwesomeIcon icon={faTelegram} />
            </a>

            <a
              href="#"
              aria-label="WhatsApp"
              className="w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center hover:scale-110 transition"
            >
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="w-11 h-11 rounded-full flex items-center justify-center hover:scale-110 transition"
              style={{
                background:
                  "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
              }}
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-bold mb-6 text-lg">Company</h3>

          <ul className="flex flex-col gap-4 text-base">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/services/mechanical">Services</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/maintenance">Maintenance</Link></li>
            <li><Link href="/insights/hvac-system-installation">Insights</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold mb-6 text-lg">Contact</h3>

          <div className="space-y-5 text-base">
            <div>
              <p className="font-bold mb-2">Head Office Address</p>
              <p>
                Borey Long Ny Chamkardoung,
                <br />
                #40, Street 01, Prakar Village,
                <br />
                Preysar Commune, Dangkor District, Phnom Penh
              </p>
            </div>
            <div className="flex flex-row gap-2">
              <p>GoogleMap:</p><p className="underline">https://maps.app.goo.gl/xF2SgUfAHaqupcco9?g_st=ic</p>
            </div>
            <div className="flex flex-row gap-2">
              <p>Email:</p><p className="underline">lensamoun68@gmail.com</p>
            </div>
            <div className="flex flex-row gap-2">
              <p>Facebook:</p><p className="underline">https://web.facebook.com/profile.php?id=61586431983798</p>
            </div>
            <div className="flex flex-row gap-2">
              <p> Phone Number:</p><p>017 55 22 38</p>
            </div>
            <div className="flex flex-row gap-2">
              <p> Telegram:</p><p className="underline">https://t.me/+85586656674</p>
            </div>
            <div className="flex flex-row gap-2">
              <img src="emailicon.svg" /><p className="underline">: lensamoun68@gmail.com</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <img src="logo.png" className="ml-[-8px] w-[40px] h-[30px]" alt="logo" />
              <p className="underline">: lensamoun68@gmail.com</p>
            </div>
            <div>
              <p className="font-bold mb-2">Business Hours</p>
              <p>
                Mon- Sat 8:00 AM - 5:00 PM

              </p>
            </div>
          </div>
        </div>

        {/* Map */}
        <div>
          <h3 className="font-bold mb-6 text-lg text-center">
            Find Us
          </h3>

          <div className="overflow-hidden rounded-xl border border-white/20 shadow-lg">
            <iframe
              title="Master MEP Solution Location"
              src="https://maps.google.com/maps?q=159A%20Street%202011%20Phnom%20Penh%20Cambodia&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="260"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-white text-[#1A3A5C] py-6">
        <div className="max-w-[1680px] mx-auto px-8 lg:px-16 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>MASTER MEP SOLUTIONS</p>
          <p>All rights reserved. 2026</p>
        </div>
      </div>
    </footer>
  );
}