'use client';

import { useFormContext } from 'react-hook-form';
import FormField from '@/components/FormField';
import { useDispatch } from 'react-redux';
import { updateBiodataField } from '@/redux/biodataSlice';
import { useLanguage } from '@/contexts/LanguageContext';

const OccupationalInfoForm = () => {
  const { control } = useFormContext();
  const dispatch = useDispatch();
  const { t } = useLanguage();

  const handleFieldChange = (field: string, value: any) => {
    dispatch(updateBiodataField({ field, value }));
  };

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="occupation"
        label={t('form.occupational.occupation.label')}
        placeholder={t('form.occupational.occupation.placeholder')}
        fieldType="select"
        selectOptions={[
          { value: "student", label: t('form.occupational.occupation.options.student') },
          { value: "service", label: t('form.occupational.occupation.options.service') },
          { value: "business", label: t('form.occupational.occupation.options.business') },
          { value: "housewife", label: t('form.occupational.occupation.options.housewife') },
          { value: "unemployed", label: t('form.occupational.occupation.options.unemployed') },
          { value: "other", label: t('form.occupational.occupation.options.other') },
        ]}
        onValueChange={(value) => handleFieldChange('occupation', value)}
      />

      <FormField
        control={control}
        name="descriptionOfProfession"
        label={t('form.occupational.descriptionOfProfession.label')}
        onValueChange={(value) => handleFieldChange('descriptionOfProfession', value)}
      />

      <FormField
        control={control}
        name="monthlyIncome"
        label={t('form.occupational.monthlyIncome.label')}
        type="number"
        onValueChange={(value) => handleFieldChange('monthlyIncome', parseFloat(value) || 0)}
      />
    </div>
  );
};

export default OccupationalInfoForm;