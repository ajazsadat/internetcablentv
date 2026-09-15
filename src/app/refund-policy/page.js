import LegalArticle, { legalMetadata } from '@/components/LegalArticle';

const SLUG = 'refund-policy';

export const metadata = legalMetadata(SLUG);

export default function RefundPolicyPage() {
  return <LegalArticle slug={SLUG} />;
}
