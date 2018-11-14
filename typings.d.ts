export declare namespace jest {
    type expectType = any;
    type returnType = Error | any;
    type yieldValue = [expectType, returnType?];
    type yieldValues = yieldValue[];

	interface Matchers {
		toMatchYields: (yieldValues: yieldValues) => void
	}
}