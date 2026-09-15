import LegalArticle, { legalMetadata } from '@/components/LegalArticle';

const SLUG = 'privacy-policy';

export const metadata = legalMetadata(SLUG);

export default function PrivacyPolicyPage() {
  return <LegalArticle slug={SLUG} />;
}
