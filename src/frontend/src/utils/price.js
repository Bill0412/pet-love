const Ratio = {
    ICP2USD: 12.54
}

export const estimatePrice = (icpPrice) => {
    return Ratio.ICP2USD * icpPrice
}