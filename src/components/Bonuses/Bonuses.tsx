'use client';

import scholarshipImage from '@/public/assets/images/bonuses/scholarship.webp';
import { TrustUs } from '@/src/components/Main/TrustUs/TrustUs';
import { Section } from '@/src/components/shared/Section/Section';
import { BonusesDownloadBtn } from '@/src/ui-kit/BonusesDownloadBtn/BonusesDownloadBtn';
import { Modal } from '@/src/ui-kit/Modal/Modal';
import { Spinner } from '@/src/ui-kit/Spinner/Spinner';
import { IBonuse } from '@/src/utils/filesMetadata/getBonuseMetadata';
import { DateTime } from 'luxon';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BonusesForm } from '../Form/BonusesForm/BonusesForm';
import { Container } from '../shared/Container/Container';

interface IBonuseProps {
  data: IBonuse[];
}

export const Bonuses = ({ data }: IBonuseProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmailSended, setIsEmailSended] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const firstData = data[0];

  const date = DateTime.fromFormat(firstData.date, 'dd-MM-yyyy');
  const parsedData = date.toFormat('MMMM d');

  const handleSet = () => {
    const value = JSON.stringify(false);
    localStorage.setItem('isEmailSended', value);
    window.location.reload();
  };

  useEffect(() => {
    const isSeded = localStorage.getItem('isEmailSended');
    setIsEmailSended(isSeded ? JSON.parse(isSeded) : false);
    setIsLoading(false);
  }, []);

  return (
    <div className='relative'>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Section
            id='hero'
            className={`gradient-box-bonuse relative z-10 bg-[url(/assets/images/bonuses/banner.webp)] bg-cover bg-center bg-no-repeat py-0 tablet:py-0 desktop:py-0`}
          >
            <Container
              className={`mt-[100px] flex flex-col items-center gap-[40px] desktop:flex-row`}
            >
              <div className={`w-fit desktop:p-[87px_0]`}>
                <h1
                  className={`font-unbound text-[32px] font-bold uppercase leading-[1.1] desktop:text-[60px]`}
                >
                  {isEmailSended ? 'Your File is on its way!' : firstData.title}
                </h1>
                <p className='fon-regular mt-[20px] font-proxima text-[20px] leading-[1.2]'>
                  {isEmailSended
                    ? "We've just sent it to your inbox. If you don't see the email in a few minutes, check your spam or promotions folder."
                    : firstData.description}
                </p>
                <div className='mt-[40px] flex flex-col items-center gap-[12px] desktop:flex-row desktop:gap-[32px]'>
                  {isEmailSended ? (
                    <button
                      type='submit'
                      onClick={handleSet}
                      className='rounded-[5px] bg-gradient-to-r from-main-orange to-main-orange-hover p-[10px] text-[20px] font-bold leading-[1] text-text-dark desktop:p-[10px_41px]'
                    >
                      Go to main
                    </button>
                  ) : (
                    <>
                      <BonusesDownloadBtn
                        onClick={() => setIsModalOpen(!isModalOpen)}
                        title={firstData.btnInfo}
                        description={firstData.btnSubinfo}
                      />
                      <div className='font-regular flex items-center gap-[12px] font-proxima text-[16px]'>
                        <span className='block h-[12px] w-[12px] rounded-[100%] bg-orange-light' />
                        <span>Available until {parsedData}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className='flex w-[30%] flex-col items-start justify-center'>
                <Image
                  src={firstData.image}
                  width={530}
                  height={682}
                  alt='book'
                  quality={90}
                  className='h-auto w-full'
                />
              </div>
            </Container>
          </Section>
          {!isEmailSended && (
            <Section light className='p-0 tablet:p-0 desktop:p-0'>
              <div className='flex h-fit flex-col desktop:flex-row'>
                <Container className='flex flex-col gap-0 desktop:flex-row desktop:gap-[40px]'>
                  <div className='flex flex-col desktop:flex-row desktop:gap-[40px]'>
                    <div className='relative flex flex-col gap-[20px] p-[40px_0] desktop:p-[75px_0]'>
                      <h2 className='font-unbound text-[28px] font-bold uppercase leading-[1.14] text-main-bg desktop:text-[38px]'>
                        {firstData.secondSectionTitle}
                      </h2>
                      <p className='font-proxima text-[16px] leading-[1.25]'>
                        {firstData.secondSectionDescr}
                      </p>
                      <div className='flex flex-col items-center gap-[12px] desktop:flex-row desktop:gap-[32px]'>
                        <BonusesDownloadBtn
                          onClick={() => setIsModalOpen(true)}
                          title={firstData.btnInfo}
                          description={firstData.btnSubinfo}
                        />
                        <div className='font-regular flex items-center gap-[12px] font-proxima text-[16px]'>
                          <span className='block h-[12px] w-[12px] rounded-[100%] bg-orange-light' />
                          <span>Available until {parsedData}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='relative h-full overflow-hidden desktop:w-[500px]'>
                    <Image
                      src={scholarshipImage}
                      width={700}
                      height={550}
                      alt=''
                      quality={90}
                      className={`right-0 top-0 object-cover desktop:absolute desktop:h-full desktop:w-auto`}
                    />
                  </div>
                </Container>
              </div>
              <Container className='py-[40px]'>
                <TrustUs whiteBg />
              </Container>
            </Section>
          )}
          <Modal isModalOpen={isModalOpen}>
            <BonusesForm
              onClick={() => setIsModalOpen(false)}
              setIsEmailSended={(value) => setIsEmailSended(value)}
            />
          </Modal>
        </>
      )}
    </div>
  );
};
