module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'ts'],
    moduleDirectories: ['node_modules'],
    transform: {
        '.(ts|tsx)': 'ts-jest',
    },
    testTimeout: 600000,
    globalSetup: "./__test__/globalSetup.ts",
};
