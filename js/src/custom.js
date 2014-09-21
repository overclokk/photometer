$(document).ready(function() {

	// window.addEventListener("devicelight", function (event) {  // <==== Event devicelight

		// Read out the lux value

		// var lux = event.value;  // <==== Event devicelight


		// Lux value from sensor
		var lux = 40; // <==== For testing and debug

		$( "#lux" ).html( "lux " + lux );


		// Exposure value link
		// @link http://stackoverflow.com/questions/5401738/how-to-convert-between-lux-and-exposure-value
		
		// Mathematically EV is calculated as follows: 
		// EV = AV + TV; (AV is Aperture Value and TV is Time Value)
		// Exposure Value = Aperture Value + Time Value
		// AV = log2(N²); N is the aperture f-number
		// TV = log2(1/t); t is shutter speed in seconds (example: 0.5" or 2" or 0.05")

		// ev = exposure value
		var ev = Math.round( Math.log2(lux/2.5) );

		// Print exposure value in ID #ev
		$( "#ev" ).html( "EV " + ev );

		// ISO value default is setting to 100 to default
		var iso;

		function displayIso() {

			// get the ISO value of select #iso-value
			iso = $( "#iso-value" ).val();

			// Print the ISO value in ID #iso
			$( "#iso" ).html( "ISO " + iso );
		}
		if (!iso) {

			// if ISO is empty set the default value at 100

			// Print the ISO value in ID #iso
			$( "#iso" ).html( "ISO " + 100 );

			//Set ISO value in select
			$( "#iso-value" ).val( 100 );
		};


		$( "#iso-value" ).change( displayIso );

		// f = f*√2 o f*sqrt(2)


		// n is the aperture f-number
		// Default is empty
		var n = '';

		// AV is Aperture Value
		var av = Math.log2( Math.pow( n, 2 ) ) ;

		// Function to calculate f value 
		function displayF() {

			// Get the f value in select with ID f-value
			var n = $( "#f-value" ).val();

			// Print in p with ID f
			$( "#f" ).html( "f " + n );

			// Calculate the time value
			// TV = EV - AV
			// Time Value = Exposure value - Aperture Value
			// If t is not defined
			if ( !t ) {

				// Var av redifine with new value
				av = Math.log2( Math.pow( n, 2 ) ) ;

				// Var t for time value
				var t = 1 / Math.pow( 2, ev - av );

				if ( t <= 1 ) {

					// If t is less than 1sec
					t = Math.round(1/t);
					$( "#t" ).html( "Time 1/" + t );

				} else{

					// Else t is more than 1sec
					t = Math.round(t);
					$( "#t" ).html( "Time " + t + '"' );
				};

				// Print t value in select
				$( "#t-value" ).val(t);

			};
		}

		// When select for time value change execute the displayF() function
		$( "#f-value" ).change( displayF );	
		

		// t is shutter speed in seconds (example: 0.5" or 2" or 0.05")
		// Default is empty
		var t = '';

		// TV is Time Value
		var tv = Math.log2(1/t);

		// Function to calculate time value 
		function displayT() {

			// Get the f value in select with ID t-value
			var t = $( "#t-value" ).val();

			// Print in p with ID t
			if (t < 1) {

				// If t is less than 1sec print fraction
				$( "#t" ).html( "Time 1/" + Math.round(1/t) );

			} else if ( t >= 1 && t < 120  ) {

				// Else if t is between 1sec and 120sec print sec "
				$( "#t" ).html( "Time " + t + '"' );
			} else {

				// Else print min '
				$( "#t" ).html( "Time " + t/60 + "'" );
			};

			// Calculate the Aperture Value
			// AV = EV - TV
			// Aperture Value = Exposure value - Time Value
			// If t is not defined			
			if ( !f ) {

				// Var tv redifine with new value
				tv = Math.log2(1/t);

				// Var f for f value
				var f = Math.sqrt( Math.pow(2, ev - tv) );
				
				// This switch case is to set the right parameter
				switch(true) {
					case f < 0.96:
						f = null;
						$( "#f-value" ).val( f );
						break;
					case f >= 0.96 && f < 1.2:
						f = 1.0;
						$( "#f-value" ).val( f + '.0' );
						break;
					case f >= 1.2 && f < 1.9:
						f = 1.4;
						$( "#f-value" ).val( f );
						break;
					case f >= 1.9 && f < 2.5:
						f = 2.0;
						$( "#f-value" ).val( f + '.0' );
						break;
					case f >= 2.5 && f < 3.5:
						f = 2.8;
						$( "#f-value" ).val( f );
						break;
					case f >= 3.5 && f < 5:
						f = 4.0;
						$( "#f-value" ).val( f + '.0' );
						break;
					case f >= 5 && f < 6.5:
						f = 5.6;
						$( "#f-value" ).val( f );
						break;
					case f >= 6.5 && f < 10:
						f = 8.0;
						$( "#f-value" ).val( f + '.0' );
						break;
					case f >= 10 && f < 13:
						f = 11;
						$( "#f-value" ).val( f );
						break;
					case f >= 13 && f < 19:
						f = 16;
						$( "#f-value" ).val( f );
						break;
					case f >= 19 && f < 27:
						f = 22;
						$( "#f-value" ).val( f );
						break;
					case f >= 27 && f < 38.5:
						f = 32;
						$( "#f-value" ).val( f );
						break;
					case f >= 38.5 && f < 54.5:
						f = 45;
						$( "#f-value" ).val( f );
						break;
					case f >= 54.5:
						f = 64;
						$( "#f-value" ).val( f );
						break;
					case f > 70:
						f = null;
						$( "#f-value" ).val( f );
						break;
					default:
						null;
				}

				// Print f value in p with ID f
				$( "#f" ).html( "f " + f );
				// $( "#f-value" ).val(f + '.0');
				// if ( f >= 0.96 || f <= 70 ) {
				// 	$( "#f-value" ).css('background-color', 'red');
				// };

			};
		}

		// When select for f value change execute the displayT() function
		$( "#t-value" ).change( displayT );

	// });// End event devicelight  // <==== Event devicelight


});// Chiudo document ready