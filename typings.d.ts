declare namespace jest {
	interface Matchers {
		toMatchYields: (yieldValues: any[]) => void
	}
}