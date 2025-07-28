import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for a single field update
interface BiodataFieldUpdate {
  field: string;
  value: any;
}

// Define the flat state structure for the entire biodata form
export interface BiodataState {
  id?: string; // Add optional id field
  // General Info - flat
  biodataType: string;
  maritalStatus: string;
  birthYear: string;
  height: string;
  complexion: string;
  weight: string;
  bloodGroup: string;
  nationality: string;
  
  // Present Address - flat with prefix
  presentCountry: string;
  presentDivision: string;
  presentDistrict: string;
  presentUpazilla: string;
  
  // Permanent Address - flat with prefix
  permanentCountry: string;
  permanentDivision: string;
  permanentDistrict: string;
  permanentUpazilla: string;
  
  // Education Info - flat
  highestDegree: string;
  institution: string;
  graduationYear: number;
  
  // Family Info - flat
  fatherName: string;
  isFatherAlive: string;
  fatherProfession: string;
  motherName: string;
  isMotherAlive: string;
  motherProfession: string;
  familyStatus: string;
  numberOfSiblings: number;
  
  // Personal Details - flat
  clothing: string;
  // Male specific fields
  hasBeard?: string;
  beardSince?: string;
  clothesAboveAnkles?: string;
  // Female specific fields
  wearNiqab?: string;
  niqabSince?: string;
  // Common fields
  praysFiveTimes: string;
  mahramNonMahram: string;
  recitesQuran: string;
  fiqh: string;
  diseases: string;
  dramasMoviesSongs: string;
  mazarBeliefs: string;
  hobbies: string;
  
  // Occupational Info - flat
  occupation: string;
  descriptionOfProfession: string;
  monthlyIncome: number;
  
  // Marriage Info - flat
  guardiansAgree: string;
  // Male specific fields
  keepWifeInVeil?: string;
  allowWifeToStudy?: string;
  allowWifeToDoJob?: string;
  liveWithWifeAfterMarriage?: string;
  // Female specific fields
  wantToDoJobAfterMarriage?: string;
  wantToStudyAfterMarriage?: string;
  // Common fields
  marriageThoughts: string;
  
  // Expected Life Partner - flat with prefix
  expectedAge: string;
  expectedComplexion: string;
  expectedHeight: string;
  expectedEducationalQualification: string;
  expectedDistrict: string;
  expectedMaritalStatus: string;
  expectedProfession: string;
  expectedFinancialCondition: string;
  expectedQualities: string;
  
  // Pledge - flat
  parentsKnow: string;
  allInfoTrue: string;
  
  // Contact - flat
  fullName: string;
  guardianMobileNumber: string;
  relationshipWithGuardian: string;
  emailToReceiveBiodata: string;
}

const initialState: BiodataState = {
  id: undefined, // Initialize id as undefined
  // General Info - flat
  biodataType: '',
  maritalStatus: '',
  birthYear: '',
  height: '',
  complexion: '',
  weight: '',
  bloodGroup: '',
  nationality: '',
  
  // Present Address - flat with prefix
  presentCountry: 'Bangladesh',
  presentDivision: '',
  presentDistrict: '',
  presentUpazilla: '',
  
  // Permanent Address - flat with prefix
  permanentCountry: 'Bangladesh',
  permanentDivision: '',
  permanentDistrict: '',
  permanentUpazilla: '',
  
  // Education Info - flat
  highestDegree: '',
  institution: '',
  graduationYear: new Date().getFullYear(),
  
  // Family Info - flat
  fatherName: '',
  isFatherAlive: '',
  fatherProfession: '',
  motherName: '',
  isMotherAlive: '',
  motherProfession: '',
  familyStatus: '',
  numberOfSiblings: 0,
  
  // Personal Details - flat
  clothing: '',
  // Male specific fields
  hasBeard: '',
  beardSince: '',
  clothesAboveAnkles: '',
  // Female specific fields
  wearNiqab: '',
  niqabSince: '',
  // Common fields
  praysFiveTimes: '',
  mahramNonMahram: '',
  recitesQuran: '',
  fiqh: '',
  diseases: '',
  dramasMoviesSongs: '',
  mazarBeliefs: '',
  hobbies: '',
  
  // Occupational Info - flat
  occupation: '',
  descriptionOfProfession: '',
  monthlyIncome: 0,
  
  // Marriage Info - flat
  guardiansAgree: '',
  // Male specific fields
  keepWifeInVeil: '',
  allowWifeToStudy: '',
  allowWifeToDoJob: '',
  liveWithWifeAfterMarriage: '',
  // Female specific fields
  wantToDoJobAfterMarriage: '',
  wantToStudyAfterMarriage: '',
  // Common fields
  marriageThoughts: '',
  
  // Expected Life Partner - flat with prefix
  expectedAge: '',
  expectedComplexion: '',
  expectedHeight: '',
  expectedEducationalQualification: '',
  expectedDistrict: '',
  expectedMaritalStatus: '',
  expectedProfession: '',
  expectedFinancialCondition: '',
  expectedQualities: '',
  
  // Pledge - flat
  parentsKnow: '',
  allInfoTrue: '',
  
  // Contact - flat
  fullName: '',
  guardianMobileNumber: '',
  relationshipWithGuardian: '',
  emailToReceiveBiodata: '',
};

const biodataSlice = createSlice({
  name: 'biodata',
  initialState,
  reducers: {
    // Reducer to update a specific field (now flat, no sections)
    updateBiodataField: (state, action: PayloadAction<BiodataFieldUpdate>) => {
      const { field, value } = action.payload;
      (state as any)[field] = value;
    },
    // Reducer to load existing biodata (e.g., from an API)
    setBiodata: (state, action: PayloadAction<Partial<BiodataState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateBiodataField, setBiodata } = biodataSlice.actions;
export default biodataSlice.reducer;