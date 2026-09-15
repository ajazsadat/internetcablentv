import LegalArticle, { legalMetadata } from '@/components/LegalArticle';

const SLUG = 'disclaimer';

export const metadata = legalMetadata(SLUG);

export default function DisclaimerPage() {
  return <LegalArticle slug={SLUG} />;
}
