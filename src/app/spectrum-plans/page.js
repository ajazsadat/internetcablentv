import ProviderPage from '@/components/ProviderPage';
import { getProviderContent } from '@/lib/providerContent';

const content = getProviderContent('spectrum-plans');

export const metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  alternates: { canonical: `/${content.slug}` },
};

export default function SpectrumPlansPage() {
  return <ProviderPage content={content} />;
}
