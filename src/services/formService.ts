import { z } from 'zod';
import Form from 'src/models/Form';
import { communicationFormSchema, symposiumFormSchema, roundtableFormSchema } from 'src/utils/formValidation';

type TechnicalMetadata = {
  ip: string;
  userAgent: string;
  referrer: string;
  finalVersion: boolean;
};

export class FormService {
  static async createForm(formData: any, technicalMetadata: TechnicalMetadata) {
    let validatedData;
    switch (formData.formType) {
      case 'communication':
        validatedData = communicationFormSchema.parse(formData);
        break;
      case 'symposium':
        validatedData = symposiumFormSchema.parse(formData);
        break;
      case 'roundtable':
        validatedData = roundtableFormSchema.parse(formData);
        break;
      default:
        throw new Error('Invalid form type');
    }
  
    const formDataWithMetadata = {
      ...validatedData,
      finalVersion: technicalMetadata.finalVersion,
      technicalMetadata: {
        ip: technicalMetadata.ip,
        userAgent: technicalMetadata.userAgent,
        referrer: technicalMetadata.referrer
      }
    };

    const form = new Form(formDataWithMetadata);
    await form.save();
    
    return form;
  }

  static async getForms(query: { formType?: string; userId?: string }) {
    const queryFilter: any = {};
    if (query.formType) queryFilter.formType = query.formType;
    if (query.userId) queryFilter.userId = query.userId;

    return Form.find(queryFilter).sort({ createdAt: -1 });
  }

  static async getFormById(formId: string) {
    const form = await Form.findById(formId);
    if (!form) {
      throw new Error('Form not found');
    }
    return form;
  }

  static async updateForm(formId: string, updateData: any) {
    const existingForm = await Form.findById(formId);
    if (!existingForm) {
      throw new Error('Form not found');
    }

    let validatedData;
    switch (existingForm.formType) {
      case 'communication':
        validatedData = communicationFormSchema.partial().parse(updateData);
        break;
      case 'symposium':
        validatedData = symposiumFormSchema.partial().parse(updateData);
        break;
      case 'roundtable':
        validatedData = roundtableFormSchema.partial().parse(updateData);
        break;
      default:
        throw new Error('Invalid form type');
    }

    return Form.findByIdAndUpdate(formId, validatedData, { new: true });
  }

  static async deleteForm(formId: string) {
    const result = await Form.findByIdAndDelete(formId);
    if (!result) {
      throw new Error('Form not found');
    }
    return result;
  }
} 