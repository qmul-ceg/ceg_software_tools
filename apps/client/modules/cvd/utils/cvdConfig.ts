import { FilterStates } from "@/types/shared.types";
import { SystmOneReportKeys, EMISReportKeys } from "../constants/cvdDataEnums";
import { checkFinancialYear, convertDate, recordedOverTwelveMonths, splitBloodPressureValue } from "@/features/display/helpers/displayHelpers";
import { TableConfig } from "@/types/shared.types";

//CREATE TYPE FOR THE CONFIGURATIONS SO THAT OTHER TOOLS WILL BE ABLE TO USE IT 


type MultiOption = {
   value: string;
   label: string
}

type GroupOption = {
   groupName: string;
   groupOptions: MultiOption[]
}

type Options = Record<string, { groupName : string; groupOptions: { value: string; label: string }[]}>

type GroupedOptions = Record <string, GroupOption>;


type MultiFilter = {
   id : string,
   label : string,
   ui : { width : number, bgColour: string},
   kind : "multi",
   options : MultiOption[],
   emptyBehaviour : []
} 

type GroupedFilter = {
   id : string,
   label : string,
   ui : { width : number, bgColour: string},
   kind : "grouped",
   options : GroupedOptions,
   emptyBehaviour : [][]
} 
type IndexMap = typeof SystmOneReportKeys | typeof EMISReportKeys



type quickFilter = {
   id : number,
   label : string
   value : FilterStates
}



type moduleConfig = {
   toolName: string,
   filters : {}
}




export const cvdConfig = {

   toolName : "CVD Prevention tool",

   filters : {

      antihypertensiveMedsFilter : {
         id: "antihypertensiveMedsFilter",
         label : "Antihypertensive meds",
         ui : {
            width : 14,
            bgColour : "#21376A"
         },
         kind : "grouped",

         options : {
            groupOne : {
               groupName : "",
               groupOptions: [
                  {  value: "acei/arb", label : "ACEi/ARB"  },
                  {  value: "no_acei/arb", label : "No ACEi/ARB"  },
                  {  value: "cachannel", label : "Ca-Channel"  },
                  {  value: "thiazides", label : "Thiazides"  },
                  {  value: "betablockers", label : "Beta-blockers"  },
                  {  value: "others", label : "Others"  }
               ]
            },
            groupTwo: {
               groupName : "No. of Antihypertensives",
               groupOptions : [
                  {  value: "0", label : "0"  },
                  {  value: "1", label : "1"  },
                  {  value: "gte2", label : "2 or more"  },
               ]
            },
            groupThree: {
               groupName : "",
               groupOptions : [
                  {  value: "dose", label : "Max tolerated dose"  },
               ]
            },
            groupFour : {
               groupName : "",
               groupOptions : [
                     {  value: "declined", label : "Antihypertensives declined (12m)"  },
               ]
            }
         },

         emptyBehaviour : [[],[], [], []]
      },

      //BloodPressureReadings
      bloodPressureFilter : {
         id: "bloodPressureFilter",
         label : "Blood pressure readings",
         ui : {
            width : 14,
            bgColour : "#21376A"
         },
         kind : "grouped",

         options : {
            groupOne : {
               groupName: "",
               groupOptions : [
                  {  value : "<140/90", label : "Under 140/90" },
                  {  value : "gte140/90", label : "Over 140/90" },
                  {  value : "gte150/90", label : "Over 150/90" },       
               ]
            },
            groupTwo : {
               groupName: "",
               groupOptions : [
                  {  value : "<12m", label : "Not recorded in last 12m" },
                  {  value : "notInFinancialYear", label : "Not in financial year" },

               ]
            },
         },
         
         emptyBehaviour : [[],[]]

      },

      //HouseboundCarehome
      houseboundCarehomeFilter : {
         id : "houseboundCarehomeFilter",
         label : "Housebound/Carehome",
         ui : {
            width : 14,
            bgColour : "#21376A"
         },
         kind : "multi", 

         options : [
            {value : "housebound", label: "Housebound"},
            {value : "carehome", label: "Carehome"},

         ], 
         emptyBehaviour : []
      },


      //LipidMeds
      lipidMedicationsFilter : {
         id: "lipidMedicationsFilter",
         label : "Lipid medications",
         ui : {
            width : 12,
            bgColour : "#21376A"
         },
         kind : "grouped",

         options : {
            groupOne : {
               groupName: "Statin",
               groupOptions : [
                  {  value : "highIntensity", label : "High intensity statin" },
                  {  value : "mediumLow", label : "Medium or low intensity" },
                  {  value : "noStatin", label : "Not on statin" },       
               ]
            },
            groupTwo : {
               groupName: "",
               groupOptions : [
                  {  value : "onInclisiran", label : "On inclisiran" },
               ]
            },
            groupThree : {
               groupName: "",
               groupOptions : [ {  value : "dose", label : "Max tolerated dose" } ]
            },
            
            groupFour : {
               groupName: "",
               groupOptions : [ {  value : "statinExclusions", label : "Statin exclusions (Valid* contraindicated/declined)" } ]
            },
         },
         
         emptyBehaviour : [[],[], [], []]

      },

      //comorbiditiesFilter
      comorbiditiesFilter : {
         id : "comorbiditiesFilter",
         label : "Co-morbidities",
         ui : {
            width : 12,
            bgColour : "#21376A"
         },
         kind : "multi", 

         options : [
            {value : "cvd", label: "CVD (IHD/Stroke/TIA/PAD)"},
            {value : "hypertension", label: "Hypertension"},
            {value : "diabetes", label: "Diabetes"},
            {value : "ckd", label: "CKD 3-5"},
            {value : "af", label: "Atrial fibrillation"},
            {value : "cancer", label: "Cancer"},
            {value : "noHypertension", label: "No hypertension"}
         ], 
         emptyBehaviour : []
      },

      //CholestrolReadings
      cholestrolFilter : {
         id: "cholestrolFilter",
         label : "Cholestrol readings",
         ui : {
            width : 12,
            bgColour : "#21376A"
         },
         kind : "grouped",

         options : {
            groupOne : {
               groupName: "LDL",
               groupOptions : [
                  // {  value : "ldl", label : "LDL" },
                  {  value : ">2.0", label : "> 2.0" },
                        
               ]
            },
            groupTwo : {
               groupName: "",
               groupOptions : [
                  {  value : "<12m", label : "Not recorded in last 12m" },
                  {  value : "notInFinancialYear", label : "Not in financial year" },
               ]
            },
         },
         
         emptyBehaviour : [[],[]]

      },

      //QRiskScore
      qRiskFilter : {
         id: "qRiskFilter",
         label : "QRisk score",
         ui : {
            width : 10,
            bgColour : "#21376A"
         },
         kind : "grouped",

         options : {
            groupOne : {
               groupName: "",
               groupOptions : [
                  {  value : ">10", label : "10% or more" },
                  {  value : ">20", label : "20% or more" },
                        
               ]
            },
            groupTwo : {
               groupName: "",
               groupOptions : [
                  {  value : "<12m", label : "Not recorded in last 12m" },
               ]
            },
         },
         
         emptyBehaviour : [[],[]]

      },

      //Vulnerabilities
      vulnerabilitiesFilter : {
         id : "vulnerabilitiesFilter",
         label : "Vulnerabilities",
         ui : {
            width : 10,
            bgColour : "#21376A"
         },
         kind : "multi", 

         options : [
            {value : "smi", label: "Severe mental illness"},
            {value : "learning", label: "Learning disability"},
            {value : "dementia", label: "Dementia"},
         ], 
         emptyBehaviour : []
      },

      //Ethnicity
      ethnicityFilter : {
         id: "ethnicityFilter",
         label : "Ethnicity",
         ui : {
            width : 10,
            bgColour : "#21376A"
         },
            kind : "multi", 

         options : [
            {value : "asianBritish", label: "Asian/Asian British"},
            {value : "blackBritish", label: "Black/Black British"},
            {value : "mixed", label: "Mixed or multiple ethnic groups"},
            {value : "white", label: "White"},
            {value : "other", label: "Other/Not specified"},
         ], 
         emptyBehaviour : []

      },
     
      //Age
      ageFilter : {
         id : "ageFilter",
         label : "Age",
         ui : {
            width : 9,
            bgColour : "#21376A"
         },
         kind : "multi", 

         options : [
            {value : "lt65", label: " < 65 "},
            {value : "65-79", label: "65 - 79"},
            {value : "gte80", label: "≥ 80"},
         ], 
         emptyBehaviour : []
      },

      //adverseMedsFilter
      adverseMedsFilter : {
         id : "adverseMedsFilter",
         label : "Adverse meds",
         ui : {
            width : 9,
            bgColour : "#D32F2F"
         },
         kind : "multi", 

         options : [
            {value : "nsaids", label: "NSAIDs (excl. aspirin)"},
         ], 
         emptyBehaviour : []
      },



   } satisfies Record<string, MultiFilter | GroupedFilter>, // ADD COMMENT


   quickFilters : {
      optionOne : {
         id : "optionsOne",
         label : "BP > 140/90, no hypertension diagnosis",
         payload : {
               bloodPressureFilter: {  kind: "grouped", value: [["gte140/90"],[]]  },
               comorbiditiesFilter: {kind: "multi", value: ["noHypertension"]},

               // hptnDiagnosis : { kind: "multi", value : ["no"] }
         }
      },
      optionTwo : {
         id : "optionTwo",
         label : "CVD and not on statin",
         payload : {
            comorbiditiesFilter : {kind : "multi", value : ["cvd"]},
            lipidMedicationsFilter: {kind: "grouped", value: [["noStatin"],[],[],[]]}

         }
      },
      optionThree : {
         id : "optionThree",
         label : "CKD 3-5 and diabetes, not on ACEi/ARB",
         payload : {
               // aceiArbFilter : {kind : "multi", value : ["no"]},
               antihypertensiveMedsFilter : {kind : "grouped", value : [["no_acei/arb"], [], [], []]},
               comorbiditiesFilter: {kind: "multi", value: ["ckd", "diabetes"]},
         }
      },
      optionFour : {
         id : 4,
         label : "Raised QRISK and not on statin",
         payload : {
            qRiskFilter: {kind: "grouped", value: [[">20"],[]]},
            lipidMedicationsFilter: {kind: "grouped", value: [["noStatin"],[],[],[]]},
         }
      },
      optionFive : {
         id : 5,
         label : "CKD on NSAID",
         payload : {
            comorbiditiesFilter: {kind: "multi", value: ["ckd"]},
            adverseMedsFilter: {kind: "multi", value: ["nsaids"]},
         }
      },
      optionSix : {
         id : 6,
         label : "Hypertension, no antihypertensive and BP > 140/90 ",
         payload : {
               bloodPressureFilter: {  kind: "grouped", value: [["gte140/90"],[]]  },
               comorbiditiesFilter: {  kind: "multi", value: ["hypertension"] },
               antihypertensiveMedsFilter : {kind: "grouped", value: [[],["0"], [], []]},
         }
      },
      optionSeven : {
         id : 7,
         label : "Hypertension with last BP < 12m ago",
         payload : {
            comorbiditiesFilter: {kind: "multi", value: ["hypertension"]},
            bloodPressureFilter: {  kind: "grouped", value: [[],["<12m"]]  },
         }
      }
   },

   summaryTable : 
      [
         ["CVD:- prescribed high intensity statin", "0", "0", "0%"],
         ["CVD with LDL ≥ 2.6 and NOT on inclisiran", "0", "0", "0%"],
         ["CVD with LDL <= 2 (QoF)", "0", "0", "0%"],
         ["CVD:- NOT on statin", "0", "0", "0%"],
         ["QRisk 2/3 10% - 19%:- prescribed statin", "0", "0", "0%"],
         ["QRisk 2/3 ≥ 20%:- prescribed statin", "0", "0", "0%"],
         ["Hypertension:- BP ≤ 140/90 (age < 80) (QoF)", "0", "0", "0%"],
         ["Hypertension:- BP ≤ 150/90 (age ≥ 80) (QoF)", "0", "0", "0%"],
         ["CKD 3-5 prescribed any statin", "0", "0", "0%"]
   ],

   tableHeader : 
      [  "Full name", "Age", "Gender", "Patient reference no.", "Statin prescription", "Statin intensity", 
         "Statin exclusion", "Inclisiran", "Blood pressure", "CVD", "CKD 3 - 5", "HTN", "Diabetes", "Total cholestrol", 
         "LDL cholestrol", "eGFR", "No. of anti-hptn meds", "Medication review latest date"
   ],

      
   filterStatesConfig: {
      antihypertensiveMedsFilter : {kind: "grouped", value: [[],[], [], []]},
      bloodPressureFilter: {kind: "grouped", value: [[],[]]},
      houseboundCarehomeFilter : {kind: "multi", value: []},
      lipidMedicationsFilter: {kind: "grouped", value: [[],[],[],[]]},
      comorbiditiesFilter: {kind: "multi", value: []},
      cholestrolFilter: {kind: "grouped", value: [[], []]},
      qRiskFilter: {kind: "grouped", value: [[],[]]},
      vulnerabilitiesFilter: {kind: "multi", value: []},
      ethnicityFilter: {kind: "multi", value: []},
      ageFilter: {kind: "multi", value: []},
      adverseMedsFilter: { kind: "multi", value: []   },

      //For quick filters
      hptnDiagnosis: {  kind: "multi", value: []   },
      aceiArbFilter : { kind : "multi", value : []  }
   },

   filterFunctionalities: { 
      antihypertensiveMedsFilter : (row: string[], filterStates:FilterStates, reportKeys:IndexMap, relativeRunDate:string) : boolean => {
          const antihypertensiveMedsFilterGroupOne = () => {
            const aceiArb = filterStates.antihypertensiveMedsFilter.value[0].includes("acei/arb") && row[reportKeys.ACEi_ARB_Name_Dosage_Quantity].trim();
            const noAceiArb = filterStates.antihypertensiveMedsFilter.value[0].includes("no_acei/arb") && !row[reportKeys.ACEi_ARB_Name_Dosage_Quantity].trim();

            const caChannel = filterStates.antihypertensiveMedsFilter.value[0].includes("cachannel") && row[reportKeys.Ca_Channel_Name_Dosage_Quantity].trim();
            const thiazides = filterStates.antihypertensiveMedsFilter.value[0].includes("thiazides") && row[reportKeys.Thiazides_Name_Dosage_Quantity].trim();
            const betaBlockers = filterStates.antihypertensiveMedsFilter.value[0].includes("betablockers") && row[reportKeys.Beta_Blocker_Name_Dosage_Quantity].trim()
            const others = filterStates.antihypertensiveMedsFilter.value[0].includes("others") 
               && (row[reportKeys.Other_Diuretic_Name_Dosage_Quantity].trim() 
               || row[reportKeys.Other_Lipid_Lowering_Name_Dosage_Quantity].trim() 
               || row[reportKeys.Alpha_Blocker_Name_Dosage_Quantity].trim())

            return { aceiArb, caChannel, thiazides, betaBlockers, others, noAceiArb }
         }

         const antihypertensiveMedsFilterGroupTwo = () => {
            const equalToZero = filterStates.antihypertensiveMedsFilter.value[1].includes("0") && parseInt(row[reportKeys.AntiHptnMedicationCount]) === 0;
            const equalToOne = filterStates.antihypertensiveMedsFilter.value[1].includes("1") && parseInt(row[reportKeys.AntiHptnMedicationCount]) === 1;
            const gteTwo = filterStates.antihypertensiveMedsFilter.value[1].includes("gte2") && parseInt(row[reportKeys.AntiHptnMedicationCount]) >= 2;

            return { equalToZero, equalToOne, gteTwo }
         }

         const { aceiArb, caChannel, thiazides, betaBlockers, others, noAceiArb} = antihypertensiveMedsFilterGroupOne();
         const { equalToZero, equalToOne, gteTwo } = antihypertensiveMedsFilterGroupTwo();
         const getMaxToleratedDose = filterStates.antihypertensiveMedsFilter.value[2].includes("dose") && (row[reportKeys.AntiHT_Max_Tol_Dose_Date])
            
         const getAntihypertensiveDeclined = filterStates.antihypertensiveMedsFilter.value[3].includes("declined") && (row[reportKeys.AntiHT_Decline_Date] && !recordedOverTwelveMonths(convertDate(row[reportKeys.AntiHT_Decline_Date]), convertDate(relativeRunDate)))

         const filterByAntihypertensiveMeds = 
         //When nothing is selected
         (  filterStates.antihypertensiveMedsFilter.value[0].length === 0 
            && filterStates.antihypertensiveMedsFilter.value[1].length === 0  
            && filterStates.antihypertensiveMedsFilter.value[2].length === 0  
            && filterStates.antihypertensiveMedsFilter.value[3].length === 0 ) ||

         //Value selected in first group ONLY
         (filterStates.antihypertensiveMedsFilter.value[0].length > 0
            && (aceiArb || caChannel || thiazides || betaBlockers || others || noAceiArb) 
            && filterStates.antihypertensiveMedsFilter.value[1].length === 0 
            && filterStates.antihypertensiveMedsFilter.value[2].length === 0  
            && filterStates.antihypertensiveMedsFilter.value[3].length === 0 )||

         // Value selected in second group ONLY
         (filterStates.antihypertensiveMedsFilter.value[1].length > 0 
            && (equalToZero || equalToOne || gteTwo)
            && filterStates.antihypertensiveMedsFilter.value[0].length === 0
            && filterStates.antihypertensiveMedsFilter.value[2].length === 0  
            && filterStates.antihypertensiveMedsFilter.value[3].length === 0 
         ) ||

         // Value selected from third group only 
         (  filterStates.antihypertensiveMedsFilter.value[0].length === 0 
            && filterStates.antihypertensiveMedsFilter.value[1].length === 0  
            && filterStates.antihypertensiveMedsFilter.value[2].length > 0 && getMaxToleratedDose  
            && filterStates.antihypertensiveMedsFilter.value[3].length === 0 ) ||

         //Value from fourth group only
         (  filterStates.antihypertensiveMedsFilter.value[1].length === 0 
            && filterStates.antihypertensiveMedsFilter.value[0].length === 0
            && filterStates.antihypertensiveMedsFilter.value[3].length >  0 && getAntihypertensiveDeclined 
         ) ||

         //Values from both groups are selected
         (  filterStates.antihypertensiveMedsFilter.value[0].length > 0
            && (aceiArb || caChannel || thiazides || betaBlockers || others || noAceiArb) ||
            filterStates.antihypertensiveMedsFilter.value[1].length > 0 
            && (equalToZero || equalToOne || gteTwo) ||
            filterStates.antihypertensiveMedsFilter.value[3].length > 0 
            && (getAntihypertensiveDeclined)
         )

         return filterByAntihypertensiveMeds;
      }, 
      
      bloodPressureFilter : (row: string[], filterStates:FilterStates, reportKeys:IndexMap, relativeRunDate:string): boolean => {
         const bloodPressureFilterGroupOne = () => {
            const [systolic , diastolic ] = splitBloodPressureValue(row[reportKeys.BloodPressure]);
       

            const lowerBound = filterStates.bloodPressureFilter.value[0].includes("<140/90") && (parseInt(systolic) < 140 && parseInt(diastolic) < 90);
            const midBound = filterStates.bloodPressureFilter.value[0].includes("gte140/90") && (parseInt(systolic) >= 140 || parseInt(diastolic) >= 90);
            const upperBound = filterStates.bloodPressureFilter.value[0].includes("gte150/90") && (parseInt(systolic) >= 150 || parseInt(diastolic) >= 90);

            return { lowerBound, midBound, upperBound }
         }

         const { lowerBound, midBound, upperBound } = bloodPressureFilterGroupOne();
         const recordedDateResult = recordedOverTwelveMonths(convertDate(row[reportKeys.Systolic_BP_Date_1]), convertDate(relativeRunDate))
         const overTwelveMonths = filterStates.bloodPressureFilter.value[1].includes("<12m") && recordedDateResult
         const financialYearCheck = checkFinancialYear(convertDate(row[reportKeys.Systolic_BP_Date_1]))
         const notInFinancialYear = filterStates.bloodPressureFilter.value[1].includes("notInFinancialYear") && financialYearCheck

         const filterByBloodPressure = 
            // When no filter is selected
            (
               filterStates.bloodPressureFilter.value[0].length === 0 
               && filterStates.bloodPressureFilter.value[1].length === 0 
            ) ||

            //When blood pressure value is selected only 
            (
               filterStates.bloodPressureFilter.value[0].length > 0 && (lowerBound || midBound || upperBound) 
               && filterStates.bloodPressureFilter.value[1].length === 0
            ) ||

            // When date is selected only
            (
               filterStates.bloodPressureFilter.value[0].length === 0 
               && (filterStates.bloodPressureFilter.value[1].length > 0 && (overTwelveMonths || notInFinancialYear))
            ) ||

            //Value comibinations 
            (
               filterStates.bloodPressureFilter.value[0].length  > 0 && (lowerBound || midBound || upperBound ) 
               || (filterStates.bloodPressureFilter.value[1].length > 0  && (overTwelveMonths || notInFinancialYear))
            )
            return filterByBloodPressure;

      },

      houseboundCarehomeFilter : (row: string[], filterStates:FilterStates, reportKeys:IndexMap, relativeRunDate:string):boolean => {
         const houseboundIndex = row[reportKeys.HouseB_CareH_Code_Term].trim();

         const filterByHouseboundCarehome = 
            filterStates.houseboundCarehomeFilter.value.length === 0 ||
            (filterStates.houseboundCarehomeFilter.value as string[]).includes("housebound")  && houseboundIndex === "Housebound" ||
            (filterStates.houseboundCarehomeFilter.value as string[]).includes("carehome")  && (houseboundIndex.length > 0  && houseboundIndex !== "Housebound") ;
      
         return filterByHouseboundCarehome
      },

      lipidMedicationsFilter : (row: string[], filterStates:FilterStates, reportKeys:IndexMap, relativeRunDate:string) : boolean => {
         const lipidMedicationsFilterGroupOne = () => {
      
            const highStatinIntensity = filterStates.lipidMedicationsFilter.value[0].includes("highIntensity") && row[reportKeys.Statin_Intensity] === "High";
            const mediumLowStatinIntensity = filterStates.lipidMedicationsFilter.value[0].includes("mediumLow") && row[reportKeys.Statin_Intensity] === "Med/Low";
            const notOnStatin = filterStates.lipidMedicationsFilter.value[0].includes("noStatin") && row[reportKeys.Statin_Intensity] === "None"

            return { highStatinIntensity, mediumLowStatinIntensity, notOnStatin }
         }

         const onInclisiran = filterStates.lipidMedicationsFilter.value[1].includes("onInclisiran") && row[reportKeys.Inclisiran] === "YES"
         const statinExclusions = filterStates.lipidMedicationsFilter.value[3].includes("statinExclusions") 
         && (row[reportKeys.Statin_Exclusion] === "Contra" || row[reportKeys.Statin_Exclusion] === "Declined")

         const statinMaxToleratedDose = filterStates.lipidMedicationsFilter.value[2].includes("dose") && (row[reportKeys.Statin_Max_Tol_Dose_Date])
         const { highStatinIntensity, mediumLowStatinIntensity, notOnStatin } = lipidMedicationsFilterGroupOne()



         const filterByLipidMedications = 
         //  When nothing is selected
            (  
               filterStates.lipidMedicationsFilter.value[0].length === 0  
               && filterStates.lipidMedicationsFilter.value[1].length === 0  
               && filterStates.lipidMedicationsFilter.value[2].length === 0   
               && filterStates.lipidMedicationsFilter.value[3].length === 0  
            )  ||

            //Value selected in first group only 
            (
               filterStates.lipidMedicationsFilter.value[0].length > 0 
               && ( highStatinIntensity || mediumLowStatinIntensity || notOnStatin ) 
               && filterStates.lipidMedicationsFilter.value[1].length === 0  
               && filterStates.lipidMedicationsFilter.value[2].length === 0
               && filterStates.lipidMedicationsFilter.value[3].length === 0 ) ||

            //Value selected in second group only (onInclisiran)
            
            (
               filterStates.lipidMedicationsFilter.value[0].length === 0 
               && (filterStates.lipidMedicationsFilter.value[1].length > 0 && onInclisiran) 
               && (filterStates.lipidMedicationsFilter.value[2].length === 0 ) 
               && (filterStates.lipidMedicationsFilter.value[3].length === 0 )  
            )  ||

            //Value selected in thrid group only (max tolerated dose)
            (  
               filterStates.lipidMedicationsFilter.value[0].length === 0  
               && filterStates.lipidMedicationsFilter.value[1].length === 0  
               && filterStates.lipidMedicationsFilter.value[2].length > 0 && (statinMaxToleratedDose)   
               && filterStates.lipidMedicationsFilter.value[3].length === 0  
            )  ||

            //Value selected in fourth group ONLY (statin exclusions)
            (
               filterStates.lipidMedicationsFilter.value[0].length === 0 
               && (filterStates.lipidMedicationsFilter.value[1].length === 0) 
               && (filterStates.lipidMedicationsFilter.value[2].length === 0 ) 
               && (filterStates.lipidMedicationsFilter.value[3].length > 0 && statinExclusions)  
            )  ||

            //Value combinationations
            (
               (filterStates.lipidMedicationsFilter.value[0].length > 0 && (highStatinIntensity || mediumLowStatinIntensity || notOnStatin)) ||
               (filterStates.lipidMedicationsFilter.value[1].length > 0 && onInclisiran) ||
               filterStates.lipidMedicationsFilter.value[2].length > 0 && (statinMaxToleratedDose) ||
               (filterStates.lipidMedicationsFilter.value[3].length > 0 && statinExclusions)  
            )
               

            return filterByLipidMedications
      },
      


      comorbiditiesFilter : (row: string[], filterStates:FilterStates, reportKeys:IndexMap, relativeRunDate:string): boolean => {

         const cvdIndex = row[reportKeys.CVD]
         const hypertensionIndex = row[reportKeys.Hypertension]
         const diabetesIndex = row[reportKeys.Diabetes]
         const ckdIndex = row[reportKeys.CKD_Code_Term]
         const afIndex = row[reportKeys.AF_Code_Term]
         const cancerIndex = row[reportKeys.Cancer_Code_Term]
        

         const filterByComorbodities = 
            (filterStates.comorbiditiesFilter.value as string[]).includes("cvd") && cvdIndex === "YES" ||
            (filterStates.comorbiditiesFilter.value as string[]).includes("hypertension") && hypertensionIndex === "YES" ||
            (filterStates.comorbiditiesFilter.value as string[]).includes("noHypertension") && hypertensionIndex === "NO" ||
            (filterStates.comorbiditiesFilter.value as string[]).includes("diabetes") && diabetesIndex === "YES" ||
            (filterStates.comorbiditiesFilter.value as string[]).includes("ckd") && ckdIndex.length > 0  ||
            (filterStates.comorbiditiesFilter.value as string[]).includes("af") && afIndex.length > 0  ||
            (filterStates.comorbiditiesFilter.value as string[]).includes("cancer") && cancerIndex.length > 0  ||
            filterStates.comorbiditiesFilter.value.length === 0;

         return filterByComorbodities
      },

      cholestrolFilter : (row: string[], filterStates:FilterStates, reportKeys:IndexMap, relativeRunDate:string): boolean => {
   
         const ldlGreaterThanTwo = filterStates.cholestrolFilter.value[0].includes(">2.0") && parseInt(row[reportKeys.LDL_Cholestrol_Value]) > 2.0
         const recordedDateResult = recordedOverTwelveMonths(convertDate(row[reportKeys.LDL_Cholestrol_Date]), convertDate(relativeRunDate))
         const overTwelveMonths = filterStates.cholestrolFilter.value[1].includes("<12m") && recordedDateResult
         const financialYearCheck = checkFinancialYear(convertDate(row[reportKeys.LDL_Cholestrol_Date]))
         const notInFinancialYear = filterStates.cholestrolFilter.value[1].includes("notInFinancialYear") && financialYearCheck

         const filterByCholestrol = 
            (
               filterStates.cholestrolFilter.value[0].length === 0 
               && filterStates.cholestrolFilter.value[1].length === 0       
            ) ||
            //Only value is selected
            (
               filterStates.cholestrolFilter.value[0].length > 0 && ldlGreaterThanTwo 
               && filterStates.cholestrolFilter.value[1].length === 0 
            ) ||

            //When only date is selected
            (
               filterStates.cholestrolFilter.value[0].length === 0 
               && filterStates.cholestrolFilter.value[1].length > 0 && (overTwelveMonths || notInFinancialYear)
            ) ||

            // combinations
            (
               filterStates.cholestrolFilter.value[0].length > 0 && ldlGreaterThanTwo 
               || filterStates.cholestrolFilter.value[1].length > 0 && (overTwelveMonths || notInFinancialYear)
            )

            return filterByCholestrol
      },

      qRiskFilter : (row: string[], filterStates:FilterStates, reportKeys:IndexMap, relativeRunDate:string):boolean => {
         const greaterThanTenPercent = filterStates.qRiskFilter.value[0].includes(">10") && (parseFloat(row[reportKeys.QRisk_Value]) > 10.0)
         const greaterThanTwentyPercent = filterStates.qRiskFilter.value[0].includes(">20") && (parseFloat(row[reportKeys.QRisk_Value]) > 20.0)

         const recordedDateResult = recordedOverTwelveMonths(convertDate(row[reportKeys.QRisk_Date]), convertDate(relativeRunDate))
         const overTwelveMonths = filterStates.qRiskFilter.value[1].includes("<12m") && recordedDateResult

         const filterByQrisk = 
            (
               filterStates.qRiskFilter.value[0].length === 0  
               && filterStates.qRiskFilter.value[1].length === 0  
            ) ||

            //Selection at the top 
            (
               filterStates.qRiskFilter.value[0].length > 0 && (greaterThanTenPercent || greaterThanTwentyPercent)
               && filterStates.qRiskFilter.value[1].length === 0
            ) ||

            (
               filterStates.qRiskFilter.value[0].length === 0 
               && filterStates.qRiskFilter.value[1].length > 0 && overTwelveMonths

            ) ||

            (
               filterStates.qRiskFilter.value[0].length > 0 && (greaterThanTenPercent || greaterThanTwentyPercent)
               || filterStates.qRiskFilter.value[1].length > 0 && overTwelveMonths
            )

         return filterByQrisk
     
      },



      ageFilter : (row: string[], filterStates:FilterStates, reportKeys:IndexMap, relativeRunDate:string ): boolean => {
         const ageIndex = parseInt(row[reportKeys.Age]);

         const filterByAge = 
            (filterStates.ageFilter.value as string[]).includes("lt65") && ageIndex < 65 ||
            (filterStates.ageFilter.value as string[]).includes("65-79") && (ageIndex >= 65 && ageIndex <= 79) ||
            (filterStates.ageFilter.value as string[]).includes("gte80") && (ageIndex >= 80) ||
            filterStates.ageFilter.value.length === 0 ;

         
         return filterByAge
      },
      adverseMedsFilter : (row: string[], filterStates:FilterStates, reportKeys:IndexMap, relativeRunDate:string): boolean => {
         const adverseMedsIndex = row[reportKeys.NSAID_Name_Dosage_Quantity]

         const filterByAdverseMeds = 
            (filterStates.adverseMedsFilter.value as string[]).includes("nsaids") && adverseMedsIndex.length > 0 ||
            filterStates.adverseMedsFilter.value.length === 0;

         return filterByAdverseMeds
      },
      vulnerabilitiesFilter : (row: string[], filterStates:FilterStates, reportKeys:IndexMap, relativeRunDate:string):boolean => {
         const smiIndex = row[reportKeys.SMI_Code_Term].trim();
         const learningDisabilityIndex = row[reportKeys.Learning_Difficulties_Code_Term].trim();
         const dementiaIndex = row[reportKeys.Dementia_Code_Term].trim();

         const filterByVulnerabilites = 
            (filterStates.vulnerabilitiesFilter.value as string[]).includes("smi") && smiIndex.length > 0  ||
            (filterStates.vulnerabilitiesFilter.value as string[]).includes("learning") && learningDisabilityIndex.length > 0 ||
            (filterStates.vulnerabilitiesFilter.value as string[]).includes("dementia") && dementiaIndex.length > 0 ||
            filterStates.vulnerabilitiesFilter.value.length === 0 ;

         return filterByVulnerabilites

      },

   }
   
}

export const SystmOneTableConfig: TableConfig = [
   {
      id: "select",
      header : "",
      width : "2%",
      align : "center",
      colour : ""

   },
   {
      id : SystmOneReportKeys.Full_Name,
      header : "Full name",
      width : "12%",
      align : "left",
      colour : "blue"
   },
  {
      id : SystmOneReportKeys.Age,
      header : "Age",
      width : "2%",
      align : "center",
      colour : ""
   },
   {
      id : SystmOneReportKeys.Gender,
      header : "Gender",
      width : "3%",
      align : "center",
      colour : ""
   },
   {
      id : "Patient reference no.",
      header : "Patient reference no.",
      width : "5%",
      align : "center",
      colour : ""
   },
   {
      id : SystmOneReportKeys.Statin_Name_Dosage_Quantity,
      header : "Statin prescription",
      width : "14%",
      align : "center",
      colour : ""
   },
   {
      id : SystmOneReportKeys.Statin_Intensity,
      header : "Statin intensity",
      width : "4%",
      align : "center",
      colour : ""
   },
   {
      id : SystmOneReportKeys.Statin_Exclusion,
      header : "Statin exclusion",
      width : "4%",
      align : "center",
      colour : ""
   },
   {
      id : SystmOneReportKeys.Inclisiran,
      header : "Inclisiran",
      width : "4%",
      align : "center",
      colour : ""
   },
   
   {
      id : SystmOneReportKeys.BloodPressure,
      header : "Blood pressure",
      width : "4%",
      align : "center",
      colour : ""
   },
   {
      id : SystmOneReportKeys.CVD,
      header : "CVD",
      width : "3%",
      align : "center",
      colour : ""
   },
   {
      id : SystmOneReportKeys.CKD3_5,
      header : "CKD 3-5",
      width : "4%",
      align : "center",
      colour : ""
   },
   {
      id : SystmOneReportKeys.Hypertension,
      header : "HTN",
      width : "3%",
      align : "center",
      colour : ""
   },
   {
      id : SystmOneReportKeys.Diabetes,
      header : "Diabetes",
      width : "4%",
      align : "center",
      colour : ""
   },
   {
      id : SystmOneReportKeys.Total_Cholestrol_Value,
      header : "Total cholestrol",
      width : "4%",
      align : "center",
      colour : ""
   },
   {
      id : SystmOneReportKeys.LDL_Cholestrol_Value,
      header : "LDL",
      width : "3%",
      align : "center",
      colour : ""
   },
   {
      id : SystmOneReportKeys.EGFR_Value,
      header : "eGFR",
      width : "2%",
      align : "center",
      colour : ""
   },
   {
      id : SystmOneReportKeys.AntiHptnMedicationCount,
      header : "No. of anti-hptn meds",
      width : "5%",
      align : "center",
      colour : ""
   },
   {
      id : SystmOneReportKeys.Medication_Review_Date,
      header : "Medication review latest date",
      width : "6%",
      align : "center",
      colour : ""
   },
];

export const EMISTableConfig = [
   {
      id: "select",
      header : "",
      width : "2%",
      align : "center",
      colour : ""

   },
   {
      id : EMISReportKeys.Full_Name,
      header : "Full name",
      width : "1fr",
      align : "left",
      colour : "blue"
   },
  {
      id : EMISReportKeys.Age,
      header : "Age",
      width : "2%",
      align : "center",
      colour : ""
   },
   {
      id : EMISReportKeys.Gender,
      header : "Gender",
      width : "3%",
      align : "center",
      colour : ""
   },
   {
      id : "Patient reference no.",
      header : "Patient reference no.",
      width : "5%",
      align : "center",
      colour : ""
   },
   {
      id : EMISReportKeys.Statin_Name_Dosage_Quantity,
      header : "Statin prescription",
      width : "14%",
      align : "center",
      colour : ""
   },
   {
      id : EMISReportKeys.Statin_Intensity,
      header : "Statin intensity",
      width : "4%",
      align : "center",
      colour : ""
   },
   {
      id : EMISReportKeys.Statin_Exclusion,
      header : "Statin exclusion",
      width : "4%",
      align : "center",
      colour : ""
   },
   {
      id : EMISReportKeys.Inclisiran,
      header : "Inclisiran",
      width : "4%",
      align : "center",
      colour : ""
   },
   
   {
      id : EMISReportKeys.BloodPressure,
      header : "Blood pressure",
      width : "4%",
      align : "center",
      colour : ""
   },
   {
      id : EMISReportKeys.CVD,
      header : "CVD",
      width : "3%",
      align : "center",
      colour : ""
   },
   {
      id : EMISReportKeys.CKD3_5,
      header : "CKD 3-5",
      width : "4%",
      align : "center",
      colour : ""
   },
   {
      id : EMISReportKeys.Hypertension,
      header : "HTN",
      width : "3%",
      align : "center",
      colour : ""
   },
   {
      id : EMISReportKeys.Diabetes,
      header : "Diabetes",
      width : "4%",
      align : "center",
      colour : ""
   },
   {
      id : EMISReportKeys.Total_Cholestrol_Value,
      header : "Total cholestrol",
      width : "4%",
      align : "center",
      colour : ""
   },
   {
      id : EMISReportKeys.LDL_Cholestrol_Value,
      header : "LDL",
      width : "3%",
      align : "center",
      colour : ""
   },
   {
      id : EMISReportKeys.EGFR_Value,
      header : "eGFR",
      width : "3%",
      align : "center",
      colour : ""
   },
   {
      id : EMISReportKeys.AntiHptnMedicationCount,
      header : "No. of anti-hptn meds",
      width : "5%",
      align : "center",
      colour : ""
   },
   {
      id : EMISReportKeys.Medication_Review_Date,
      header : "Medication review latest date",
      width : "8%",
      align : "center",
      colour : ""
   },
];



































         // selections : {
            //    option_1 : {
            //       title : "",
                  
                  // "65 or under", "65 - 79", "above 80"








         // "Antihypertensive meds" : 
         //    [  ["", "ACEi/ARB", "Ca-Channel", "Thiazides", "Beta-blockers","Others"], 
         //       ["No.of Antihypertensives", "0", "1", "2 or more"], 
         //       ["", "Max tolerated dose"], 
         //       ["", "Antihypertensives declined (12m)"]],
         // "Blood pressure readings":
         //    [  ["", "Under 140/90", "Over 140/90", "Over 150/90"], 
         //       ["", "Not in last 12m", "Not in financial year"]],
         // "Housebound/Care home":
         //    [  ["", "Housebound", "Care home"]],



         // "Lipid medications":
         //    [  ["Statin", "High intensity Statin", "medium or low intensity", "Not on Statin"], 
         //       ["", "On inclisiran"],
         //       ["", "Max tolerated dose"],
         //       ["", "Statin exlusions (Valid* contraindicated/declined"]],
         // "Co-morbidities":
         //    [  ["", "CVD (IHD/Stroke/TIA/PAD)", "Hypertension", "Diabetes", "CKD 3-5", "Atrial Fibrillation", "Cancer"]],
         // "Cholestrol readings":
         //    [  ["LDL", "> 2.0"], ["", "Not in last 12m", "Not in financial year"]],


         // "QRisk score":
         //    [  ["", "10% or more", "20% or more"], ["", "Not recorded in last 12m"]],
         // "Vulnerabilities":
         //    [ ["", "Severe mental illness", "Learning disability", "Dementia"]],
         // "Ethnicity":
         //    [ ["", "Asian/Asian British", "Black/Black British", "Mixed or multiple ethnic groups", "White", "Other/Not specified"]],


         // "Age":
         //    [  ["", "65 or under", "65 - 79", "above 80"]],
         
         // "Adverse meds":
         //    [ ["", "NSAIDs (excl. aspirin)"]]