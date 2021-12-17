const { algBoyerMooreSearching } = require('./boyer-moore.js');
let fs = require('fs')


let report = [];
let countFailure = 0;	

			/* TestCases: */

test('abcdabc', 'abccabcbbccabcdabcdabc').toBe(new Array(11, 15));

test('abccdbccabcc', 'abccdbcccbccabccabcc').toBe(new Array());

test('ab', 'abracadabra').toBe(new Array(0, 7));

test('aaaa', 'abaaaaaabcaaa').toBe(new Array(2, 3, 4));

			/* TestCases. */


function test(substr, input) {
	return {
		toBe: exp => {
			let result;
			report.push(`Search '${substr}' in '${input}':`);
			result = input.algBoyerMooreSearching(substr).join(' ');
			exp = exp.join(' ');
			if (result == exp) {
				report.push(`\tSuccess! ${exp}`);
			} else {
				report.push(`\tFailed! Value is '${result}', but expectation is '${exp}'.`);
				countFailure += 1;
			}
		}	
	}
}		


fs.writeFile('testsReport.txt', report.join('\n'), (err) => {
		if (err){
			console.err(err);
			return;
		}
		console.log(`The tests are finished! Failed tests: ${countFailure}.`);
		console.log('Read more in testsReport.txt');
	});
