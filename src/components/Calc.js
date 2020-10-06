import React, { useState, useEffect } from "react";
import { MathOperation, operationTypes } from "./MathOperation";
import DigitButton from "./DigitButton";

/**
 * A basic switch calcuation function
 * @param {*} operation The name or type of the operation used, for ex. : "sqrt" / "+"
 * @param {*} num1 The first num to use in the calculation
 * @param {*} num2 The second num to use in the calculation
 */
function calculate(operation, num1, num2) {
	switch (operation) {
		case "+":
			return num1 + num2;
		case "-":
			return num1 - num2;
		case "*":
			return num1 * num2;
		case "/":
			return num1 / num2;
		case "%":
			return num1 % num2;
		case "x²":
			return Math.pow(num1, 2);
		case "√":
			return Math.sqrt(num1);
	}
}

function Calc() {
	/**
	 * Add (0-9) to <DigitButton /> with value and onClick function as exlplained in the requirements
	 * Add the correct types to MathOperation, if you are having problem make sure its written correctly compared to operationTypes array
	 * This is a state machine, you'll need to work wisely with React.js State and Lifecycle functionality
	 * You can use calculate function for your aid
	 */
	const [firstNum, setFirstNum] = useState("0");
	const [secondNum, setSecondNum] = useState("0");
	const [operationPressed, setOperationPressed] = useState();

	useEffect(() => {
		console.log(firstNum);
		console.log(secondNum);
		console.log(operationPressed);
	});

	function operationClick(op) {
		// if (op === "AC") {
		// } else if (op === ".") {
		// } else if (op === "=") {
		// } else {
		// }

		switch (op) {
			case "AC":
				setFirstNum("0");
				setSecondNum("0");
				setOperationPressed();
				break;
			case ".":
				operationPressed
					? setSecondNum(() => secondNum + op)
					: setFirstNum(() => firstNum + op);
				break;
			case "=":
				setFirstNum(() =>
					calculate(operationPressed, Number(firstNum), Number(secondNum))
				);
				setOperationPressed();
				setSecondNum("0");
				break;
			case "x²":
			case "√":
				setFirstNum(() => calculate(op, Number(firstNum), Number(secondNum)));
				setOperationPressed();
				break;
			default:
				if (operationPressed) {
					setFirstNum(() =>
						calculate(operationPressed, Number(firstNum), Number(secondNum))
					);
					setSecondNum("0");
				}
				setOperationPressed(op);
		}
	}

	function numberClick(value) {
		if (operationPressed) {
			if (secondNum === "0") {
				setSecondNum(value);
			} else {
				setSecondNum(() => secondNum + value);
			}
		} else {
			if (firstNum === "0") {
				setFirstNum(value);
			} else {
				setFirstNum(() => firstNum + value);
			}
		}
	}

	return (
		<div className="calculator">
			<div className="result">
				{operationPressed
					? secondNum
					: firstNum === Infinity
					? "Error"
					: firstNum}
			</div>
			<div className="calculator-digits">
				<DigitButton key="0" value="0" onClick={numberClick} />
				<DigitButton key="1" value="1" onClick={numberClick} />
				<DigitButton key="2" value="2" onClick={numberClick} />
				<DigitButton key="3" value="3" onClick={numberClick} />
				<DigitButton key="4" value="4" onClick={numberClick} />
				<DigitButton key="5" value="5" onClick={numberClick} />
				<DigitButton key="6" value="6" onClick={numberClick} />
				<DigitButton key="7" value="7" onClick={numberClick} />
				<DigitButton key="8" value="8" onClick={numberClick} />
				<DigitButton key="9" value="9" onClick={numberClick} />
				{operationTypes.map(operation => (
					<MathOperation
						key={operation}
						type={operation}
						onClick={operationClick}
					/>
				))}
			</div>
		</div>
	);
}

export default Calc;
