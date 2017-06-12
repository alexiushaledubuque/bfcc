var items = [];
          // We'll assume you have a `cart` object which has `products`
          // the shopper has chosen.
          cart.products.forEach(function (p) {
            items.push(
              {
                name: p.name,                       // required
                price: parseInt( (p.price * 100) ), // required (value in cents USD)
                sku: p.sku,                         // required
                imageUrl: p.imgUrl,                 // optional
                detailUrl: p.detailUrl,             // required
                quantity: parseInt(p.quantity)      // required
              }
            );
          });

          // If you have their shipping address already, you can pass it to us
          // so they don't have to fill it out again.
          var shippingContact = {
            firstName: 'Jane',
            lastName:  'Doe',
            email:     'jane.doe@geocities.com',
            address:   '123 Test St.',
            address2:  '#8',
            city:      'Coolstown',
            state:     'NY',
            zip:       '11238',
            phone:     '5555555555'
          };

          // Likewise, if you have the billing contact, you can pass it in to us
          // so they don't have to.
          var billingContact = {
            fullName: 'Jane Doe',
            email:    'jane.doe@geocities.com',
            address:  '123 Test St.',
            address2: 'Apt. 4',
            city:     'Coolstown',
            state:    'NY',
            zip:      '11238',
            phone:    '5555555555'
          };

          // Below, we will build the required opts object.
          var opts = {
            buttonId: 'bread-checkout-btn',
            items: items,
            // Optional Array of Shipping Options
            shippingOptions: [
              {
                type: 'General Shippers',
                typeId: 'GS_001',
                cost: 1350,
              }
            ],
            tax: 900, // optional
            shippingContact,
            billingContact
          };

          // Lastly, call `checkout` with `opts` as the argument.
          bread.checkout(opts);

