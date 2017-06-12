console.log('BREADOUT.JS!!!')
var cart = {name: "Amazon Echo",
              price: 100*100,
              sku: '1001604944',
              imageUrl: 'http://www.homedepot.com/catalog/productImages/1000/b0/b0cfb2dc-ecf2-44d7-8c24-39b405098944_1000.jpg',
              detailUrl: 'http://www.homedepot.com/p/Amazon-Echo-53003785HD/206588431',
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
            if (tax.state == 'NY')
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
            customCSS: 'html,body,.bread-embed{margin:0;padding:0;position:absolute;top:0;right:0;bottom:0;left:0;font-family:sans-serif}.bread-embed{visibility:hidden}.bread-btn{border:2px solid #055170;border-radius:8px;background:#fff;font-size:13px;color:#055170;cursor:pointer}.bread-btn .bread-embed-inner{position:absolute;top:0;left:0;right:50px;bottom:0;padding:0 1em}.bread-btn .bread-embed-icon{position:absolute;top:-1px;right:-51px;bottom:-1px;left:100%;margin-left:-50px;margin-right:50px;background-color:#055170;background-repeat:no-repeat;background-image:url(assets/coin.png);background-position:center;background-size:auto 30px;border-radius:0 4px 4px 0;cursor:pointer}.bread-btn .bread-pot:before{content:"Pay over time";color:#055170}.bread-dur{text-transform:uppercase}.bread-as-low-as .bread-as-low-as-info{z-index:1000;font-size:1.25em;font-weight:700;padding:3px}.bread-btn.bread-as-low-as .bread-as-low-as:before,.bread-label .bread-as-low-as:before{content:"As low as";color:#055170;margin-right:.5em}.bread-btn.bread-show-terms .bread-for:before,.bread-label .bread-for:before{content:"for";color:#000;margin-right:.5em}.bread-btn.bread-show-terms .bread-for:before{color:#055170}.bread-btn.bread-show-terms .bread-pot:before{color:#055170}.bread-center{text-align:center;vertical-align:middle;height:100%;width:100%;display:table}.bread-center-inner{display:table-cell;vertical-align:middle}.bread-label{color:#000;text-align:center}.bread-label .bread-embed-inner{display:inline-block;vertical-align:middle;height:100%}.bread-label .bread-embed-icon{vertical-align:middle;display:inline-block;background:#ef8919;border-radius:100%;width:1.25em;height:1.25em;color:#fff;line-height:1.5em;font-size:.85em;margin-top:-.2em}.bread-label .bread-embed-icon:after{content:"i"}@media only screen and (-webkit-min-device-pixel-ratio: 2),only screen and (min-device-pixel-ratio: 2),only screen and (min-resolution: 192dpi),only screen and (min-resolution: 2dppx){.bread-btn .bread-embed-icon{background-image:url(assets/coin.svg)}}.bread-text{color:red}',
            shippingContact: shippingContact,
            billingContact: billingContact,
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
                // window.location.href = 'localhost:3000/shopping-cart/checkout';
              });
            }
          }
          // Lastly, call `checkout` with `opts` as the argument.
          bread.checkout(opts);