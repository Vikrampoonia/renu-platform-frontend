'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { schoolFormSchema, SchoolFormValues } from '@/lib/schemas/schoolSchema';
import {useRouter} from 'next/navigation';

const AddSchoolPage = () => 
{
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SchoolFormValues>({
    resolver: zodResolver(schoolFormSchema),
  });

 const onSubmit: SubmitHandler<SchoolFormValues> = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
  
    const { image, ...restOfData } = data;

    const formData = new FormData();

    console.log('Image file:', image);

  
    if (image.length > 0) {
      formData.append('image', image[0]);
    }

   
    Object.entries(restOfData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    
 

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/create`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add school');
      }

      await response.json();
      setSubmitStatus({ message: 'School added successfully!', type: 'success' });
      reset(); 
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus({ message: 'An error occurred. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
};

  return (
    <main className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Add New School</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {/* School Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">School Name</label>
              <input type="text" id="name" {...register('name')} className="mt-1 block w-full px-3 py-2 border font-semibold text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Contact Number */}
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact Number</label>
              <input type="tel" id="contact" {...register('contact')} className="mt-1 block w-full px-3 py-2 border font-semibold text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              {errors.contact && <p className="text-red-600 text-sm mt-1">{errors.contact.message}</p>}
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input type="text" id="address" {...register('address')} className="mt-1 block w-full px-3 py-2  font-semibold text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>}
            </div>
            
            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <input type="text" id="city" {...register('city')} className="mt-1 block w-full px-3 py-2 border font-semibold text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>}
            </div>

            {/* State */}
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
              <input type="text" id="state" {...register('state')} className="mt-1 block w-full px-3 py-2 border font-semibold text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              {errors.state && <p className="text-red-600 text-sm mt-1">{errors.state.message}</p>}
            </div>
            
            {/* Email */}
            <div className="md:col-span-2">
              <label htmlFor="email_id" className="block text-sm font-medium text-gray-700">Email ID</label>
              <input type="email" id="email_id" {...register('email_id')} className="mt-1 block w-full px-3 py-2 border font-semibold text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              {errors.email_id && <p className="text-red-600 text-sm mt-1">{errors.email_id.message}</p>}
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">School Image</label>
              <input type="file" id="image" {...register('image')} accept="image/png, image/jpeg, image/jpg" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"/>
              {errors.image && <p className="text-red-600 text-sm mt-1">{errors.image.message as string}</p>}
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
             <button onClick={() => router.push('/showSchool')} className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 mr-2">
              Back
            </button>
            <button type="submit" disabled={isSubmitting} className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400">
              {isSubmitting ? 'Submitting...' : 'Add School'}
            </button>
          </div>
        </form>

        {submitStatus && (
          <div className={`mt-4 p-4 rounded-md text-sm ${submitStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {submitStatus.message}
          </div>
        )}
      </div>
    </main>
  );
};

export default AddSchoolPage;