export interface FilterUserArgs {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  isTermsAgree?: boolean;
}

export interface FilterEventArgs {
  id?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  details?: any;
}

export interface FilterEventUserArgs {
  id?: string;
  name?: string;
  tel?: string;
  email?: string;
  organization?: string;
  profession?: string;
  other?: any;
  eventId?: string;
}

export interface FilterEventLocationArgs {
  id?: string;
  location?: string;
  date?: Date;
  venue?: string;
  trainingFee?: string;
  sponsor?: string;
  duration?: string;
  certificates?: string;
  registrationPrice?: string;
  other?: any;
  eventId?: string;
}
