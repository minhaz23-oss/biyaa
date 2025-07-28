'use client';

import { useFormContext } from 'react-hook-form';
import FormField from '@/components/FormField';
import { useDispatch } from 'react-redux';
import { updateBiodataField } from '@/redux/biodataSlice';
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const PersonalDetailsForm = () => {
  const { control, watch, setValue, clearErrors } = useFormContext();
  const dispatch = useDispatch();
  const { t } = useLanguage();

  const handleFieldChange = (field: string, value: any) => {
    dispatch(updateBiodataField({ field, value }));
  };

  const biodataType = watch('biodataType');
  const hasBeard = watch('hasBeard');
  const wearNiqab = watch('wearNiqab');
  const isMale = biodataType === 'males biodata';
  const isFemale = biodataType === 'females biodata';

  // Clear conditional fields when biodataType changes
  useEffect(() => {
    if (biodataType) {
      if (biodataType === 'males biodata') {
        // Clear female fields
        setValue('wearNiqab', '');
        setValue('niqabSince', '');
        clearErrors('wearNiqab');
        clearErrors('niqabSince');
      } else if (biodataType === 'females biodata') {
        // Clear male fields
        setValue('hasBeard', '');
        setValue('beardSince', '');
        setValue('clothesAboveAnkles', '');
        clearErrors('hasBeard');
        clearErrors('beardSince');
        clearErrors('clothesAboveAnkles');
      }
    }
  }, [biodataType, setValue, clearErrors]);

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="clothing"
        label={t('form.personalDetails.clothing.label')}
        onValueChange={(value) => handleFieldChange('clothing', value)}
      />

      {/* Male specific fields */}
      {isMale && (
        <>
          <FormField
            control={control}
            name="hasBeard"
            label={t('form.personalDetails.hasBeard.label')}
            placeholder={t('form.personalDetails.hasBeard.placeholder')}
            fieldType="select"
            selectOptions={[
              { value: "yes", label: t('form.personalDetails.hasBeard.options.yes') },
              { value: "no", label: t('form.personalDetails.hasBeard.options.no') },
            ]}
            onValueChange={(value) => {
              handleFieldChange('hasBeard', value);
              if (value === 'no') {
                setValue('beardSince', '');
                clearErrors('beardSince');
              }
            }}
          />

          {hasBeard === 'yes' && (
            <FormField
              control={control}
              name="beardSince"
              label={t('form.personalDetails.beardSince.label')}
              onValueChange={(value) => handleFieldChange('beardSince', value)}
            />
          )}

          <FormField
            control={control}
            name="clothesAboveAnkles"
            label={t('form.personalDetails.clothesAboveAnkles.label')}
            placeholder={t('form.personalDetails.clothesAboveAnkles.placeholder')}
            fieldType="select"
            selectOptions={[
              { value: "yes", label: t('form.personalDetails.clothesAboveAnkles.options.yes') },
              { value: "no", label: t('form.personalDetails.clothesAboveAnkles.options.no') },
            ]}
            onValueChange={(value) => handleFieldChange('clothesAboveAnkles', value)}
          />
        </>
      )}

      {/* Female specific fields */}
      {isFemale && (
        <>
          <FormField
            control={control}
            name="wearNiqab"
            label={t('form.personalDetails.wearNiqab.label')}
            placeholder={t('form.personalDetails.wearNiqab.placeholder')}
            fieldType="select"
            selectOptions={[
              { value: "yes", label: t('form.personalDetails.wearNiqab.options.yes') },
              { value: "no", label: t('form.personalDetails.wearNiqab.options.no') },
            ]}
            onValueChange={(value) => {
              handleFieldChange('wearNiqab', value);
              if (value === 'no') {
                setValue('niqabSince', '');
                clearErrors('niqabSince');
              }
            }}
          />

          {wearNiqab === 'yes' && (
            <FormField
              control={control}
              name="niqabSince"
              label={t('form.personalDetails.niqabSince.label')}
              onValueChange={(value) => handleFieldChange('niqabSince', value)}
            />
          )}
        </>
      )}

      <FormField
        control={control}
        name="praysFiveTimes"
        label={t('form.personalDetails.praysFiveTimes.label')}
        placeholder={t('form.personalDetails.praysFiveTimes.placeholder')}
        fieldType="select"
        selectOptions={[
          { value: "yes", label: t('form.personalDetails.praysFiveTimes.options.yes') },
          { value: "no", label: t('form.personalDetails.praysFiveTimes.options.no') },
        ]}
        onValueChange={(value) => handleFieldChange('praysFiveTimes', value)}
      />

      <FormField
        control={control}
        name="mahramNonMahram"
        label={t('form.personalDetails.mahramNonMahram.label')}
        placeholder={t('form.personalDetails.mahramNonMahram.placeholder')}
        fieldType="select"
        selectOptions={[
          { value: "yes", label: t('form.personalDetails.mahramNonMahram.options.yes') },
          { value: "no", label: t('form.personalDetails.mahramNonMahram.options.no') },
        ]}
        onValueChange={(value) => handleFieldChange('mahramNonMahram', value)}
      />

      <FormField
        control={control}
        name="recitesQuran"
        label={t('form.personalDetails.recitesQuran.label')}
        placeholder={t('form.personalDetails.recitesQuran.placeholder')}
        fieldType="select"
        selectOptions={[
          { value: "yes", label: t('form.personalDetails.recitesQuran.options.yes') },
          { value: "no", label: t('form.personalDetails.recitesQuran.options.no') },
        ]}
        onValueChange={(value) => handleFieldChange('recitesQuran', value)}
      />

      <FormField
        control={control}
        name="fiqh"
        label={t('form.personalDetails.fiqh.label')}
        placeholder={t('form.personalDetails.fiqh.placeholder')}
        fieldType="select"
        selectOptions={[
          { value: "hanafi", label: t('form.personalDetails.fiqh.options.hanafi') },
          { value: "maliki", label: t('form.personalDetails.fiqh.options.maliki') },
          { value: "shafi'i", label: t('form.personalDetails.fiqh.options.shafii') },
          { value: "hanbali", label: t('form.personalDetails.fiqh.options.hanbali') },
          { value: "ahle hadis/salafi", label: t('form.personalDetails.fiqh.options.ahleHadisSalafi') },
        ]}
        onValueChange={(value) => handleFieldChange('fiqh', value)}
      />

      <FormField
        control={control}
        name="diseases"
        label={t('form.personalDetails.diseases.label')}
        onValueChange={(value) => handleFieldChange('diseases', value)}
      />

        <FormField
        control={control}
        name="dramasMoviesSongs"
        label={t('form.personalDetails.dramasMoviesSongs.label')}
        placeholder={t('form.personalDetails.dramasMoviesSongs.placeholder')}
        fieldType="select"
        selectOptions={[
          { value: "yes", label: t('form.personalDetails.dramasMoviesSongs.options.yes') },
          { value: "no", label: t('form.personalDetails.dramasMoviesSongs.options.no') },
        ]}
        onValueChange={(value) => handleFieldChange('dramasMoviesSongs', value)}
      />

      <FormField
        control={control}
        name="mazarBeliefs"
        label={t('form.personalDetails.mazarBeliefs.label')}
        onValueChange={(value) => handleFieldChange('mazarBeliefs', value)}
      />

      <FormField
        control={control}
        name="hobbies"
        label={t('form.personalDetails.hobbies.label')}
        onValueChange={(value) => handleFieldChange('hobbies', value)}
      />
    </div>
  );
};

export default PersonalDetailsForm;