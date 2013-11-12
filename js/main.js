$(document).ready(function() {
	var people = new Array();
	var startedlottery = false;

	$('#roll-button').click(function() {
		if ( ! startedlottery ) {
			$('#contestants > .contestant').each(function(){
				for (var i=0 ; i<$(this).find('.tickets').val(); i++) {
					people.push($(this).children('.name').val());
				}
			});
			$('#contestants').append('<p class="text-muted">Lotteriet er i gang. Du kan ikke lenger endre på loddene.</p>');
			startedlottery=true;
		}

		console.log(people);
		
		var winticket = Math.floor(Math.random() * people.length);
		var winner = people[winticket];
		people.splice(winticket,1);

		if ( $('#winners').length == 0 )
			$('.body').append('<ol id="winners"><h1>Vinnere</h1></ol>');
		$('#winners').append('<li>'+winner.trim()+'</li>');
	});
	$('#add-contestant').click(function() {
		var no = $('#contestants > .contestant').size() + 1;
		$('#contestants').append('<div id="contestant-'+no+'" class="contestant"></div>');
		$('#contestant-'+no).append('<i class="glyphicon glyphicon-user"></i> <input id="contestant-'+no+'-name" name="contestant-'+no+'-name" class="name form-control" type="text" size="25" placeholder="Navn"></input> ');
		$('#contestant-'+no).append('<div class="form-group tickets-group"></div>');
		//$('#contestant-'+no+' .tickets-group').append('<label for="contestant-'+no+'-tickets">Antall lodd</label> ');
		$('#contestant-'+no+' .tickets-group').append('<input id="contestant-'+no+'-tickets" name="contestant-'+no+'-tickets" class="tickets form-control" type="number" value="1" size="4"></input>');
		$('#contestant-'+no+' .name').focus();
	});
});
