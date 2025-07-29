'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { CgGenderMale } from "react-icons/cg";
import { GiCharacter } from "react-icons/gi";
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

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

interface SearchFilters {
  biodataType: string;
  maritalStatus: string;
  division: string;
  district: string;
  upazilla: string;
  address: string;
}

const SearchBar = () => {
  const router = useRouter();
  const { t } = useLanguage();
  
  // State for search filters
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    biodataType: 'all',
    maritalStatus: 'all',
    division: 'all',
    district: 'all',
    upazilla: 'all',
    address: ''
  });

  // State for location data
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [upazillas, setUpazillas] = useState<Upazilla[]>([]);
  const [loading, setLoading] = useState({
    divisions: false,
    districts: false,
    upazillas: false,
  });

  // Biodata Type options
  const biodataTypeOptions = [
    { value: 'all', label: t('searchBar.all') },
    { value: 'males biodata', label: t('searchBar.malesBiodata') },
    { value: 'females biodata', label: t('searchBar.femalesBiodata') }
  ];

  // Marital status options
  const maritalStatusOptions = [
    { value: 'all', label: t('searchBar.all') },
    { value: 'single', label: t('searchBar.single') },
    { value: 'married', label: t('searchBar.married') },
    { value: 'divorced', label: t('searchBar.divorced') }
  ];

  // Fetch divisions
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

  // Fetch districts
  const fetchDistricts = useCallback(
    async (divisionName: string) => {
      if (!divisionName || divisionName === 'all') {
        setDistricts([]);
        setUpazillas([]);
        return;
      }
      
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

  // Fetch upazillas
  const fetchUpazillas = useCallback(
    async (districtName: string) => {
      if (!districtName || districtName === 'all') {
        setUpazillas([]);
        return;
      }
      
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

  // Load divisions on component mount
  useEffect(() => {
    fetchDivisions();
  }, [fetchDivisions]);

  // Load districts when division changes
  useEffect(() => {
    if (searchFilters.division && searchFilters.division !== 'all') {
      fetchDistricts(searchFilters.division);
    }
  }, [searchFilters.division, fetchDistricts]);

  // Load upazillas when district changes
  useEffect(() => {
    if (searchFilters.district && searchFilters.district !== 'all') {
      fetchUpazillas(searchFilters.district);
    }
  }, [searchFilters.district, fetchUpazillas]);

  // Handle filter changes
  const handleFilterChange = (filterType: keyof SearchFilters, value: string) => {
    setSearchFilters(prev => {
      const newFilters = { ...prev, [filterType]: value };
      
      // Reset dependent filters when parent changes
      if (filterType === 'division') {
        newFilters.district = 'all';
        newFilters.upazilla = 'all';
      } else if (filterType === 'district') {
        newFilters.upazilla = 'all';
      }
      
      return newFilters;
    });
  };

  // Handle search
  const handleSearch = () => {
    // Validate required fields
    if (!searchFilters.biodataType || searchFilters.biodataType === '') {
      alert(t('searchBar.selectBiodataType'));
      return;
    }

    // Create search object with only non-'all' values
    const searchParams: Partial<SearchFilters> = {};
    
    Object.entries(searchFilters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        searchParams[key as keyof SearchFilters] = value;
      }
    });

    // Store search parameters in sessionStorage
    sessionStorage.setItem('searchFilters', JSON.stringify(searchParams));
    
    console.log('Search parameters:', searchParams);
    
    // Navigate to search page with clean URL
    router.push('/search');
  };

  return (
    <div className="z-10 absolute bottom-10 left-1/2 transform -translate-x-1/2 w-[95%] sm:w-[90%] max-w-[1200px] bg-white min-h-[60px] rounded-lg text-gray p-3 sm:p-6 flex flex-wrap items-center justify-center sm:justify-between gap-2 sm:gap-4">
      {/* Biodata Type Selection */}
      <div className="flex gap-2 items-center">
        <CgGenderMale className="text-[16px] sm:text-[18px] flex-shrink-0" />
        <Select value={searchFilters.biodataType} onValueChange={(value) => handleFilterChange('biodataType', value)}>
          <SelectTrigger className="w-[110px] sm:w-[120px] h-[32px] sm:h-[35px] text-[12px] sm:text-[14px] font-semibold border-none bg-transparent">
            <SelectValue placeholder={t('searchBar.biodataType')} />
          </SelectTrigger>
          <SelectContent>
            {biodataTypeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Marital Status Selection */}
      <div className="flex gap-2 items-center">
        <GiCharacter className="text-[16px] sm:text-[18px] flex-shrink-0" />
        <Select value={searchFilters.maritalStatus} onValueChange={(value) => handleFilterChange('maritalStatus', value)}>
          <SelectTrigger className="w-[100px] sm:w-[110px] h-[32px] sm:h-[35px] text-[12px] sm:text-[14px] font-semibold border-none bg-transparent">
            <SelectValue placeholder={t('searchBar.marital')} />
          </SelectTrigger>
          <SelectContent>
            {maritalStatusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Location Selection */}
      <div className="flex gap-1 sm:gap-2 items-center flex-wrap">
        <FaLocationDot className="text-[16px] sm:text-[18px] flex-shrink-0" />
        
        {/* Division Select */}
        <Select value={searchFilters.division} onValueChange={(value) => handleFilterChange('division', value)}>
          <SelectTrigger className="w-[90px] sm:w-[100px] h-[32px] sm:h-[35px] text-[12px] sm:text-[14px] font-semibold border-none bg-transparent">
            <SelectValue placeholder={loading.divisions ? t('common.loading') : t('searchBar.division')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('searchBar.allDivisions')}</SelectItem>
            {divisions.map((division) => (
              <SelectItem key={division.id} value={division.name}>
                {division.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* District Select */}
        <Select 
          value={searchFilters.district} 
          onValueChange={(value) => handleFilterChange('district', value)}
          disabled={searchFilters.division === 'all' || !searchFilters.division}
        >
          <SelectTrigger className="w-[90px] sm:w-[100px] h-[32px] sm:h-[35px] text-[12px] sm:text-[14px] font-semibold border-none bg-transparent">
            <SelectValue placeholder={loading.districts ? t('common.loading') : t('searchBar.district')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('searchBar.allDistricts')}</SelectItem>
            {districts.map((district) => (
              <SelectItem key={district.id} value={district.name}>
                {district.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Upazilla Select */}
        <Select 
          value={searchFilters.upazilla} 
          onValueChange={(value) => handleFilterChange('upazilla', value)}
          disabled={searchFilters.district === 'all' || !searchFilters.district}
        >
          <SelectTrigger className="w-[90px] sm:w-[100px] h-[32px] sm:h-[35px] text-[12px] sm:text-[14px] font-semibold border-none bg-transparent">
            <SelectValue placeholder={loading.upazillas ? t('common.loading') : t('searchBar.upazilla')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('searchBar.allUpazillas')}</SelectItem>
            {upazillas.map((upazilla) => (
              <SelectItem key={upazilla.id} value={upazilla.name}>
                {upazilla.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Search Button */}
      <button 
        onClick={handleSearch}
        className="flex items-center gap-2 btn-primary text-white px-3 sm:px-4 py-2 rounded-md text-[12px] sm:text-[14px] flex-shrink-0 w-full sm:w-auto justify-center mt-2 sm:mt-0"
      >
        <FaSearch className="text-[14px] sm:text-[16px]" />
        {t('common.search')}
      </button>
    </div>
  )
}

export default SearchBar
