'use client';

import { useFormContext } from 'react-hook-form';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useDispatch } from 'react-redux';
import { updateBiodataField } from '@/redux/biodataSlice';
import FormField from '@/components/FormField';
import { useLanguage } from '@/contexts/LanguageContext';

const PledgeForm = () => {
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
        name="parentsKnow"
        label={t('form.pledge.parentsKnow.label')}
        fieldType="select"
        selectOptions={[
          { value: "yes", label: t('form.pledge.parentsKnow.options.yes') },
          { value: "no", label: t('form.pledge.parentsKnow.options.no') },
        ]}
        onValueChange={(value) => handleFieldChange('parentsKnow', value)}
      />
      
      <FormField
        control={control}
        name="allInfoTrue"
        label={t('form.pledge.allInfoTrue.label')}
        fieldType="select"
        selectOptions={[
          { value: "yes", label: t('form.pledge.allInfoTrue.options.yes') },
          { value: "no", label: t('form.pledge.allInfoTrue.options.no') },
        ]}
        onValueChange={(value) => handleFieldChange('allInfoTrue', value)}
      />
    </div>
  );
};

export default PledgeForm;