import { 
  db, 
  storage, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  createBaseDocument 
} from '@/lib/firebase';
import { Template, TemplateMetadata } from '@/types/admin';

export async function uploadTemplate(file: File, metadata: TemplateMetadata): Promise<Template> {
  try {
    const template: Template = {
      ...createBaseDocument(),
      ...metadata,
      fileUrl: URL.createObjectURL(file), // Temporary URL for preview
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await setDoc(doc(db, 'templates', template.id), template);
    return template;
  } catch (error) {
    console.error('Error uploading template:', error);
    throw new Error('Failed to upload template');
  }
}

export async function updateTemplate(
  templateId: string, 
  updates: Partial<TemplateMetadata>
): Promise<Template> {
  try {
    const templateRef = doc(db, 'templates', templateId);
    const templateSnap = await getDoc(templateRef);
    
    if (!templateSnap.exists()) {
      throw new Error('Template not found');
    }

    const updatedTemplate = {
      ...templateSnap.data(),
      ...updates,
      updatedAt: new Date().toISOString(),
    } as Template;

    await updateDoc(templateRef, updatedTemplate);
    return updatedTemplate;
  } catch (error) {
    console.error('Error updating template:', error);
    throw new Error('Failed to update template');
  }
}

export async function deleteTemplate(templateId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'templates', templateId));
  } catch (error) {
    console.error('Error deleting template:', error);
    throw new Error('Failed to delete template');
  }
}