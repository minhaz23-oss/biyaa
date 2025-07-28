'use client';

import FormField from '@/components/FormField';
import { useDispatch } from 'react-redux';
import { updateBiodataField } from '@/redux/biodataSlice';
import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function MarriageInfoForm({ form }: { form: any }) {
  const dispatch = useDispatch();
  const { watch, setValue, clearErrors } = useFormContext();
  const { t } = useLanguage();

  const handleFieldChange = (field: string, value: any) => {
    dispatch(updateBiodataField({ field, value }));
  };

  const biodataType = watch('biodataType');
  const isMale = biodataType === 'males biodata';
  const isFemale = biodataType === 'females biodata';

  // Clear conditional fields when biodataType changes
  useEffect(() => {
    if (biodataType) {
      if (biodataType === 'males biodata') {
        // Clear female fields
        setValue('wantToDoJobAfterMarriage', '');
        setValue('wantToStudyAfterMarriage', '');
        clearErrors('wantToDoJobAfterMarriage');
        clearErrors('wantToStudyAfterMarriage');
      } else if (biodataType === 'females biodata') {
        // Clear male fields
        setValue('keepWifeInVeil', '');
        setValue('allowWifeToStudy', '');
        setValue('allowWifeToDoJob', '');
        setValue('liveWithWifeAfterMarriage', '');
        clearErrors('keepWifeInVeil');
        clearErrors('allowWifeToStudy');
        clearErrors('allowWifeToDoJob');
        clearErrors('liveWithWifeAfterMarriage');
      }
    }
  }, [biodataType, setValue, clearErrors]);

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="guardiansAgree"
        label={t('form.marriage.guardiansAgree.label')}
        placeholder={t('form.marriage.guardiansAgree.placeholder')}
        fieldType="select"
        selectOptions={[
          { value: "yes", label: t('form.marriage.guardiansAgree.options.yes') },
          { value: "no", label: t('form.marriage.guardiansAgree.options.no') },
        ]}
        onValueChange={(value) => handleFieldChange('guardiansAgree', value)}
      />
      {/* Male specific fields */}
      {isMale && (
        <>
          <FormField
            control={form.control}
            name="keepWifeInVeil"
            label={t('form.marriage.keepWifeInVeil.label')}
            placeholder={t('form.marriage.keepWifeInVeil.placeholder')}
            fieldType="select"
            selectOptions={[
              { value: "yes", label: t('form.marriage.keepWifeInVeil.options.yes') },
              { value: "no", label: t('form.marriage.keepWifeInVeil.options.no') },
            ]}
            onValueChange={(value) => handleFieldChange('keepWifeInVeil', value)}
          />
          <FormField
            control={form.control}
            name="allowWifeToStudy"
            label={t('form.marriage.allowWifeToStudy.label')}
            placeholder={t('form.marriage.allowWifeToStudy.placeholder')}
            fieldType="select"
            selectOptions={[
              { value: "yes", label: t('form.marriage.allowWifeToStudy.options.yes') },
              { value: "no", label: t('form.marriage.allowWifeToStudy.options.no') },
            ]}
            onValueChange={(value) => handleFieldChange('allowWifeToStudy', value)}
          />
          <FormField
            control={form.control}
            name="allowWifeToDoJob"
            label={t('form.marriage.allowWifeToDoJob.label')}
            placeholder={t('form.marriage.allowWifeToDoJob.placeholder')}
            fieldType="select"
            selectOptions={[
              { value: "yes", label: t('form.marriage.allowWifeToDoJob.options.yes') },
              { value: "no", label: t('form.marriage.allowWifeToDoJob.options.no') },
            ]}
            onValueChange={(value) => handleFieldChange('allowWifeToDoJob', value)}
          />
          <FormField
            control={form.control}
            name="liveWithWifeAfterMarriage"
            label={t('form.marriage.liveWithWifeAfterMarriage.label')}
            placeholder={t('form.marriage.liveWithWifeAfterMarriage.placeholder')}
            onValueChange={(value) => handleFieldChange('liveWithWifeAfterMarriage', value)}
          />
        </>
      )}

      {/* Female specific fields */}
      {isFemale && (
        <>
          <FormField
            control={form.control}
            name="wantToDoJobAfterMarriage"
            label={t('form.marriage.wantToDoJobAfterMarriage.label')}
            placeholder={t('form.marriage.wantToDoJobAfterMarriage.placeholder')}
            fieldType="select"
            selectOptions={[
              { value: "yes", label: t('form.marriage.wantToDoJobAfterMarriage.options.yes') },
              { value: "no", label: t('form.marriage.wantToDoJobAfterMarriage.options.no') },
            ]}
            onValueChange={(value) => handleFieldChange('wantToDoJobAfterMarriage', value)}
          />
          <FormField
            control={form.control}
            name="wantToStudyAfterMarriage"
            label={t('form.marriage.wantToStudyAfterMarriage.label')}
            placeholder={t('form.marriage.wantToStudyAfterMarriage.placeholder')}
            fieldType="select"
            selectOptions={[
              { value: "yes", label: t('form.marriage.wantToStudyAfterMarriage.options.yes') },
              { value: "no", label: t('form.marriage.wantToStudyAfterMarriage.options.no') },
            ]}
            onValueChange={(value) => handleFieldChange('wantToStudyAfterMarriage', value)}
          />
        </>
      )}
      <FormField
        control={form.control}
        name="marriageThoughts"
        label={t('form.marriage.marriageThoughts.label')}
        placeholder={t('form.marriage.marriageThoughts.placeholder')}
        onValueChange={(value) => handleFieldChange('marriageThoughts', value)}
      />
    </div>
  );
}
