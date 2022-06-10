import { setDefault } from "../components/score";
import { incrementScore } from "../components/score";

export function buttonLogic(answer, choice) {
    const buttonValue = choice.target.innerHTML;
    if (buttonValue === answer.name) {
        incrementScore();
        choice.target.style.backgroundColor = "#71C562";
    } else {
        setDefault();
        choice.target.style.backgroundColor = "#C60C29";
    }
}

export function resetColor() {
    const allWithClass = Array.from(
        document.getElementsByClassName('option')
    );
    allWithClass.forEach(element => element.style.backgroundColor = "transparent")
}