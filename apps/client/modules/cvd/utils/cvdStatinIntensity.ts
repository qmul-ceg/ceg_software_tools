import {EMISReportKeys, SystmOneReportKeys } from '../constants/cvdDataEnums'

//List of High Intensity Statins

const HighIntensityStatins : string[] = [
    
    "Atorvastatin 40mg tablets",
    "Atorvastatin 60mg tablets",
    "Atorvastatin 80mg tablets",
    "Crestor 20mg tablets (AstraZeneca UK Ltd)",
    "Crestor 40mg tablets (AstraZeneca UK Ltd)",
    "Lipitor 40mg tablets (Pfizer Ltd)",
    "Lipitor 60mg tablets (Pfizer Ltd)",
    "Lipitor 80mg tablets (Pfizer Ltd)",
    "Rosuvastatin 20mg tablets",
    "Rosuvastatin 40mg tablets",
    "Simvastatin 80mg tablets",
    "Simvastatin 80mg / Ezetimibe 10mg tablets",
    "Zocor 80mg tablets (Merck Sharp & Dohme Ltd)"
];

export enum StatinIntensity {
    
    High = "High",
    ModiumLow = "Mod/Low",     
    //Any = "Any",
    NotOnStatin = "None"
}

/**
 * Get statins dosage intensity.
 * @param {statinsMed} Statin dosage name.
 * @returns {StatinIntensity} Returns StatinIntensity enum type.
 */
export function StatinsIntensity (statinsMed : string) : StatinIntensity  {

    let statinInt: StatinIntensity;
    
    if (statinsMed.trim().length > 0) {
        statinInt = HighIntensityStatins.includes(statinsMed.trim()) ? StatinIntensity.High : StatinIntensity.ModiumLow;     
    }
    else {
        statinInt = StatinIntensity.NotOnStatin;
    }

    return statinInt;
}

export function StatinExclusion(dRow: any[], reportKeys : typeof EMISReportKeys | typeof SystmOneReportKeys) : string {

    let StatinContraDecline: string = "";

    let StatinIssueDate = "", StatinContraDate = "", StatinDeclineDate = "";

    if (dRow[reportKeys.Statin_Issue_Date]) StatinIssueDate = dRow[reportKeys.Statin_Issue_Date];
    if (dRow[reportKeys.Statin_Contra_Date]) StatinContraDate = dRow[reportKeys.Statin_Contra_Date];
    if (dRow[reportKeys.Statin_Decline_Date]) StatinDeclineDate = dRow[reportKeys.Statin_Decline_Date];

    if (StatinContraDate && (!StatinIssueDate || Date.parse(StatinContraDate) >= Date.parse(StatinIssueDate)) ) {
        StatinContraDecline = "Contra"
    }
    else if (StatinDeclineDate && (!StatinIssueDate || Date.parse(StatinDeclineDate) >= Date.parse(StatinIssueDate)) ) {
        StatinContraDecline = "Declined"
    }

    return StatinContraDecline;
}