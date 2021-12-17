String.prototype.algBoyerMooreSearching = function (substr) {	
	let data = this;
	let result = new Array();
	let bc = BadChar(substr);
	let gs = GoodSuffix(substr);
	
	let m = substr.length;
	let i = 0;
	let j = 0;
	while (i <= data.length - m) {
		for (j = m - 1; j >= 0 && substr[j] == data[i + j]; j--);
		if (j < 0) {
			result.push(i);
			i += gs[j + 1];
		}
		else {
			i += Math.max( 
				gs[j + 1], 							    //shift2
				( (bc[ data[i + j] ]) ? Math.max(j - bc[ data[i + j] ], 1) : j )  //shift1
			);
		}
	}
	return result;	
}


/*
Возвращает "массив":
	index   символ строки substr;
	value   индекс - последнее вхождение в строку.
*/
function BadChar(substr) {
	let alph = new Array();
	for(let i = 0; i < substr.length; i++)
		alph[substr[i]] = i;
	return alph;
}


/*
Возвращает "массив":
	index   индекс последнего проверенного символа строки substr, 
		совпавшего с символом строки data;
	value   кол-во символов, на которое нужно сместить шаблон вправо по правилам хорошего суффикса.
*/
function GoodSuffix(substr) {
	
	let m = substr.length;
	let gs = new Array(m + 1);
	for (let i = 0; i < gs.length; i++)
		gs[i] = 0;
	let f = new Array(m + 1);
	let j = m + 1;
	f[m] = j;
	for (let i = m; i > 0; i-- ) {
		while ( j <= m && substr[i - 1] != substr[j - 1] ) {
			if (gs[j] == 0)  // Найдено вхождение в строку нового суффикса
      				gs[j] = j - i;
			j = f[j];
		}
		j--;
		f[i - 1] = j; 
	}
	/*
	        --
	        |  k , если substr[i .. n] = substr[k .. m - 1]
	f[i] = < 
		|  m , в остальных случаях
		--
	*/
	
	let p = f[0]; 
	for ( j = 0; j <= m; j++ ) {
		if ( gs[j] == 0 ) 
			gs[j] = p; // Для смещения будет использован хороший префикс
		if (j == p)
		// Если несовпадение будет в суффиксе, то такое же расхождение будет и при подстановке префикса,
		// поэтому меняем значение p
			p = f[p]; 
	}
	return gs;
}
