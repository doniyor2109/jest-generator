import * as matchers from './matchers';

const jestExpect = global.expect;

if (jestExpect) {
    jestExpect.extend(matchers);
} else {
    console.error('jest-generator: Could not find jest. Please install jest library');
}