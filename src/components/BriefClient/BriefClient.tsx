'use client';

import { sendBrief } from '@/src/utils/sendBrief';
import { sendTelegram } from '@/src/utils/sendTelegram';
import { useFormik } from 'formik';
import { useQuestion } from '../Contexts/QuestionContext';
import { initialData } from './briefData';
import { QuestionComponent } from './QuestionComponent/QuestionComponent';
import { StartedComponent } from './StartedComponent/StartedComponent';
import { ThanksComponent } from './ThanksComponent/ThanksComponent';

export const BriefClient = () => {
  const { page: pageInfo, handleSetPage, data } = useQuestion();

  const formik = useFormik({
    initialValues: data,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const {
        idea,
        objective,
        obstacle,
        budget,
        name,
        company_name,
        about_business,
        email,
      } = values;

      await sendBrief(
        idea,
        objective,
        obstacle,
        budget,
        name,
        company_name,
        about_business,
        email,
      );

      const telegramSuccess = await sendTelegram(
        `Name: ${name}\nEmail: ${email}\nCompany_name: ${company_name}\nIdea: ${idea}\nObjective: ${objective}\nObstacles: ${obstacle}\nBudget: ${budget}\nAbout_business: ${about_business}`
      );

      if (telegramSuccess) {
        handleSetPage(pageInfo + 1);
      } else {
        console.error('Error sending message to Telegram');
      }

      window.open(
        'https://cal.com/vitaliyzarubin/30-minutes-meeting',
        '_blank',
      );
    },
  });

  const handleBack = () => {
    if (pageInfo === 0) return;
    handleSetPage(pageInfo - 1);
  };

  const handleNext = () => {
    if (pageInfo === initialData.length) {
      formik.handleSubmit();
      return;
    }
    handleSetPage(pageInfo + 1);
  };

  return (
    <div className='mx-[auto] flex w-full max-w-[860px] flex-col items-center desktop:text-[28px] desktop:leading-[1.14]'>
      {pageInfo === 0 && <StartedComponent onClick={handleNext} />}
      {pageInfo !== -1 && pageInfo !== 0 && pageInfo <= initialData.length && (
        <div className='mb-[20px] flex font-unbound text-[24px] font-bold leading-[1.16] text-main-blue-hover'>
          <span>{pageInfo}</span>
          <span>{'/'}</span>
          <span>{initialData.length}</span>
        </div>
      )}
      {pageInfo !== -1 && pageInfo !== 0 && pageInfo <= initialData.length && (
        <QuestionComponent
          data={initialData[pageInfo - 1]}
          onClick={handleBack}
          nextClick={handleNext}
        />
      )}
      {pageInfo > initialData.length && <ThanksComponent />}
    </div>
  );
};
