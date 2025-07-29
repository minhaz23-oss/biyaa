'use client'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { searchBiodata } from '@/lib/actions/biodata.actions'
import { useAuth } from '@/lib/hooks/useAuth'
import { CgGenderMale } from "react-icons/cg";
import { GiCharacter } from "react-icons/gi";
import { FaSearch, FaFilter, FaTimes  } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdHeight, MdWork } from "react-icons/md";
import { BsPersonBadge } from "react-icons/bs";
import { FaBirthdayCake } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from '@/contexts/LanguageContext'

interface SearchFilters {
  maritalStatus?: string;
  division?: string;
  district?: string;
  upazilla?: string;
  biodataType?: string;
  address?: string;
  complexion?: string;
  familyStatus?: string;
  height?: string;
  age?: string;
  profession?: string;
}

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

const SearchPage = () => {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const { t } = useLanguage()
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    maritalStatus: 'all',
    division: 'all',
    district: 'all',
    upazilla: 'all',
    biodataType: 'all',
    address: '',
    complexion: 'all',
    familyStatus: 'all',
    height: 'all',
    age: 'all',
    profession: 'all'
  })
  const [loading, setLoading] = useState(true)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [resultsLoading, setResultsLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [mobileFilterMenuOpen, setMobileFilterMenuOpen] = useState(false)

  // State for location data
  const [divisions, setDivisions] = useState<Division[]>([])
  const [districts, setDistricts] = useState<District[]>([])
  const [upazillas, setUpazillas] = useState<Upazilla[]>([])
  const [locationLoading, setLocationLoading] = useState({
    divisions: false,
    districts: false,
    upazillas: false,
  })

  // Filter options
  const maritalStatusOptions = [
    { value: 'all', label: t('search.filterOptions.all') },
    { value: 'single', label: t('search.filterOptions.single') },
    { value: 'married', label: t('search.filterOptions.married') },
    { value: 'divorced', label: t('search.filterOptions.divorced') },
    { value: 'widowed', label: t('search.filterOptions.widowed') }
  ]

  const biodataTypeOptions = [
    { value: 'all', label: t('search.filterOptions.all') },
    { value: 'males biodata', label: t('search.filterOptions.males_biodata') },
    { value: 'females biodata', label: t('search.filterOptions.females_biodata') }
  ]

  const complexionOptions = [
    { value: 'all', label: t('search.filterOptions.all') },
    { value: 'fair', label: t('search.filterOptions.fair') },
    { value: 'medium', label: t('search.filterOptions.medium') },
    { value: 'dark', label: t('search.filterOptions.dark') }
  ]

  const familyStatusOptions = [
    { value: 'all', label: t('search.filterOptions.all') },
    { value: 'upper_class', label: t('search.filterOptions.upper_class') },
    { value: 'upper_middle', label: t('search.filterOptions.upper_middle') },
    { value: 'middle_class', label: t('search.filterOptions.middle_class') },
    { value: 'lower_middle', label: t('search.filterOptions.lower_middle') },
    { value: 'lower_class', label: t('search.filterOptions.lower_class') }
  ]

  const heightOptions = [
    { value: 'all', label: t('search.filterOptions.all') },
    { value: '5_0', label: '5\'0"' },
    { value: '5_1', label: '5\'1"' },
    { value: '5_2', label: '5\'2"' },
    { value: '5_3', label: '5\'3"' },
    { value: '5_4', label: '5\'4"' },
    { value: '5_5', label: '5\'5"' },
    { value: '5_6', label: '5\'6"' },
    { value: '5_7', label: '5\'7"' },
    { value: '5_8', label: '5\'8"' },
    { value: '5_9', label: '5\'9"' },
    { value: '5_10', label: '5\'10"' },
    { value: '5_11', label: '5\'11"' },
    { value: '6_0', label: '6\'0"' },
    { value: '6_1', label: '6\'1"' },
    { value: '6_2', label: '6\'2"' },
    { value: '6_3', label: '6\'3"' }
  ]

  const ageOptions = [
    { value: 'all', label: t('search.filterOptions.all') },
    { value: '18_25', label: '18-25' },
    { value: '26_30', label: '26-30' },
    { value: '31_35', label: '31-35' },
    { value: '36_40', label: '36-40' },
    { value: '41_45', label: '41-45' },
    { value: '46_50', label: '46-50' },
    { value: '51_plus', label: '51+' }
  ]

  const professionOptions = [
    { value: 'all', label: t('search.filterOptions.all') },
    { value: 'student', label: t('search.filterOptions.student') },
    { value: 'teacher', label: t('search.filterOptions.teacher') },
    { value: 'engineer', label: t('search.filterOptions.engineer') },
    { value: 'doctor', label: t('search.filterOptions.doctor') },
    { value: 'business', label: t('search.filterOptions.business') },
    { value: 'government', label: t('search.filterOptions.government_job') },
    { value: 'private', label: t('search.filterOptions.private_job') },
    { value: 'freelancer', label: t('search.filterOptions.freelancer') },
    { value: 'other', label: t('search.filterOptions.other') }
  ]

  // Fetch divisions
  const fetchDivisions = useCallback(async () => {
    setLocationLoading((prev) => ({ ...prev, divisions: true }))
    try {
      const response = await fetch('https://bdapi.vercel.app/api/v.1/division')
      const data = await response.json()
      if (data.data) {
        setDivisions(data.data)
      }
    } catch (error) {
      console.error('Error fetching divisions:', error)
    } finally {
      setLocationLoading((prev) => ({ ...prev, divisions: false }))
    }
  }, [])

  // Fetch districts
  const fetchDistricts = useCallback(
    async (divisionName: string) => {
      if (!divisionName || divisionName === 'all') {
        setDistricts([])
        setUpazillas([])
        return
      }
      
      const division = divisions.find((d) => d.name === divisionName)
      if (!division) return

      setLocationLoading((prev) => ({ ...prev, districts: true }))
      setDistricts([])
      setUpazillas([])
      try {
        const response = await fetch(
          `https://bdapi.vercel.app/api/v.1/district/${division.id}`
        )
        const data = await response.json()
        if (data.data) {
          setDistricts(data.data)
        }
      } catch (error) {
        console.error('Error fetching districts:', error)
      } finally {
        setLocationLoading((prev) => ({ ...prev, districts: false }))
      }
    },
    [divisions]
  )

  // Fetch upazillas
  const fetchUpazillas = useCallback(
    async (districtName: string) => {
      if (!districtName || districtName === 'all') {
        setUpazillas([])
        return
      }
      
      const district = districts.find((d) => d.name === districtName)
      if (!district) return
      
      setLocationLoading((prev) => ({ ...prev, upazillas: true }))
      setUpazillas([])
      try {
        const response = await fetch(
          `https://bdapi.vercel.app/api/v.1/upazilla/${district.id}`
        )
        const data = await response.json()
        if (data.data && data.data.length > 0) {
          setUpazillas(data.data)
        }
      } catch (error) {
        console.error('Error fetching upazillas:', error)
      } finally {
        setLocationLoading((prev) => ({ ...prev, upazillas: false }))
      }
    },
    [districts]
  )

  // Prevent body scrolling when mobile filter menu is open
  useEffect(() => {
    if (mobileFilterMenuOpen) {
      // Prevent scrolling when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scrolling when menu is closed
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileFilterMenuOpen]);

  useEffect(() => {
    fetchDivisions()
  }, [fetchDivisions])

  useEffect(() => {
    if (searchFilters.division && searchFilters.division !== 'all') {
      fetchDistricts(searchFilters.division)
    }
  }, [searchFilters.division, fetchDistricts])

  useEffect(() => {
    if (searchFilters.district && searchFilters.district !== 'all') {
      fetchUpazillas(searchFilters.district)
    }
  }, [searchFilters.district, fetchUpazillas])

  useEffect(() => {
    // Get search parameters from sessionStorage
    const storedFilters = sessionStorage.getItem('searchFilters')
    
    if (storedFilters) {
      try {
        const parsedFilters = JSON.parse(storedFilters)
        setSearchFilters(prev => ({ ...prev, ...parsedFilters }))
        // Trigger search immediately
        performSearch({ ...searchFilters, ...parsedFilters })
      } catch (error) {
        console.error('Error parsing search filters:', error)
      }
    }
    
    setLoading(false)
  }, [router])

  const performSearch = async (filters: SearchFilters) => {
    setResultsLoading(true)
    try {
      // Call the server action with userId for filtering ignored biodata
      const userId = isAuthenticated ? user?.uid : undefined
      const result = await searchBiodata(filters, 1, 20, 'createdAt', 'desc', userId)
      
      if (result.success && result.data) {
        setSearchResults(result.data)
      } else {
        console.error('Search failed:', result.message)
        setSearchResults([])
      }
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
    } finally {
      setResultsLoading(false)
    }
  }

  const handleFilterChange = (filterType: keyof SearchFilters, value: string) => {
    setSearchFilters(prev => {
      const newFilters = { ...prev, [filterType]: value }
      
      // Reset dependent filters when parent changes
      if (filterType === 'division') {
        newFilters.district = 'all'
        newFilters.upazilla = 'all'
      } else if (filterType === 'district') {
        newFilters.upazilla = 'all'
      }
      
      return newFilters
    })
  }

  const handleSearch = async () => {
    // Create search object with only non-'all' and non-empty values
    const searchParams: Partial<SearchFilters> = {}
    
    Object.entries(searchFilters).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== '') {
        searchParams[key as keyof SearchFilters] = value
      }
    })

    // Update sessionStorage
    sessionStorage.setItem('searchFilters', JSON.stringify(searchParams))
    
    console.log('Search parameters:', searchParams)
    
    // Perform search using server action
    await performSearch(searchParams)
  }

  const handleNewSearch = () => {
    // Clear current search and go back to home
    sessionStorage.removeItem('searchFilters')
    router.push('/')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!searchFilters) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">{t('search.noSearchParams')}</h2>
          <button 
            onClick={handleNewSearch}
            className="btn-primary"
          >
            {t('search.startNewSearch')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Search Header */}
      <div className="bg-white border border-primary/80 rounded-lg shadow-sm  p-6 mb-6">
        <div className="flex flex-col gap-1 sm:gap-0 sm:flex-row items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{t('search.title')}</h1>
          <div className="flex gap-2 items-center">
            {/* Desktop Filter Button */}
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="hidden md:flex btn-secondary items-center gap-2"
            >
              <FaFilter className="text-sm" />
              {showFilters ? t('search.hideFilters') : t('search.showFilters')}
            </button>
            
            {/* Mobile Filter Button */}
            <button 
              onClick={() => setMobileFilterMenuOpen(true)}
              className="md:hidden btn-secondary flex items-center gap-2"
            >
              <FaFilter className="text-sm" />
              {t('search.showFilters')}
            </button>
            
            <button 
              onClick={handleSearch}
              className="btn-primary"
            >
               {t('search.searchNow')}
            </button>
          </div>
        </div>
        
        {/* Active Filters Preview */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-700 mb-3">{t('search.activeFilters')}:</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(searchFilters)
              .filter(([key, value]) => value && value !== 'all' && value !== '')
              .map(([key, value]) => (
                <span 
                  key={key}
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                >
                  {t(`search.filterNames.${key}`)}: <span className=' mx-1 text-black'>{value}</span>
                </span>
              ))}
            {Object.entries(searchFilters).filter(([key, value]) => value && value !== 'all' && value !== '').length === 0 && (
              <span className="text-gray-500 text-sm">{t('search.noFiltersApplied')}</span>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Comprehensive Search Filters */}
      {showFilters && (
        <div className="hidden md:block bg-white rounded-lg shadow-sm border border-primary/80 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">{t('common.filter')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700 border-b pb-2">{t('search.sections.basicInformation')}</h3>
              
{/* Age */}
              <div className="flex gap-2 items-center">
                <FaBirthdayCake className="text-lg flex-shrink-0" />
                <span className="text-sm">{t('search.labels.age')}</span>
                <Select value={searchFilters.age} onValueChange={(value) => handleFilterChange('age', value)}>
                  <SelectTrigger className="w-full h-9 text-sm border border-primary/80">
                    <SelectValue placeholder="Age Range" />
                  </SelectTrigger>
                  <SelectContent>
                    {ageOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
{/* Height */}
              <div className="flex gap-2 items-center">
                <MdHeight className="text-lg flex-shrink-0" />
                <span className="text-sm">{t('search.labels.height')}</span>
                <Select value={searchFilters.height} onValueChange={(value) => handleFilterChange('height', value)}>
                  <SelectTrigger className="w-full h-9 text-sm border border-primary/80">
                    <SelectValue placeholder="Height" />
                  </SelectTrigger>
                  <SelectContent>
                    {heightOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
{/* Complexion */}
              <div className="flex gap-2 items-center">
                <BsPersonBadge className="text-lg flex-shrink-0" />
                <span className="text-sm">{t('search.labels.complexion')}</span>
                <Select value={searchFilters.complexion} onValueChange={(value) => handleFilterChange('complexion', value)}>
                  <SelectTrigger className="w-full h-9 text-sm border border-primary/80">
                    <SelectValue placeholder="Complexion" />
                  </SelectTrigger>
                  <SelectContent>
                    {complexionOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Personal & Social */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700 border-b pb-2">{t('search.sections.personalSocial')}</h3>
              
{/* Marital Status */}
              <div className="flex gap-2 items-center">
                <GiCharacter className="text-lg flex-shrink-0" />
                <span className="text-sm">{t('search.labels.maritalStatus')}</span>
                <Select value={searchFilters.maritalStatus} onValueChange={(value) => handleFilterChange('maritalStatus', value)}>
                  <SelectTrigger className="w-full h-9 text-sm border border-primary/80">
                    <SelectValue placeholder="Marital Status" />
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
              
{/* Family Status */}
              <div className="flex gap-2 items-center">
                <BsPersonBadge className="text-lg flex-shrink-0" />
                <span className="text-sm">{t('search.labels.familyStatus')}</span>
                <Select value={searchFilters.familyStatus} onValueChange={(value) => handleFilterChange('familyStatus', value)}>
                  <SelectTrigger className="w-full h-9 text-sm border border-primary/80">
                    <SelectValue placeholder="Family Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {familyStatusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
{/* Profession */}
              <div className="flex gap-2 items-center">
                <MdWork className="text-lg flex-shrink-0" />
                <span className="text-sm">{t('search.labels.profession')}</span>
                <Select value={searchFilters.profession} onValueChange={(value) => handleFilterChange('profession', value)}>
                  <SelectTrigger className="w-full h-9 text-sm border border-primary/80">
                    <SelectValue placeholder="Profession" />
                  </SelectTrigger>
                  <SelectContent>
                    {professionOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
{/* Biodata Type */}
              <div className="flex gap-2 items-center">
                <BsPersonBadge className="text-lg flex-shrink-0" />
                <span className="text-sm">{t('search.labels.biodataType')}</span>
                <Select value={searchFilters.biodataType} onValueChange={(value) => handleFilterChange('biodataType', value)}>
                  <SelectTrigger className="w-full h-9 text-sm border border-primary/80">
                    <SelectValue placeholder="Biodata Type" />
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
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700 border-b pb-2">{t('search.sections.location')}</h3>
              
{/* Division */}
              <div className="flex gap-2 items-center">
                <FaLocationDot className="text-lg flex-shrink-0" />
                <span className="text-sm">{t('search.labels.division')}</span>
                <Select value={searchFilters.division} onValueChange={(value) => handleFilterChange('division', value)}>
                  <SelectTrigger className="w-full h-9 text-sm border border-primary/80">
                    <SelectValue placeholder={locationLoading.divisions ? "Loading..." : "Division"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Divisions</SelectItem>
                    {divisions.map((division) => (
                      <SelectItem key={division.id} value={division.name}>
                        {division.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
{/* District */}
              <div className="flex gap-2 items-center">
                <FaLocationDot className="text-lg flex-shrink-0" />
                <span className="text-sm">{t('search.labels.district')}</span>
                <Select 
                  value={searchFilters.district} 
                  onValueChange={(value) => handleFilterChange('district', value)}
                  disabled={searchFilters.division === 'all' || !searchFilters.division}
                >
                  <SelectTrigger className="w-full h-9 text-sm border border-primary/80">
                    <SelectValue placeholder={locationLoading.districts ? "Loading..." : "District"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Districts</SelectItem>
                    {districts.map((district) => (
                      <SelectItem key={district.id} value={district.name}>
                        {district.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
{/* Upazilla */}
              <div className="flex gap-2 items-center">
                <FaLocationDot className="text-lg flex-shrink-0" />
                <span className="text-sm">{t('search.labels.upazilla')}</span>
                <Select 
                  value={searchFilters.upazilla} 
                  onValueChange={(value) => handleFilterChange('upazilla', value)}
                  disabled={searchFilters.district === 'all' || !searchFilters.district}
                >
                  <SelectTrigger className="w-full h-9 text-sm border border-primary/80">
                    <SelectValue placeholder={locationLoading.upazillas ? "Loading..." : "Upazilla"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Upazillas</SelectItem>
                    {upazillas.map((upazilla) => (
                      <SelectItem key={upazilla.id} value={upazilla.name}>
                        {upazilla.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
{/* Address */}
              <div className="flex gap-2 items-center">
                <FaLocationDot className="text-lg flex-shrink-0" />
                <span className="text-sm">{t('search.labels.address')}</span>
                <input
                  type="text"
                  placeholder="Address (Optional)"
                  value={searchFilters.address || ''}
                  onChange={(e) => handleFilterChange('address', e.target.value)}
                  className="w-full h-9 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            {/* Search Actions */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700 border-b pb-2">{t('search.sections.actions')}</h3>
              
              <button 
                onClick={handleSearch}
                className="w-full flex items-center justify-center gap-2 btn-primary text-white px-4 py-2 rounded-md text-sm"
              >
                <FaSearch className="text-sm" />
                {t('search.buttons.searchNow')}
              </button>
              
              <button 
                onClick={() => {
                  setSearchFilters({
                    maritalStatus: 'all',
                    division: 'all',
                    district: 'all',
                    upazilla: 'all',
                    biodataType: 'all',
                    address: '',
                    complexion: 'all',
                    familyStatus: 'all',
                    height: 'all',
                    age: 'all',
                    profession: 'all'
                  })
                }}
                className="btn-secondary w-full"
              >
                {t('search.buttons.clearAllFilters')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Filter Menu - Slides in from right */}
      {mobileFilterMenuOpen && (
        <div className="fixed inset-0 bg-opacity-50 z-50 md:hidden transition-all duration-300 ease-in-out">
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
              <h2 className="text-lg font-semibold text-gray-900">{t('common.filter')}</h2>
              <button
                onClick={() => setMobileFilterMenuOpen(false)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors duration-200"
                aria-label="Close filter menu"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>
            
            {/* Scrollable Content */}
            <div className="p-4 space-y-6 pb-20">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700 border-b pb-2">{t('search.sections.basicInformation')}</h3>
                
                {/* Age */}
                <div className="space-y-2">
                  <div className="flex gap-2 items-center">
                    <FaBirthdayCake className="text-lg flex-shrink-0" />
                    <span className="text-sm font-medium">{t('search.labels.age')}</span>
                  </div>
                  <Select value={searchFilters.age} onValueChange={(value) => handleFilterChange('age', value)}>
                    <SelectTrigger className="w-full h-10 text-sm border border-primary/80">
                      <SelectValue placeholder="Age Range" />
                    </SelectTrigger>
                    <SelectContent>
                      {ageOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Height */}
                <div className="space-y-2">
                  <div className="flex gap-2 items-center">
                    <MdHeight className="text-lg flex-shrink-0" />
                    <span className="text-sm font-medium">{t('search.labels.height')}</span>
                  </div>
                  <Select value={searchFilters.height} onValueChange={(value) => handleFilterChange('height', value)}>
                    <SelectTrigger className="w-full h-10 text-sm border border-primary/80">
                      <SelectValue placeholder="Height" />
                    </SelectTrigger>
                    <SelectContent>
                      {heightOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Complexion */}
                <div className="space-y-2">
                  <div className="flex gap-2 items-center">
                    <BsPersonBadge className="text-lg flex-shrink-0" />
                    <span className="text-sm font-medium">{t('search.labels.complexion')}</span>
                  </div>
                  <Select value={searchFilters.complexion} onValueChange={(value) => handleFilterChange('complexion', value)}>
                    <SelectTrigger className="w-full h-10 text-sm border border-primary/80">
                      <SelectValue placeholder="Complexion" />
                    </SelectTrigger>
                    <SelectContent>
                      {complexionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Personal & Social */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700 border-b pb-2">{t('search.sections.personalSocial')}</h3>
                
                {/* Marital Status */}
                <div className="space-y-2">
                  <div className="flex gap-2 items-center">
                    <GiCharacter className="text-lg flex-shrink-0" />
                    <span className="text-sm font-medium">{t('search.labels.maritalStatus')}</span>
                  </div>
                  <Select value={searchFilters.maritalStatus} onValueChange={(value) => handleFilterChange('maritalStatus', value)}>
                    <SelectTrigger className="w-full h-10 text-sm border border-primary/80">
                      <SelectValue placeholder="Marital Status" />
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
                
                {/* Family Status */}
                <div className="space-y-2">
                  <div className="flex gap-2 items-center">
                    <BsPersonBadge className="text-lg flex-shrink-0" />
                    <span className="text-sm font-medium">{t('search.labels.familyStatus')}</span>
                  </div>
                  <Select value={searchFilters.familyStatus} onValueChange={(value) => handleFilterChange('familyStatus', value)}>
                    <SelectTrigger className="w-full h-10 text-sm border border-primary/80">
                      <SelectValue placeholder="Family Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {familyStatusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Profession */}
                <div className="space-y-2">
                  <div className="flex gap-2 items-center">
                    <MdWork className="text-lg flex-shrink-0" />
                    <span className="text-sm font-medium">{t('search.labels.profession')}</span>
                  </div>
                  <Select value={searchFilters.profession} onValueChange={(value) => handleFilterChange('profession', value)}>
                    <SelectTrigger className="w-full h-10 text-sm border border-primary/80">
                      <SelectValue placeholder="Profession" />
                    </SelectTrigger>
                    <SelectContent>
                      {professionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Biodata Type */}
                <div className="space-y-2">
                  <div className="flex gap-2 items-center">
                    <BsPersonBadge className="text-lg flex-shrink-0" />
                    <span className="text-sm font-medium">{t('search.labels.biodataType')}</span>
                  </div>
                  <Select value={searchFilters.biodataType} onValueChange={(value) => handleFilterChange('biodataType', value)}>
                    <SelectTrigger className="w-full h-10 text-sm border border-primary/80">
                      <SelectValue placeholder="Biodata Type" />
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
              </div>
              
              {/* Location */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700 border-b pb-2">{t('search.sections.location')}</h3>
                
                {/* Division */}
                <div className="space-y-2">
                  <div className="flex gap-2 items-center">
                    <FaLocationDot className="text-lg flex-shrink-0" />
                    <span className="text-sm font-medium">{t('search.labels.division')}</span>
                  </div>
                  <Select value={searchFilters.division} onValueChange={(value) => handleFilterChange('division', value)}>
                    <SelectTrigger className="w-full h-10 text-sm border border-primary/80">
                      <SelectValue placeholder={locationLoading.divisions ? "Loading..." : "Division"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Divisions</SelectItem>
                      {divisions.map((division) => (
                        <SelectItem key={division.id} value={division.name}>
                          {division.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* District */}
                <div className="space-y-2">
                  <div className="flex gap-2 items-center">
                    <FaLocationDot className="text-lg flex-shrink-0" />
                    <span className="text-sm font-medium">{t('search.labels.district')}</span>
                  </div>
                  <Select 
                    value={searchFilters.district} 
                    onValueChange={(value) => handleFilterChange('district', value)}
                    disabled={searchFilters.division === 'all' || !searchFilters.division}
                  >
                    <SelectTrigger className="w-full h-10 text-sm border border-primary/80">
                      <SelectValue placeholder={locationLoading.districts ? "Loading..." : "District"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Districts</SelectItem>
                      {districts.map((district) => (
                        <SelectItem key={district.id} value={district.name}>
                          {district.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Upazilla */}
                <div className="space-y-2">
                  <div className="flex gap-2 items-center">
                    <FaLocationDot className="text-lg flex-shrink-0" />
                    <span className="text-sm font-medium">{t('search.labels.upazilla')}</span>
                  </div>
                  <Select 
                    value={searchFilters.upazilla} 
                    onValueChange={(value) => handleFilterChange('upazilla', value)}
                    disabled={searchFilters.district === 'all' || !searchFilters.district}
                  >
                    <SelectTrigger className="w-full h-10 text-sm border border-primary/80">
                      <SelectValue placeholder={locationLoading.upazillas ? "Loading..." : "Upazilla"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Upazillas</SelectItem>
                      {upazillas.map((upazilla) => (
                        <SelectItem key={upazilla.id} value={upazilla.name}>
                          {upazilla.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Address */}
                <div className="space-y-2">
                  <div className="flex gap-2 items-center">
                    <FaLocationDot className="text-lg flex-shrink-0" />
                    <span className="text-sm font-medium">{t('search.labels.address')}</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Address (Optional)"
                    value={searchFilters.address || ''}
                    onChange={(e) => handleFilterChange('address', e.target.value)}
                    className="w-full h-10 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
            </div>
            
            {/* Sticky Action Buttons */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 space-y-3">
              <button 
                onClick={() => {
                  handleSearch();
                  setMobileFilterMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 btn-primary text-white px-4 py-3 rounded-md text-sm font-medium"
              >
                <FaSearch className="text-sm" />
                {t('search.buttons.searchNow')}
              </button>
              
              <button 
                onClick={() => {
                  setSearchFilters({
                    maritalStatus: 'all',
                    division: 'all',
                    district: 'all',
                    upazilla: 'all',
                    biodataType: 'all',
                    address: '',
                    complexion: 'all',
                    familyStatus: 'all',
                    height: 'all',
                    age: 'all',
                    profession: 'all'
                  });
                }}
                className="btn-secondary w-full py-2"
              >
                {t('search.buttons.clearAllFilters')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results Section */}
      <div className="bg-white rounded-lg shadow-sm border border-primary/80 mb-6">
        <div className="p-6 border-b border-primary/80">
          <h2 className="text-lg font-semibold text-gray-900">
            {resultsLoading ? t('search.results.searching') : `${searchResults.length} ${t('search.results.resultsFound')}`}
          </h2>
        </div>
        
        <div className="p-6">
          {resultsLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-3 text-gray-600">{t('search.results.searchingForMatches')}</span>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((result) => (
                <div key={result.id} className="border border-primary/80 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-[20px] text-gray-900 mb-2">{result.displayName || result.fullName || t('search.results.anonymous')}</h3>
                  <div className="space-y-1 mb-3">
                    {result.age && <p className="text-gray-600 text-sm">{t('search.profileLabels.age')}: <span className='text-black mr-1'>{result.age}</span></p>}
                    {result.location && <p className="text-gray-600 text-sm">{t('search.profileLabels.location')}: <span className='text-black mr-1'>{result.location}</span></p>}
                    {result.occupation && <p className="text-gray-600 text-sm">{t('search.profileLabels.profession')}: <span className='text-black mr-1'>{result.occupation}</span></p>}
                    {result.maritalStatus && <p className="text-gray-600 text-sm">{t('search.profileLabels.maritalStatus')}: <span className='text-black mr-1'>{result.maritalStatus}</span></p>}
                    {result.height && <p className="text-gray-600 text-sm">{t('search.profileLabels.height')}: <span className='text-black mr-1'>{result.height}</span></p>}
                    {result.biodataType && <p className="text-gray-600 text-sm">{t('search.profileLabels.type')}: <span className='text-black mr-1'>{result.biodataType}</span></p>}
                  </div>
                  <button onClick={() => router.push(`/search/viewBiodata?id=${result.id}`)} className="w-full btn-primary">
                    {t('search.results.viewProfile')}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('search.results.noResultsFound')}</h3>
              <p className="text-gray-600 mb-4">{t('search.results.tryAdjusting')}</p>
              <button 
                onClick={handleNewSearch}
                className="btn-primary"
              >
                {t('search.results.modifySearch')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchPage
