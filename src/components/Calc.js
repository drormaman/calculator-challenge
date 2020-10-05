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
			console.log("powpow");

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
	const [result, setResult] = useState("");

	useEffect(() => {
		console.log("first", firstNum);
		console.log("second", secondNum);
		console.log("operation", operationPressed);
	});

	function operationClick(type) {
		if (type === "AC") {
			setFirstNum("0");
			setSecondNum("0");
			setOperationPressed(null);
		} else if (type === ".") {
			if (operationPressed) {
				setSecondNum(() => secondNum + type);
			} else {
				setFirstNum(() => firstNum + type);
			}
		} else if (type === "=") {
			setResult(
				calculate(operationPressed, Number(firstNum), Number(secondNum))
			);
			setFirstNum("0");
			setSecondNum("0");
			setOperationPressed(null);
		} else {
			setOperationPressed(type);
			// setFirstNum(calculate(type, Number(firstNum), Number(secondNum)));
			setSecondNum("0");
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
				{operationPressed === "="
					? result
					: operationPressed
					? secondNum
					: firstNum}
			</div>
			<div className="calculator-digits">
				<DigitButton value="0" onClick={numberClick} />
				<DigitButton value="1" onClick={numberClick} />
				<DigitButton value="2" onClick={numberClick} />
				<DigitButton value="3" onClick={numberClick} />
				<DigitButton value="4" onClick={numberClick} />
				<DigitButton value="5" onClick={numberClick} />
				<DigitButton value="6" onClick={numberClick} />
				<DigitButton value="7" onClick={numberClick} />
				<DigitButton value="8" onClick={numberClick} />
				<DigitButton value="9" onClick={numberClick} />
				{operationTypes.map(operation => (
					<MathOperation type={operation} onClick={operationClick} />
				))}
			</div>
		</div>
	);
}

export default Calc;
