//this file is for defining type validation for form
import * as z from 'zod';


export const schoolFormSchema = z.object({
  name: z.string().min(3, 'School name must be at least 3 characters'),
  address: z.string().min(5, 'Address is too short'),
  city: z.string().min(2, 'City name is required'),
  state: z.string().min(2, 'State name is required'),
  contact: z.string().regex(/^\d{10}$/, 'Contact must be a 10-digit number'),
  email_id: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'Invalid email address'),

  image: z.any() 
    .refine((files) => files?.length === 1, 'School image is required.')
    .refine((files) => files?.[0]?.size <= 100000, `Max image size is 100KB.`)
    .refine(
      (files) => ['image/jpeg', 'image/png', 'image/jpg'].includes(files?.[0]?.type),
      "Only .jpeg ,.jpg and .png formats are supported."
    ),
});


export type SchoolFormValues = z.infer<typeof schoolFormSchema>;