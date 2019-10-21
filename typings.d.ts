declare namespace jest {
    type expectType = any;
    type returnType = Error | any;
    type yieldValue = [expectType, returnType?];
    type yieldValues = yieldValue[];

	export interface Matchers<R> {
		toMatchYields: (yieldValues: yieldValues) => void
	}
}
