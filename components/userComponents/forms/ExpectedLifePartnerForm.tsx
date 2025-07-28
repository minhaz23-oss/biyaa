'use client';

import FormField from '@/components/FormField';
import { useDispatch } from 'react-redux';
import { updateBiodataField } from '@/redux/biodataSlice';
import { useLanguage } from '@/contexts/LanguageContext';

export function ExpectedLifePartnerForm({ form }: { form: any }) {
  const dispatch = useDispatch();
  const { t } = useLanguage();

  const handleFieldChange = (field: string, value: any) => {
    dispatch(updateBiodataField({ field, value }));
  };

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="expectedAge"
        label={t('form.expectedLifePartner.age.label')}
        placeholder={t('form.expectedLifePartner.age.placeholder')}
        onValueChange={(value) => handleFieldChange('expectedAge', value)}
      />
      <FormField
        control={form.control}
        name="expectedComplexion"
        label={t('form.expectedLifePartner.complexion.label')}
        placeholder={t('form.expectedLifePartner.complexion.placeholder')}
        fieldType="select"
        selectOptions={[
          { value: "any", label: t('form.expectedLifePartner.complexion.options.any') },
          { value: "black", label: t('form.expectedLifePartner.complexion.options.black') },
          { value: "brown", label: t('form.expectedLifePartner.complexion.options.brown') },
          { value: "lightBrown", label: t('form.expectedLifePartner.complexion.options.lightBrown') },
          { value: "fair", label: t('form.expectedLifePartner.complexion.options.fair') },
          { value: "veryFair", label: t('form.expectedLifePartner.complexion.options.veryFair') },
        ]}
        onValueChange={(value) => handleFieldChange('expectedComplexion', value)}
      />
      <FormField
        control={form.control}
        name="expectedHeight"
        label={t('form.expectedLifePartner.height.label')}
        placeholder={t('form.expectedLifePartner.height.placeholder')}
        onValueChange={(value) => handleFieldChange('expectedHeight', value)}
      />
      <FormField
        control={form.control}
        name="expectedEducationalQualification"
        label={t('form.expectedLifePartner.educationalQualification.label')}
        placeholder={t('form.expectedLifePartner.educationalQualification.placeholder')}
        onValueChange={(value) => handleFieldChange('expectedEducationalQualification', value)}
      />
      <FormField
        control={form.control}
        name="expectedDistrict"
        label={t('form.expectedLifePartner.district.label')}
        placeholder={t('form.expectedLifePartner.district.placeholder')}
        onValueChange={(value) => handleFieldChange('expectedDistrict', value)}
      />
      <FormField
        control={form.control}
        name="expectedMaritalStatus"
        label={t('form.expectedLifePartner.maritalStatus.label')}
        placeholder={t('form.expectedLifePartner.maritalStatus.placeholder')}
        fieldType="select"
        selectOptions={[
          { value: "any", label: t('form.expectedLifePartner.maritalStatus.options.any') },
          { value: "single", label: t('form.expectedLifePartner.maritalStatus.options.single') },
          { value: "divorced", label: t('form.expectedLifePartner.maritalStatus.options.divorced') },
          { value: "widowed", label: t('form.expectedLifePartner.maritalStatus.options.widowed') },
        ]}
        onValueChange={(value) => handleFieldChange('expectedMaritalStatus', value)}
      />
      <FormField
        control={form.control}
        name="expectedProfession"
        label={t('form.expectedLifePartner.profession.label')}
        placeholder={t('form.expectedLifePartner.profession.placeholder')}
        onValueChange={(value) => handleFieldChange('expectedProfession', value)}
      />
      <FormField
        control={form.control}
        name="expectedFinancialCondition"
        label={t('form.expectedLifePartner.financialCondition.label')}
        placeholder={t('form.expectedLifePartner.financialCondition.placeholder')}
        fieldType="select"
        selectOptions={[
          { value: "any", label: t('form.expectedLifePartner.financialCondition.options.any') },
          { value: "upper-class", label: t('form.expectedLifePartner.financialCondition.options.upperClass') },
          { value: "middle-class", label: t('form.expectedLifePartner.financialCondition.options.middleClass') },
          { value: "lower-middle-class", label: t('form.expectedLifePartner.financialCondition.options.lowerMiddleClass') },
        ]}
        onValueChange={(value) => handleFieldChange('expectedFinancialCondition', value)}
      />
      <FormField
        control={form.control}
        name="expectedQualities"
        label={t('form.expectedLifePartner.qualities.label')}
        placeholder={t('form.expectedLifePartner.qualities.placeholder')}
        onValueChange={(value) => handleFieldChange('expectedQualities', value)}
      />
    </div>
  );
}
