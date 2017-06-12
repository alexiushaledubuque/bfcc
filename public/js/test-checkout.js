 var items = [];
      // We will assume you have a `cart` object which has `products`
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
      // so they do not have to fill it out again.
      var shippingContact = {
        fullName: 'Jane Doe',
        address:  '123 Test St.',
        address2: '#8',
        zip:      '11238',
        phone:    '5555555555',
        city:     'Coolstown',
        state:    'NY',
      };

      // Likewise, if you have the billing contact, you can pass it in to us
      // so they do not have to.
      var billingContact = {
        email:      'jane.doe@geocities.com',
        firstName:  'Jane',
        lastName:   'Doe',
        address:    '123 Test St.',
        address2:   'Apt. 4',
        zip:        '11238',
        phone:     '5555555555',
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
        shippingContact: shippingContact,
        billingContact: billingContact
      };

      // We will assume your `cart` object has the `total`
      // dollar amount of products in the cart.
      if (cart.total > 2000) {
        // Use a non-default Targeted Financing Program for carts over $2000
        opts.financingProgramId = '0000000-aaaa-bbbb-cccc-ddddddddddd';
      }

      // Lastly, call `checkout` with `opts` as the argument.
      bread.checkout(opts);