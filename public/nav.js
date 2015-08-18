$(document).on('ready', function(){


	$('.nav-item').on('click', function(e){
		// e.preventDefault()
		// console.log("nav item clicked!!")
		$('.content').toggleClass('isOpen');

	})



});