"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalDetailsForm from "./forms/PersonalDetailsForm";
import OccupationalInfoForm from "./forms/OccupationalInfoForm";
import { FamilyInfoForm } from "./forms/FamilyInfoForm";
import { EducationInfoForm } from "./forms/EducationInfoForm";
import { GeneralInfoForm } from "./forms/GeneralInfoForm";
import { MarriageInfoForm } from "./forms/MarriageInfoForm";
import { ExpectedLifePartnerForm } from "./forms/ExpectedLifePartnerForm";
import PledgeForm from "./forms/PledgeForm";
import ContactForm from "./forms/ContactForm";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "sonner";
import Address from "./forms/Address";
import { formSteps } from "@/constants";
import {
  createBiodata,
  getBiodataByUserId,
  updateBiodata,
} from "@/lib/actions/biodata.actions";
import { useAuth } from "@/lib/hooks/useAuth";
import { setBiodata } from "@/redux/biodataSlice";
import { setBiodataExists } from "@/redux/userSlice";
import { cleanBiodataForSave, getRequiredPersonalDetailFields, getRequiredMarriageInfoFields } from "@/lib/utils/biodataUtils";
import { useLanguage } from "@/contexts/LanguageContext";




// All schemas are now completely flat - no nested objects or .refine() complexity
const generalInfoSchema = z.object({
  biodataType: z.string().min(1, { message: "This field is required." }),
  maritalStatus: z.string().min(1, { message: "This field is required." }),
  birthYear: z.string().min(1, { message: "This field is required." }),
  height: z.string().min(1, { message: "This field is required." }),
  complexion: z.string().min(1, { message: "This field is required." }),
  weight: z.string().min(1, { message: "This field is required." }),
  bloodGroup: z.string().min(1, { message: "This field is required." }),
  nationality: z.string().min(1, { message: "This field is required." }),
});

const familyInfoSchema = z.object({
  fatherName: z.string().min(1, { message: "This field is required." }),
  isFatherAlive: z.string().min(1, { message: "This field is required." }),
  fatherProfession: z.string().min(1, { message: "This field is required." }),
  motherName: z.string().min(1, { message: "This field is required." }),
  isMotherAlive: z.string().min(1, { message: "This field is required." }),
  motherProfession: z.string().min(1, { message: "This field is required." }),
  familyStatus: z.string().min(1, { message: "This field is required." }),
  numberOfSiblings: z.coerce
    .number()
    .min(0, { message: "This field is required." }),
});

const educationInfoSchema = z.object({
  highestDegree: z.string().min(1, { message: "This field is required." }),
  institution: z.string().min(1, { message: "This field is required." }),
  graduationYear: z.coerce
    .number()
    .min(1, { message: "This field is required." }),
});

// Personal Details Schema (completely flat)
const personalDetailsSchema = z.object({
  clothing: z.string().min(1, { message: "This field is required." }),
  // Male specific fields
  hasBeard: z.string().optional(),
  beardSince: z.string().optional(),
  clothesAboveAnkles: z.string().optional(),
  // Female specific fields
  wearNiqab: z.string().optional(),
  niqabSince: z.string().optional(),
  // Common fields
  praysFiveTimes: z.string().min(1, { message: "This field is required." }),
  mahramNonMahram: z.string().min(1, { message: "This field is required." }),
  recitesQuran: z.string().min(1, { message: "This field is required." }),
  fiqh: z.string().min(1, { message: "This field is required." }),
  diseases: z.string().min(1, { message: "This field is required." }),
  dramasMoviesSongs: z.string().min(1, { message: "This field is required." }),
  mazarBeliefs: z.string().min(1, { message: "This field is required." }),
  hobbies: z.string().min(1, { message: "This field is required." }),
});

// Occupational Info Schema (completely flat)
const occupationalInfoSchema = z.object({
  occupation: z.string().min(1, { message: "This field is required." }),
  descriptionOfProfession: z
    .string()
    .min(1, { message: "This field is required." }),
  monthlyIncome: z.coerce
    .number()
    .min(0, { message: "This field is required." }),
});

// Marriage Info Schema (completely flat)
const marriageInfoSchema = z.object({
  guardiansAgree: z.string().min(1, { message: "This field is required." }),
  // Male specific fields
  keepWifeInVeil: z.string().optional(),
  allowWifeToStudy: z.string().optional(),
  allowWifeToDoJob: z.string().optional(),
  liveWithWifeAfterMarriage: z.string().optional(),
  // Female specific fields
  wantToDoJobAfterMarriage: z.string().optional(),
  wantToStudyAfterMarriage: z.string().optional(),
  // Common fields
  marriageThoughts: z.string().min(1, { message: "This field is required." }),
});

// Expected Life Partner Schema (completely flat with "expected" prefix)
const expectedLifePartnerSchema = z.object({
  expectedAge: z.string().min(1, { message: "This field is required." }),
  expectedComplexion: z.string().min(1, { message: "This field is required." }),
  expectedHeight: z.string().min(1, { message: "This field is required." }),
  expectedEducationalQualification: z
    .string()
    .min(1, { message: "This field is required." }),
  expectedDistrict: z.string().min(1, { message: "This field is required." }),
  expectedMaritalStatus: z
    .string()
    .min(1, { message: "This field is required." }),
  expectedProfession: z.string().min(1, { message: "This field is required." }),
  expectedFinancialCondition: z
    .string()
    .min(1, { message: "This field is required." }),
  expectedQualities: z.string().min(1, { message: "This field is required." }),
});

// Pledge Schema (completely flat)
const pledgeSchema = z.object({
  parentsKnow: z.string().min(1, { message: "This field is required." }),
  allInfoTrue: z.string().min(1, { message: "This field is required." }),
});

// Contact Schema (completely flat)
const contactSchema = z.object({
  fullName: z.string().min(1, { message: "This field is required." }),
  guardianMobileNumber: z
    .string()
    .min(1, { message: "This field is required." }),
  relationshipWithGuardian: z
    .string()
    .min(1, { message: "This field is required." }),
  emailToReceiveBiodata: z
    .string()
    .email({ message: "Invalid email address." }),
});

// Address Schema (completely flat with prefixes)
const presentAddressSchema = z.object({
  presentCountry: z.string().min(1, { message: "This field is required." }),
  presentDivision: z.string().min(1, { message: "This field is required." }),
  presentDistrict: z.string().min(1, { message: "This field is required." }),
  presentUpazilla: z.string().min(1, { message: "This field is required." }),
});

const permanentAddressSchema = z.object({
  permanentCountry: z.string().min(1, { message: "This field is required." }),
  permanentDivision: z.string().min(1, { message: "This field is required." }),
  permanentDistrict: z.string().min(1, { message: "This field is required." }),
  permanentUpazilla: z.string().min(1, { message: "This field is required." }),
});

// Combined Schema (ALL FLAT) - no more complex .shape or .refine() access
const combinedSchema = z.object({
  ...generalInfoSchema.shape,
  ...familyInfoSchema.shape,
  ...educationInfoSchema.shape,
  ...personalDetailsSchema.shape,
  ...occupationalInfoSchema.shape,
  ...marriageInfoSchema.shape,
  ...expectedLifePartnerSchema.shape,
  ...pledgeSchema.shape,
  ...contactSchema.shape,
  ...presentAddressSchema.shape,
  ...permanentAddressSchema.shape,
});

// Map tab IDs to their field names for validation
const tabToFields: Record<string, (keyof FormData)[]> = {
  general: Object.keys(generalInfoSchema.shape) as (keyof FormData)[],
  address: [
    ...Object.keys(presentAddressSchema.shape),
    ...Object.keys(permanentAddressSchema.shape),
  ] as (keyof FormData)[],
  education: Object.keys(educationInfoSchema.shape) as (keyof FormData)[],
  family: Object.keys(familyInfoSchema.shape) as (keyof FormData)[],
  personalDetails: Object.keys(
    personalDetailsSchema.shape
  ) as (keyof FormData)[],
  occupationalInfo: Object.keys(
    occupationalInfoSchema.shape
  ) as (keyof FormData)[],
  marriageInfo: Object.keys(marriageInfoSchema.shape) as (keyof FormData)[],
  expectedLifePartner: Object.keys(
    expectedLifePartnerSchema.shape
  ) as (keyof FormData)[],
  pledge: Object.keys(pledgeSchema.shape) as (keyof FormData)[],
  contact: Object.keys(contactSchema.shape) as (keyof FormData)[],
};

type FormData = z.infer<typeof combinedSchema>;

const EditBiodata = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [unlockedTabs, setUnlockedTabs] = useState(["general"]);
  const dispatch = useDispatch();
  const biodata = useSelector((state: RootState) => state.biodata);
  const { user } = useAuth();
  const userId = user?.uid;
  const { t, isLoading } = useLanguage();
  console.log(userId, "User ID in EditBiodata");
  
  const form = useForm<FormData>({
    resolver: zodResolver(combinedSchema),
    defaultValues: biodata,
  });

  const fetchBiodata = useCallback(async () => {
    try {
      if (!userId) {
        console.log("User not authenticated. Cannot fetch biodata.");
        return;
      }
      const res = await getBiodataByUserId(userId);
      if (res.success && res.data) {
        console.log(res.data);
        form.reset(res.data);
        dispatch(setBiodata(res.data));
        
        // Unlock all tabs when user has existing biodata
        const allTabIds = formSteps.map(step => step.id);
        setUnlockedTabs(allTabIds);
      } else {
        console.log('error fetching biodata:', res.message);
      }
    } catch (error: any) {
      console.log("Error fetching biodata:", error);
      toast.error("Failed to fetch biodata. Please try again.");
    }
  }, [userId, form, dispatch]);

  useEffect(() => {
    fetchBiodata();
  }, [fetchBiodata]);

  const handleNext = async (currentTabId: string) => {
    let fieldsToValidate = tabToFields[currentTabId];
    
  // Special handling for conditional fields
    if (currentTabId === 'personalDetails') {
      const biodataType = form.getValues('biodataType');
      const formValues = form.getValues();
      
      fieldsToValidate = getRequiredPersonalDetailFields(biodataType, formValues) as (keyof FormData)[];
    } else if (currentTabId === 'marriageInfo') {
      const biodataType = form.getValues('biodataType');
      const formValues = form.getValues();
      
      fieldsToValidate = getRequiredMarriageInfoFields(biodataType, formValues) as (keyof FormData)[];
    }
    
    const isValid = await form.trigger(fieldsToValidate);

    if (isValid) {
      const currentStepIndex = formSteps.findIndex(
        (step) => step.id === currentTabId
      );
      if (currentStepIndex < formSteps.length - 1) {
        const nextStep = formSteps[currentStepIndex + 1];
        setUnlockedTabs((prev) => [...new Set([...prev, nextStep.id])]);
        setActiveTab(nextStep.id);
      }
    } else {
      toast.error("Please fill all the required fields in this section.");
    }
  };

  const handleBack = () => {
    const currentStepIndex = formSteps.findIndex(
      (step) => step.id === activeTab
    );
    if (currentStepIndex > 0) {
      const prevStep = formSteps[currentStepIndex - 1];
      setActiveTab(prevStep.id);
    }
  };


  const handleSave = async (values: FormData) => {
    try {
      // Clean the data before saving using utility function
      const cleanedValues = cleanBiodataForSave(values);
      
      if (biodata.id) {
        const result = await updateBiodata(biodata.id, cleanedValues);
        if (result.success) {
          toast.success(result.message);
          dispatch(setBiodata({ ...cleanedValues, id: biodata.id }));
          dispatch(setBiodataExists(true)); // Update sidebar status instantly
        } else {
          toast.error(result.message || "Failed to update biodata.");
        }
      } else if (userId) {
        const result = await createBiodata(cleanedValues, userId);
        if (result.success && result.biodataId) {
          toast.success(result.message);
          dispatch(setBiodata({ ...cleanedValues, id: result.biodataId }));
          dispatch(setBiodataExists(true)); // Update sidebar status instantly
        } else {
          toast.error(result.message || "Failed to create biodata.");
        }
      } else {
        toast.error("User not authenticated. Please sign in again.");
      }
    } catch (error: any) {
      console.error("Error saving biodata:", error);
      toast.error("Failed to save biodata. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 bg-gradient-to-br from-primary/5 to-primary/10 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-500">Loading translations...</p>
        </div>
      </div>
    );
  }



  return (
    <div className="w-full max-w-none overflow-x-hidden mx-auto py-6 sm:py-10 px-2 sm:px-6 lg:px-8  min-h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)} className="w-full max-w-full">
          <Tabs
            value={activeTab}
            onValueChange={(value) => {
              if (unlockedTabs.includes(value)) {
                setActiveTab(value);
              }
            }}
            className="w-full max-w-full"
            orientation="vertical"
          >
            <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4 w-full max-w-full">
              {/* Mobile: Wrapped tabs */}
              <TabsList className="flex justify-between items-center lg:hidden w-full  h-fit flex-wrap bg-primary/10 border border-primary/20 rounded-lg  ">
                {formSteps.map((step, index) => (
                  <TabsTrigger
                    key={step.id}
                    value={step.id}
                    disabled={!unlockedTabs.includes(step.id)}
                    className="min-w-fit text-black hover:bg-primary/20 min-h-[44px] flex items-center justify-center text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground p-1"
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-1 flex-shrink-0 ${
                      activeTab === step.id ? 'bg-white' : 'bg-primary/20'
                    }`}>
                      <span className={`text-xs font-bold ${
                        activeTab === step.id ? 'text-primary' : 'text-primary'
                      }`}>{index + 1}</span>
                    </div>
                    
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {/* Desktop: Vertical tabs */}
              <TabsList className="hidden lg:flex lg:flex-col bg-primary/10 border border-primary/20 rounded-lg p-2 h-fit self-start">
                {formSteps.map((step) => (
                  <TabsTrigger
                    key={step.id}
                    value={step.id}
                    disabled={!unlockedTabs.includes(step.id)}
                    className="w-full justify-start data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-black hover:bg-primary/20 min-h-[44px] flex items-center py-2 px-3"
                  >
                    <step.icon className="mr-2 flex-shrink-0" />
                    <span className="truncate">{t(step.translationKey)}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <div className="lg:col-span-3">
                <TabsContent value="general" className="w-full">
                  <Card className="border-primary/20 shadow-lg shadow-primary/10">
                    <CardHeader className="bg-primary/5">
                      <CardTitle className="text-gray-500 text-2xl font-bold">
                        {t(`user.editBiodata.sections.${activeTab}.title`)}
                      </CardTitle>
                      <CardDescription className="text-gray-500">
                        {t('user.editBiodata.sections.general.description')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 bg-white/50">
                      <GeneralInfoForm form={form} />
                      <div className="mt-6 flex justify-end">
                        <Button
                          type="button"
                          onClick={() => handleNext("general")}
                        >
                          Next
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="address" className="w-full">
                  <Card className="border-primary/20 shadow-lg shadow-primary/10">
                    <CardHeader className="bg-primary/5">
                      <CardTitle className="text-gray-500 text-2xl font-bold">
                        {t(`user.editBiodata.sections.${activeTab}.title`)}
                      </CardTitle>
                      <CardDescription className="text-gray-500">
                        {t('user.editBiodata.sections.address.description')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 bg-white/50">
                      <FormProvider {...form}>
                        <Address />
                      </FormProvider>
                      <div className="mt-6 flex justify-between">
                        <Button
                          onClick={handleBack}
                          type="button"
                          className="btn-secondary"
                        >
                          Back
                        </Button>
                        <Button
                          onClick={() => handleNext("address")}
                          type="button"
                        >
                          Next
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="education" className="w-full">
                  <Card className="border-primary/20 shadow-lg shadow-primary/10">
                    <CardHeader className="bg-primary/5">
                      <CardTitle className="text-gray-500 text-2xl font-bold">
                        {t(`user.editBiodata.sections.${activeTab}.title`)}
                      </CardTitle>
                      <CardDescription className="text-gray-500">
                        {t('user.editBiodata.sections.education.description')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 bg-white/50">
                      <EducationInfoForm form={form} />
                      <div className="mt-6 flex justify-between">
                        <Button
                          onClick={handleBack}
                          type="button"
                          className="btn-secondary"
                        >
                          Back
                        </Button>
                        <Button
                          onClick={() => handleNext("education")}
                          type="button"
                        >
                          Next
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="family" className="w-full">
                  <Card className="border-primary/20 shadow-lg shadow-primary/10">
                    <CardHeader className="bg-primary/5">
                      <CardTitle className="text-gray-500 text-2xl font-bold">
                        {t(`user.editBiodata.sections.${activeTab}.title`)}
                      </CardTitle>
                      <CardDescription className="text-gray-500">
                        {t('user.editBiodata.sections.family.description')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 bg-white/50">
                      <FamilyInfoForm form={form} />
                      <div className="mt-6 flex justify-between">
                        <Button
                          onClick={handleBack}
                          type="button"
                          className="btn-secondary"
                        >
                          Back
                        </Button>
                        <Button
                          onClick={() => handleNext("family")}
                          type="button"
                        >
                          Next
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="personalDetails" className="w-full">
                  <Card className="border-primary/20 shadow-lg shadow-primary/10">
                    <CardHeader className="bg-primary/5">
                      <CardTitle className="text-gray-500 text-2xl font-bold">
                        {t(`user.editBiodata.sections.${activeTab}.title`)}
                      </CardTitle>
                      <CardDescription className="text-gray-500">
                        {t('user.editBiodata.sections.personalDetails.description')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 bg-white/50">
                      <FormProvider {...form}>
                        <PersonalDetailsForm />
                      </FormProvider>
                      <div className="mt-6 flex justify-between">
                        <Button
                          onClick={handleBack}
                          type="button"
                          className="btn-secondary"
                        >
                          Back
                        </Button>
                        <Button
                          type="button"
                          onClick={() => handleNext("personalDetails")}
                        >
                          Next
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="occupationalInfo" className="w-full">
                  <Card className="border-primary/20 shadow-lg shadow-primary/10">
                    <CardHeader className="bg-primary/5">
                      <CardTitle className="text-gray-500 text-2xl font-bold">
                        {t(`user.editBiodata.sections.${activeTab}.title`)}
                      </CardTitle>
                      <CardDescription className="text-gray-500">
                        {t('user.editBiodata.sections.occupationalInfo.description')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 bg-white/50">
                      <FormProvider {...form}>
                        <OccupationalInfoForm />
                      </FormProvider>
                      <div className="mt-6 flex justify-between">
                        <Button
                          onClick={handleBack}
                          type="button"
                          className="btn-secondary"
                        >
                          Back
                        </Button>
                        <Button
                          type="button"
                          onClick={() => handleNext("occupationalInfo")}
                        >
                          Next
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="marriageInfo" className="w-full">
                  <Card className="border-primary/20 shadow-lg shadow-primary/10">
                    <CardHeader className="bg-primary/5">
                      <CardTitle className="text-gray-500 text-2xl font-bold">
                        {t(`user.editBiodata.sections.${activeTab}.title`)}
                      </CardTitle>
                      <CardDescription className="text-gray-500">
                        {t('user.editBiodata.sections.marriageInfo.description')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 bg-white/50">
                      <MarriageInfoForm form={form} />
                      <div className="mt-6 flex justify-between">
                        <Button
                          onClick={handleBack}
                          type="button"
                          className="btn-secondary"
                        >
                          Back
                        </Button>
                        <Button
                          type="button"
                          onClick={() => handleNext("marriageInfo")}
                        >
                          Next
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="expectedLifePartner" className="w-full">
                  <Card className="border-primary/20 shadow-lg shadow-primary/10">
                    <CardHeader className="bg-primary/5">
                      <CardTitle className="text-gray-500 text-2xl font-bold">
                        {t(`user.editBiodata.sections.${activeTab}.title`)}
                      </CardTitle>
                      <CardDescription className="text-gray-500">
                        {t('user.editBiodata.sections.expectedLifePartner.description')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 bg-white/50">
                      <ExpectedLifePartnerForm form={form} />
                      <div className="mt-6 flex justify-between">
                        <Button
                          onClick={handleBack}
                          type="button"
                          className="btn-secondary"
                        >
                          Back
                        </Button>
                        <Button
                          type="button"
                          onClick={() => handleNext("expectedLifePartner")}
                        >
                          Next
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="pledge" className="w-full">
                  <Card className="border-primary/20 shadow-lg shadow-primary/10">
                    <CardHeader className="bg-primary/5">
                      <CardTitle className="text-gray-500 text-2xl font-bold">
                        {t(`user.editBiodata.sections.${activeTab}.title`)}
                      </CardTitle>
                      <CardDescription className="text-gray-500">
                        {t('user.editBiodata.sections.pledge.description')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 bg-white/50">
                      <FormProvider {...form}>
                        <PledgeForm />
                      </FormProvider>
                      <div className="mt-6 flex justify-between">
                        <Button
                          onClick={handleBack}
                          type="button"
                          className="btn-secondary"
                        >
                          Back
                        </Button>
                        <Button
                          type="button"
                          onClick={() => handleNext("pledge")}
                        >
                          Next
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="contact" className="w-full">
                  <Card className="border-primary/20 shadow-lg shadow-primary/10">
                    <CardHeader className="bg-primary/5">
                      <CardTitle className="text-gray-500 text-2xl font-bold">
                        {t(`user.editBiodata.sections.${activeTab}.title`)}
                      </CardTitle>
                      <CardDescription className="text-gray-500">
                        {t('user.editBiodata.sections.contact.description')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 bg-white/50">
                      <FormProvider {...form}>
                        <ContactForm />
                      </FormProvider>
                      <div className="mt-6 flex justify-between">
                        <Button
                          onClick={handleBack}
                          type="button"
                          className="btn-secondary"
                        >
                          Back
                        </Button>
                        <Button type="submit">Save</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </form>
      </Form>
    </div>
  );
};

export default EditBiodata;
