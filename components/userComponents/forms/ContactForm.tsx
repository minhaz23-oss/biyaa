'use client';

import { useFormContext } from 'react-hook-form';
import FormField from '@/components/FormField';
import { useDispatch } from 'react-redux';
import { updateBiodataField } from '@/redux/biodataSlice';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactForm = () => {
  const { control } = useFormContext();
  const dispatch = useDispatch();
  const { t } = useLanguage();

  const handleFieldChange = (field: string, value: string) => {
    dispatch(updateBiodataField({ field, value }));
  };

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="fullName"
        label={t('form.contact.fullName.label')}
        onValueChange={(value) => handleFieldChange('fullName', value)}
      />
      
      <FormField
        control={control}
        name="guardianMobileNumber"
        label={t('form.contact.guardianMobileNumber.label')}
        onValueChange={(value) => handleFieldChange('guardianMobileNumber', value)}
      />
      
      <FormField
        control={control}
        name="relationshipWithGuardian"
        label={t('form.contact.relationshipWithGuardian.label')}
        onValueChange={(value) => handleFieldChange('relationshipWithGuardian', value)}
      />
      
      <FormField
        control={control}
        name="emailToReceiveBiodata"
        label={t('form.contact.emailToReceiveBiodata.label')}
        type="email"
        onValueChange={(value) => handleFieldChange('emailToReceiveBiodata', value)}
      />
    </div>
  );
};

export default ContactForm;