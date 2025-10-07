

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

export const cvdConfig = {
   toolName : "CVD Prevention tool",

   filters : {
      HouseboundCarehome : {
         id : "houseboundCarehomeFilter",
         label : "Housebound/Carehome",
         ui : {
            width : 2,
            bgColour : ""
         },
         kind : "multi", 

         options : [
            {value : "housebound", label: "Housebound"},
            {value : "carehome", label: "Carehome"},

         ], 
         emptyBehaviour : []
      },

      Age : {
         id : "ageFilter",
         label : "Age",
         ui : {
            width : 2,
            bgColour : ""
         },
         kind : "multi", 

         options : [
            {value : "lte65", label: "65 or under"},
            {value : "65-79", label: "65 - 79"},
            {value : "gte80", label: "above 80"},
         ], 
         emptyBehaviour : []
      },

      Vulnerabilities : {
         id : "vulnerabilitiesFilter",
         label : "Vulnerabilities",
         ui : {
            width : 2,
            bgColour : ""
         },
         kind : "multi", 

         options : [
            {value : "smi", label: "Severe mental illness"},
            {value : "learning", label: "Learning disability"},
            {value : "dementia", label: "Dementia"},
         ], 
         emptyBehaviour : []
      },

      CoMorbidities : {
         id : "comorbiditiesFilter",
         label : "Co-morbidities",
         ui : {
            width : 2,
            bgColour : ""
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


      AdverseMeds : {
         id : "adverseMedsFilter",
         label : "Adverse meds",
         ui : {
            width : 2,
            bgColour : ""
         },
         kind : "multi", 

         options : [
            {value : "nsaids", label: "NSAIDs (excl. aspirin)"},
         ], 
         emptyBehaviour : []
      },

         
      AntihypertensiveMeds : {
         id: "antihypertensiveMedsFilter",
         label : "Antihypertensive meds",
         ui : {
            width : 2,
            bgColour : ""
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


      LipidMeds : {
         id: "lipidMedicationsFilter",
         label : "Lipid medications",
         ui : {
            width : 2,
            bgColour : ""
         },
         kind : "grouped",

         options : {
            groupOne : {
               groupName: "Statin",
               groupOptions : [
                  {  value : "high_intensity", label : "High intensity statin" },
                  {  value : "medium_low", label : "Medium or low intensity" },
                  {  value : "no_statin", label : "Not on statin" },       
               ]
            },
            groupTwo : {
               groupName: "",
               groupOptions : [
                  {  value : "on_inclisiran", label : "On inclisiran" },
               ]
            },
            groupThree : {
               groupName: "",
               groupOptions : [ {  value : "max_tolerated", label : "Max tolerated dose" } ]
            },
            
            groupFour : {
               groupName: "",
               groupOptions : [ {  value : "statin_exclusions", label : "Statin exclusions (Valid* contraindicated/declined)" } ]
            },
         },
         
         emptyBehaviour : [[],[], [], []]

      }



   } satisfies Record<string, MultiFilter | GroupedFilter>, // ADD COMMENT

   quickFilters : 
      [  "BP > 140/90, no hypertension diagnosis", 
         "CVD and not on statin", 
         "CKD 3-5 and diabetes, not on ACEi/ARB",
         "Raised QRISK and not on statin",
         "CKD on NSAID",
         "Hypertension, no antihypertensive and BP > 140/90 ",
         "Hypertension with last BP > 12m ago"
      ],
   
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