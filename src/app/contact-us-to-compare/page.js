import LiveAgentConnect from '@/components/LiveAgentConnect';
import { SITE } from '@/lib/site';

export const metadata = {
  title: 'Contact Us to Compare',
  description: `Choose how to connect with ${SITE.brandFull} to compare internet and TV plans in your area — call ${SITE.phoneDisplay} or send us a message.`,
  alternates: { canonical: '/contact-us-to-compare' },
};

export default function ContactUsToComparePage() {
  return (
    <LiveAgentConnect
      headingLead="How Would You Like To Connect To Compare"
      headingAccent="Internet And TV Services?"
      callTitle="Speak With A Human Agent"
      callSub="Compare plans available at your address in one call"
      showFooter
    />
  );
}
