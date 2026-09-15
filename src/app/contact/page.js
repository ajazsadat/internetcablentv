import ContactForm from '@/components/ContactForm';
import Reveal from '@/components/Reveal';
import { SITE, getHousePhone } from '@/lib/site';

export const metadata = {
  title: 'Contact',
  description: `Contact ${SITE.brandFull} to compare internet, TV, and bundle plans available at your address. Call ${SITE.phoneDisplay} or request a free quote.`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  const phone = getHousePhone();

  return (
    <main id="main">
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Contact</p>
          <h1>Are you looking for new internet services?</h1>
          <p>
            Explore plans, pricing, and exclusive offers in your area with a specialist — or get
            help with an existing account question.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap contact-grid">
          <div className="contact-cards">
            <Reveal as="article" className="contact-card">
              <p className="eyebrow">New service</p>
              <h2>Speak with an expert</h2>
              <p>
                Check availability, compare fiber and other options, and get a free no-obligation
                quote for your address.
              </p>
              <a className="btn btn-primary" href={`tel:${phone.tel}`}>
                Call {phone.display}
              </a>
            </Reveal>

            <Reveal as="article" className="contact-card" delay={80}>
              <p className="eyebrow">Existing account</p>
              <h2>Need support?</h2>
              <p>
                After activation, billing and technical support are handled by your provider. We can
                still help with general questions or connect you to the right support path.
              </p>
              <a className="btn btn-secondary" href={`tel:${phone.tel}`}>
                Call Now
              </a>
            </Reveal>

            <Reveal as="article" className="contact-details" delay={160}>
              <h3>Organization details</h3>
              <ul>
                <li>
                  <strong>Company:</strong> {SITE.legalName}
                </li>
                <li>
                  <strong>Phone:</strong> <a href={`tel:${phone.tel}`}>{phone.display}</a>
                </li>
                <li>
                  <strong>Email:</strong> <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </li>
                <li>
                  <strong>Address:</strong> {SITE.addressOneLine}
                </li>
              </ul>
            </Reveal>
          </div>

          <div>
            <div className="contact-form-intro">
              <h2>Request a free quote</h2>
              <p>Share a few details and we&apos;ll follow up with options available near you.</p>
            </div>

            <ContactForm idPrefix="contact" source="contact-page" />
          </div>
        </div>
      </section>
    </main>
  );
}
