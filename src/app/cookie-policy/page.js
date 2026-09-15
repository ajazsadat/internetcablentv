import LegalArticle, { legalMetadata } from '@/components/LegalArticle';

const SLUG = 'cookie-policy';

export const metadata = legalMetadata(SLUG);

export default function CookiePolicyPage() {
  return <LegalArticle slug={SLUG} />;
}
