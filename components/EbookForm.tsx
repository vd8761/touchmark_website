'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { submitEbookForm } from '@/services/ebook';

interface EbookFormProps {
  ebookId: string;
}

interface GrecaptchaApi {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
}

interface WindowWithGrecaptcha extends Window {
  grecaptcha?: GrecaptchaApi;
}

export default function EbookForm({ ebookId }: EbookFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    companyName: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    lastName: '',
    email: '',
    companyName: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const nameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const companyInputRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isSuccess) return;

    const frameId = window.requestAnimationFrame(() => successRef.current?.focus());
    return () => window.cancelAnimationFrame(frameId);
  }, [isSuccess]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setSubmitError('');
  };

  const validate = () => {
    let valid = true;
    const newErrors = { name: '', lastName: '', email: '', companyName: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'First name is required.';
      valid = false;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required.';
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
      valid = false;
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
      valid = false;
    }
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required.';
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) {
      window.requestAnimationFrame(() => {
        if (newErrors.name) nameInputRef.current?.focus();
        else if (newErrors.lastName) lastNameInputRef.current?.focus();
        else if (newErrors.email) emailInputRef.current?.focus();
        else if (newErrors.companyName) companyInputRef.current?.focus();
      });
    }

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // 1. Fetch reCAPTCHA token if available
      let gToken = '';
      if (typeof window !== 'undefined') {
        const grecaptcha = (window as WindowWithGrecaptcha).grecaptcha;

        if (grecaptcha) {
          try {
            gToken = await new Promise<string>((resolve, reject) => {
              grecaptcha.ready(() => {
                grecaptcha
                  .execute('6LelLRwqAAAAAL6aHLVU9nE96q6UI6_H11dUU_Ix', { action: 'submit' })
                  .then(resolve)
                  .catch(reject);
              });
            });
          } catch (captchaErr) {
            console.warn('reCAPTCHA execution failed, proceeding anyway:', captchaErr);
          }
        }
      }

      // 2. Submit to API endpoint
      const result = await submitEbookForm({
        ebook_content_id: ebookId,
        ebook_name: formData.name,
        ebook_lname: formData.lastName,
        ebook_email: formData.email,
        ebook_comname: formData.companyName,
        'g-token': gToken,
      });

      if (result.success) {
        setIsSuccess(true);
      } else {
        setSubmitError(result.message || 'Form submission failed. Please try again.');
      }
    } catch (err: unknown) {
      console.error('Submission error:', err);
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'An error occurred during submission. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div
        ref={successRef}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        tabIndex={-1}
        className="bg-white p-8 lg:p-12 border border-gray-100 rounded-lg shadow-md mx-auto max-w-[540px] text-center flex flex-col items-center justify-center min-h-[450px] transition-all duration-300"
      >
        <img
          src="/images/ebooks/sucess.svg"
          alt="Success Icon"
          className="w-[124px] h-[124px] mb-6 animate-bounce motion-reduce:animate-none"
        />
        <h2 className="text-3xl lg:text-4xl font-primary text-gray-900 mb-3">
          Success!
        </h2>
        <p className="text-sm lg:text-base font-secondary text-gray-600 max-w-[320px]">
          Please check your email for the download link.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 lg:p-10 border border-gray-100 rounded-lg shadow-md mx-auto max-w-[540px] transition-all duration-300">
      <div className="text-center mb-6 lg:mb-8">
        <h2 className="text-2xl lg:text-3xl font-primary text-gray-900 font-bold">
          Download Now
        </h2>
        <p className="text-xs lg:text-sm font-secondary text-gray-500 mt-2 max-w-[320px] mx-auto leading-relaxed">
          share a few contact details and we&apos;ll send a download link to your inbox
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        aria-busy={isSubmitting}
        aria-describedby={submitError ? 'ebook-submit-error' : undefined}
        className="space-y-4 lg:space-y-5"
      >
        <div>
          <label htmlFor="name" className="block text-xs font-semibold text-gray-700 mb-1 font-secondary">
            Name*
          </label>
          <input
            ref={nameInputRef}
            type="text"
            id="name"
            name="name"
            autoComplete="given-name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'ebook-name-error' : undefined}
            placeholder="your name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full border p-3 text-sm font-secondary transition-all rounded outline-none ${
              errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-primary'
            }`}
          />
          {errors.name && <p id="ebook-name-error" className="text-xs text-red-500 mt-1 font-secondary">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-xs font-semibold text-gray-700 mb-1 font-secondary">
            Last Name*
          </label>
          <input
            ref={lastNameInputRef}
            type="text"
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            required
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={errors.lastName ? 'ebook-last-name-error' : undefined}
            placeholder="your name"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full border p-3 text-sm font-secondary transition-all rounded outline-none ${
              errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-primary'
            }`}
          />
          {errors.lastName && <p id="ebook-last-name-error" className="text-xs text-red-500 mt-1 font-secondary">{errors.lastName}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1 font-secondary">
            Work Email*
          </label>
          <input
            ref={emailInputRef}
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'ebook-email-error' : undefined}
            placeholder="you@company.com"
            value={formData.email}
            onChange={handleChange}
            className={`w-full border p-3 text-sm font-secondary transition-all rounded outline-none ${
              errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-primary'
            }`}
          />
          {errors.email && <p id="ebook-email-error" className="text-xs text-red-500 mt-1 font-secondary">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="companyName" className="block text-xs font-semibold text-gray-700 mb-1 font-secondary">
            Company Name*
          </label>
          <input
            ref={companyInputRef}
            type="text"
            id="companyName"
            name="companyName"
            autoComplete="organization"
            required
            aria-invalid={Boolean(errors.companyName)}
            aria-describedby={errors.companyName ? 'ebook-company-error' : undefined}
            placeholder="your company name"
            value={formData.companyName}
            onChange={handleChange}
            className={`w-full border p-3 text-sm font-secondary transition-all rounded outline-none ${
              errors.companyName ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-primary'
            }`}
          />
          {errors.companyName && <p id="ebook-company-error" className="text-xs text-red-500 mt-1 font-secondary">{errors.companyName}</p>}
        </div>

        <div className="pt-2">
          <p className="text-[11px] text-gray-500 leading-normal font-secondary">
            By submitting this form, I am agreeing to Touchmark Descience&apos;s{' '}
            <Link href="/privacy-policy" className="text-primary hover:underline font-semibold">
              privacy policy.
            </Link>
          </p>
        </div>

        {submitError && (
          <p
            id="ebook-submit-error"
            role="alert"
            aria-live="assertive"
            className="text-xs text-red-500 mt-2 text-center font-secondary"
          >
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-4 border border-primary text-primary hover:bg-primary hover:text-white py-3 px-4 rounded transition-all duration-300 font-secondary flex items-center justify-center uppercase text-xs font-bold tracking-wider disabled:opacity-50"
        >
          <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
          {!isSubmitting && (
            <svg
              fill="none"
              height="16"
              className="ml-2 -rotate-90 text-current transition-transform duration-300"
              viewBox="0 0 24 24"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m16 14.5858-8.99997-8.99998-1.41421 1.41421 8.99998 8.99997h-7.5858v2h11v-11h-2"
                fill="currentColor"
              ></path>
            </svg>
          )}
        </button>
      </form>
    </div>
  );
}
