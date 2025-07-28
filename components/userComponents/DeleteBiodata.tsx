import { deleteBiodata } from '@/lib/actions/biodata.actions'
import { useAuth } from '@/lib/hooks/useAuth'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { useSelector, useDispatch } from 'react-redux'
import { setActiveTab,setBiodataExists } from "@/redux/userSlice";
import { RootState } from '@/redux/store'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext';

import { useFont } from '@/lib/hooks/useFont'

const DeleteBiodata = () => {
  const { t } = useLanguage()
  const fontClass = useFont()
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const { isBiodataExists } = useSelector(
    (state: RootState) => state.user
  )
  const { user } = useAuth()
  const router = useRouter()
  const dispatch = useDispatch()
  const userId = user?.uid

  const handleDelete = async () => {
    if (!userId) {
      toast.error(t('user.biodata.delete.userAuthRequired'))
      return
    }

    setIsLoading(true)
    try {
      const res = await deleteBiodata(userId)
      if (!res.success) {
        toast.error(res.message || t('user.biodata.delete.failedToDelete'))
        return
      }
      
      toast.success(t('user.biodata.delete.deleteSuccess'))
      // Update Redux state to reflect biodata no longer exists
      dispatch(setBiodataExists(false))
      
      dispatch(setActiveTab('dashboard'))
    } catch (error) {
      console.error('Error deleting biodata:', error)
      toast.error(t('user.biodata.delete.unexpectedError'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    router.back()
  }

  // Show different UI based on biodata existence
  if (!isBiodataExists) {
    return (
      <div className={`min-h-screen bg-gray-50 flex justify-center items-center p-4 ${fontClass}`}>
        <div className='bg-white rounded-lg shadow-lg max-w-md w-full p-6 border-2 border-primary/50'>
          {/* Info Icon */}
          <div className='flex justify-center mb-4'>
            <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center'>
              <svg className='w-8 h-8 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className='text-2xl font-bold text-gray-800 text-center mb-4'>
            {t('user.biodata.delete.noBiodataFound')}
          </h2>

          {/* Message */}
          <div className='bg-primary/20 border border-primary rounded-lg p-4 mb-6'>
            <p className='text-primary font-medium mb-2'>
              ℹ️ {t('user.biodata.delete.nothingToDelete')}
            </p>
            <p className='text-primary/[90%] font-semibold text-sm'>
              {t('user.biodata.delete.noBiodataMessage')}
            </p>
          </div>

          {/* Action Buttons */}
          <div className='flex space-x-3'>
            <button
              onClick={handleCancel}
              className='flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium'
            >
              {t('user.biodata.delete.goBack')}
            </button>
            <button
              onClick={() => dispatch(setActiveTab('edit-biodata'))}
              className='btn-primary'
            >
              {t('user.biodata.delete.createBiodata')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-red-50 flex justify-center items-center p-4 ${fontClass}`}>
      <div className='bg-white rounded-lg shadow-lg max-w-md w-full p-6 border-2 border-red-200'>
        {/* Warning Icon */}
        <div className='flex justify-center mb-4'>
          <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center'>
            <svg className='w-8 h-8 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z' />
            </svg>
          </div>
        </div>

        {/* Warning Title */}
        <h2 className='text-2xl font-bold text-red-800 text-center mb-4'>
          {t('user.biodata.delete.title')}
        </h2>

        {/* Warning Message */}
        <div className='bg-red-100 border border-red-300 rounded-lg p-4 mb-6'>
          <p className='text-red-800 font-medium mb-2'>
            ⚠️ {t('user.biodata.delete.cannotUndo')}
          </p>
          <p className='text-red-700 text-sm'>
            {t('user.biodata.delete.deleteWarning')}
          </p>
          <ul className='text-red-700 text-sm mt-2 ml-4 list-disc'>
            <li>{t('user.biodata.delete.personalInfo')}</li>
            <li>{t('user.biodata.delete.contactDetails')}</li>
            <li>{t('user.biodata.delete.photosDocuments')}</li>
            <li>{t('user.biodata.delete.preferencesSettings')}</li>
            <li>{t('user.biodata.delete.associatedData')}</li>
          </ul>
        </div>

        {/* Confirmation Checkbox */}
        <div className='mb-6'>
          <label className='flex items-start space-x-3 cursor-pointer'>
            <input
              type='checkbox'
              checked={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
              className='mt-1 w-4 h-4 text-red-600 bg-gray-100 border-red-300 rounded focus:ring-red-500 focus:ring-2'
            />
            <span className='text-gray-700 text-sm leading-tight'>
              {t('user.biodata.delete.confirmationText')}
            </span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className='flex space-x-3'>
          <button
            onClick={handleCancel}
            className='flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium'
          >
            {t('user.biodata.delete.cancel')}
          </button>
          <button
            onClick={handleDelete}
            disabled={!isConfirmed || isLoading}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
              isConfirmed && !isLoading
                ? 'bg-red-600 text-white hover:bg-red-700 shadow-md'
                : 'bg-red-200 text-red-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <span className='flex items-center justify-center'>
                <svg className='animate-spin -ml-1 mr-2 h-4 w-4 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                  <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                </svg>
                {t('user.biodata.delete.deleting')}
              </span>
            ) : (
              t('user.biodata.delete.deleteMyBiodata')
            )}
          </button>
        </div>

        {/* Additional Warning */}
        <p className='text-xs text-gray-500 text-center mt-4'>
          {t('user.biodata.delete.immediateEffect')}
        </p>
      </div>
    </div>
  )
}

export default DeleteBiodata;
