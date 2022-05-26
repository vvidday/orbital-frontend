import { shuffleArray } from "../algorithms/shuffle";

export function setChoices(index, accounts) {
    /*
        Sets the answer as the first choice. It copies accounts array
        then chooses 3 other choices and adds to the answer.

        Shuffles the array in place.
    */
    const accountsCopy = structuredClone(accounts);
    const accountArray= [accountsCopy[index]];
    accountsCopy.splice(index, 1);
    while (accountArray.length < 4) {
        const randomIndex = Math.floor(Math.random() * accountsCopy.length);
        accountArray.push(accountsCopy[randomIndex]);
        accountsCopy.splice(randomIndex, 1);
    }
    shuffleArray(accountArray);
    return accountArray;
};