import { setDefault } from "../components/score";
import { incrementScore } from "../components/score";

function buttonLogic(answer, choice, accounts) {
    const buttonValue = choice.target.innerHTML;
    if (buttonValue === answer.name) {
        incrementScore();
    } else {
        setDefault();
    }
}

export default buttonLogic;