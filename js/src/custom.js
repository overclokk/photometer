jQuery.noConflict()(function($){
	"use strict";
	$(document).ready(function() {

		window.addEventListener("devicelight", function (event) {

			// Read out the lux value

			var lux = event.value;

		});

		// Lux value from sensor
		// var lux = 40;

		$( "#lux" ).html( "lux " + lux );


		// Exposure value
		// @link http://stackoverflow.com/questions/5401738/how-to-convert-between-lux-and-exposure-value
		var ev = Math.round( Math.log2(lux/2.5) );
		// alert(ev); // With lux 40 ev = 4
		$( "#ev" ).html( "EV " + ev );

		// ISO value default is setting to 100 
		var iso;
		function displayIso() {
			iso = $( "#iso-value" ).val();
			$( "#iso" ).html( "ISO " + iso );
		}
		if (!iso) {

			$( "#iso" ).html( "ISO " + 100 );
			$( "#iso-value" ).val( 100 );
		};

		$( "#iso-value" ).change( displayIso );


		// Esempio ev = 4
		// Tempo = 1/4 e f = 2 oppure tempo = 1/2 e f = 2.8
		// Aumentando di una unità ev si dimezza il tempo e f rimane invariata
		// Oppure si aumenta di un f stop e rimane invariato il tempo
		// f = f*√2 oppure f*sqrt(2)


		// EV = AV + TV; (AV is Aperture Value and TV is Time Value)
		// AV = log2(N²); N is the aperture f-number
		// TV = log2(1/t); t is shutter speed in seconds (example: 0.5 or 2 or 0.05)

		// n is the aperture f-number
		var n = '';
		// var n = 2.8;

		// Prendo il valore nella select f
		// var n = $( "#f-value" ).val();
		// alert(n);

		// AV is Aperture Value
		// var av = Math.round( Math.log2( Math.pow( n, 2 ) ) );
		var av = Math.log2( Math.pow( n, 2 ) ) ;
		// alert(av); // With n 2.8 av = 2.97

		function displayF() {
			// prendo il valore della select per gli f con id f-value
			var n = $( "#f-value" ).val();
			// Lo stampo in p con id f
			$( "#f" ).html( "f " + n );

			// per conoscere il tempo
			// TV = EV - AV
			// Se t non è definita calcolo il tempo
			if (!t) {

				// Ridefinisco la variabile av con i nuovi valori
				av = Math.log2( Math.pow( n, 2 ) ) ;
				var t = 1 / Math.pow( 2, ev - av );
				// alert(t);

				// Printo il valore nel paragrafo con id t
				if (t <= 1) {
					t = Math.round(1/t);
					$( "#t" ).html( "Time 1/" + t );
				} else{
					t = Math.round(t);
					$( "#t" ).html( "Time " + t + '"' );
				};
				// alert(t);

				// Metto il valore nella select
				$( "#t-value" ).val(t);
				// alert(t);

			};
		}
		// Quando cambia il valore nella select lo stampo e cambio il valore nella select time
		$( "#f-value" ).change( displayF );	
		

		// t is shutter speed in seconds (example: 0.5 or 2 or 0.05)
		// var t = '0.25';
		var t = '';

		// Prendo il valore nella select t
		// var t = $( "#t-value" ).val();

		// TV is Time Value
		var tv = Math.log2(1/t);
		// alert(tv); // With t 0.5 tv = 1

		// alert(av+tv);

		// var prova = Math.log2(1/0.5);
		// alert(prova);

		// prova = 1 / Math.pow( 2, prova )
		// alert(prova);

		function displayT() {
			// prendo il valore della select per il time con id t-value
			var t = $( "#t-value" ).val();
			// alert(t);
			// Lo stampo in p con id t
			if (t < 1) {
				$( "#t" ).html( "Time 1/" + Math.round(1/t) );
			} else if ( t >= 1 && t < 120  ) {
				$( "#t" ).html( "Time " + t + '"' );
			} else {
				$( "#t" ).html( "Time " + t/60 + "'" );
			};
			// alert(t);

			//Per conoscere l'apertura
			// AV = EV - TV

			// av = Math.log2( Math.pow( n, 2 ) ) ;
			// n è l'apertura del diaframma

			// Se f non è definita la calcolo
			// alert(f);
			if (!f) {
				tv = Math.log2(1/t);
				var av = ev - tv;
				var f = Math.sqrt( Math.pow(2, av) );
				// alert(f);

				if (f < 0.96 || f > 61.967733539318695) {

						f = null;
				} else{
				
					switch(true) {
						case f >= 0.96 && f < 1.2:
							f = 1.0;
							break;
						case f >= 1.2 && f < 1.9:
							f = 1.4;
							break;
						case f >= 1.9 && f < 2.5:
							f = 2.0;
							break;
						case f >= 2.5 && f < 3.5:
							f = 2.8;
							break;
						case f >= 3.5 && f < 5:
							f = 4.0;
							break;
						case f >= 5 && f < 6.5:
							f = 5.6;
							break;
						case f >= 6.5 && f < 10:
							f = 8.0;
							break;
						case f >= 10 && f < 13:
							f = 11;
							break;
						case f >= 13 && f < 19:
							f = 16;
							break;
						case f >= 19 && f < 27:
							f = 22;
							break;
						case f >= 27 && f < 38.5:
							f = 32;
							break;
						case f >= 38.5 && f < 54.5:
							f = 45;
							break;
						case f >= 54.5:
							f = 64;
							break;
						default:
							null;
					}

				};


				$( "#f" ).html( "f " + f );
				$( "#f-value" ).val(f + '.0');
				// alert(f);

			};
		}
		$( "#t-value" ).change( displayT );




		//Per conoscere l'apertura
		// AV = EV - TV

		// if (!f) {
		// 	var f = ev - tv;
		// 	$( "#f" ).html( "f " + f );
		// 	$( "#f-value" ).val(f);
		// 	// alert(f);
		// } else{

		// };

		// f = 

		// var av = Math.round( Math.log2( Math.pow( n, 2 ) ) );
		// n = 2.8;
		// n alla seconda 2.8*2.8= 7.84
		// var prova = Math.round( Math.log2( Math.pow( n, 2 ) ) );
		// var prova = Math.log2( 4*4 );
		// alert(prova);

		// prova = Math.pow( 2, ev-tv );
		// alert('1/' + 1000/prova);

		// var fvalue = $('#f-value').val();
		// alert(fvalue);


	});// Chiudo document ready
});