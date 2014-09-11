$(document).ready(function() {
	var people = new Array();
	var startedlottery = false;

	$('#roll-button').click(function() {
		$('#roll-button').prop('disabled', true); // Avoid selecting same winner twice on one ticket

		if ( ! startedlottery ) {
		}

		console.log(people);

		if ( $('#winners').length == 0 )
			$('.body').append('<ol id="winners"><h1>Vinnere</h1></ol>');
		
		$('#winners').append('<li class="latest-winner"></li>');

		// No point in continuing if no more tickets are left
		if (0<people.length) {
			// Make the drawing more exiting by rolling through the contestants before selecting the real winner.
			var rotatingNames = setInterval(function(){
				anticipation = people[Math.floor(Math.random() * people.length)];
				$('.latest-winner').html(anticipation);
			}, 100);

			// Select the actual winner
			var winticket = Math.floor(Math.random() * people.length);
			var winner = people[winticket];
			people.splice(winticket,1);

			setTimeout(function() {
				clearInterval(rotatingNames);
				$('.latest-winner').html(winner.trim());
				$('.latest-winner').animate('highlight').removeClass('latest-winner');
				$('#roll-button').prop('disabled', false);
			}, 2000);
		}

	});

	$('#add-contestant').click(function() {
		// Only allow more contestants if every contestant has a name
		var properform = true;
		$('#contestants > .contestant .name').each(function(){
			if ( '' == $(this).val() )
				properform = false;
		});
		if (!properform) {
			$('#messages').html('<p class="text-muted">Gi alle deltakerne et navn før du legger til flere.</p>');
			return;
		} else {
			$('#messages').html('');
		}

		// Add another contestant field
		var no = $('#contestants > .contestant').size() + 1;
		$('#contestants').append('<div id="contestant-'+no+'" class="contestant"></div>');
		$('#contestant-'+no).append('<i class="glyphicon glyphicon-user"></i> <input id="contestant-'+no+'-name" name="contestant-'+no+'-name" class="name form-control" type="text" size="25" placeholder="Navn"></input> ');
		$('#contestant-'+no).append('<div class="form-group tickets-group"></div>');
		//$('#contestant-'+no+' .tickets-group').append('<label for="contestant-'+no+'-tickets">Antall lodd</label> ');
		$('#contestant-'+no+' .tickets-group').append('<input id="contestant-'+no+'-tickets" name="contestant-'+no+'-tickets" class="tickets form-control" type="number" value="0" size="4"></input>');
		$('#contestant-'+no+' .name').focus();
	});

	$('#start-lottery').click(function() {
		$('#roll-button').show().addClass('btn-success').prop('disabled',false);
		$('#start-lottery').hide();
		$('#add-contestant').hide();
		$('input.name, input.tickets').prop('disabled',true);

		$('#contestants > .contestant').each(function(){
			for (var i=0 ; i<$(this).find('.tickets').val(); i++) {
				people.push($(this).children('.name').val());
			}
		});
		$('#messages').html('<p class="text-muted">Det er klart for trekning, og du kan ikke lenger endre på loddene.</p>');
		startedlottery=true;
	});

});
