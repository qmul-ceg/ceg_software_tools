import {EMISReportKeys, SystmOneReportKeys } from '../constants/cvdDataEnums'
import { StatinsIntensity, StatinExclusion } from './cvdStatinIntensity';

const YES = "YES", NO = "NO";

export function CVDaddCalculatedFields(dataTable: any[], reportKeys : typeof EMISReportKeys | typeof SystmOneReportKeys) {

    let dataRow: any[];

    for (let rowIndex = 0; rowIndex < dataTable.length; rowIndex++) {

        dataRow = dataTable[rowIndex];

        dataRow[reportKeys.Statin_Intensity] = StatinsIntensity(dataRow[reportKeys.Statin_Name_Dosage_Quantity]);
        dataRow[reportKeys.Statin_Exclusion] = StatinExclusion(dataRow, reportKeys);
        dataRow[reportKeys.Inclisiran] = InclisiranIssued(dataRow[reportKeys.PCSK9_Name_Dosage_Quantity]);
        
        dataRow[reportKeys.CVD] = CVD_Diagnosed(dataRow, reportKeys);
        dataRow[reportKeys.CKD3_5] = dataRow[reportKeys.CKD_Code_Term].trim() ? YES : NO;
        dataRow[reportKeys.Diabetes] = dataRow[reportKeys.Diabetes_Code_Term].trim() ? YES : NO;

        dataRow[reportKeys.Hypertension] = dataRow[reportKeys.Hypertension_Code_Term].trim() ? YES : NO;
        dataRow[reportKeys.BloodPressure] = BloodPressure(dataRow[reportKeys.Systolic_BP_Value_1], dataRow[reportKeys.Diastolic_BP_Value]);
        dataRow[reportKeys.AntiHptnMedicationCount] = AntiHptnMedsCount(dataRow, reportKeys);
    }

}

function CVD_Diagnosed(dRow: any[], reportKeys : typeof EMISReportKeys | typeof SystmOneReportKeys) : string {

    let CVD;

    if (dRow[reportKeys.IHD_Code_Term].trim() || 
        dRow[reportKeys.Stroke_TIA_Code_Term].trim()  || 
        dRow[reportKeys.PAD_Code_Term].trim()) {

        CVD = YES;
    }
    else
        CVD = NO;
    
    return CVD;
}

function BloodPressure(SysBP: number, DiaBP: number) {
    
    let BP = "";
    if (SysBP && DiaBP)
        BP = `${SysBP}/${DiaBP}`;

    return BP;

}

function AntiHptnMedsCount(dRow: any[], reportKeys : typeof EMISReportKeys | typeof SystmOneReportKeys) : number {

    let medsCount = 0;

    if (dRow[reportKeys.Ca_Channel_Name_Dosage_Quantity].trim()) medsCount += 1
    if (dRow[reportKeys.ACEi_ARB_Name_Dosage_Quantity].trim()) medsCount += 1
    if (dRow[reportKeys.Thiazides_Name_Dosage_Quantity].trim()) medsCount += 1
    if (dRow[reportKeys.Beta_Blocker_Name_Dosage_Quantity].trim()) medsCount += 1
    
    if (dRow[reportKeys.Other_Diuretic_Name_Dosage_Quantity].trim() || 
        dRow[reportKeys.Centrally_Acting_AHP_Name_Dosage_Quantity].trim()  || 
        dRow[reportKeys.Alpha_Blocker_Name_Dosage_Quantity].trim()) {

        medsCount += 1
    }    

    return medsCount;
}

function InclisiranIssued(InclisiranMedication: string) : string {

    return InclisiranMedication.startsWith("Inclisiran") || InclisiranMedication.startsWith("Leqvio") ? YES : NO;

}
