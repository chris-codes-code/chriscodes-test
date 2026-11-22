import nodemailer from 'nodemailer';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { z as zod } from 'zod';

const responseObj = (status) => ({ status });

const contactRequestSchema = zod.object({
	name: zod.string().trim().min(1).max(200),
	email: zod.string().trim().email().max(320),
	message: zod.string().trim().min(1).max(5000),
	// Honeypot — must be empty / absent
	extension: zod.string().trim().max(0).optional(),
});

const rateLimiter = new RateLimiterMemory({
	points: 3,
	duration: 60,
});

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const username = config.emailAccountUsername;
	const password = config.emailAccountPassword;

	if (!username || !password) {
		console.error('[contact] Missing EMAIL_ACCOUNT_USERNAME / EMAIL_ACCOUNT_PASSWORD');
		setResponseStatus(event, 500);
		return responseObj(500);
	}

	try {
		const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown';

		try {
			await rateLimiter.consume(ip);
		} catch {
			setResponseStatus(event, 429);
			return responseObj(429);
		}

		const parsedBody = contactRequestSchema.safeParse(await readBody(event));

		if (!parsedBody.success) {
			setResponseStatus(event, 400);
			return responseObj(400);
		}

		const { name, email, message } = parsedBody.data;

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: username,
				pass: password,
			},
		});

		const sentMessageResponse = await transporter.sendMail({
			from: `"Chris Codes" <${username}>`,
			replyTo: email,
			to: username,
			subject: 'Enquiry from Chris Codes',
			html: `
				<strong>Name:</strong> ${name}
				<br>
				<br>
				<strong>Email:</strong> ${email}
				<br>
				<br>
				<strong>Message:</strong>
				<br>
				<br>
				${message}
			`,
		});

		if (sentMessageResponse.rejected.length) throw new Error('Message not sent');

		return responseObj(200);
	} catch (error) {
		console.error(error);
		setResponseStatus(event, 500);
		return responseObj(500);
	}
});
