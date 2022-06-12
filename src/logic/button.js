import { setDefault } from "../components/score";
import { incrementScore } from "../components/score";

/*
 @return boolean indicating if answer is correct or wrong
 */
function buttonLogic(answer, choice, accounts) {
    const buttonValue = choice.target.innerHTML;
    if (buttonValue === answer.name) {
        incrementScore();
        return true;
    } else {
        //setDefault();
        return false;
    }
}

export default buttonLogic;
