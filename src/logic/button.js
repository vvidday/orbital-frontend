import { setDefault } from "../components/score";
import { incrementScore } from "../components/score";

/*
 @return boolean indicating if answer is correct or wrong
 */
export function buttonLogic(answer, choice, accounts) {
    const buttonValue = choice.target.innerHTML;
    if (buttonValue === answer.name) {
        incrementScore();
        choice.target.style.backgroundColor = "#71C562";
        return true;
    } else {
        //setDefault();
        choice.target.style.backgroundColor = "#C60C29";
        return false;
    }
}

export function resetColor() {
    const allWithClass = Array.from(document.getElementsByClassName("option"));
    allWithClass.forEach(
        (element) => (element.style.backgroundColor = "transparent")
    );
}
