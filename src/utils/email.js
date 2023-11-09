const nodemailer = require('nodemailer');
const catchAsync = require('./catchAsync');
const Mailgen = require('mailgen');

const sendEmail = catchAsync(async (options) => {
	const mailGenerator = new Mailgen({
		theme: 'default',
		product: {
			// Appears in header & footer of e-mails
			name: 'Trendify',
			link: 'trendify.app',
		},
	});

	const emailBody = mailGenerator.generate(options.mailgenContent);
	const emailText = mailGenerator.generatePlaintext(options.mailgenContent);

	const testAccount = await nodemailer.createTestAccount();

	const transporter = nodemailer.createTransport({
		host: testAccount.smtp.host,
		port: testAccount.smtp.port,
		secure: testAccount.smtp.secure,
		auth: {
			user: testAccount.user,
			pass: testAccount.pass,
		},
	});

	const mailOptions = {
		from: process.env.EMAIL_FROM,
		to: options.email,
		subject: options.subject,
		text: emailText,
		html: emailBody,
	};

	const info = await transporter.sendMail(mailOptions);
	console.log('Email sent: ' + info.messageId);
	console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info));
});
const sendVerificationEmail = catchAsync(
	async (firstName, email, verificationUrl) => {
		const mailgenContent = {
			body: {
				name: firstName,
				intro: "Welcome to Trendify! We're very excited to have you on board.",
				action: {
					instructions:
						'To verify your email please click on the following button:',
					button: {
						color: '#22BC66', // Optional action button color
						text: 'Verify your email',
						link: verificationUrl,
					},
				},
				outro:
					"Need help, or have questions? Just reply to this email, we'd love to help.",
			},
		};

		const subject = 'Verify you email';
		await sendEmail({ subject, email, mailgenContent });
	},
);
const sendPasswordResetToken = catchAsync(
	async (firstName, email, passwordResetUrl) => {
		const mailgenContent = {
			body: {
				name: firstName,
				intro: 'We got a request to reset the password of our account',
				action: {
					instructions:
						'To reset your password click on the following button or link:',
					button: {
						color: '#22BC66', // Optional action button color
						text: 'Reset password',
						link: passwordResetUrl,
					},
				},
				outro:
					"Need help, or have questions? Just reply to this email, we'd love to help.",
			},
		};
		const subject = 'Password reset token';
		console.log(subject, email, mailgenContent);
		await sendEmail({ subject, email, mailgenContent });
	},
);

module.exports = {
	sendPasswordResetToken,
	sendVerificationEmail,
};
