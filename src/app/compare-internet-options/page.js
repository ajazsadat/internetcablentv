import LiveAgentConnect from '@/components/LiveAgentConnect';
import { SITE } from '@/lib/site';

export const metadata = {
  title: 'Compare Internet Options',
  description: `Call now and we'll walk you through your options with ${SITE.brandFull} — an independent comparison and referral service, not owned or controlled by any carrier.`,
  alternates: { canonical: '/compare-internet-options' },
};

export default function CompareInternetOptionsPage() {
  return <LiveAgentConnect disclosure={SITE.comparePageDisclosure} />;
}
