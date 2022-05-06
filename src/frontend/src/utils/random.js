export const randomInt = (min, max) => {
    return parseInt(Math.random() * (max - min + 1) + min, 10);
}

export const randomJazzicon = () => {
    return Math.round(Math.random() * 10000000)
}
