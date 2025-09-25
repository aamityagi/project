'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';

// ✅ Validation schema
const affiliationSchema = z.object({
  programType: z.enum(['affiliate','reseller','partner','institution','individual']).optional(),
  companyName: z.string().optional(),
  fullName: z.string().min(2, 'Enter your name'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  country: z.string().optional(),
  website: z.string().url().optional(),
  payoutMethod: z.enum(['paypal','bank','upi','other']).optional(),
  payoutDetails: z.record(z.string(), z.any()).optional(), // ✅ fixed
  promoSlug: z.string().regex(/^[a-z0-9\-]{3,30}$/).optional(),
});


// ✅ Type for form values
type FormValues = z.infer<typeof affiliationSchema>;

interface AffiliationFormProps {
  initial?: Partial<FormValues>;
}

export default function AffiliationForm({ initial }: AffiliationFormProps) {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(affiliationSchema),
    defaultValues: initial ?? {},
  });

  async function onSubmit(values: FormValues) {
    try {
      await axios.post('/api/affiliations', values);
      window.location.href = '/onboarding/affiliation/success';
    } catch (error) {
      // ✅ Type-safe axios error
      const err = error as AxiosError<{ error: string }>;
      console.error(err);
      setError('fullName', {
        message: err.response?.data?.error || 'Failed to submit',
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-3xl">
      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium">Full name</label>
        <input {...register('fullName')} className="mt-1 block w-full rounded-md border px-3 py-2" />
        {errors.fullName && <p className="text-xs text-red-600">{errors.fullName.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input {...register('email')} className="mt-1 block w-full rounded-md border px-3 py-2" />
        {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
      </div>

      {/* Company & Website */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Company (optional)</label>
          <input {...register('companyName')} className="mt-1 block w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Website (optional)</label>
          <input {...register('website')} className="mt-1 block w-full rounded-md border px-3 py-2" />
        </div>
      </div>

      {/* Phone & Country */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input {...register('phone')} className="mt-1 block w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Country</label>
          <input {...register('country')} className="mt-1 block w-full rounded-md border px-3 py-2" />
        </div>
      </div>

      {/* Promo Slug */}
      <div>
        <label className="block text-sm font-medium">Promo slug (optional)</label>
        <input {...register('promoSlug')} placeholder="your-shop-name or coupon-code" className="mt-1 block w-full rounded-md border px-3 py-2" />
        <p className="text-xs text-gray-500">Lowercase letters, numbers and hyphens only. 3 to 30 characters.</p>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between">
        <button type="submit" disabled={isSubmitting} className="inline-flex items-center rounded-md bg-[#111827] px-4 py-2 text-white">
          {isSubmitting ? 'Submitting…' : 'Apply for affiliation'}
        </button>
      </div>
    </form>
  );
}
