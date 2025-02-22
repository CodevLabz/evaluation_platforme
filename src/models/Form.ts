import mongoose from 'mongoose';

const coAuthorSchema = new mongoose.Schema({
  name: String,
  email: String,
  institution: String
});

const contributionSchema = new mongoose.Schema({
  title: { type: String, maxlength: 100 },
  nature: String,
  summary: { type: String},
  author: {
    name: String,
    email: String,
    affiliation: String
  }
});

const formSchema = new mongoose.Schema({
  formType: {
    type: String,
    required: true,
    enum: ["communication", "symposium", "roundtable"]
  },
  userId: { type: String 
  },
  title: {
    type: String,
    maxlength: 100
  },
  contact: {
    name: String,
    phone: String,
    email: String,
    address: String,
    country: String,
    institution: String,
    status: String
  },
  language: String,
  summary: {
    type: String
  },
  finalVersion: Boolean,
  technicalMetadata: {
    ip: String,
    userAgent: String,
    referrer: String,
   
  },
  
  // Form-specific fields
  communicationDetails: {
    contributionType: String,
    contributionNature: String,
    axis: String,
    coAuthors: [coAuthorSchema]
  },

  symposiumDetails: {
    coordinator: {
      name: String,
      email: String,//todo: delete duplicate email and name
      affiliation: String
    },
    axis: String,
    mainContribution: {
      type: String,
    },
    duration: {
      type: String,
      enum: ["90min", "180min", "270min"]
    },
    contributions: [contributionSchema]
  },

  roundtableDetails: {
    organizer: {
      name: String,
      institution: String
    },
    axis: String,
    participants: [coAuthorSchema]
  }
  
}, {
  timestamps: true
});

const Form = mongoose.models.Form || mongoose.model('Form', formSchema);

export default Form;

export type Participant = {
  id: string;
  name: string;
  email: string;
  institution: string;
  type: 'author' | 'coAuthor' | 'coordinator' | 'organizer';
  status: 'pending' | 'accepted';
  registrationDate: string;
  formId: string;
  formType: 'communication' | 'symposium' | 'roundtable';
  title?: string;
  contact: {
    name: string;
    phone: string;
    email: string;
    address: string;
    country: string;
    institution: string;
    status: string;
  };
  language?: string;
  summary?: string;
  finalVersion?: boolean;
  technicalMetadata?: {
    ip: string;
    userAgent: string;
    referrer: string;
  };
  communicationDetails?: {
    contributionType: string;
    contributionNature: string;
    axis: string;
    coAuthors: Array<{
      name: string;
      email: string;
      institution: string;
    }>;
  };
  symposiumDetails?: {
    coordinator: {
      name: string;
      email: string;
      affiliation: string;
    };
    axis: string;
    mainContribution: string;
    duration: '90min' | '180min' | '270min';
    contributions: Array<{
      title: string;
      nature: string;
      summary: string;
      author: {
        name: string;
        email: string;
        affiliation: string;
      };
    }>;
  };
  roundtableDetails?: {
    organizer: {
      name: string;
      institution: string;
    };
    axis: string;
    participants: Array<{
      name: string;
      email: string;
      institution: string;
    }>;
  };
};