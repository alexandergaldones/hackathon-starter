/**
 * GET /mycontroller
 * My Controller Page
 */
 exports.index = (req,res) => {
    res.render('myview', {
        title: 'Customer'
    });
 };

 /**
  * POST /customer
  * Send message to new customer via Nodemailer
  */

 exports.postCustomer = (req,res) => {

    let fromName;
    let fromEmail;

    console.log('postCustomer');

    if(!req.user) {
        req.assert('name', 'Name cannot be blank').notEmpty();
        req.assert('email', 'Email is not valid').isEmail();
        req.assert('mobileNumber', 'Mobile number cannot be empty.').notEmpty();
    }
    const errors = req.validationErrors();

    if(errors) {
        req.flash('errors', errors);
        return res.redirect('/customer');
    }
    return  'ok';
 };