import nodemailer from 'nodemailer';

// Create transporter for sending emails
const createTransporter = () => {
    // Check if email configuration is available
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
        console.warn('⚠️  Email configuration not found. Email service will not work.');
        console.warn('Please set EMAIL_HOST, EMAIL_USER, and EMAIL_PASSWORD in your .env file');
        return null;
    }

    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT) || 587,
        secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
        // For Gmail, you might need to enable "Less secure app access" or use App Password
        tls: {
            rejectUnauthorized: false // For development only, remove in production
        }
    });
};

// Professional email template for password reset
const getPasswordResetEmailTemplate = (resetLink, userName = 'User') => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%); border-radius: 10px 10px 0 0;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">🔐 Password Reset Request</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                                Hello <strong>${userName}</strong>,
                            </p>
                            
                            <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                                We received a request to reset your password for your E-Library account. If you made this request, click the button below to reset your password:
                            </p>
                            
                            <!-- Reset Button -->
                            <table role="presentation" style="width: 100%; margin: 30px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="${resetLink}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(236, 72, 153, 0.3);">
                                            Reset Password
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 20px 0; color: #666666; font-size: 14px; line-height: 1.6;">
                                Or copy and paste this link into your browser:
                            </p>
                            
                            <p style="margin: 0 0 30px; padding: 15px; background-color: #f8f9fa; border-radius: 6px; word-break: break-all; color: #495057; font-size: 13px; font-family: 'Courier New', monospace;">
                                ${resetLink}
                            </p>
                            
                            <div style="padding: 20px; background-color: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px; margin: 20px 0;">
                                <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.6;">
                                    <strong>⚠️ Important:</strong> This link will expire in <strong>15 minutes</strong> for security reasons. If you didn't request a password reset, please ignore this email and your password will remain unchanged.
                                </p>
                            </div>
                            
                            <p style="margin: 30px 0 0; color: #666666; font-size: 14px; line-height: 1.6;">
                                If you're having trouble clicking the button, copy and paste the URL above into your web browser.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px 40px; background-color: #f8f9fa; border-radius: 0 0 10px 10px; text-align: center;">
                            <p style="margin: 0 0 10px; color: #6c757d; font-size: 12px;">
                                This is an automated email. Please do not reply to this message.
                            </p>
                            <p style="margin: 0; color: #6c757d; font-size: 12px;">
                                © ${new Date().getFullYear()} E-Library. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `;
};

// Send password reset email
export const sendPasswordResetEmail = async (email, resetToken, userName = null, frontendUrl = null) => {
    try {
        const transporter = createTransporter();
        
        // Determine frontend URL - priority: parameter > env variable > default
        let frontendBaseUrl = frontendUrl || process.env.FRONTEND_URI;
        
        // If still not set, use intelligent defaults based on environment
        if (!frontendBaseUrl) {
            if (process.env.NODE_ENV === 'production') {
                // In production, try to log helpful error but don't fail completely
                console.error('⚠️  WARNING: FRONTEND_URI not set in production environment!');
                console.error('📝 Please set FRONTEND_URI environment variable in your Vercel/deployment settings.');
                console.error('   Example: FRONTEND_URI=https://your-frontend-app.vercel.app');
                // Don't return error here - let the controller handle it with the frontendUrl parameter
                // The controller should have detected it from request headers
                return { 
                    success: false, 
                    error: 'FRONTEND_URI_MISSING',
                    message: 'FRONTEND_URI environment variable is recommended in production. Frontend URL should be detected from request headers.' 
                };
            } else {
                frontendBaseUrl = 'http://localhost:5173';
            }
        }
        
        // Ensure URL doesn't end with slash
        frontendBaseUrl = frontendBaseUrl.replace(/\/$/, '');
        const resetLink = `${frontendBaseUrl}/reset-password/${resetToken}`;
        
        if (!transporter) {
            // If email service is not configured, log the link for development
            console.log('\n========================================');
            console.log('📧 EMAIL SERVICE NOT CONFIGURED');
            console.log('========================================');
            console.log('Email would be sent to:', email);
            console.log('Reset Link:', resetLink);
            console.log('========================================\n');
            return { success: false, error: 'Email service not configured' };
        }
        
        const mailOptions = {
            from: `"E-Library" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: '🔐 Password Reset Request - E-Library',
            html: getPasswordResetEmailTemplate(resetLink, userName),
            // Plain text version for email clients that don't support HTML
            text: `
Password Reset Request

Hello ${userName || 'User'},

We received a request to reset your password for your E-Library account.

Click the link below to reset your password:
${resetLink}

This link will expire in 15 minutes.

If you didn't request a password reset, please ignore this email.

© ${new Date().getFullYear()} E-Library. All rights reserved.
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Password reset email sent successfully to:', email);
        console.log('Message ID:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Error sending password reset email:', error);
        return { success: false, error: error.message };
    }
};

// Verify email configuration
export const verifyEmailConfig = async () => {
    try {
        const transporter = createTransporter();
        if (!transporter) {
            return { success: false, message: 'Email service not configured' };
        }
        await transporter.verify();
        console.log('✅ Email service is ready to send emails');
        return { success: true, message: 'Email service is ready' };
    } catch (error) {
        console.error('❌ Email service verification failed:', error);
        return { success: false, message: error.message };
    }
};
