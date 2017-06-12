var cart = {name: "DJI Phantom 4 Pro Drone Quadcopter",
              price: 1400,
              sku: ' 5710367',
              imageUrl: 'https://thumb.ibb.co/hcVotF/drone6.jpg',
              detailUrl: 'http://www.bestbuy.com/site/dji-phantom-4-pro-quadcopter-white/5710367.p?skuId=5710367',
              quantity: 1
          };

          var list = [cart];

          // If you have their shipping address already, you can pass it to us
          // so they don't have to fill it out again.
          var shippingContact = {
            fullName: 'Jane Doe',
            address:  '123 Test St.',
            address2: '#8',
            zip:      '11238',
            phone:    '2234449812',
            city:     'Coolstown',
            state:    'NY'
          };

          // Likewise, if you have the billing contact, you can pass it in to us
          // so they don't have to.
          var billingContact = {
            fullName: 'Jane Doe',
            address:    '123 Test St.',
            address2:   'Apt. 4',
            zip:        '11238',
            city:       'New York',
            state:      'NY', 
            phone:     '1234449812',
            email:      'jane.doe@geocities.com'
          };

          var taxCheck = function(tax){
            if (tax.state === 'NY')
              return 5;
            else
              return 0;
          };

          // Below, we will build the required opts object.
          var opts = {
            buttonId: 'bread-checkout-btn',
            items: list,
            // Optional Array of Shipping Options
            shippingOptions: [
              {
                type: 'overnight',
                typeId: 'GS_001',
                cost: 1350,
              },
              {
                type: '2-day',
                typeId: 'GS_002',
                cost: 500,
              }
            ],
            tax: taxCheck(billingContact), // optional
            actAsLabel: false,
            asLowAs: true,
            shippingContact,
            billingContact,
            done: function(err, tx_token) {
              if (err !== null) {
                alert("There was an error!" + err);
                return;
              }
              // Via Ajax call you send the token to your server, and then redirect the user
              $.ajax({
                url: '/shopping-cart/checkout',
                type: 'POST',
                data: {
                  token: tx_token
                },
              }).done(function(data){
                if (data == undefined){
                    alert("There was an error!" + err);
                    return;
                }
                console.log(JSON.stringify(data, null, 4))
              });
            }
          }
          // Lastly, call `checkout` with `opts` as the argument.
          bread.checkout(opts);