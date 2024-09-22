export const calcLevel = ((xp) =>{
    let level = 0;
    while (xpNeeded(++level) < xp) {};
    return level-1;
});

export const xpNeeded = ((level) => {
    return Math.round(level * (176 + 3 * level * (47 + 11 * level)));
});