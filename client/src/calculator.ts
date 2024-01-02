export function calculateMatcherAssetAmountOutOBeta(investmentAmount: number,portfolioBeta: number,mainAssetBeta: number,
                                            matcherAssetBeta: number) {
    return (investmentAmount * (portfolioBeta - mainAssetBeta)) / (matcherAssetBeta - portfolioBeta);
}
export function calculatePorfolioSharpeValue(investmentAmount: number,matcherInvestmentAmount: number, mainAssetSharpeRatio: number,
                                             matcherAssetSharpeRatio: number) {
    return ((investmentAmount * mainAssetSharpeRatio) + (matcherInvestmentAmount * matcherAssetSharpeRatio))/ (investmentAmount + matcherInvestmentAmount)
}

export function calculateMatcherAssetAmountOutOfSharpeRatio(investmentAmount: number,portfolioSharpeRatio: number,mainAssetSharpeRatio: number,
                                            matcherAssetSharpeRatio: number) {
    return (investmentAmount * (portfolioSharpeRatio - mainAssetSharpeRatio)) / (matcherAssetSharpeRatio - portfolioSharpeRatio);
}
export function calculatePorfolioBeta(investmentAmount: number,matcherInvestmentAmount: number, mainAssetBeta: number,
                                             matcherAssetBeta: number) {
    return ((investmentAmount * mainAssetBeta) + (matcherInvestmentAmount * matcherAssetBeta))/ (investmentAmount + matcherInvestmentAmount)
}