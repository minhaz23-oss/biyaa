/**
 * Utility functions for handling biodata field migration and cleaning
 */

export interface BiodataCleaningOptions {
  removeEmptyFields?: boolean;
  removeIrrelevantFields?: boolean;
}

/**
 * Cleans biodata by removing irrelevant fields based on biodataType
 * @param data - The biodata object to clean
 * @param options - Cleaning options
 * @returns Cleaned biodata object
 */
export function cleanBiodataForSave(
  data: any, 
  options: BiodataCleaningOptions = { removeEmptyFields: true, removeIrrelevantFields: true }
): any {
  if (!data || typeof data !== 'object') {
    return data;
  }

  const cleanedData = { ...data };
  const biodataType = data.biodataType;

  // Define all conditional fields
  const maleSpecificFields = [
    // Personal Details
    'hasBeard', 'beardSince', 'clothesAboveAnkles',
    // Marriage Info
    'keepWifeInVeil', 'allowWifeToStudy', 'allowWifeToDoJob', 'liveWithWifeAfterMarriage'
  ];
  const femaleSpecificFields = [
    // Personal Details
    'wearNiqab', 'niqabSince',
    // Marriage Info
    'wantToDoJobAfterMarriage', 'wantToStudyAfterMarriage'
  ];

  // Remove irrelevant fields based on biodataType
  if (options.removeIrrelevantFields && biodataType) {
    if (biodataType === 'males biodata') {
      // Remove female-specific fields
      femaleSpecificFields.forEach(field => {
        delete cleanedData[field];
      });
    } else if (biodataType === 'females biodata') {
      // Remove male-specific fields
      maleSpecificFields.forEach(field => {
        delete cleanedData[field];
      });
    }
  }

  // Remove empty fields if requested
  if (options.removeEmptyFields) {
    Object.keys(cleanedData).forEach(key => {
      const value = cleanedData[key];
      if (value === '' || value === null || value === undefined) {
        delete cleanedData[key];
      }
    });
  }

  return cleanedData;
}

/**
 * Validates if a field is relevant for the given biodataType
 * @param fieldName - The field name to validate
 * @param biodataType - The type of biodata ('males biodata' or 'females biodata')
 * @returns Boolean indicating if the field is relevant
 */
export function isFieldRelevantForBiodataType(fieldName: string, biodataType: string): boolean {
  const maleSpecificFields = [
    // Personal Details
    'hasBeard', 'beardSince', 'clothesAboveAnkles',
    // Marriage Info
    'keepWifeInVeil', 'allowWifeToStudy', 'allowWifeToDoJob', 'liveWithWifeAfterMarriage'
  ];
  const femaleSpecificFields = [
    // Personal Details
    'wearNiqab', 'niqabSince',
    // Marriage Info
    'wantToDoJobAfterMarriage', 'wantToStudyAfterMarriage'
  ];

  if (biodataType === 'males biodata') {
    return !femaleSpecificFields.includes(fieldName);
  } else if (biodataType === 'females biodata') {
    return !maleSpecificFields.includes(fieldName);
  }

  // For unknown biodataType, allow all fields
  return true;
}

/**
 * Gets the list of required fields for personal details based on biodataType
 * @param biodataType - The type of biodata
 * @param formValues - Current form values to check conditional requirements
 * @returns Array of required field names
 */
export function getRequiredPersonalDetailFields(biodataType: string, formValues: any = {}): string[] {
  const baseFields = [
    'clothing',
    'praysFiveTimes',
    'mahramNonMahram',
    'recitesQuran',
    'fiqh',
    'diseases',
    'dramasMoviesSongs',
    'mazarBeliefs',
    'hobbies'
  ];

  if (biodataType === 'males biodata') {
    const requiredFields = [...baseFields, 'hasBeard', 'clothesAboveAnkles'];
    // If hasBeard is yes, also require beardSince
    if (formValues.hasBeard === 'yes') {
      requiredFields.push('beardSince');
    }
    return requiredFields;
  } else if (biodataType === 'females biodata') {
    const requiredFields = [...baseFields, 'wearNiqab'];
    // If wearNiqab is yes, also require niqabSince
    if (formValues.wearNiqab === 'yes') {
      requiredFields.push('niqabSince');
    }
    return requiredFields;
  }

  return baseFields;
}

/**
 * Gets the list of required fields for marriage info based on biodataType
 * @param biodataType - The type of biodata
 * @param formValues - Current form values to check conditional requirements
 * @returns Array of required field names
 */
export function getRequiredMarriageInfoFields(biodataType: string, formValues: any = {}): string[] {
  const baseFields = ['guardiansAgree', 'marriageThoughts'];

  if (biodataType === 'males biodata') {
    return [...baseFields, 'keepWifeInVeil', 'allowWifeToStudy', 'allowWifeToDoJob', 'liveWithWifeAfterMarriage'];
  } else if (biodataType === 'females biodata') {
    return [...baseFields, 'wantToDoJobAfterMarriage', 'wantToStudyAfterMarriage'];
  }

  return baseFields;
}

/**
 * Migrates existing biodata to the new conditional field structure
 * This function can be used to clean up existing database records
 * @param existingBiodata - The existing biodata object
 * @returns Migrated biodata object
 */
export function migrateBiodataToConditionalFields(existingBiodata: any): any {
  if (!existingBiodata || typeof existingBiodata !== 'object') {
    return existingBiodata;
  }

  return cleanBiodataForSave(existingBiodata, {
    removeEmptyFields: true,
    removeIrrelevantFields: true
  });
}
