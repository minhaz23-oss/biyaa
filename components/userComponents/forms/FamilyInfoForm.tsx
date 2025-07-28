'use client';

import { useDispatch } from 'react-redux';
import FormField from '@/components/FormField';
import { updateBiodataField } from '@/redux/biodataSlice';
import { useLanguage } from '@/contexts/LanguageContext';

export function FamilyInfoForm({ form }: { form: any }) {
  const dispatch = useDispatch();
  const { t } = useLanguage();

  const handleFieldChange = (field: string, value: any) => {
    dispatch(updateBiodataField({ field, value }));
  };

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="fatherName"
        label={t('form.family.fatherName.label')}
        placeholder={t('form.family.fatherName.placeholder')}
        onValueChange={(value) => handleFieldChange('fatherName', value)}
      />
      <FormField
        control={form.control}
        name="isFatherAlive"
        label={t('form.family.isFatherAlive.label')}
        placeholder={t('form.family.isFatherAlive.placeholder')}
        fieldType="select"
        selectOptions={[
          { value: "yes", label: t('form.family.isFatherAlive.options.yes') },
          { value: "no", label: t('form.family.isFatherAlive.options.no') },
        ]}
        onValueChange={(value) => handleFieldChange('isFatherAlive', value)}
      />
      <FormField
        control={form.control}
        name="fatherProfession"
        label={t('form.family.fatherProfession.label')}
        placeholder={t('form.family.fatherProfession.placeholder')}
        onValueChange={(value) => handleFieldChange('fatherProfession', value)}
      />
      <FormField
        control={form.control}
        name="motherName"
        label={t('form.family.motherName.label')}
        placeholder={t('form.family.motherName.placeholder')}
        onValueChange={(value) => handleFieldChange('motherName', value)}
      />
      <FormField
        control={form.control}
        name="isMotherAlive"
        label={t('form.family.isMotherAlive.label')}
        placeholder={t('form.family.isMotherAlive.placeholder')}
        fieldType="select"
        selectOptions={[
          { value: "yes", label: t('form.family.isMotherAlive.options.yes') },
          { value: "no", label: t('form.family.isMotherAlive.options.no') },
        ]}
        onValueChange={(value) => handleFieldChange('isMotherAlive', value)}
      />
      <FormField
        control={form.control}
        name="motherProfession"
        label={t('form.family.motherProfession.label')}
        placeholder={t('form.family.motherProfession.placeholder')}
        onValueChange={(value) => handleFieldChange('motherProfession', value)}
      />
      <FormField
        control={form.control}
        name="familyStatus"
        label={t('form.family.familyStatus.label')}
        placeholder={t('form.family.familyStatus.placeholder')}
        fieldType="select"
        selectOptions={[
          { value: "upper class", label: t('form.family.familyStatus.options.upperClass') },
          { value: "upper-middle class", label: t('form.family.familyStatus.options.upperMiddleClass') },
          { value: "middle class", label: t('form.family.familyStatus.options.middleClass') },
          { value: "lower-middle class", label: t('form.family.familyStatus.options.lowerMiddleClass') },
          { value: "lower class", label: t('form.family.familyStatus.options.lowerClass') },
        ]}
        onValueChange={(value) => handleFieldChange('familyStatus', value)}
      />
      <FormField
        control={form.control}
        name="numberOfSiblings"
        label={t('form.family.numberOfSiblings.label')}
        type="number"
        onValueChange={(value) => handleFieldChange('numberOfSiblings', parseInt(value, 10) || 0)}
      />
    </div>
  );
}
