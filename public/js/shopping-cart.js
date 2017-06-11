$('.minus-btn').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $input = $this.closest('div').find('input');
    var value = parseInt($input.val());
    // var price = $this.closest("div.item").find(".total-price")
    // var $total = $this.closest("div.item").find(".total")
 
 
    if (value > 1) {
        value = value - 1;
    } else {
        value = 0;
    }
 
  $input.val(value);
  // $total.text(parseInt(price[0].innerHTML) * value)  
});
 
$('.plus-btn').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $input = $this.closest('div').find('input');
    var value = parseInt($input.val());
    // var price = $this.closest("div.item").find(".total-price")
    // var $total = $this.closest("div.item").find(".total")
 
    if (value < 100) {
        value = value + 1;
    } else {
        value =100;
    }
 
    $input.val(value); 
    // $total.text(parseInt(price[0].innerHTML) * value)   
});