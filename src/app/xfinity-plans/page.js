import ProviderPage from '@/components/ProviderPage';
import { getProviderContent } from '@/lib/providerContent';

const content = getProviderContent('xfinity-plans');

export const metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  alternates: { canonical: `/${content.slug}` },
};

export default function XfinityPlansPage() {
  return <ProviderPage content={content} />;
}
