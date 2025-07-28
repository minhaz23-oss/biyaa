'use client';

import { useDispatch } from 'react-redux';
import FormField from '@/components/FormField';
import { updateBiodataField } from '@/redux/biodataSlice';
import { useLanguage } from '@/contexts/LanguageContext';

export function EducationInfoForm({ form }: { form: any }) {
  const dispatch = useDispatch();
  const { t } = useLanguage();

  const handleFieldChange = (field: string, value: any) => {
    dispatch(updateBiodataField({ field, value }));
  };

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="highestDegree"
        label={t('form.education.highestDegree.label')}
        placeholder={t('form.education.highestDegree.placeholder')}
        onValueChange={(value) => handleFieldChange('highestDegree', value)}
      />
      <FormField
        control={form.control}
        name="institution"
        label={t('form.education.institution.label')}
        placeholder={t('form.education.institution.placeholder')}
        onValueChange={(value) => handleFieldChange('institution', value)}
      />
      <FormField
        control={form.control}
        name="graduationYear"
        label={t('form.education.graduationYear.label')}
        type="number"
        onValueChange={(value) =>
          handleFieldChange('graduationYear', parseInt(value, 10) || 0)
        }
      />
      
    </div>
  );
}