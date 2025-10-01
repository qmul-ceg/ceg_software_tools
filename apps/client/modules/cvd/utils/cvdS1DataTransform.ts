import {SystmOneReportKeys } from '../constants/cvdDataEnums'


export function TransformCVDS1Data(dataTable: any[]) {

    let dataRow: any[];

    // Run date will be retrived from the context
    const runDate = new Date(2025, 10,1)  

    for (let rowIndex = 0; rowIndex < dataTable.length; rowIndex++) {
      
        removeUnits(dataTable[rowIndex]);

        checkMedicaitonsIssuedDate(dataTable[rowIndex], runDate)

    }

}

function removeUnits(dRow: any[]) {
        
    dRow[SystmOneReportKeys.Diastolic_BP_Value] = (<string> dRow[SystmOneReportKeys.Diastolic_BP_Value]).split(' ')[0];
    dRow[SystmOneReportKeys.Systolic_BP_Value_1] = (<string> dRow[SystmOneReportKeys.Systolic_BP_Value_1]).split(' ')[0];
    dRow[SystmOneReportKeys.Systolic_BP_Value_2] = (<string> dRow[SystmOneReportKeys.Systolic_BP_Value_2]).split(' ')[0];
    dRow[SystmOneReportKeys.Systolic_BP_Value_3] = (<string> dRow[SystmOneReportKeys.Systolic_BP_Value_3]).split(' ')[0];
    dRow[SystmOneReportKeys.Systolic_BP_Value_4] = (<string> dRow[SystmOneReportKeys.Systolic_BP_Value_4]).split(' ')[0];
    dRow[SystmOneReportKeys.Systolic_BP_Value_5] = (<string> dRow[SystmOneReportKeys.Systolic_BP_Value_5]).split(' ')[0];
    dRow[SystmOneReportKeys.Systolic_BP_Value_6] = (<string> dRow[SystmOneReportKeys.Systolic_BP_Value_6]).split(' ')[0];

    dRow[SystmOneReportKeys.Total_Cholestrol_Value] = (<string> dRow[SystmOneReportKeys.Total_Cholestrol_Value]).split(' ')[0];
    dRow[SystmOneReportKeys.LDL_Cholestrol_Value] = (<string> dRow[SystmOneReportKeys.LDL_Cholestrol_Value]).split(' ')[0];
    dRow[SystmOneReportKeys.EGFR_Value] = (<string> dRow[SystmOneReportKeys.EGFR_Value]).split(' ')[0];
}


function checkMedicaitonsIssuedDate(dRow: any[], runDate: Date) {

    const dt6monthBeforeRunDate: Date = new Date(runDate);
    dt6monthBeforeRunDate.setMonth(dt6monthBeforeRunDate.getMonth() - 6);

    const dateInNumber =dt6monthBeforeRunDate.getMilliseconds();

    //Lipids Medications in 6m: Statins, Ezetimibe, Bempedoic_Acid, PCSK9, OLLT
    removePrescriptionsOver6m(dRow, SystmOneReportKeys.Statin_Name_Dosage_Quantity, SystmOneReportKeys.Statin_Issue_Date, dateInNumber);
    removePrescriptionsOver6m(dRow, SystmOneReportKeys.Ezetimibe_Name_Dosage_Quantity, SystmOneReportKeys.Ezetimbe_Issue_Date, dateInNumber);
    removePrescriptionsOver6m(dRow, SystmOneReportKeys.Bempedoic_Acid_Name_Dosage_Quantity, SystmOneReportKeys.Bempedoic_Acid_Name_Issue_Date, dateInNumber);
    removePrescriptionsOver6m(dRow, SystmOneReportKeys.PCSK9_Name_Dosage_Quantity, SystmOneReportKeys.PCSK9_Issue_Date, dateInNumber);
    removePrescriptionsOver6m(dRow, SystmOneReportKeys.Other_Lipid_Lowering_Name_Dosage_Quantity, SystmOneReportKeys.Other_Lipid_Lowering_Issue_Date, dateInNumber);

    // BP Medications
    removePrescriptionsOver6m(dRow, SystmOneReportKeys.ACEi_ARB_Name_Dosage_Quantity, SystmOneReportKeys.ACEi_ARB_Issue_Date, dateInNumber);
    removePrescriptionsOver6m(dRow, SystmOneReportKeys.Beta_Blocker_Name_Dosage_Quantity, SystmOneReportKeys.Beta_Blocker_Issue_Date, dateInNumber);
    removePrescriptionsOver6m(dRow, SystmOneReportKeys.Ca_Channel_Name_Dosage_Quantity, SystmOneReportKeys.Ca_Channel_Issue_Date, dateInNumber);
    removePrescriptionsOver6m(dRow, SystmOneReportKeys.Thiazides_Name_Dosage_Quantity, SystmOneReportKeys.Thiazides_Issue_Date, dateInNumber);
    
    removePrescriptionsOver6m(dRow, SystmOneReportKeys.Centrally_Acting_AHP_Name_Dosage_Quantity, SystmOneReportKeys.Centrally_Acting_AHP_Issue_Date, dateInNumber);
    removePrescriptionsOver6m(dRow, SystmOneReportKeys.Alpha_Blocker_Name_Dosage_Quantity, SystmOneReportKeys.Alpha_Blocker_Issue_Date, dateInNumber);
    removePrescriptionsOver6m(dRow, SystmOneReportKeys.Other_Diuretic_Name_Dosage_Quantity, SystmOneReportKeys.Other_Diuretic_Name_Issue_Date, dateInNumber);

    removePrescriptionsOver6m(dRow, SystmOneReportKeys.Antiplatelet_Name_Dosage_Quantity, SystmOneReportKeys.Antiplatelet_Issue_Date, dateInNumber);
 
    //NSAIDs
    removePrescriptionsOver6m(dRow, SystmOneReportKeys.NSAID_Name_Dosage_Quantity, SystmOneReportKeys.NSAID_Issue_Date, dateInNumber);   
}

function removePrescriptionsOver6m(dRow: any[], prescripName: SystmOneReportKeys, prescripIssuedDate: SystmOneReportKeys, date6mBeforeRunDate: number) {
    
    dRow[prescripName] = dRow[prescripName].trim();
    if (dRow[prescripIssuedDate]) {
        if (Date.parse(dRow[prescripIssuedDate]) < date6mBeforeRunDate ) {
            dRow[prescripName] = "";
            dRow[prescripIssuedDate] = "";
        }
    }    
}

