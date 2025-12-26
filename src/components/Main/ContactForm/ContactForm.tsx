import { NextLinePreposition } from '../../NextLinePreposition/NextLinePreposition';
import { ContractFormTemplate } from '../../shared/ContactFormTemplate/ContractFormTemplate';
import { Form } from './Form/Form';

export const ContactForm = () => {
  return (
    <ContractFormTemplate
      title={
        <NextLinePreposition
          tag='h2'
          text=' We are always glad to have new partners and ambitious tasks.'
          className='section-headings font-unbound font-bold uppercase leading-[1.1] text-slate-900'
        />
      }
    >
      <Form />
    </ContractFormTemplate>
  );
};
