
export type CVD_Metrics = {

    CVD_HighStatin?: {Denominator: number, Numerator: number, Percentage: string},
    CVD_LDLnotOnInclisiran?: {Denominator: number, Numerator: number, Percentage: string},
    CVD_LDLbelow2?: {Denominator: number, Numerator: number, Percentage: string},
    CVD_NotOnStatin?: {Denominator: number, Numerator: number, Percentage: string},
    
    QRisk_10_19_OnStatin?: {Denominator: number, Numerator: number, Percentage: string},
    QRisk_20_OnStatin?: {Denominator: number, Numerator: number, Percentage: string},

    HypertensionAgeBelow80_BP_140_90?: {Denominator: number, Numerator: number, Percentage: string},
    HypertensionAgeOver80_BP_150_90?: {Denominator: number, Numerator: number, Percentage: string}
    CKD3_5_OnStatin?: {Denominator: number, Numerator: number, Percentage: string}

}