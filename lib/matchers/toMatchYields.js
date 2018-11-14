function toMatchYields(iterator, yieldValues) {
    let yieldIndex = 0;
    let pass = true;
    let received;
    let expected;
    let iteratorValue;

    do {
        const [expectedYieldValue] = yieldValues[yieldIndex] || [];
        const [, argumentForYield] = yieldValues[yieldIndex - 1] || [];

        if (argumentForYield instanceof Error) {
            iteratorValue = iterator.throw(argumentForYield);
        } else {
            iteratorValue = iterator.next(argumentForYield);
        }

        const yieldedValue = iteratorValue.value;
        const isYieldValueSameAsExpected = this.equals(yieldedValue, expectedYieldValue);

        if (!isYieldValueSameAsExpected) {
            expected = expectedYieldValue;
            received = yieldedValue;
            pass = false;
            break;
        }

        yieldIndex++;
    } while (iteratorValue.done === false);

    return {
        pass,
        actual: received,
        message: () => `
        Expected generator to match with: \n
          ${this.utils.printExpected(expected)}
        Received:\n
          ${this.utils.printReceived(received)} 
      `
    };
}

export default toMatchYields;