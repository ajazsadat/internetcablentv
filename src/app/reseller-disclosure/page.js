import LegalArticle, { legalMetadata } from '@/components/LegalArticle';

const SLUG = 'reseller-disclosure';

export const metadata = legalMetadata(SLUG);

export default function ResellerDisclosurePage() {
  return <LegalArticle slug={SLUG} />;
}
