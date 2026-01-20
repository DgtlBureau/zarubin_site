import ValuesBody from '../../svg/TeamValuesBodySvg';
import { ValuesBodyTablet } from '../../svg/TeamValuesBodyTabletSvg';
import { ValueItemMobile } from './ValueItemMobile/ValueItemMobile';

const VALUES_ITEMS = [
  {
    title: 'Openness',
    description:
      'Got a question? Ask away. Facing challenges with a project? Let us know immediately. This principle is at the heart of our business processes: we value openness and transparency.',
  },
  {
    title: 'freedom',
    description:
      'Our ideal team member voices their opinions, shares ideas on projects, and looks for ways to improve work outcomes. We support freedom of choice, career goals, and new initiatives.',
  },
  {
    title: 'Growth',
    description:
      "We're constantly evolving and we appreciate the desire for professional growth in our team. We're focused on both professional and personal development. We take part in international projects and dive into interesting challenges.",
  },
  {
    title: 'Adaptation',
    description:
      "We're constantly evolving and we appreciate the desire for professional growth in our team. We're focused on both professional and personal development. We take part in international projects and dive into interesting challenges.",
  },
  {
    title: 'Always in touch',
    description: 'Our energized leadership is just a call away.',
  },
  {
    title: 'Care',
    description:
      "We care about what's happening on the project and with our clients. We always think about how to make the world around us better. At The BrightByte, we encourage initiative.",
  },
];
export const Values = () => {
  return (
    <div className='flex flex-col gap-[40px] tablet:gap-[98px]'>
      <h2 className='section-headings font-unbound font-bold uppercase leading-[1] tablet:leading-[1.3] desktop:leading-[1.1]'>
        values that help achieve results
      </h2>
      <div className='hidden h-auto desktop:block'>
        <ValuesBody />
      </div>
      <div className='hidden h-auto tablet:block desktop:hidden'>
        <ValuesBodyTablet />
      </div>
      <div className='flex h-auto flex-col gap-[40px] tablet:hidden desktop:hidden'>
        {VALUES_ITEMS.map((item, index) => (
          <ValueItemMobile
            key={index}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};
