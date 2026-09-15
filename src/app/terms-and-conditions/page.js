import LegalArticle, { legalMetadata } from '@/components/LegalArticle';

const SLUG = 'terms-and-conditions';

export const metadata = legalMetadata(SLUG);

export default function TermsAndConditionsPage() {
  return <LegalArticle slug={SLUG} />;
}
