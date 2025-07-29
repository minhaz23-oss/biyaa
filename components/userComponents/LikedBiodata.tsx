'use client'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/lib/hooks/useAuth'
import { getFavoriteBiodataDetails } from '@/lib/actions/user.actions'
import { FaHeart, FaUser, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaEye } from 'react-icons/fa'
import { MdHeight, MdCake } from 'react-icons/md'
import Link from 'next/link'
import { toast } from 'sonner'
import { useLanguage } from '@/contexts/LanguageContext'
import { useFont } from '@/lib/hooks/useFont'
import Image from 'next/image'

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

const LikedBiodata = () => {
  const { user, loading: authLoading } = useAuth()
  const [favorites, setFavorites] = useState<BiodataType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { t } = useLanguage()
  const { fontClass } = useFont()

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setLoading(false)
        return
      }

      try {
        const result = await getFavoriteBiodataDetails(user.uid)
        
        if (result.success) {
          setFavorites(result.data)
        } else {
          setError(result.message || 'Failed to load favorites')
        }
      } catch (error: any) {
        console.error('Error fetching favorites:', error)
        setError('An unexpected error occurred')
      } finally {
        setLoading(false)
      }
    }

    if (!authLoading) {
      fetchFavorites()
    }
  }, [user, authLoading])

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
        <FaHeart className="mx-auto text-6xl text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">{t("auth.signInTitle")}</h2>
        <p className="text-gray-500">{t("user.liked.signInMessage")}</p>
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

  if (favorites.length === 0) {
    return (
      <div className={`text-center py-12 ${fontClass}`}>
        <FaHeart className="mx-auto text-6xl text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">{t("user.liked.empty")}</h2>
        <p className="text-gray-500 mb-6">
          {t("user.liked.emptyMessage")}
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
            <Image 
              src={biodata.profilePicture} 
              alt="Profile" 
              width={80}
              height={80}
              className="w-20 h-20 rounded-full object-cover border-2 border-primary/20"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center border-2 border-primary/20">
              <FaUser className="text-2xl text-gray-400" />
            </div>
          )}
        </div>

        {/* Biodata Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {biodata.displayName || biodata.fullName || 'Anonymous'}
            </h3>
            <FaHeart className="text-red-500 text-lg flex-shrink-0 ml-2" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
            {biodata.age && (
              <div className="flex items-center gap-1">
                <MdCake className="text-primary" />
                <span>{biodata.age} years</span>
              </div>
            )}
            {biodata.height && (
              <div className="flex items-center gap-1">
                <MdHeight className="text-primary" />
                <span>{biodata.height}</span>
              </div>
            )}
            {biodata.occupation && (
              <div className="flex items-center gap-1">
                <FaBriefcase className="text-primary" />
                <span className="truncate">{biodata.occupation}</span>
              </div>
            )}
            {biodata.highestDegree && (
              <div className="flex items-center gap-1">
                <FaGraduationCap className="text-primary" />
                <span className="truncate">{biodata.highestDegree}</span>
              </div>
            )}
          </div>
          
          {(biodata.presentDistrict || biodata.presentDivision) && (
            <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
              <FaMapMarkerAlt className="text-primary" />
              <span>
                {[biodata.presentDistrict, biodata.presentDivision]
                  .filter(Boolean).join(', ')}
              </span>
            </div>
          )}
          
          {biodata.biodataType && (
            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium mb-4">
              {biodata.biodataType}
            </span>
          )}
          
          <div className="flex gap-2">
            <Link 
              href={`/search/viewBiodata?id=${biodata.id}`}
              className="btn-primary text-sm flex items-center gap-1"
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
          <h1 className="text-2xl font-bold text-gray-900">{t("user.liked.title")}</h1>
          <p className="text-gray-600 mt-1">
            {favorites.length} {t("user.liked.biodataCount")}
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

      {/* Favorites Grid */}
      <div className="grid gap-4">
        {favorites.map((biodata) => (
          <BiodataCard key={biodata.id} biodata={biodata} />
        ))}
      </div>
    </div>
  )
}

export default LikedBiodata
