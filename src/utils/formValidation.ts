import { z } from "zod";

// Common schemas
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  country: z.string().min(1, "Country is required"),
  institution: z.string().min(1, "Institution is required"),
  status: z.string().min(1, "Status is required")
});

const coAuthorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  institution: z.string().min(1, "Institution is required")
});

const contributionSchema = z.object({
  title: z.string().max(100, "Title must be 100 characters or less"),
  nature: z.string().min(1, "Nature is required"),
  author: z.object({
    name: z.string().min(1, "Author name is required"),
    email: z.string().email("Invalid author email"),
    affiliation: z.string().min(1, "Author affiliation is required")
  })
});

const baseFormSchema = z.object({
  finalVersion: z.boolean().optional(),
});

// Form type specific schemas
export const communicationFormSchema = baseFormSchema.extend({
  formType: z.literal("communication"),
  title: z.string().max(100),
  contact: contactSchema,
  language: z.string(),

  communicationDetails: z.object({
    contributionType: z.string(),
    contributionNature: z.string(),
    axis: z.string(),
    coAuthors: z.array(coAuthorSchema)
  })
});

export const symposiumFormSchema = baseFormSchema.extend({
  formType: z.literal("symposium"),
  title: z.string().max(100),
  contact: contactSchema,
  language: z.string(),

  symposiumDetails: z.object({
    coordinator: z.object({
      name: z.string(),
      email: z.string().email(),
      affiliation: z.string()
    }),
    axis: z.string(),
    mainContribution: z.string().max(500),
    duration: z.enum(["90min", "180min", "270min"]),
    contributions: z.array(contributionSchema)
  })
});

export const roundtableFormSchema = baseFormSchema.extend({
  formType: z.literal("roundtable"),
  title: z.string().max(100),
  contact: contactSchema,
  language: z.string(),
  roundtableDetails: z.object({
    organizer: z.object({
      name: z.string(),
      institution: z.string()
    }),
    axis: z.string(),
    participants: z.array(coAuthorSchema)
  })
}); 