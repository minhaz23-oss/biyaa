'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateBiodataField } from '@/redux/biodataSlice';
import { Checkbox } from '@/components/ui/checkbox';
import FormField from '@/components/FormField';
import { useLanguage } from '@/contexts/LanguageContext';

// Define types for the API responses
interface Division {
  id: string;
  name: string;
}

interface District {
  id: string;
  name: string;
}
interface Upazilla {
  id: string;
  name: string;
}

interface AddressFormProps {
  type: 'present' | 'permanent';
  title: string;
}

const AddressForm: React.FC<AddressFormProps> = ({ type, title }) => {
  const { control, setValue, watch } = useFormContext();
  const dispatch = useDispatch();
  const { t } = useLanguage();

  const [divisions, setDivisions] = useState<Division[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [upazillas, setUpazillas] = useState<Upazilla[]>([]);
  const [loading, setLoading] = useState({
    divisions: false,
    districts: false,
    upazillas: false,
  });

  const selectedDivision = watch(`${type}Division`);
  const selectedDistrict = watch(`${type}District`);

  const fetchDivisions = useCallback(async () => {
    setLoading((prev) => ({ ...prev, divisions: true }));
    try {
      const response = await fetch('https://bdapi.vercel.app/api/v.1/division');
      const data = await response.json();
      if (data.data) {
        setDivisions(data.data);
      }
    } catch (error) {
      console.error('Error fetching divisions:', error);
    } finally {
      setLoading((prev) => ({ ...prev, divisions: false }));
    }
  }, []);

  const fetchDistricts = useCallback(
    async (divisionName: string) => {
      if (!divisionName) return;
      const division = divisions.find((d) => d.name === divisionName);
      if (!division) return;

      setLoading((prev) => ({ ...prev, districts: true }));
      setDistricts([]);
      setUpazillas([]);
      try {
        const response = await fetch(
          `https://bdapi.vercel.app/api/v.1/district/${division.id}`
        );
        const data = await response.json();
        if (data.data) {
          setDistricts(data.data);
        }
      } catch (error) {
        console.error('Error fetching districts:', error);
      } finally {
        setLoading((prev) => ({ ...prev, districts: false }));
      }
    },
    [divisions]
  );

  const fetchUpazillas = useCallback(
    async (districtName: string) => {
      if (!districtName) return;
      const district = districts.find((d) => d.name === districtName);
      if (!district) return;
      setLoading((prev) => ({ ...prev, upazillas: true }));
      setUpazillas([]);
      try {
        const response = await fetch(
          `https://bdapi.vercel.app/api/v.1/upazilla/${district.id}`
        );
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          setUpazillas(data.data);
        }
      } catch (error) {
        console.error('Error fetching upazillas:', error);
      } finally {
        setLoading((prev) => ({ ...prev, upazillas: false }));
      }
    },
    [districts]
  );

  useEffect(() => {
    fetchDivisions();
    setValue(`${type}Country`, 'Bangladesh');
  }, [fetchDivisions, setValue, type]);

  useEffect(() => {
    if (selectedDivision) {
      fetchDistricts(selectedDivision);
    }
  }, [selectedDivision, fetchDistricts]);

  useEffect(() => {
    if (selectedDistrict) {
      fetchUpazillas(selectedDistrict);
    }
  }, [selectedDistrict, fetchUpazillas]);

  const handleFieldChange = (field: any, value: any) => {
    const fieldName = `${type}${field.charAt(0).toUpperCase() + field.slice(1)}`;
    setValue(fieldName, value);
    dispatch(updateBiodataField({ field: fieldName, value }));
  };

  return (
    <div className="space-y-4 border p-4 rounded-md">
      <h3 className="text-lg font-medium">{title}</h3>
      <FormField
        control={control}
        name={`${type}Country`}
        label={t('form.address.country.label')}
        placeholder={t('form.address.country.placeholder')}
        fieldType="select"
        selectOptions={[{ value: 'Bangladesh', label: 'Bangladesh' }]}
        onValueChange={(value) => handleFieldChange('country', value)}
      />

      <FormField
        control={control}
        name={`${type}Division`}
        label={t('form.address.division.label')}
        placeholder={loading.divisions ? t('common.loading') : t('form.address.division.placeholder')}
        fieldType="select"
        selectOptions={divisions.map((division) => ({ value: division.name, label: division.name }))}
        onValueChange={(value) => handleFieldChange('division', value)}
      />

      <FormField
        control={control}
        name={`${type}District`}
        label={t('form.address.district.label')}
        placeholder={loading.districts ? t('common.loading') : t('form.address.district.placeholder')}
        fieldType="select"
        selectOptions={districts.map((district) => ({ value: district.name, label: district.name }))}
        onValueChange={(value) => handleFieldChange('district', value)}
      />

      <FormField
        control={control}
        name={`${type}Upazilla`}
        label={t('form.address.upazilla.label')}
        placeholder={loading.upazillas ? t('common.loading') : t('form.address.upazilla.placeholder')}
        fieldType="select"
        selectOptions={upazillas.map((upazilla) => ({ value: upazilla.name, label: upazilla.name }))}
        onValueChange={(value) => handleFieldChange('upazilla', value)}
      />
    </div>
  );
};

const Address = () => {
  const { setValue, watch } = useFormContext();
  const { t } = useLanguage();
  const presentCountry = watch('presentCountry');
  const presentDivision = watch('presentDivision');
  const presentDistrict = watch('presentDistrict');
  const presentUpazilla = watch('presentUpazilla');

  const handleSameAsPresentChange = (checked: boolean) => {
    if (checked) {
      setValue('permanentCountry', presentCountry);
      setValue('permanentDivision', presentDivision);
      setValue('permanentDistrict', presentDistrict);
      setValue('permanentUpazilla', presentUpazilla);
    } else {
      setValue('permanentCountry', 'Bangladesh');
      setValue('permanentDivision', '');
      setValue('permanentDistrict', '');
      setValue('permanentUpazilla', '');
    }
  };

  return (
    <div className="space-y-8">
      <AddressForm type="present" title={t('form.address.presentAddress')} />
      <div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="same-as-present"
            onCheckedChange={handleSameAsPresentChange}
          />
          <label
            htmlFor="same-as-present"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {t('form.address.sameAsPresent')}
          </label>
        </div>
      </div>
      <AddressForm type="permanent" title={t('form.address.permanentAddress')} />
    </div>
  );
};

export default Address;