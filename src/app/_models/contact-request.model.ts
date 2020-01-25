export class ContactRequestModel {
  id: string;
  email: string;
  subject: string;
  question: string;
  first_name: string;
  last_name: string;
  updated_at: Date | string;
  notifications: { type: string; data: string[] };
}
