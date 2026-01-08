import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            success: false, 
            message: 'Method not allowed' 
        });
    }

    // Get form data
    const { name, email, message } = req.body;

    // Validate input
    const errors = [];

    if (!name || name.trim() === '') {
        errors.push('Name is required');
    }

    if (!email || email.trim() === '') {
        errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Invalid email format');
    }

    if (!message || message.trim() === '') {
        errors.push('Message is required');
    }

    // If there are validation errors, return them
    if (errors.length > 0) {
        return res.status(400).json({ 
            success: false, 
            message: errors.join(', ') 
        });
    }

    // Sanitize input
    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim();
    const sanitizedMessage = message.trim();

    // Your email address (where you want to receive messages)
    const to = 'asedaquarshie@gmail.com';
    const fromEmail = process.env.GMAIL_USER || 'asedaquarshie@gmail.com';
    const fromPassword = process.env.GMAIL_APP_PASSWORD || 'lmyvgstnphjiigeh';

    // Email subject
    const subject = `New Contact Form Message from ${sanitizedName}`;

    // Email body
    const emailBody = `You have received a new message from your portfolio contact form.\n\n` +
        `Name: ${sanitizedName}\n` +
        `Email: ${sanitizedEmail}\n\n` +
        `Message:\n${sanitizedMessage}\n`;

    try {
        // Create transporter using Gmail SMTP
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: fromEmail,
                pass: fromPassword
            }
        });

        // Send email
        const info = await transporter.sendMail({
            from: `"Portfolio Contact Form" <${fromEmail}>`,
            to: to,
            replyTo: sanitizedEmail,
            subject: subject,
            text: emailBody
        });

        return res.status(200).json({
            success: true,
            message: 'Thank you! Your message has been sent successfully.'
        });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({
            success: false,
            message: 'Sorry, there was an error sending your message. Please try again later or contact me directly at asedaquarshie@gmail.com'
        });
    }
}

