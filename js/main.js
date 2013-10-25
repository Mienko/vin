$(document).ready(function() {
	$('#roll-button').click(function() {
		var people_field = $('#people-field').val();
		var people = people_field.split(",");

		var winner = people[Math.floor(Math.random() * people.length)];
		alert("And the winner is...");
		alert(winner.trim() + "!");
	});
});
