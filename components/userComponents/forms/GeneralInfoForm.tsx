'use client';

import FormField from '@/components/FormField';
import { useDispatch } from 'react-redux';
import { updateBiodataField } from '@/redux/biodataSlice';
import { useLanguage } from '@/contexts/LanguageContext';

export function GeneralInfoForm({ form }: { form: any }) {
  const dispatch = useDispatch();
  const { t } = useLanguage();

  const handleFieldChange = (field: string, value: any) => {
    dispatch(updateBiodataField({ field, value }));
  };

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="biodataType"
        label={t('form.general.biodataType.label')}
        placeholder={t('form.general.biodataType.placeholder')}
        fieldType="select"
        selectOptions={[
          { value: "males biodata", label: t('form.general.biodataType.options.male') },
          { value: "females biodata", label: t('form.general.biodataType.options.female') },
        ]}
        onValueChange={(value) => handleFieldChange('biodataType', value)}
      />
      <FormField
        control={form.control}
        name="maritalStatus"
        label={t('form.general.maritalStatus.label')}
        placeholder={t('form.general.maritalStatus.placeholder')}
        fieldType="select"
        selectOptions={[
          { value: "single", label: t('form.general.maritalStatus.options.single') },
          { value: "married", label: t('form.general.maritalStatus.options.married') },
          { value: "divorced", label: t('form.general.maritalStatus.options.divorced') },
        ]}
        onValueChange={(value) => handleFieldChange('maritalStatus', value)}
      />
      <FormField
        control={form.control}
        name="birthYear"
        label={t('form.general.birthYear.label')}
        placeholder={t('form.general.birthYear.placeholder')}
        onValueChange={(value) => handleFieldChange('birthYear', value)}
      />
      <FormField
        control={form.control}
        name="height"
        label={t('form.general.height.label')}
        placeholder={t('form.general.height.placeholder')}
        onValueChange={(value) => handleFieldChange('height', value)}
      />
      <FormField
        control={form.control}
        name="complexion"
        label={t('form.general.complexion.label')}
        placeholder={t('form.general.complexion.placeholder')}
        fieldType="select"
        selectOptions={[
          { value: "black", label: t('form.general.complexion.options.black') },
          { value: "brown", label: t('form.general.complexion.options.brown') },
          { value: "lightBrown", label: t('form.general.complexion.options.lightBrown') },
          { value: "fair", label: t('form.general.complexion.options.fair') },
          { value: "veryFair", label: t('form.general.complexion.options.veryFair') },
        ]}
        onValueChange={(value) => handleFieldChange('complexion', value)}
      />
       <FormField
        control={form.control}
        name="weight"
        label={t('form.general.weight.label')}
        placeholder={t('form.general.weight.placeholder')}
        onValueChange={(value) => handleFieldChange('weight', value)}
      />
       <FormField
        control={form.control}
        name="bloodGroup"
        label={t('form.general.bloodGroup.label')}
        placeholder={t('form.general.bloodGroup.placeholder')}
        fieldType="select"
        selectOptions={[
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
        ]}
        onValueChange={(value) => handleFieldChange('bloodGroup', value)}
      />
       <FormField
        control={form.control}
        name="nationality"
        label={t('form.general.nationality.label')}
        placeholder={t('form.general.nationality.placeholder')}
        onValueChange={(value) => handleFieldChange('nationality', value)}
      />
    </div>
  );
}