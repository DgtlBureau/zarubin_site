import { ContactForm } from '@/src/components/Main/ContactForm/ContactForm';
import { Products } from '@/src/components/NewProducts/Products/Products';
import { Container } from '@/src/components/shared/Container/Container';
import { Section } from '@/src/components/shared/Section/Section';
import { getProductsMetadata } from '@/src/utils/getProductsMetadata';
import { pageMetadata } from '@/src/utils/pageMetadata';
import { Seo } from '@/src/utils/Seo/Seo';

const products = getProductsMetadata();

const title = pageMetadata.investments.title;
const description = pageMetadata.investments.title;
const keywords = pageMetadata.investments.keywords;

export async function generateMetadata() {
  return Seo({
    title,
    description,
    keywords,
    ogUrlPath: 'investments',
  });
}

export default function NewProductsPage() {
  return (
    <div className='flex flex-col gap-[60px] bg-white'>
      <Section id='hero' light className='desktop:py-[60px]'>
        <Container>
          <Products products={products} />
        </Container>
      </Section>
      <Section
        id='contacts'
        className='py-[80px] tablet:py-[80px] desktop:py-[80px]'
        light
      >
        <Container>
          <ContactForm />
        </Container>
      </Section>
    </div>
  );
}
