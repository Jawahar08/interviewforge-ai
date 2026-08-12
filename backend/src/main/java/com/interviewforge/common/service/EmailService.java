package com.interviewforge.common.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class EmailService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${spring.mail.username:}")
    private String fromEmail;

    public void sendOtpEmail(String toEmail, String otp) {
        log.info("=================================================");
        log.info("🔐 [InterviewForge AI] PASSWORD RESET OTP GENERATED");
        log.info("Recipient Email : {}", toEmail);
        log.info("6-Digit OTP Code: {}", otp);
        log.info("Valid Duration  : 10 minutes");
        log.info("=================================================");

        if (mailSender == null || fromEmail == null || fromEmail.isBlank()) {
            log.warn("JavaMailSender is not fully configured (spring.mail.username is empty). " +
                     "OTP was logged to console. To send real emails, set SPRING_MAIL_USERNAME and SPRING_MAIL_PASSWORD.");
            return;
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail, "InterviewForge AI");
            helper.setTo(toEmail);
            helper.setSubject("Your InterviewForge AI Password Reset Code: " + otp);

            String htmlBody = buildOtpHtmlEmail(otp);
            helper.setText(htmlBody, true);

            mailSender.send(message);
            log.info("✅ Password reset OTP email sent successfully to {}", toEmail);
        } catch (Exception ex) {
            log.error("❌ Failed to dispatch OTP email via SMTP to {}: {}", toEmail, ex.getMessage());
        }
    }

    private String buildOtpHtmlEmail(String otp) {
        return "<!DOCTYPE html>"
                + "<html>"
                + "<head>"
                + "<meta charset='UTF-8'>"
                + "<meta name='viewport' content='width=device-width, initial-scale=1.0'>"
                + "<style>"
                + "body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #050816; color: #f8fafc; margin: 0; padding: 24px; }"
                + ".container { max-width: 540px; margin: 0 auto; background: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 36px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }"
                + ".logo { display: inline-block; font-size: 20px; font-weight: bold; color: #ffffff; text-decoration: none; margin-bottom: 24px; }"
                + ".badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; background: rgba(124,58,237,0.15); border: 1px solid rgba(124,58,237,0.3); color: #c4b5fd; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; }"
                + "h1 { font-size: 22px; font-weight: 700; margin: 0 0 12px 0; color: #ffffff; }"
                + "p { font-size: 14px; line-height: 1.6; color: #94a3b8; margin: 0 0 24px 0; }"
                + ".otp-box { background: rgba(124, 58, 237, 0.1); border: 1px solid rgba(124, 58, 237, 0.3); border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0; }"
                + ".otp-code { font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #a78bfa; font-family: monospace; }"
                + ".footer { font-size: 12px; color: #64748b; margin-top: 32px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px; }"
                + "</style>"
                + "</head>"
                + "<body>"
                + "<div class='container'>"
                + "<div class='badge'>Security Verification</div>"
                + "<h1>Password Reset Verification</h1>"
                + "<p>We received a request to reset your password for your <strong>InterviewForge AI</strong> account. Use the one-time verification code below to proceed:</p>"
                + "<div class='otp-box'>"
                + "<div class='otp-code'>" + otp + "</div>"
                + "</div>"
                + "<p>This code is valid for <strong>10 minutes</strong>. If you did not request a password reset, please ignore this email or reach out to support if you have concerns.</p>"
                + "<div class='footer'>"
                + "© " + java.time.Year.now().getValue() + " InterviewForge AI. All rights reserved."
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";
    }
}
