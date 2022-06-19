import { shuffleArray } from "../algorithms/shuffle";

export function setChoices(index, accounts) {
    /*
        Sets the answer as the first choice. It copies accounts array
        then chooses 3 other choices and adds to the answer.

        Shuffles the array in place.
    */
    const accountsCopy = [...accounts];
    const accountArray = [accountsCopy[index]];
    const min = Math.min(4, accounts.length);
    accountsCopy.splice(index, 1);
    while (accountArray.length < min) {
        const randomIndex = Math.floor(Math.random() * accountsCopy.length);
        accountArray.push(accountsCopy[randomIndex]);
        accountsCopy.splice(randomIndex, 1);
    }
    shuffleArray(accountArray);
    return accountArray;
}
