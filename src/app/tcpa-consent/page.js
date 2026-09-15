import LegalArticle, { legalMetadata } from '@/components/LegalArticle';

const SLUG = 'tcpa-consent';

export const metadata = legalMetadata(SLUG);

export default function TcpaConsentPage() {
  return <LegalArticle slug={SLUG} />;
}
