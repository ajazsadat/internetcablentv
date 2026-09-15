import LegalArticle, { legalMetadata } from '@/components/LegalArticle';

const SLUG = 'do-not-sell-my-info';

export const metadata = legalMetadata(SLUG);

export default function DoNotSellMyInfoPage() {
  return <LegalArticle slug={SLUG} />;
}
