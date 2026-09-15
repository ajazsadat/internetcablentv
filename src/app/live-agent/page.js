import LiveAgentConnect from '@/components/LiveAgentConnect';
import { SITE } from '@/lib/site';

export const metadata = {
  title: 'Live Agent',
  description: `Speak with a live agent from ${SITE.brandFull} for internet service help.`,
  alternates: { canonical: '/live-agent' },
};

export default function LiveAgentPage() {
  return (
    <LiveAgentConnect
      headingLead="How Would You Like To Connect For Internet"
      headingAccent="Services And Assistance?"
      callTitle="Phone Call"
      callSub="To Speak With A Live Agent"
    />
  );
}
