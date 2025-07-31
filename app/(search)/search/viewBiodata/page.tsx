'use client'
import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { getBiodataById } from '@/lib/actions/biodata.actions'
import { addToFavorites as addToFavoritesBackend, removeFromFavorites, isInFavorites, addToIgnoreList, removeFromIgnoreList, isInIgnoreList } from '@/lib/actions/user.actions'
import { addToFavorites, removeFromFavorites as removeFromFavoritesRedux } from '@/redux/userSlice'
import { useAuth } from '@/lib/hooks/useAuth'
import { useLanguage } from '@/contexts/LanguageContext'
import { FaArrowLeft, FaUser, FaMapMarkerAlt, FaGraduationCap, FaBriefcase, FaHeart, FaUsers, FaEyeSlash } from 'react-icons/fa'
import { MdHeight, MdCake } from 'react-icons/md'
import { IoMdCall, IoMdMail } from 'react-icons/io'
import { toast } from 'sonner'
import Image from 'next/image'

interface BiodataType {
  id: string
  fullName?: string
  displayName?: string
  age?: number
  height?: string
  weight?: string
  complexion?: string
  maritalStatus?: string
  biodataType?: string
  dateOfBirth?: string
  placeOfBirth?: string
  nationality?: string
  presentAddress?: string
  permanentAddress?: string
  presentDivision?: string
  presentDistrict?: string
  presentUpazilla?: string
  permanentDivision?: string
  permanentDistrict?: string
  permanentUpazilla?: string
  occupation?: string
  monthlyIncome?: string
  workPlace?: string
  highestDegree?: string
  passingYear?: string
  institutionName?: string
  result?: string
  religiousEducation?: string
  aboutMe?: string
  aboutFamily?: string
  familyStatus?: string
  fatherName?: string
  fatherOccupation?: string
  motherName?: string
  motherOccupation?: string
  siblings?: string
  uncleAuntDetails?: string
  partnerAge?: string
  partnerHeight?: string
  partnerComplexion?: string
  partnerEducation?: string
  partnerOccupation?: string
  partnerIncome?: string
  partnerLocation?: string
  partnerMaritalStatus?: string
  partnerOtherRequirements?: string
  guardianName?: string
  guardianOccupation?: string
  guardianPhone?: string
  guardianEmail?: string
  relationWithGuardian?: string
  guardiansAgreement?: boolean
  profilePicture?: string
  [key: string]: any
}

const ViewBiodataPage = () => {
  return (
    <Suspense fallback={
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <span className="ml-3 text-gray-600">Loading...</span>
        </div>
      </div>
    }>
      <InnerViewBiodataPage />
    </Suspense>
  )
}

const InnerViewBiodataPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const biodataId = searchParams.get('id')
  const dispatch = useDispatch()
  const { user, loading: authLoading, isAuthenticated } = useAuth()
  const { t } = useLanguage()
  
  const [biodata, setBiodata] = useState<BiodataType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [favoriteLoading, setFavoriteLoading] = useState(false)
  const [isIgnored, setIsIgnored] = useState(false)
  const [ignoreLoading, setIgnoreLoading] = useState(false)
  
  // Get favorites from Redux store
  const favorites = useSelector((state: any) => state.user.favorites)

  useEffect(() => {
    const fetchBiodata = async () => {
      if (!biodataId) {
        setError('No biodata ID provided')
        setLoading(false)
        return
      }

      try {
        const result = await getBiodataById(biodataId)
        
        if (result.success && result.data) {
          setBiodata(result.data)
        } else {
          setError(result.message || 'Failed to load biodata')
        }
      } catch (error: any) {
        console.error('Error fetching biodata:', error)
        setError('An unexpected error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchBiodata()
  }, [biodataId])

  // Check if biodata is in favorites and ignore list when user and biodata are loaded
  useEffect(() => {
    const checkStatus = async () => {
      if (user && biodataId) {
        try {
          // Check favorite status
          const favoriteResult = await isInFavorites(user.uid, biodataId)
          if (favoriteResult.success) {
            setIsFavorite(favoriteResult.isFavorite)
          }
          
          // Check ignore status
          const ignoreResult = await isInIgnoreList(user.uid, biodataId)
          if (ignoreResult.success) {
            setIsIgnored(ignoreResult.isIgnored)
          }
        } catch (error) {
          console.error('Error checking status:', error)
        }
      }
    }

    if (!authLoading) {
      checkStatus()
    }
  }, [user, biodataId, authLoading])

  const handleFavoriteToggle = async () => {
    if (!user || !biodataId) {
      toast.error(t('viewBiodata.toast.pleaseSignInToAddFavorites'))
      return
    }

    setFavoriteLoading(true)

    try {
      if (isFavorite) {
        // Remove from favorites
        const result = await removeFromFavorites(user.uid, biodataId)
        if (result.success) {
          setIsFavorite(false)
          dispatch(removeFromFavoritesRedux(biodataId))
          toast.success(t('viewBiodata.toast.removedFromFavorites'))
        } else {
          toast.error(result.message || t('viewBiodata.toast.failedToRemoveFromFavorites'))
        }
      } else {
        // Add to favorites
        const result = await addToFavoritesBackend(user.uid, biodataId)
        if (result.success) {
          setIsFavorite(true)
          dispatch(addToFavorites(biodataId))
          toast.success(t('viewBiodata.toast.addedToFavorites'))
          // If it was in ignore list, update the state
          if (isIgnored) {
            setIsIgnored(false)
          }
        } else {
          toast.error(result.message || t('viewBiodata.toast.failedToAddToFavorites'))
        }
      }
    } catch (error: any) {
      console.error('Error toggling favorite:', error)
      toast.error(t('common.error.somethingWrontWrong'))
    } finally {
      setFavoriteLoading(false)
    }
  }

  const handleIgnoreToggle = async () => {
    if (!user || !biodataId) {
      toast.error(t('viewBiodata.toast.pleaseSignInToManageIgnoreList'))
      return
    }

    setIgnoreLoading(true)

    try {
      if (isIgnored) {
        // Remove from ignore list
        const result = await removeFromIgnoreList(user.uid, biodataId)
        if (result.success) {
          setIsIgnored(false)
          toast.success(t('viewBiodata.toast.removedFromIgnoreList'))
        } else {
          toast.error(result.message || t('viewBiodata.toast.failedToRemoveFromIgnoreList'))
        }
      } else {
        // Add to ignore list
        const result = await addToIgnoreList(user.uid, biodataId)
        if (result.success) {
          setIsIgnored(true)
          toast.success(t('viewBiodata.toast.addedToIgnoreList'))
          // If it was in favorites, update the state
          if (isFavorite) {
            setIsFavorite(false)
            dispatch(removeFromFavoritesRedux(biodataId))
          }
        } else {
          toast.error(result.message || t('viewBiodata.toast.failedToAddToIgnoreList'))
        }
      }
    } catch (error: any) {
      console.error('Error toggling ignore:', error)
      toast.error(t('common.error.somethingWrontWrong'))
    } finally {
      setIgnoreLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <span className="ml-3 text-gray-600">{t('common.loading')}</span>
        </div>
      </div>
    )
  }

  if (error || !biodata) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-gray-900">{error}</h2>
            <button 
              onClick={() => router.back()}
              className="btn-primary flex items-center gap-2 mx-auto"
            >
            <FaArrowLeft className="text-sm" />
              {t('common.back')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  const InfoCard = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <div className="bg-white border border-primary/80 rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-primary text-xl">{icon}</div>
        <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  )

  const InfoRow = ({ label, value }: { label: string; value?: string | number }) => {
    if (!value) return null
    return (
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <span className="text-gray-600 font-medium">{label}:</span>
        <span className="text-gray-900">{value}</span>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white border border-primary/80 rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-2  items-center justify-between mb-4">
          <button 
            onClick={() => router.back()}
            className="btn-secondary flex items-center gap-2"
          >
            <FaArrowLeft className="text-sm" />
            {t('viewBiodata.backToSearch')}
          </button>
          <div className="text-sm text-gray-500">
            {t('viewBiodata.biodataId')}: {biodata.id}
          </div>
        </div>
        
        <div className="text-center">
          {biodata.profilePicture ? (
            <Image 
              src={biodata.profilePicture} 
              alt="Profile" 
              width={128}
              height={128}
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-primary/20"
            />
          ) : (
            <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200 flex items-center justify-center border-4 border-primary/20">
              <FaUser className="text-4xl text-gray-400" />
            </div>
          )}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {biodata.displayName || biodata.fullName || t('search.results.anonymous')}
          </h1>
          <div className="flex justify-center gap-4 text-sm text-gray-600">
            {biodata.age && (
              <span className="flex items-center gap-1">
                <MdCake className="text-primary" />
                {biodata.age} {t('viewBiodata.years')}
              </span>
            )}
            {biodata.height && (
              <span className="flex items-center gap-1">
                <MdHeight className="text-primary" />
                {biodata.height}
              </span>
            )}
            {biodata.biodataType && (
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                {biodata.biodataType}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <InfoCard title={t('viewBiodata.sections.personalInformation')} icon={<FaUser />}>
          <InfoRow label={t('viewBiodata.labels.fullName')} value={biodata.fullName} />
          <InfoRow label={t('viewBiodata.labels.age')} value={biodata.age} />
          <InfoRow label={t('viewBiodata.labels.height')} value={biodata.height} />
          <InfoRow label={t('viewBiodata.labels.weight')} value={biodata.weight} />
          <InfoRow label={t('viewBiodata.labels.complexion')} value={biodata.complexion} />
          <InfoRow label={t('viewBiodata.labels.maritalStatus')} value={biodata.maritalStatus} />
          <InfoRow label={t('viewBiodata.labels.dateOfBirth')} value={biodata.dateOfBirth} />
          <InfoRow label={t('viewBiodata.labels.placeOfBirth')} value={biodata.placeOfBirth} />
          <InfoRow label={t('viewBiodata.labels.nationality')} value={biodata.nationality} />
          {biodata.aboutMe && (
            <div>
              <span className="text-gray-600 font-medium block mb-2">{t('viewBiodata.labels.aboutMe')}:</span>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{biodata.aboutMe}</p>
            </div>
          )}
        </InfoCard>

        {/* Address Information */}
        <InfoCard title={t('viewBiodata.sections.address')} icon={<FaMapMarkerAlt />}>
          <div>
            <span className="text-gray-600 font-medium">{t('viewBiodata.labels.presentAddress')}:</span>
            <div className="text-gray-900 mt-1">
              {biodata.presentAddress && <div>{biodata.presentAddress}</div>}
              <div className="text-sm text-gray-600">
                {[biodata.presentUpazilla, biodata.presentDistrict, biodata.presentDivision]
                  .filter(Boolean).join(', ')}
              </div>
            </div>
          </div>
          
          <div>
            <span className="text-gray-600 font-medium">{t('viewBiodata.labels.permanentAddress')}:</span>
            <div className="text-gray-900 mt-1">
              {biodata.permanentAddress && <div>{biodata.permanentAddress}</div>}
              <div className="text-sm text-gray-600">
                {[biodata.permanentUpazilla, biodata.permanentDistrict, biodata.permanentDivision]
                  .filter(Boolean).join(', ')}
              </div>
            </div>
          </div>
        </InfoCard>

        {/* Educational Background */}
        <InfoCard title={t('viewBiodata.sections.educationalBackground')} icon={<FaGraduationCap />}>
          <InfoRow label={t('viewBiodata.labels.highestDegree')} value={biodata.highestDegree} />
          <InfoRow label={t('viewBiodata.labels.graduationYear')} value={biodata.graduationYear} />
          <InfoRow label={t('viewBiodata.labels.institution')} value={biodata.institution} />
          <InfoRow label={t('viewBiodata.labels.bloodGroup')} value={biodata.bloodGroup} />
          <InfoRow label={t('viewBiodata.labels.birthYear')} value={biodata.birthYear} />
        </InfoCard>

        {/* Professional Information */}
        <InfoCard title={t('viewBiodata.sections.professionalInformation')} icon={<FaBriefcase />}>
          <InfoRow label={t('viewBiodata.labels.occupation')} value={biodata.occupation} />
          <InfoRow label={t('viewBiodata.labels.monthlyIncome')} value={biodata.monthlyIncome} />
          <InfoRow label={t('viewBiodata.labels.descriptionOfProfession')} value={biodata.descriptionOfProfession} />
        </InfoCard>

        {/* Family Information */}
        <InfoCard title={t('viewBiodata.sections.familyInformation')} icon={<FaUsers />}>
          <InfoRow label={t('viewBiodata.labels.familyStatus')} value={biodata.familyStatus} />
          <InfoRow label={t('viewBiodata.labels.fatherName')} value={biodata.fatherName} />
          <InfoRow label={t('viewBiodata.labels.isFatherAlive')} value={biodata.isFatherAlive} />
          <InfoRow label={t('viewBiodata.labels.fatherProfession')} value={biodata.fatherProfession} />
          <InfoRow label={t('viewBiodata.labels.motherName')} value={biodata.motherName} />
          <InfoRow label={t('viewBiodata.labels.isMotherAlive')} value={biodata.isMotherAlive} />
          <InfoRow label={t('viewBiodata.labels.motherProfession')} value={biodata.motherProfession} />
          <InfoRow label={t('viewBiodata.labels.numberOfSiblings')} value={biodata.numberOfSiblings} />
        </InfoCard>

        {/* Partner Preferences */}
        <InfoCard title={t('viewBiodata.sections.partnerPreferences')} icon={<FaHeart />}>
          <InfoRow label={t('viewBiodata.labels.preferredAge')} value={biodata.expectedAge} />
          <InfoRow label={t('viewBiodata.labels.preferredHeight')} value={biodata.expectedHeight} />
          <InfoRow label={t('viewBiodata.labels.preferredComplexion')} value={biodata.expectedComplexion} />
          <InfoRow label={t('viewBiodata.labels.preferredEducation')} value={biodata.expectedEducationalQualification} />
          <InfoRow label={t('viewBiodata.labels.preferredOccupation')} value={biodata.expectedProfession} />
          <InfoRow label={t('viewBiodata.labels.preferredFinancialCondition')} value={biodata.expectedFinancialCondition} />
          <InfoRow label={t('viewBiodata.labels.preferredLocation')} value={biodata.expectedDistrict} />
          <InfoRow label={t('viewBiodata.labels.preferredMaritalStatus')} value={biodata.expectedMaritalStatus} />
          {biodata.expectedQualities && (
            <div>
              <span className="text-gray-600 font-medium block mb-2">{t('viewBiodata.labels.expectedQualities')}:</span>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{biodata.expectedQualities}</p>
            </div>
          )}
        </InfoCard>
      </div>

      {/* Contact Information */}
      {(biodata.fullName || biodata.guardianMobileNumber || biodata.emailToReceiveBiodata) && (
        <div className="mt-6 hidden">
          <InfoCard title="Contact Information" icon={<IoMdCall />}>
            <InfoRow label="Full Name" value={biodata.fullName} />
            <InfoRow label="Relationship with Guardian" value={biodata.relationshipWithGuardian} />
            {biodata.guardianMobileNumber && (
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <span className="text-gray-600 font-medium">Guardian Mobile:</span>
                <a href={`tel:${biodata.guardianMobileNumber}`} className="text-primary hover:underline flex items-center gap-1">
                  <IoMdCall className="text-sm" />
                  {biodata.guardianMobileNumber}
                </a>
              </div>
            )}
            {biodata.emailToReceiveBiodata && (
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <span className="text-gray-600 font-medium">Email:</span>
                <a href={`mailto:${biodata.emailToReceiveBiodata}`} className="text-primary hover:underline flex items-center gap-1">
                  <IoMdMail className="text-sm" />
                  {biodata.emailToReceiveBiodata}
                </a>
              </div>
            )}
            {biodata.guardiansAgree && (
              <div className="bg-green-50 border border-green-200 rounded-md p-3">
                <span className="text-green-800 font-medium flex items-center gap-2">
                  ✓ Guardian&apos;s agreement confirmed
                </span>
              </div>
            )}
          </InfoCard>
        </div>
      )}

      {/* Actions */}
      <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
        <button 
          onClick={() => router.back()}
          className="btn-secondary flex items-center gap-2"
        >
          <FaArrowLeft className="text-sm" />
          {t('viewBiodata.backToSearch')}
        </button>
        <button 
          className={`btn-primary flex flex-col justify-center items-center gap-1 min-w-[120px] transition-all duration-200 ${
            isFavorite ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'
          } ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleFavoriteToggle}
          disabled={favoriteLoading || !isAuthenticated || authLoading}
        >
          {favoriteLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <FaHeart className={`text-sm transition-all duration-200 ${
              isFavorite ? 'text-white scale-110' : 'text-white'
            }`} />
          )}
          <span className="text-xs">
            {!isAuthenticated ? t('viewBiodata.actions.signInToFavorite') : 
             isFavorite ? t('viewBiodata.actions.removeFromFavorites') : t('viewBiodata.actions.addToFavorites')}
          </span>
        </button>
        <button 
          className={`btn-primary flex flex-col justify-center items-center gap-1 min-w-[120px] transition-all duration-200 ${
            isIgnored ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-500 hover:bg-gray-600'
          } ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleIgnoreToggle}
          disabled={ignoreLoading || !isAuthenticated || authLoading}
        >
          {ignoreLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <FaEyeSlash className={`text-sm transition-all duration-200 ${
              isIgnored ? 'text-white scale-110' : 'text-white'
            }`} />
          )}
          <span className="text-xs">
            {!isAuthenticated ? t('viewBiodata.actions.signInToIgnore') : 
             isIgnored ? t('viewBiodata.actions.removeFromIgnoreList') : t('viewBiodata.actions.addToIgnoreList')}
          </span>
        </button>
      </div>
    </div>
  )
}

export default ViewBiodataPage
