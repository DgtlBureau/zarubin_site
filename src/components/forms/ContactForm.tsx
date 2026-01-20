'use client';

import { cn } from '@/src/lib/utils';
import { sendEmail } from '@/src/utils/sendEmail';
import { InputMask } from '@react-input/mask';
import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const TELEGRAM_BOT_TOKEN = '6992822983:AAHWVJuwqeVl5kscHuZwcPx5W-IPXJ7mpkk';
const TELEGRAM_CHAT_ID = '199942509';

const formWrapperVariants = cva('w-full scroll-mt-[100px]', {
  variants: {
    variant: {
      glass:
        'rounded-[12px] bg-gradient-to-br from-[#1e40af] to-[#6366f1] px-[20px] py-[24px] mobile-big:px-[30px] mobile-big:py-[30px] laptop-big:max-w-[1009px]',
      dark: 'rounded-[5px] bg-[--second-blue] px-[20px] py-[40px] mobile-big:px-[40px] mobile-big:py-[40px]',
      default:
        'rounded-[12px] bg-[--second-blue] px-[20px] py-[40px] mobile-big:px-[40px] mobile-big:py-[40px]',
    },
  },
  defaultVariants: {
    variant: 'glass',
  },
});

export interface ContactFormProps extends VariantProps<typeof formWrapperVariants> {
  showCV?: boolean;
  showDetails?: boolean;
  showPrivacyCheckbox?: boolean;
  title?: string;
  subtitle?: string;
  submitText?: string;
  successMessage?: string;
  className?: string;
  onSuccess?: () => void;
}

interface FormValues {
  name: string;
  email: string;
  phone: string;
  details: string;
  cv: File | null;
}

export const ContactForm = ({
  variant = 'glass',
  showCV = false,
  showDetails = true,
  showPrivacyCheckbox = true,
  title = 'Build Your Next Project with Expert Guidance',
  subtitle = 'Our team helps ambitious companies implement scalable software solutions that drive business growth',
  submitText = 'Schedule a Free Consultation',
  successMessage = 'Thank you! We will contact you soon',
  className,
  onSuccess,
}: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecked, setIsChecked] = useState(!showPrivacyCheckbox);
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    phone: '',
    details: '',
    cv: null,
  });

  const inputVariant = variant === 'glass' ? 'glass' : 'underline';
  const textareaVariant = variant === 'glass' ? 'glass' : 'underline';
  const inputSize = variant === 'glass' ? 'default' : 'lg';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setValues((prev) => ({ ...prev, cv: acceptedFiles[0] }));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  const resetForm = () => {
    setValues({
      name: '',
      email: '',
      phone: '',
      details: '',
      cv: null,
    });
    if (showPrivacyCheckbox) {
      setIsChecked(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendEmail(
        values.name,
        values.email,
        values.phone,
        values.details,
        values.cv || undefined
      );

      // Send to Telegram
      if (showCV && values.cv) {
        const telegramFormData = new FormData();
        telegramFormData.append('chat_id', TELEGRAM_CHAT_ID);
        telegramFormData.append(
          'caption',
          `Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}`
        );
        telegramFormData.append('document', values.cv, values.cv.name);

        const telegramResponse = await fetch(
          `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`,
          {
            method: 'POST',
            body: telegramFormData,
          }
        ).then((r) => r.json());

        if (telegramResponse.ok) {
          resetForm();
          alert(successMessage);
          onSuccess?.();
        } else {
          console.error('Error sending document to Telegram:', telegramResponse);
        }
      } else {
        const telegramResponse = await fetch(
          `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: TELEGRAM_CHAT_ID,
              text: `Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}${values.details ? `\nDetails: ${values.details}` : ''}`,
            }),
          }
        ).then((r) => r.json());

        if (telegramResponse.ok) {
          resetForm();
          alert(successMessage);
          onSuccess?.();
        } else {
          console.error('Error sending message to Telegram:', telegramResponse);
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled = showPrivacyCheckbox ? !isChecked || isSubmitting : isSubmitting;

  return (
    <div
      id="contact-form"
      className={cn(formWrapperVariants({ variant }), className)}
    >
      {/* Header */}
      <h3
        className={cn(
          'font-proxima font-bold leading-[1.25]',
          variant === 'glass'
            ? 'text-center text-[22px] text-white tablet:text-[26px] tablet:leading-[1.15]'
            : 'text-[22px] text-white mobile-big:text-[32px] mobile-big:leading-[37px]'
        )}
      >
        {title}
      </h3>

      {subtitle && variant === 'glass' && (
        <p className="mt-[12px] text-center font-proxima text-[14px] font-normal leading-[1.4] text-white/80 tablet:text-[16px]">
          {subtitle}
        </p>
      )}

      {/* Form */}
      <form
        className={cn(
          'flex flex-col overflow-hidden',
          variant === 'glass'
            ? 'mt-[20px] gap-[12px] tablet:mt-[24px] tablet:gap-[16px] desktop:mt-[20px] desktop:gap-[14px]'
            : 'mt-[49px] gap-[45px]'
        )}
        onSubmit={handleSubmit}
      >
        {/* Name */}
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          variant={inputVariant}
          inputSize={inputSize}
          required
        />

        {/* Email */}
        <Input
          type="email"
          name="email"
          placeholder="E-mail"
          value={values.email}
          onChange={handleChange}
          variant={inputVariant}
          inputSize={inputSize}
          required
        />

        {/* Phone */}
        <InputMask
          type="tel"
          name="phone"
          mask="____________________"
          replacement={{ _: /[0-9]/ }}
          value={values.phone}
          placeholder="Phone"
          onChange={handleChange}
          required
          className={cn(
            'flex w-full font-proxima outline-none transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50',
            inputVariant === 'glass'
              ? 'rounded-[6px] border border-white/30 bg-white/10 p-[8px_16px] text-[14px] leading-[1.8] text-white placeholder:text-white/60 focus:border-white/60 focus:bg-white/20'
              : 'border-b border-blue-600 bg-transparent pb-2 text-base text-white placeholder:text-gray-500/50 focus:bg-blue-950 mobile-big:text-2xl'
          )}
        />

        {/* Project details */}
        {showDetails && (
          <Textarea
            name="details"
            placeholder={variant === 'glass' ? 'Tell us about your project' : 'Project details'}
            value={values.details}
            onChange={handleChange}
            variant={textareaVariant}
            textareaSize={inputSize}
            rows={variant === 'glass' ? 1 : undefined}
            required={variant !== 'glass'}
          />
        )}

        {/* CV Dropzone */}
        {showCV && (
          <div
            className={cn(
              'rounded-[5px] border border-dashed px-[20px] py-[40px]',
              isDragActive ? 'border-white' : 'border-main-blue-hover'
            )}
            {...getRootProps()}
          >
            <div className="flex items-center justify-between">
              <span
                className={cn(
                  'font-proxima text-base mobile-big:text-2xl',
                  values.cv?.name ? 'text-white' : 'text-gray-500 opacity-50'
                )}
              >
                {values.cv?.name || 'Drop your CV'}
              </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white/60"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <input {...getInputProps()} />
          </div>
        )}

        {/* Privacy checkbox */}
        {showPrivacyCheckbox && (
          <label className="flex w-fit items-center gap-[8px] font-proxima text-[14px] font-normal text-white/90">
            <Checkbox
              checked={isChecked}
              onCheckedChange={setIsChecked}
              variant={variant === 'glass' ? 'glass' : 'default'}
            />
            I agree with{' '}
            <Link
              href="/policy"
              className="text-white underline hover:text-white/80"
              target="_blank"
            >
              the privacy policy
            </Link>
          </label>
        )}

        {/* Submit button */}
        <Button
          type="submit"
          variant={variant === 'glass' ? 'glass' : 'default'}
          size={variant === 'glass' ? 'lg' : 'default'}
          disabled={isDisabled}
          className="w-full"
        >
          {isSubmitting ? 'Sending...' : submitText}
          {variant === 'glass' && !isSubmitting && (
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
          )}
        </Button>

        {/* Footer text */}
        {variant === 'glass' && (
          <p className="mt-3 text-center font-proxima text-[13px] text-white/70">
            Free consultation. No commitment required.
          </p>
        )}
      </form>
    </div>
  );
};
