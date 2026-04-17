import { ContactForm as UnifiedContactForm } from '../../forms/ContactForm';
import { NextLinePreposition } from '../../NextLinePreposition/NextLinePreposition';
import { ContractFormTemplate } from '../../shared/ContactFormTemplate/ContractFormTemplate';

export const ContactForm = () => {
  return (
    <ContractFormTemplate
      title={
        <NextLinePreposition
          tag='h2'
          text=' Tell us what you are building.'
          className='section-headings font-unbound font-bold uppercase leading-[1.1] text-slate-900'
        />
      }
    >
      <UnifiedContactForm
        variant='dark'
        showDetails={true}
        showPrivacyCheckbox={false}
        title='Describe your project. We will tell you if we can help.'
        submitText='Send message'
      />
    </ContractFormTemplate>
  );
};
