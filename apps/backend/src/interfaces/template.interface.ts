export interface Template {
  in: number;
  templateId: string;
  link: string;
  categories: string;
  dateCreate: string;
  dateCreateSystem: Date;
  title: string;
  description?: string;
  usageCount: number;
  clickButtonUse?: number;
  authorId: string;
}
