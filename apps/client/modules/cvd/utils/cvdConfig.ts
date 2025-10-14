import { FilterStates } from "@/types/shared.types";

//CREATE TYPE FOR THE CONFIGURATIONS SO THAT OTHER TOOLS WILL BE ABLE TO USE IT 


type Options = Record<string, { groupName : string; groupOptions: { value: string; label: string }[]}>

type MultiFilter = {
   id : string,
   label : string,
   ui : { width : number, bgColour: string},
   kind : "multi",
   options : {value : string, label : string}[],
   emptyBehaviour : []
} 

type GroupedFilter = {
   id : string,
   label : string,
   ui : { width : number, bgColour: string},
   kind : "grouped",
   options : Options,
   emptyBehaviour : [][]
} 




type quickFilter = {
   id : number,
   label : string
   value : FilterStates
}

export const cvdConfig = {
   toolName : "CVD Prevention tool",

   filters : {

      AntihypertensiveMeds : {
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

      BloodPressureReadings : {
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
                  {  value : ">140/90", label : "Over 140/90" },
                  {  value : ">150/90", label : "Over 150/90" },       
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

      HouseboundCarehome : {
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



      LipidMeds : {
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
               groupOptions : [ {  value : "maxTolerated", label : "Max tolerated dose" } ]
            },
            
            groupFour : {
               groupName: "",
               groupOptions : [ {  value : "statinExclusions", label : "Statin exclusions (Valid* contraindicated/declined)" } ]
            },
         },
         
         emptyBehaviour : [[],[], [], []]

      },

      CoMorbidities : {
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
            {value : "af", label: "Atrial Fibrillation"},
            {value : "cancer", label: "Cancer"},

         ], 
         emptyBehaviour : []
      },

      CholestrolReadings : {
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




      QRiskScore : {
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

      Vulnerabilities : {
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

      Ethniciy : {
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
     

      Age : {
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
            {value : "gte80", label: "> 80"},
         ], 
         emptyBehaviour : []
      },
      AdverseMeds : {
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
         id : 1,
         label : "BP > 140/90, no hypertension diagnosis",
         payload : {
               bloodPressureFilter: {  kind: "grouped", value: [[">140/90"],[]]  },
               hptnDiagnosis : { kind: "multi", value : ["no"] }
            }
      },
      optionTwo : {
         id : 2,
         label : "CVD and not on statin",
         payload : {
            comorbiditiesFilter : {kind : "multi", value : ["cvd"]},
            lipidMedicationsFilter: {kind: "grouped", value: [["noStatin"],[],[],[]]}

         }
      },
      optionThree : {
         id : 3,
         label : "CKD 3-5 and diabetes, not on ACEi/ARB",
         payload : {
               aceiArbFilter : {kind : "multi", value : ["no"]},
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
               bloodPressureFilter: {  kind: "grouped", value: [[">140/90"],[]]  },
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

   
}



































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