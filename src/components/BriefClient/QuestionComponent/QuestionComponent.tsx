'use client';

import { validate } from '@/src/utils/validate/validate';
import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { CalendarClient } from '../../CalendarClient/CalendarClient';
import { useQuestion } from '../../Contexts/QuestionContext';
import {
    generateNewInitialValue,
    IInitialValue,
    initialData
} from '../briefData';
import { TestNextBackButton } from '../NextBackButton/TestNextBackButton';

interface IAnotherProps {
  data: IInitialValue;
  onChange?: (idx: string, value: string) => void;
  onClick: () => void;
  nextClick: () => void;
}

export const QuestionComponent = ({
  data,
  onClick,
  nextClick,
}: IAnotherProps) => {
  const initialValues = generateNewInitialValue(data);
  const {
    data: contextValue,
    handleChangeData,
    page: pageInfo,
  } = useQuestion();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const length = initialData.length;

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: () => {
      nextClick();
    },
    enableReinitialize: true,
  });

  const handleChange = (id: string, value: string) => {
    handleTextAreaResize();
    formik.setFieldValue(id, value);
    formik.setFieldTouched(id, true);
    handleChangeData(id, value);
  };

  const handleTextAreaResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    return;
  };

  useEffect(() => {
    if (!textareaRef.current) return;
    handleTextAreaResize();
  }, [data]);

  return (
    <div className='w-full'>
      <form onSubmit={formik.handleSubmit} className='flex w-full flex-col'>
        <h2 className='mb-[40px] text-center font-unbound text-[22px] font-bold uppercase leading-[1.1] tablet:text-[28px]'>
          {data.question}
        </h2>
        <div className='flex w-full flex-col gap-[20px]'>
          {data.data.map((item, idx) => (
            <React.Fragment key={idx}>
              {item.label && (
                <label
                  form={item.id}
                  className='font-inter text-[26px] text-text-dark/50'
                >
                  {item.label}
                  {item.required && item.label ? (
                    <span className='text-main-blue-hover'>*</span>
                  ) : null}
                </label>
              )}
              {item.type === 'input' ? (
                <div>
                  <input
                    type={data.type ? data.type : 'input'}
                    placeholder={`${item.placeholder}${item.required && !item.label ? '*' : ''}`}
                    id={item.id}
                    name={item.id}
                    value={contextValue[item.id]}
                    onChange={(e) => {
                      handleChange(item.id, e.target.value);
                    }}
                    className='w-full border-b-[1px] border-main-blue-hover pb-[8px] font-inter text-[26px] outline-none'
                  />
                  {formik.errors[item.id] && formik.touched[item.id] && (
                    <span className='mt-[8px] block text-[12px] text-main-blue'>
                      {formik.errors[item.id]}
                    </span>
                  )}
                </div>
              ) : item.type === 'textarea' ? (
                <div>
                  <textarea
                    ref={textareaRef}
                    rows={1}
                    id={item.id}
                    name={item.id}
                    value={contextValue[item.id]}
                    onBlur={formik.handleBlur}
                    onChange={(e) => {
                      handleChange(item.id, e.target.value);
                    }}
                    className='h-[auto] w-full resize-none overflow-hidden border-b-[1px] border-main-blue-hover pb-[8px] font-inter text-[26px] outline-none'
                  />
                  {formik.errors[item.id] && formik.touched[item.id] && (
                    <span className='mt-[8px] block font-inter text-[12px] text-main-blue'>
                      {formik.errors[item.id]}
                    </span>
                  )}
                </div>
              ) : item.type === 'date' ? (
                <CalendarClient />
              ) : (
                <input
                  type='button'
                  id={item.id}
                  name={item.id}
                  value={item.answer}
                  onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                    const target = e.target as HTMLInputElement;
                    handleChange(item.id, target.value);
                  }}
                  className={`${item.answer === contextValue[item.id] ? 'border-[2px] border-main-blue' : 'border-main-blue/20'} block w-full cursor-pointer rounded-[6px] border-[1px] py-[13px] font-inter text-[20px] leading-[1.2] text-text-dark hover:border-main-blue-hover`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        <TestNextBackButton
          onClick={onClick}
          pageInfo={pageInfo}
          length={length}
        />
      </form>
    </div>
  );
};
