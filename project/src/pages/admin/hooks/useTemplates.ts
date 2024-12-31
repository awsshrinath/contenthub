import { useState, useEffect } from 'react';
import { Template, TemplateMetadata } from '@/types/admin';
import { getTemplates, uploadTemplate, updateTemplate, deleteTemplate } from '@/services/admin';

export function useTemplates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const data = await getTemplates();
      setTemplates(data);
      setError(null);
    } catch (err) {
      setError('Failed to load templates');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTemplate = async (file: File, metadata: TemplateMetadata) => {
    try {
      const newTemplate = await uploadTemplate(file, metadata);
      setTemplates([...templates, newTemplate]);
      return newTemplate;
    } catch (err) {
      setError('Failed to upload template');
      throw err;
    }
  };

  const editTemplate = async (templateId: string, updates: Partial<TemplateMetadata>) => {
    try {
      const updatedTemplate = await updateTemplate(templateId, updates);
      setTemplates(templates.map(t => 
        t.id === templateId ? updatedTemplate : t
      ));
      return updatedTemplate;
    } catch (err) {
      setError('Failed to update template');
      throw err;
    }
  };

  const removeTemplate = async (templateId: string) => {
    try {
      await deleteTemplate(templateId);
      setTemplates(templates.filter(t => t.id !== templateId));
    } catch (err) {
      setError('Failed to delete template');
      throw err;
    }
  };

  return {
    templates,
    loading,
    error,
    addTemplate,
    editTemplate,
    removeTemplate,
    refresh: loadTemplates,
  };
}