import print from '../src/js/module';

describe('example module', () => {

	it('should log out a message to the console', () => {
		// setup
		let consoleLogWasCalledWith;
		const originalConsoleLog = console.log;
		const fakeConsoleLog = message => consoleLogWasCalledWith = message;
		console.log = fakeConsoleLog;
		// excersise
		print('some message');
		expect(consoleLogWasCalledWith).to.equal('some message');
		// teardown
		console.log = originalConsoleLog;
	});

});
