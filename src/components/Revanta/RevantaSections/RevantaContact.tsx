import { LeadForm } from '../../forms/LeadForm';
import { Reveal } from '../ui/Reveal';
import { RevantaContainer } from '../ui/layout';

/** Demo request block on a navy card; every hero CTA anchors here. */
export const RevantaContact = () => (
  <section
    id='contact'
    className='w-full scroll-mt-[100px] border-t border-revanta-ink/[0.08] bg-white'
  >
    <RevantaContainer className='py-[64px] tablet:py-[90px] desktop-light:py-[120px]'>
      <Reveal>
        <div
          className='relative w-full overflow-hidden rounded-[24px] shadow-[0_30px_80px_-50px_rgba(1,18,57,0.6)] desktop:mx-auto desktop:max-w-[1400px]'
          style={{
            background:
              'linear-gradient(160deg,#12296b 0%,#0c1f5a 55%,#081640 100%)',
          }}
        >
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-0'
            style={{
              background:
                'radial-gradient(45% 60% at 8% 30%, rgba(90,130,230,0.35), transparent 70%)',
            }}
          />
          <div className='relative px-[20px] py-[40px] mobile-big:px-[40px] tablet:px-[48px] tablet:py-[56px] desktop:px-[72px] desktop:py-[72px]'>
            <LeadForm
              title='Fill in the form and we will get back to you'
              subtitle='Leave your name and email, and we will contact you to discuss your club, academy or venue.'
            />
          </div>
        </div>
      </Reveal>
    </RevantaContainer>
  </section>
);
