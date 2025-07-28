'use client'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/lib/hooks/useAuth'
import { getIgnoredBiodataDetails, removeFromIgnoreList } from '@/lib/actions/user.actions'
import { FaEyeSlash, FaUser, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaEye, FaTimes } from 'react-icons/fa'
import { MdHeight, MdCake } from 'react-icons/md'
import Link from 'next/link'
import { toast } from 'sonner'
import { useLanguage } from '@/contexts/LanguageContext'
import { useFont } from '@/lib/hooks/useFont'

interface BiodataType {
  id: string
  fullName?: string
  displayName?: string
  age?: number
  height?: string
  complexion?: string
  maritalStatus?: string
  biodataType?: string
  occupation?: string
  highestDegree?: string
  presentDistrict?: string
  presentDivision?: string
  profilePicture?: string
  [key: string]: any
}

const UnlikedBiodata = () => {
  const { user, loading: authLoading } = useAuth()
  const [ignoredProfiles, setIgnoredProfiles] = useState<BiodataType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [removingId, setRemovingId] = useState<string | null>(null)
  const { t } = useLanguage()
  const { fontClass } = useFont()

  useEffect(() => {
    const fetchIgnoredProfiles = async () => {
      if (!user) {
        setLoading(false)
        return
      }

      try {
        const result = await getIgnoredBiodataDetails(user.uid)
        
        if (result.success) {
          setIgnoredProfiles(result.data)
        } else {
          setError(result.message || 'Failed to load ignored profiles')
        }
      } catch (error: any) {
        console.error('Error fetching ignored profiles:', error)
        setError('An unexpected error occurred')
      } finally {
        setLoading(false)
      }
    }

    if (!authLoading) {
      fetchIgnoredProfiles()
    }
  }, [user, authLoading])

  const handleRemoveFromIgnoreList = async (biodataId: string) => {
    if (!user || removingId) return

    setRemovingId(biodataId)
    try {
      const result = await removeFromIgnoreList(user.uid, biodataId)
      
      if (result.success) {
        setIgnoredProfiles(prev => prev.filter(profile => profile.id !== biodataId))
        toast.success(t("user.unliked.removeSuccess"))
      } else {
        toast.error(result.message || t("user.unliked.removeError"))
      }
    } catch (error: any) {
      console.error('Error removing from ignore list:', error)
      toast.error(t("common.error"))
    } finally {
      setRemovingId(null)
    }
  }

  if (authLoading || loading) {
    return (
      <div className={`flex justify-center items-center min-h-[400px] ${fontClass}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <span className="ml-3 text-gray-600">{t("common.loading")}</span>
      </div>
    )
  }

  if (!user) {
    return (
      <div className={`text-center py-12 ${fontClass}`}>
        <FaEyeSlash className="mx-auto text-6xl text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">{t("auth.signInTitle")}</h2>
        <p className="text-gray-500">{t("user.unliked.signInMessage")}</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold mb-2 text-gray-900">{error}</h2>
      </div>
    )
  }

  if (ignoredProfiles.length === 0) {
    return (
      <div className={`text-center py-12 ${fontClass}`}>
        <FaEyeSlash className="mx-auto text-6xl text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">{t("user.unliked.empty")}</h2>
        <p className="text-gray-500 mb-6">
          {t("user.unliked.emptyMessage")}
        </p>
        <Link 
          href="/search" 
          className="btn-primary inline-flex items-center gap-2"
        >
          <FaEye className="text-sm" />
          {t("user.liked.browseBiodatas")}
        </Link>
      </div>
    )
  }

  const BiodataCard = ({ biodata }: { biodata: BiodataType }) => (
    <div className="bg-white border border-primary/80 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-start gap-4">
        {/* Profile Picture */}
        <div className="flex-shrink-0">
          {biodata.profilePicture ? (
            <img 
              src={biodata.profilePicture} 
              alt="Profile" 
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-300 opacity-75"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300">
              <FaUser className="text-2xl text-gray-400" />
            </div>
          )}
        </div>

        {/* Biodata Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-700 truncate">
              {biodata.displayName || biodata.fullName || 'Anonymous'}
            </h3>
            <div className="flex items-center gap-2 flex-shrink-0 ml-2">
              <FaEyeSlash className="text-gray-500 text-lg" />
              <button
                onClick={() => handleRemoveFromIgnoreList(biodata.id)}
                disabled={removingId === biodata.id}
                className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                title="Remove from ignore list"
              >
                {removingId === biodata.id ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
                ) : (
                  <FaTimes className="text-sm" />
                )}
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-500 mb-4">
            {biodata.age && (
              <div className="flex items-center gap-1">
                <MdCake className="text-gray-400" />
                <span>{biodata.age} years</span>
              </div>
            )}
            {biodata.height && (
              <div className="flex items-center gap-1">
                <MdHeight className="text-gray-400" />
                <span>{biodata.height}</span>
              </div>
            )}
            {biodata.occupation && (
              <div className="flex items-center gap-1">
                <FaBriefcase className="text-gray-400" />
                <span className="truncate">{biodata.occupation}</span>
              </div>
            )}
            {biodata.highestDegree && (
              <div className="flex items-center gap-1">
                <FaGraduationCap className="text-gray-400" />
                <span className="truncate">{biodata.highestDegree}</span>
              </div>
            )}
          </div>
          
          {(biodata.presentDistrict || biodata.presentDivision) && (
            <div className="flex items-center gap-1 text-sm text-gray-400 mb-4">
              <FaMapMarkerAlt className="text-gray-400" />
              <span>
                {[biodata.presentDistrict, biodata.presentDivision]
                  .filter(Boolean).join(', ')}
              </span>
            </div>
          )}
          
          {biodata.biodataType && (
            <span className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium mb-4">
              {biodata.biodataType}
            </span>
          )}
          
          <div className="flex gap-2">
            <Link 
              href={`/search/viewBiodata?id=${biodata.id}`}
              className="btn-secondary text-sm flex items-center gap-1"
            >
              <FaEye className="text-xs" />
              {t("common.search")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className={`space-y-6 ${fontClass}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t("user.unliked.title")}</h1>
          <p className="text-gray-600 mt-1">
            {ignoredProfiles.length} {t("user.unliked.profileCount")}
          </p>
        </div>
        <Link 
          href="/search" 
          className="btn-secondary text-sm flex items-center gap-2"
        >
          <FaEye className="text-xs" />
          {t("user.liked.browseBiodatas")}
        </Link>
      </div>

      {/* Info Text */}
      <div className="bg-gray-50 border border-primary/80 rounded-lg p-4">
        <p className="text-sm text-gray-600">
          <FaEyeSlash className="inline mr-2" />
          {t("user.unliked.infoText")}
        </p>
      </div>

      {/* Ignored Profiles Grid */}
      <div className="grid gap-4">
        {ignoredProfiles.map((biodata) => (
          <BiodataCard key={biodata.id} biodata={biodata} />
        ))}
      </div>
    </div>
  )
}

export default UnlikedBiodata
