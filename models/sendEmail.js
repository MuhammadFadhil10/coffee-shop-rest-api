import nodeMailer from 'nodemailer';

const transport = nodeMailer.createTransport({
	service: 'gmail',
	auth: {
		pass: 'gmjhwoyhlzovlhfb',
		user: 'socialdummy.services@gmail.com',
	},
});
export class Email {
	static send(email, activateAccountToken) {
		return transport.sendMail({
			from: 'socialdummy.services@gmail.com',
			to: email,
			subject: 'Activation',
			html: `<h1>Hi! you have to activate your account</h1>
            <a href="${process.env.ORIGIN}/account/activation/${activateAccountToken}" target="_blank">
            Click here to activate!
            </a>`,
		});
	}

	static updatePasswordLink(email, userId) {
		return transport.sendMail({
			from: 'socialdummy.services@gmail.com',
			to: email,
			subject: 'Reset password',
			html: `<h1>Reset password link</h1>
				<p>click link bellow to visit the reset password page</p>
				<a href="${process.env.ORIGIN}/account/update-password/${userId}">click here</a>
				<p><strong>Note: if this reset password not your request, just leave this email</strong></p>
			`,
		});
	}
}
