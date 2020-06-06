/*// Define animation props and disable autoplay
const animation = anime({
  targets: "section",
  translateX: [-20, 0],
  opacity: [0, 1],
  delay: function(el, i, l) {
    return i * 100
  },
  duration: 400,
  autoplay: false,
  easing: "easeOutCubic"
})

// Set to reversed state initially
animation.reverse()

const handleClick = () => {
  animation.play()
  animation.reverse()
}

const btn = document.querySelector("button")
btn.addEventListener("click", handleClick)*/
$(document).ready(function(){
	document.querySelector('.panel-2').style.display = 'none';
	/*document.querySelector('.panel-2').style.opacity = 'hidden';*/
	
/*	function animedemo(){
	
	}*/

	
	
	
	$('#admission_table tbody tr').on('click', '.cbCheck', function(){
		
		var table = $('#admission_table').DataTable();
		if(this.checked==true){
			const animation = anime ({
				targets: '.panel-2',
				opacity: 1,
				duration:500,
				delay: function() {
				    return anime.random(1,1000);
				  },
				translateX: [
				    {value: 700, duration: 0},
				    {value:0, duration: 800}
				],

				/*autoplay: true,*/
				elasticity: 200, 
				easing: 'easeInOutQuad',
				begin: function() {
				    document.querySelector('.panel-1').style.display = 'none';
				    document.querySelector('.panel-1').style.opacity = 'hidden';
				   document.querySelector('.panel-2').style.display = 'block';
					//document.querySelector('.panel-2').style.opacity = 'hidden';*/
				  }
				});
				animation.play();
			
		}
	});
});