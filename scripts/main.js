const searchForm = $('#form-search');
const searchField = $('#search');


searchField.on('focus', function() {

	searchField.css({
		backgroundImage: 'none',
		borderRadius: 10,	
		width: 200	
	});	

});

searchField.on('blur', function() {

	$(this).val('');

	$(this).css({
		backgroundImage: 'url(images/mag.png)',
		borderRadius: '50%',
		width: 35
	});



});
