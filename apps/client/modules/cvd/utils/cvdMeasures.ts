import { CVD_Metrics } from '../types/cvdMetrics';
import {EMISReportKeys, SystmOneReportKeys } from '../constants/cvdDataEnums'
import { StatinsIntensity, StatinExclusion, StatinIntensity } from './cvdStatinIntensity';


export function CVD_Measures(dataArray: any[], reportKeys : typeof EMISReportKeys | typeof SystmOneReportKeys) : CVD_Metrics {

    let metrices : CVD_Metrics = { };

    // 1- CVD:- prescribed high intensity statin
    const CVD_Denominator : number = CVDpopulation(dataArray, reportKeys);
    
    if (CVD_Denominator > 0) {
    
        const CVDwithHighStatinNumerator : number = CVDwithHighStatin(dataArray, reportKeys);
        const CVDpatientsHighStatinPercentage = percentageFormat(CVDwithHighStatinNumerator, CVD_Denominator);
        metrices.CVD_HighStatin = {            
            Denominator: CVD_Denominator,
            Numerator: CVDwithHighStatinNumerator,
            Percentage: CVDpatientsHighStatinPercentage
        }

        // 2- CVD with LDL ≥ 2.6 and NOT on inclisiran
        const CVDwithLDL_Denominator : number = CVDwithLDL_Over2_6(dataArray, reportKeys);
        const CVDwithLDL_NotOn_InclisiranNumerator : number = CVDwithLDL_Over2_6_NotOn_Inclisiran(dataArray, reportKeys);
        const CVDwithLDL_NotOn_InclisiranPercentage = percentageFormat(CVDwithLDL_NotOn_InclisiranNumerator, CVDwithLDL_Denominator);
        metrices.CVD_LDLnotOnInclisiran = {            
            Denominator: CVDwithLDL_Denominator,
            Numerator: CVDwithLDL_NotOn_InclisiranNumerator,
            Percentage: CVDwithLDL_NotOn_InclisiranPercentage
        }
        
        // 3- CVD with LDL <= 2 (QoF)
        const CVDwithLDLbelow_2_Numerator: number  = CVDwithLDL_Below2(dataArray, reportKeys);
        const CVDwithLDLbelow_2_Percentage = percentageFormat(CVDwithLDLbelow_2_Numerator, CVD_Denominator);
        metrices.CVD_LDLbelow2 = {            
            Denominator: CVD_Denominator,
            Numerator: CVDwithLDLbelow_2_Numerator,
            Percentage: CVDwithLDLbelow_2_Percentage
        }

        // 4- CVD:- NOT on statin
        const CVDandNotOnStatinNumerator: number = CVDandNotOnStatin(dataArray, reportKeys);
        const CVDandNotOnStatinPercentage = percentageFormat(CVDandNotOnStatinNumerator, CVD_Denominator);
        metrices.CVD_NotOnStatin = {            
            Denominator: CVD_Denominator,
            Numerator: CVDandNotOnStatinNumerator,
            Percentage: CVDandNotOnStatinPercentage
        }
    }

    // 5- QRisk 2/3 10% - 19%:- prescribed statin
    const QRisk10_19_Denominator: number = QRiskBetween10_19(dataArray, reportKeys);
    const QRisk10_19_OnStatinNumerator: number = QRiskBetween10_19_WithStatin(dataArray, reportKeys);
    const QRisk10_19_OnStatinPercentage = percentageFormat(QRisk10_19_OnStatinNumerator, QRisk10_19_Denominator);
    metrices.QRisk_10_19_OnStatin = {            
        Denominator: QRisk10_19_Denominator,
        Numerator: QRisk10_19_OnStatinNumerator,
        Percentage: QRisk10_19_OnStatinPercentage
    }

    // 6- QRisk 2/3 ≥ 20%:- prescribed statin"
    const QRisk20_Denominator: number = QRiskOver20(dataArray, reportKeys);
    const QRisk20_OnStatinNumerator: number = QRiskOver20_WithStatin(dataArray, reportKeys);
    const QRisk20_OnStatinPercentage = percentageFormat(QRisk20_OnStatinNumerator, QRisk20_Denominator);
    metrices.QRisk_20_OnStatin = {            
        Denominator: QRisk20_Denominator,
        Numerator: QRisk20_OnStatinNumerator,
        Percentage: QRisk20_OnStatinPercentage
    }

    // 7- Hypertension:- BP ≤ 140/90 (age < 80) (QoF)
    const HTN_AgeBelow80_Denominator: number = HypertensionWithAgeThreshold(dataArray, "<80", reportKeys);
    const HTN_AgeBelow80_BP14090_Numerator: number = HypertensionWithAgeBP_Threshold(dataArray, "<80", 140, 90, reportKeys);
    const HTN_AgeBelow80_BP14090_Percentage = percentageFormat(HTN_AgeBelow80_BP14090_Numerator, HTN_AgeBelow80_Denominator);
    metrices.HypertensionAgeBelow80_BP_140_90 = {            
        Denominator: HTN_AgeBelow80_Denominator,
        Numerator: HTN_AgeBelow80_BP14090_Numerator,
        Percentage: HTN_AgeBelow80_BP14090_Percentage
    }

    // 8- Hypertension:- BP ≤ 150/90 (age ≥ 80) (QoF)
    const HTN_AgeOver80_Denominator: number = HypertensionWithAgeThreshold(dataArray, ">=80", reportKeys);
    const HTN_AgeOver80_BP15090_Numerator: number = HypertensionWithAgeBP_Threshold(dataArray, ">=80", 150, 90, reportKeys);
    const HTN_AgeOver80_BP15090_Percentage = percentageFormat(HTN_AgeOver80_BP15090_Numerator, HTN_AgeOver80_Denominator);
    metrices.HypertensionAgeOver80_BP_150_90 = {            
        Denominator: HTN_AgeOver80_Denominator,
        Numerator: HTN_AgeOver80_BP15090_Numerator,
        Percentage: HTN_AgeOver80_BP15090_Percentage
    }

    // 9- CKD 3-5 prescribed any statin
    const CKD_3_5_Denominator: number = CKD_3_5_diagonsis(dataArray, reportKeys);
    const CKD_3_5_OnStatinNumerator: number = CKD_3_5_WithStatin(dataArray, reportKeys);
    const CKD_3_5_OnStatinPercentage = percentageFormat(CKD_3_5_OnStatinNumerator, CKD_3_5_Denominator);
    metrices.CKD3_5_OnStatin = {            
        Denominator: CKD_3_5_Denominator,
        Numerator: CKD_3_5_OnStatinNumerator,
        Percentage: CKD_3_5_OnStatinPercentage
    }

    return metrices;
}

// CVD metrices

function IsCVDdiagnosed(patientRecord: any[], reportKeys : typeof EMISReportKeys | typeof SystmOneReportKeys) : boolean {

    let anyCVD : boolean = false;

    if (patientRecord[reportKeys.IHD_Code_Term].trim() || 
        patientRecord[reportKeys.Stroke_TIA_Code_Term].trim()  || 
        patientRecord[reportKeys.PAD_Code_Term].trim()) {

            anyCVD =  true;
    }
    return anyCVD;
}

function CVDpopulation(dataArr: any[], reportKeys : typeof EMISReportKeys | typeof SystmOneReportKeys) : number {

    return dataArr.reduce((accumulator : number, patientRecord: any[]) => {
        if (IsCVDdiagnosed(patientRecord, reportKeys))
            accumulator++;
        return accumulator;
    }, 0);

}

function CVDwithHighStatin(dataArr: any[], reportKeys : typeof EMISReportKeys | typeof SystmOneReportKeys) : number {

    return dataArr.reduce((accumulator : number, patientRecord: any[]) => {

        if (IsCVDdiagnosed(patientRecord, reportKeys) && StatinsIntensity(patientRecord[reportKeys.Statin_Name_Dosage_Quantity]) === StatinIntensity.High)
            accumulator++;
        return accumulator;
    }, 0);
}

function CVDwithLDL_Over2_6(dataArr: any[], reportKeys : typeof EMISReportKeys | typeof SystmOneReportKeys) : number {

    return dataArr.reduce((accumulator : number, patientRecord: any[]) => {

        if (IsCVDdiagnosed(patientRecord, reportKeys) && patientRecord[reportKeys.LDL_Cholestrol_Value]) {
            if (parseFloat((<string> patientRecord[SystmOneReportKeys.LDL_Cholestrol_Value]).split(' ')[0]) >= 2.6) {
                accumulator++;
            }            
        }
        return accumulator;
    }, 0);
}

function CVDwithLDL_Over2_6_NotOn_Inclisiran(dataArr: any[], reportKeys : typeof EMISReportKeys | typeof SystmOneReportKeys) : number {

    return dataArr.reduce((accumulator : number, patientRecord: any[]) => {

        if (IsCVDdiagnosed(patientRecord, reportKeys) && patientRecord[reportKeys.LDL_Cholestrol_Value]) {
            if ( parseFloat((<string> patientRecord[SystmOneReportKeys.LDL_Cholestrol_Value]).split(' ')[0]) >= 2.6) {

                if (!patientRecord[reportKeys.PCSK9_Name_Dosage_Quantity].startsWith("Inclisiran") && !patientRecord[reportKeys.PCSK9_Name_Dosage_Quantity].startsWith("Leqvio"))
                    accumulator++;
            }
        }
        return accumulator;
    }, 0);
}

function CVDwithLDL_Below2(dataArr: any[], reportKeys : typeof EMISReportKeys | typeof SystmOneReportKeys) : number {

    return dataArr.reduce((accumulator : number, patientRecord: any[]) => {

        if (IsCVDdiagnosed(patientRecord, reportKeys) && patientRecord[reportKeys.LDL_Cholestrol_Value]) {
            if ( parseFloat((<string> patientRecord[SystmOneReportKeys.LDL_Cholestrol_Value]).split(' ')[0]) <= 2)
                accumulator++;
        }
        return accumulator;
    }, 0);
}

function CVDandNotOnStatin(dataArr: any[], reportKeys : typeof EMISReportKeys | typeof SystmOneReportKeys) : number {

    return dataArr.reduce((accumulator : number, patientRecord: any[]) => {

        if (IsCVDdiagnosed(patientRecord, reportKeys) && patientRecord[reportKeys.Statin_Name_Dosage_Quantity].trim()) {
            accumulator++;
        }
        return accumulator;
    }, 0);
}

//  QRisk

const QRiskPredicate = (QRiskvalue: string, upperThreshold: number, lowerThreshold?: number) : boolean => {

    let bValue = false;

    if (QRiskvalue) {

        let parsedQRisk_value : number = parseFloat(QRiskvalue);
        
        if (lowerThreshold) {            
            if (parsedQRisk_value >= lowerThreshold && parsedQRisk_value < upperThreshold)
                bValue = true
        }
        else if (parsedQRisk_value >= upperThreshold) {
            bValue = true
        }
    }
    
    return bValue;
}

function QRiskBetween10_19(dataArr: any[], reportKeys : typeof EMISReportKeys | typeof SystmOneReportKeys) : number {

    return dataArr.reduce((accumulator : number, patientRecord: any[]) => {

        if (patientRecord[reportKeys.QRisk_Value]) {            
            if (QRiskPredicate( patientRecord[reportKeys.QRisk_Value], 20, 10) )
                accumulator++;
        }
        return accumulator;
    }, 0);
}

function QRiskBetween10_19_WithStatin(dataArr: any[], reportKeys : typeof EMISReportKeys | typeof SystmOneReportKeys) : number {

    return dataArr.reduce((accumulator : number, patientRecord: any[]) => {

        if (patientRecord[reportKeys.QRisk_Value] && patientRecord[reportKeys.Statin_Name_Dosage_Quantity].trim()) {
            if (QRiskPredicate( patientRecord[reportKeys.QRisk_Value], 20, 10) )
                accumulator++;
        }
        return accumulator;
    }, 0);
}

function QRiskOver20(dataArr: any[], reportKeys : typeof EMISReportKeys | typeof SystmOneReportKeys) : number {

    return dataArr.reduce((accumulator : number, patientRecord: any[]) => {

        if (patientRecord[reportKeys.QRisk_Value]) {            
             if (QRiskPredicate( patientRecord[reportKeys.QRisk_Value], 20) )
                accumulator++;
        }
        return accumulator;
    }, 0);
}

function QRiskOver20_WithStatin(dataArr: any[], reportKeys : typeof EMISReportKeys | typeof SystmOneReportKeys) : number {

    return dataArr.reduce((accumulator : number, patientRecord: any[]) => {

        if (patientRecord[reportKeys.QRisk_Value] && patientRecord[reportKeys.Statin_Name_Dosage_Quantity].trim()) {
             if (QRiskPredicate( patientRecord[reportKeys.QRisk_Value], 20) )
                accumulator++;
        }
        return accumulator;
    }, 0);
}


// Hypertension
const HypertensionPredicate = (HTNcode: string, age: number, ageThreshold: string): boolean => {

    let bValue = false;

    if (HTNcode) {        
        if (age < 80 && ageThreshold === "<80")
            bValue = true;

        else if (age >= 80 && ageThreshold === ">=80")
            bValue = true;
    }

    return bValue;
}

function HypertensionWithAgeThreshold(dataArr: any[], ageThreshold: string, reportKeys : typeof EMISReportKeys | typeof SystmOneReportKeys): number {

    return dataArr.reduce((accumulator : number, patientRecord: any[]) => {

        if (patientRecord[reportKeys.Hypertension_Code_Term].trim()) {   
                     
             if (HypertensionPredicate(patientRecord[reportKeys.Hypertension].trim(), patientRecord[reportKeys.Age], ageThreshold) )
                accumulator++;
        }
        return accumulator;
    }, 0);
}

function HypertensionWithAgeBP_Threshold(dataArr: any[], ageThreshold: string, sysBP: number, diaBP: number, reportKeys : typeof EMISReportKeys | typeof SystmOneReportKeys): number {

    return dataArr.reduce((accumulator : number, patientRecord: any[]) => {

        if (patientRecord[reportKeys.Hypertension_Code_Term].trim()) {   
                     
             if (HypertensionPredicate(patientRecord[reportKeys.Hypertension].trim(), patientRecord[reportKeys.Age], ageThreshold) )
                if (patientRecord[reportKeys.Systolic_BP_Value_1] < sysBP && patientRecord[reportKeys.Diastolic_BP_Value] < diaBP)
                    accumulator++;
        }
        return accumulator;
    }, 0);
}

//Set Financial Year date
//const dtFY = new Date(2025, 4, 1)

// CKD 3-5
function CKD_3_5_diagonsis(dataArr: any[], reportKeys : typeof EMISReportKeys | typeof SystmOneReportKeys) : number {

    return dataArr.reduce((accumulator : number, patientRecord: any[]) => {

        if (patientRecord[reportKeys.CKD_Code_Term].trim())
            accumulator++;

        return accumulator;
    }, 0);
}

function CKD_3_5_WithStatin(dataArr: any[], reportKeys : typeof EMISReportKeys | typeof SystmOneReportKeys) : number {

    return dataArr.reduce((accumulator : number, patientRecord: any[]) => {

        if (patientRecord[reportKeys.CKD_Code_Term].trim() && patientRecord[reportKeys.Statin_Name_Dosage_Quantity].trim())
            accumulator++;

        return accumulator;
    }, 0);
}


function percentageFormat(numerator: number, denominator: number)  {
    
    if (denominator < numerator || denominator <= 0) {
        return '0%';
    }
    else {

        return new Intl.NumberFormat('default', {style: 'percent', minimumFractionDigits: 0, maximumFractionDigits: 0}).format(numerator / denominator);
    }
}