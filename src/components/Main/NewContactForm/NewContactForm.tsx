import { ContactForm } from '../../forms/ContactForm';
import { Container } from '../../shared/Container/Container';

export const NewContactForm = () => {
  return (
    <div className='video-container'>
      <video
        autoPlay
        muted
        loop
        className='absolute left-0 top-0 h-full w-full object-cover'
      >
        <source src='/assets/video/bg-video.mp4' type='video/mp4' />
        <source src='/assets/video/bg-video.webm' type='video/webm' />
      </video>
      <div className='relative z-20 box-border w-full'>
        <Container className='w-full py-[70px] tablet:px-[40px] tablet:py-[80px] desktop-light:py-[100px]'>
          <ContactForm
            variant='glass'
            showDetails={true}
            showPrivacyCheckbox={true}
            title='Tell us what your AI needs to do.'
            subtitle='Describe the problem. We will tell you if we can solve it and how fast.'
            submitText='Schedule a Free Consultation'
          />
        </Container>
      </div>
    </div>
  );
};
