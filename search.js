const { algBoyerMooreSearching } = require('./boyer-moore.js');
let fs = require('fs');
let arg = process.argv;

let data;
try {
	data = fs.readFileSync(arg[3]);
} catch (err) {
	console.err(err);
}
data = data.toString();

let substring;
try {
	substring = fs.readFileSync(arg[2]);
} catch (err) {
	console.err(err);
}
substring = substring.toString();
if (substring.charAt(substring.length - 1) == '\n')
	substring = substring.substring(0, substring.length - 1);


let result = data.algBoyerMooreSearching(substring.toString());

//----------Print--------
console.log(`Search "${substring.substring(0,25)}"${substring.length > 25 ? '...' : ''}(${arg[2]}) in "${arg[3]}"`);
console.log(`MATCH: ${result.length}`);
if (result.length != 0)
	printResult(result);
//----------Print--------

function printResult(array) {
	let digits = array[array.length - 1].toString().length;
	const count = 10;
	let str = '';
	for (let i = 0; i < array.length; i++) {
		let digitsCount = array[i].toString().length;
		str += ' '.repeat(digits - digitsCount) + array[i] + ' '
		if ( (i + 1) % 10 == 0) {
			console.log(str);
			str = '';
		}
	}
	if (str != '')
		console.log(str);	
} 
