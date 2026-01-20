import { ContactForm as UnifiedContactForm } from '../../forms/ContactForm';
import { NextLinePreposition } from '../../NextLinePreposition/NextLinePreposition';
import { ContractFormTemplate } from '../../shared/ContactFormTemplate/ContractFormTemplate';

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
      <UnifiedContactForm
        variant='dark'
        showDetails={true}
        showPrivacyCheckbox={false}
        title='Fill out the form and click the blue button to get in touch with you!'
        submitText='Blue button'
      />
    </ContractFormTemplate>
  );
};
