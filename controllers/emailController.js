const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendEmail = async (req, res) => {
    const { to, username, text } = req.body;

  console.log('to', req.body);

  const msg = {
    to, // recipient email
    from: 'k.klassic44@gmail.com', // your verified SendGrid email
    templateId: 'd-27990aa7393a42c998f9d658c8f1e556', // your SendGrid template ID
    dynamic_template_data: {
      username,
      text,
    },
  };


  try {
    await sgMail.send(msg);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body)
    }
    res.status(500).json({ error: `error sending email , ${error}` });
  }
};
