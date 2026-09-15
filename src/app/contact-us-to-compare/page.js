import LiveAgentConnect from '@/components/LiveAgentConnect';
import { SITE } from '@/lib/site';

export const metadata = {
  title: 'Contact Us to Compare',
  description: `Call now and we'll walk you through your options with ${SITE.brandFull} — an independent comparison and referral service, not owned or controlled by any carrier.`,
  alternates: { canonical: '/contact-us-to-compare' },
};

export default function ContactUsToComparePage() {
  return <LiveAgentConnect disclosure={SITE.connectPageDisclosure} />;
}
