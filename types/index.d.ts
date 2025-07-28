type FormType =  "sign-in" | "sign-up" ;

interface SignUpParams {
    uid: string;
    name: string;
    email: string;
    password: string;
  }

  interface SignInParams {
    email: string;
    idToken: string;
  }
  interface SignInWithGoogle {
    uid: string,
    name: string,
    idToken: string,
    email: string
}

interface User {
  name: string;
  email: string;
  id: string;
  photoUrl: string;
}

interface Biodata {
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
