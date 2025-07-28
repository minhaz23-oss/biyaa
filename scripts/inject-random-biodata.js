import { db } from '@/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

// Sample data arrays for generating realistic biodata
const SAMPLE_DATA = {
  biodataTypes: ['males biodata', 'females biodata'],
  maritalStatuses: ['single', 'married', 'divorced', 'widowed'],
  complexions: ['fair', 'medium', 'dark'],
  bloodGroups: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  nationalities: ['Bangladeshi', 'Pakistani', 'Indian', 'American', 'British', 'Canadian'],
  
  // Bangladesh specific data
  divisions: ['Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh'],
  districts: {
    'Dhaka': ['Dhaka', 'Gazipur', 'Narayanganj', 'Manikganj', 'Munshiganj', 'Faridpur'],
    'Chittagong': ['Chittagong', 'Cox\'s Bazar', 'Comilla', 'Noakhali', 'Feni', 'Chandpur'],
    'Rajshahi': ['Rajshahi', 'Rangpur', 'Bogra', 'Pabna', 'Sirajganj', 'Natore'],
    'Khulna': ['Khulna', 'Jessore', 'Satkhira', 'Bagerhat', 'Narail', 'Magura'],
    'Barisal': ['Barisal', 'Patuakhali', 'Pirojpur', 'Jhalokati', 'Barguna', 'Bhola'],
    'Sylhet': ['Sylhet', 'Moulvibazar', 'Habiganj', 'Sunamganj'],
    'Rangpur': ['Rangpur', 'Dinajpur', 'Thakurgaon', 'Panchagarh', 'Kurigram', 'Lalmonirhat'],
    'Mymensingh': ['Mymensingh', 'Jamalpur', 'Netrokona', 'Sherpur']
  },
  
  heights: ['4\'10"', '4\'11"', '5\'0"', '5\'1"', '5\'2"', '5\'3"', '5\'4"', '5\'5"', '5\'6"', '5\'7"', '5\'8"', '5\'9"', '5\'10"', '5\'11"', '6\'0"', '6\'1"'],
  weights: Array.from({length: 50}, (_, i) => `${45 + i} kg`),
  
  educationDegrees: [
    'SSC', 'HSC', 'Diploma', 'Bachelor\'s', 'Master\'s', 'PhD',
    'MBBS', 'Engineering', 'BBA', 'MBA', 'Computer Science', 'Islamic Studies'
  ],
  
  occupations: [
    'student', 'teacher', 'engineer', 'doctor', 'business', 'government',
    'private', 'freelancer', 'other'
  ],
  
  occupationDescriptions: {
    'Student': 'Currently pursuing higher education and actively engaged in academic coursework.',
    'Teacher': 'Dedicated to educating students at the primary/secondary/tertiary level.',
    'Engineer': 'Working as a professional engineer in the civil/mechanical/electrical field.',
    'Doctor': 'Practicing medical doctor serving patients in a hospital or private clinic.',
    'Business': 'Managing a small to medium-sized enterprise in the retail/wholesale sector.',
    'Service Holder': 'Employed in a reputable organization, contributing to its goals.',
    'Lawyer': 'Providing legal counsel and representation to clients in various legal matters.',
    'Accountant': 'Managing financial records, preparing tax returns, and ensuring fiscal compliance.',
    'Software Developer': 'Developing and maintaining software applications for a tech company.',
    'Banker': 'Working in the financial sector, assisting clients with their banking needs.',
    'Government Employee': 'Serving in a public sector role for a government ministry or department.',
    'Private Employee': 'Working for a private company in an administrative or executive capacity.',
    'Freelancer': 'Offering specialized services to various clients on a project basis.',
    'Entrepreneur': 'Founder and operator of a startup company in the tech/e-commerce space.',
    'Researcher': 'Conducting scientific research at a university or research institute.',
    'Consultant': 'Providing expert advice to businesses in a specific domain like IT or management.'
  },

  familyStatuses: ['upper_class', 'upper_middle', 'middle_class', 'lower_middle', 'lower_class'],
  
  clothingStyles: ['islamic', 'casual', 'formal', 'traditional'],
  
  yesNoOptions: ['yes', 'no'],
  aliveOptions: ['yes', 'no'],
  
  fiqhSchools: ['hanafi', 'shafi', 'maliki', 'hanbali', 'others'],

  diseases: [
    'No major health issues', 'None', 'Healthy and fit', 
    'Minor allergies', 'Slight asthma', 'Controlled diabetes', 'High blood pressure (managed)'
  ],

  hobbies: [
    'reading books', 'sports and fitness', 'traveling and exploring', 'cooking new recipes', 
    'gardening', 'learning new technologies', 'writing and blogging', 'photography'
  ],

  marriageThoughts: [
    'Looking for a practicing Muslim life partner to build a family based on Islamic values.',
    'Seeking a compatible, understanding, and supportive spouse for a lifelong journey.',
    'I believe in the institution of marriage as a means of completing half my deen.',
    'Ready to settle down with a righteous partner who shares similar life goals.'
  ],

  expectedQualities: [
    'A religious, honest, and family-oriented person with a good sense of humor.',
    'Someone who is kind, patient, respectful to elders, and has a positive outlook on life.',
    'Must be practicing Islam, have a good character, and be willing to grow together.',
    'I value intelligence, ambition, and a commitment to both deen and dunya.'
  ],
  
  maleNames: [
    'Mohammed Abdullah', 'Ahmed Hassan', 'Omar Faruk', 'Ali Rahman', 'Ibrahim Khan',
    'Yusuf Ahmed', 'Rashid Islam', 'Tariq Mahmud', 'Khalid Hasan', 'Saeed Ullah'
  ],
  
  femaleNames: [
    'Fatima Khatun', 'Ayesha Begum', 'Khadija Rahman', 'Zainab Ahmed', 'Maryam Khan',
    'Ruqayya Islam', 'Hafsa Mahmud', 'Umm Kulthum', 'Safiya Hasan', 'Asma Ullah'
  ],
  
  guardianRelations: ['father', 'mother', 'brother', 'uncle', 'guardian'],
  
  institutions: [
    'University of Dhaka', 'BUET', 'Chittagong University', 'Rajshahi University',
    'Jahangirnagar University', 'Islamic University', 'Dhaka Medical College',
    'NSU', 'BRAC University', 'IUT', 'Daffodil University'
  ]
};

// Helper functions
function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomBirthYear() {
  const currentYear = new Date().getFullYear();
  return (currentYear - randomNumber(20, 50)).toString();
}

function randomPhoneNumber() {
  return `+880${randomNumber(1000000000, 1999999999)}`;
}

function randomEmail(name) {
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
  const cleanName = name.toLowerCase().replace(/\s+/g, '.');
  return `${cleanName}${randomNumber(1, 999)}@${randomChoice(domains)}`;
}

function generateRandomBiodata(isMale = Math.random() > 0.5) {
  const division = randomChoice(SAMPLE_DATA.divisions);
  const district = randomChoice(SAMPLE_DATA.districts[division]);
  const fullName = randomChoice(isMale ? SAMPLE_DATA.maleNames : SAMPLE_DATA.femaleNames);
  const occupation = randomChoice(SAMPLE_DATA.occupations);
  
  const baseData = {
    // General Info
    biodataType: isMale ? 'males biodata' : 'females biodata',
    maritalStatus: randomChoice(SAMPLE_DATA.maritalStatuses),
    birthYear: randomBirthYear(),
    height: randomChoice(SAMPLE_DATA.heights),
    complexion: randomChoice(SAMPLE_DATA.complexions),
    weight: randomChoice(SAMPLE_DATA.weights),
    bloodGroup: randomChoice(SAMPLE_DATA.bloodGroups),
    nationality: 'Bangladeshi',
    
    // Present Address
    presentCountry: 'Bangladesh',
    presentDivision: division,
    presentDistrict: district,
    presentUpazilla: `${district} Sadar`,
    
    // Permanent Address (sometimes different)
    permanentCountry: 'Bangladesh',
    permanentDivision: Math.random() > 0.7 ? randomChoice(SAMPLE_DATA.divisions) : division,
    permanentDistrict: Math.random() > 0.7 ? randomChoice(SAMPLE_DATA.districts[division]) : district,
    permanentUpazilla: `${district} Sadar`,
    
    // Education Info
    highestDegree: randomChoice(SAMPLE_DATA.educationDegrees),
    institution: randomChoice(SAMPLE_DATA.institutions),
    graduationYear: randomNumber(2010, 2024),
    
    // Family Info
    fatherName: randomChoice(SAMPLE_DATA.maleNames),
    isFatherAlive: randomChoice(SAMPLE_DATA.aliveOptions),
    fatherProfession: randomChoice(SAMPLE_DATA.occupations),
    motherName: randomChoice(SAMPLE_DATA.femaleNames),
    isMotherAlive: randomChoice(SAMPLE_DATA.aliveOptions),
    motherProfession: Math.random() > 0.6 ? randomChoice(SAMPLE_DATA.occupations) : 'Housewife',
    familyStatus: randomChoice(SAMPLE_DATA.familyStatuses),
    numberOfSiblings: randomNumber(0, 5),
    
    // Personal Details
    clothing: randomChoice(SAMPLE_DATA.clothingStyles),
    praysFiveTimes: randomChoice(['yes', 'sometimes', 'trying']),
    mahramNonMahram: randomChoice(['yes', 'partially', 'learning']),
    recitesQuran: randomChoice(['fluently', 'with_difficulty', 'learning']),
    fiqh: randomChoice(SAMPLE_DATA.fiqhSchools),
    diseases: randomChoice(SAMPLE_DATA.diseases),
    dramasMoviesSongs: randomChoice(['no', 'sometimes', 'avoid']),
    mazarBeliefs: randomChoice(['shirk', 'not_shirk', 'unsure']),
    hobbies: `${randomChoice(SAMPLE_DATA.hobbies)}${Math.random() > 0.5 ? ', ' + randomChoice(SAMPLE_DATA.hobbies) : ''}`,
    
    // Occupational Info
    occupation: occupation,
    descriptionOfProfession: SAMPLE_DATA.occupationDescriptions[occupation] || 'Working in respective field',
    monthlyIncome: randomNumber(20000, 200000),
    
    // Marriage Info
    guardiansAgree: randomChoice(SAMPLE_DATA.yesNoOptions),
    marriageThoughts: randomChoice(SAMPLE_DATA.marriageThoughts),
    
    // Expected Life Partner
    expectedAge: `${randomNumber(20, 35)}-${randomNumber(36, 45)}`,
    expectedComplexion: randomChoice(['any', ...SAMPLE_DATA.complexions]),
    expectedHeight: randomChoice(['any', ...SAMPLE_DATA.heights]),
    expectedEducationalQualification: randomChoice(SAMPLE_DATA.educationDegrees),
    expectedDistrict: randomChoice(['any', district]),
    expectedMaritalStatus: 'single',
    expectedProfession: randomChoice(['any', ...SAMPLE_DATA.occupations]),
    expectedFinancialCondition: randomChoice(['middle_class', 'upper_middle_class', 'any']),
    expectedQualities: randomChoice(SAMPLE_DATA.expectedQualities),
    
    // Pledge
    parentsKnow: randomChoice(SAMPLE_DATA.yesNoOptions),
    allInfoTrue: 'yes',
    
    // Contact
    fullName: fullName,
    guardianMobileNumber: randomPhoneNumber(),
    relationshipWithGuardian: randomChoice(SAMPLE_DATA.guardianRelations),
    emailToReceiveBiodata: randomEmail(fullName),
    
    // Fake user ID for testing (you might want to create actual users too)
    userId: `fake_user_${randomNumber(10000, 99999)}`
  };

  
  // Add gender-specific fields
  if (isMale) {
    baseData.hasBeard = randomChoice(SAMPLE_DATA.yesNoOptions);
    baseData.beardSince = baseData.hasBeard === 'yes' ? `${randomNumber(1, 10)} years` : '';
    baseData.clothesAboveAnkles = randomChoice(SAMPLE_DATA.yesNoOptions);
    baseData.keepWifeInVeil = randomChoice(['yes', 'her_choice', 'family_decision']);
    baseData.allowWifeToStudy = randomChoice(['yes', 'after_marriage', 'family_decision']);
    baseData.allowWifeToDoJob = randomChoice(['yes', 'no', 'depends']);
    baseData.liveWithWifeAfterMarriage = randomChoice(['yes', 'separate', 'depends']);
  } else {
    baseData.wearNiqab = randomChoice(SAMPLE_DATA.yesNoOptions);
    baseData.niqabSince = baseData.wearNiqab === 'yes' ? `${randomNumber(1, 10)} years` : '';
    baseData.wantToDoJobAfterMarriage = randomChoice(['yes', 'no', 'depends']);
    baseData.wantToStudyAfterMarriage = randomChoice(['yes', 'no', 'depends']);
  }
  
  return baseData;
}

async function injectRandomBiodata(count = 50) {
  try {
    console.log(`Starting to inject ${count} random biodata entries...`);
    
    const batch = db.batch();
    const biodataCollection = db.collection('biodata');
    
    for (let i = 0; i < count; i++) {
      const biodata = generateRandomBiodata();
      
      // Add metadata
      const biodataWithMetadata = {
        ...biodata,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
        isTestData: true // Mark as test data for easy cleanup
      };
      
      const docRef = biodataCollection.doc();
      batch.set(docRef, biodataWithMetadata);
      
      if (i % 10 === 0) {
        console.log(`Prepared ${i}/${count} biodata entries...`);
      }
    }
    
    console.log('Committing batch write to Firebase...');
    await batch.commit();
    console.log(`✅ Successfully injected ${count} random biodata entries!`);
    
    // Show some statistics
    const totalBiodata = await db.collection('biodata').get();
    console.log(`📊 Total biodata in database: ${totalBiodata.size}`);
    
    const testBiodata = await db.collection('biodata').where('isTestData', '==', true).get();
    console.log(`🧪 Test biodata entries: ${testBiodata.size}`);
    
  } catch (error) {
    console.error('❌ Error injecting biodata:', error);
    process.exit(1);
  }
}

async function cleanupTestData() {
  try {
    console.log('🧹 Cleaning up test data...');
    
    const testBiodata = await db.collection('biodata').where('isTestData', '==', true).get();
    console.log(`Found ${testBiodata.size} test entries to delete`);
    
    if (testBiodata.empty) {
      console.log('No test data found to delete.');
      return;
    }

    const batch = db.batch();
    testBiodata.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
    console.log('✅ Test data cleaned up successfully!');
    
  } catch (error) {
    console.error('❌ Error cleaning up test data:', error);
    throw error; // Throw error to be handled by the API route
  }
}

// Command line interface
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  switch (command) {
    case 'inject':
      const count = parseInt(args[1]) || 50;
      await injectRandomBiodata(count);
      break;
      
    case 'cleanup':
      await cleanupTestData();
      break;
      
    case 'stats':
      const total = await db.collection('biodata').get();
      const test = await db.collection('biodata').where('isTestData', '==', true).get();
      console.log(`📊 Database Statistics:`);
      console.log(`   Total biodata: ${total.size}`);
      console.log(`   Test biodata: ${test.size}`);
      console.log(`   Real biodata: ${total.size - test.size}`);
      break;
      
    default:
      console.log(`
🔧 Random Biodata Injection Tool

Usage:
  node scripts/inject-random-biodata.js <command> [options]

Commands:
  inject [count]  - Inject random biodata (default: 50)
  cleanup         - Remove all test data
  stats          - Show database statistics

Examples:
  node scripts/inject-random-biodata.js inject 100
  node scripts/inject-random-biodata.js cleanup
  node scripts/inject-random-biodata.js stats
      `);
  }
  
  process.exit(0);
}

export { injectRandomBiodata, cleanupTestData };
