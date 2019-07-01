const Customer = require('../models/Customer');

/**
 * GET /mycontroller
 * My Controller Page
 */
exports.index = (req, res) => {
  res.render('myview', {
    title: 'Customer'
  });
};

/**
  * POST /customer
  * Send message to new customer via Nodemailer
  */

exports.postCustomer = (req, res) => {

  console.log('postCustomer');

  if (!req.user) {
    req.assert('name', 'Name cannot be blank').notEmpty();
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('mobileNumber', 'Mobile number cannot be empty.').notEmpty();
  }
  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/customer');
  }

  const customer = new Customer({
    email: req.body.email,
    name: req.body.name,
    mobileNumber: req.body.mobileNumber,
    description: req.body.description
  });

  Customer.findOne({ email: req.body.email }, (err, existingCustomer) => {
    if (err) { return next(err); }
    if (existingCustomer) {
      req.flash('errors', { msg: 'Customer with that email address already exists. '});
      return res.redirect('/customer');
    }

    customer.save((err) => {
      if (err) { return next(); }
      // sucess
      req.flash('success', { msg: 'New Customer has been successfully added!' });
      return res.redirect('/');
    });
  });
};

/**
 * Search customer
 */

exports.getCustomerSearch = (req, res) => {

  Customer.find({}, (err, customers) => {

    if (err) { return next(err); }

    // console.log(customers);
    res.render('customer/search', {
      title: `Search Customer`,
      customers
    });
  });
};

exports.postCustomerSearch = (req, res) => {

  Customer.find({'name': {$regex: req.body.name,$options:'i'}, 'email': {'$regex': req.body.email, $options:'i'}, 'mobileNumber': {'$regex': req.body.mobileNumber, $options:'i'}}, (err, customers) => {

    if (err) { return next(err); }

    // console.log(customers);
    res.render('customer/search', {
      title: 'Search Customer',
      customers
    });
  });
};
