import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export interface OrderForEmail {
  id: string;
  status: string;
  totalPrice: number;
  createdAt: Date | string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  contactInfo?: {
    name?: string;
    phone?: string;
    email?: string;
  };
}

export async function sendPasswordResetEmail(email: string, token: string) {
  try {
    // Debug logging
    console.log("[EMAIL] Attempting to send password reset email");
    console.log("[EMAIL] API Key exists:", !!process.env.RESEND_API_KEY);
    console.log("[EMAIL] APP URL:", process.env.NEXT_PUBLIC_APP_URL);
    console.log("[EMAIL] Recipient:", email);

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/resetPassword?token=${token}`;

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                  <td style="padding: 40px 40px 20px 40px; text-align: center; background-color: #1a365d; border-radius: 8px 8px 0 0;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">FEEE 11.0</h1>
                    <p style="margin: 8px 0 0 0; color: #e2e8f0; font-size: 14px; letter-spacing: 1px;">ENETCOM - Forum Entreprise Étudiant</p>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px;">
                    <h2 style="margin: 0 0 20px 0; color: #1a365d; font-size: 22px; font-weight: 600;">Password Reset Request</h2>
                    
                    <p style="margin: 0 0 16px 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                      Hello,
                    </p>
                    
                    <p style="margin: 0 0 16px 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                      We received a request to reset the password associated with your FEEE 11.0 account. If you made this request, please click the button below to proceed with resetting your password.
                    </p>
                    
                    <!-- CTA Button -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0;">
                      <tr>
                        <td align="center">
                          <a href="${resetUrl}" style="display: inline-block; padding: 14px 32px; background-color: #2b6cb0; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 6px;">
                            Reset Your Password
                          </a>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="margin: 0 0 16px 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                      This link will expire in <strong>1 hour</strong> for security reasons.
                    </p>
                    
                    <p style="margin: 0 0 16px 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                      If you didn't request a password reset, please ignore this email or contact our support team if you have concerns about your account security.
                    </p>
                    
                    <!-- Alternative Link -->
                    <div style="margin-top: 30px; padding: 20px; background-color: #f7fafc; border-radius: 6px;">
                      <p style="margin: 0 0 10px 0; color: #718096; font-size: 14px;">
                        If the button above doesn't work, copy and paste this link into your browser:
                      </p>
                      <p style="margin: 0; color: #2b6cb0; font-size: 14px; word-break: break-all;">
                        ${resetUrl}
                      </p>
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 30px 40px; background-color: #f7fafc; border-radius: 0 0 8px 8px; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0 0 8px 0; color: #718096; font-size: 14px; text-align: center;">
                      This is an automated message from FEEE 11.0 - ENETCOM
                    </p>
                    <p style="margin: 0 0 8px 0; color: #718096; font-size: 14px; text-align: center;">
                      Forum Entreprise Étudiant ENETCOM
                    </p>
                    <p style="margin: 0; color: #a0aec0; font-size: 12px; text-align: center;">
                      © ${new Date().getFullYear()} FEEE - ENETCOM. All rights reserved.
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

    const { data, error } = await resend.emails.send({
      from: "FEEE 11.0 - ENETCOM <onboarding@resend.dev>",
      to: email,
      subject: "Password Reset Request - FEEE 11.0",
      html: htmlContent,
    });

    if (error) {
      console.error("[EMAIL] Resend error:", error);
      throw new Error(error.message);
    }

    console.log("[EMAIL] Email sent successfully:", data);
    return { success: true, data };
  } catch (error) {
    console.error("[EMAIL] Failed to send password reset email:", error);
    throw error;
  }
}

export async function sendOrderIssueEmail(
  order: OrderForEmail,
  issueType: string,
  description?: string,
  imageUrl?: string,
  email?: string
) {
  try {
    if (!email || email.trim() === "") {
      console.error("[EMAIL] No recipient email provided");
      return { success: false, error: "No recipient email provided" };
    }
    let supportEmail = email;
    console.log("[SERVER] Sending order issue email to:", supportEmail);
    // Format the order items for the email
    const itemsList = order.items
      .map(
        (item) => `${item.quantity}x ${item.name} (${item.price.toFixed(2)} DT)`
      )
      .join("<br>");

    // Generate email content based on issue type
    let emailSubject = `Order Issue: ${issueType} - Order #${order.id.slice(0, 8)}`;
    let emailContent = `
      <h2>Order Issue Reported</h2>
      <p><strong>Issue Type:</strong> ${issueType}</p>
      <p><strong>Order ID:</strong> ${order.id}</p>
      <p><strong>Customer:</strong> ${order.contactInfo?.name || "Unknown"}</p>
      <p><strong>Phone:</strong> ${order.contactInfo?.phone || "Unknown"}</p>
      <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
      
      <h3>Order Details:</h3>
      <p><strong>Items:</strong><br>${itemsList}</p>
      <p><strong>Total:</strong> ${order.totalPrice.toFixed(2)} DT</p>
      <p><strong>Status:</strong> ${order.status}</p>
    `;

    // Add description if available
    if (description) {
      emailContent += `<h3>Customer Description:</h3>
      <p>${description}</p>`;
    }

    // Add image if available
    if (imageUrl) {
      emailContent += `<h3>Image Uploaded:</h3>
      <p><img src="${imageUrl}" alt="Damaged product" style="max-width: 100%; max-height: 400px;"></p>`;
    }

    // Send the email
    await resend.emails.send({
      from: "Monkey Print <onboarding@resend.dev>",
      to: supportEmail,
      subject: emailSubject,
      html: emailContent,
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending order issue email:", error);
    return { success: false, error: "Failed to send email notification" };
  }
}

export async function sendContactFormEmail({
  recipient,
  name,
  email,
  subject,
  message,
  imageUrl,
  storeName,
  storeId,
}: {
  recipient: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  imageUrl?: string;
  storeName?: string;
  storeId?: string;
}) {
  try {
    if (!recipient || !name || !email || !subject || !message) {
      console.error("[EMAIL] Missing required contact form fields");
      return { success: false, error: "Missing required fields" };
    }

    console.log("[SERVER] Sending contact form email to:", recipient);

    // Create HTML content for the email
    let htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #004CFF; margin-bottom: 20px;">New Contact Form Message</h2>
        <p style="margin-bottom: 5px;"><strong>From:</strong> ${name} (${email})</p>
        <p style="margin-bottom: 20px;"><strong>Subject:</strong> ${subject}</p>
        
        <div style="background-color: #f5f7ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #333; margin-top: 0;">Message:</h3>
          <p style="white-space: pre-line;">${message}</p>
        </div>
    `;

    // Add image if provided
    if (imageUrl) {
      htmlContent += `
        <div style="margin-bottom: 20px;">
          <h3 style="color: #333;">Attached Image:</h3>
          <img src="${imageUrl}" alt="Attached by sender" style="max-width: 100%; max-height: 400px; border-radius: 4px;">
        </div>
      `;
    }

    // Add footer
    htmlContent += `
        <div style="border-top: 1px solid #eee; padding-top: 15px; margin-top: 20px; font-size: 12px; color: #777;">
          <p>This message was sent through the contact form on your ${storeName || "Monkey Print"} store.</p>
          ${storeId ? `<p>Store ID: ${storeId}</p>` : ""}
          <p>You can reply directly to this email to respond to the customer.</p>
        </div>
      </div>
    `;

    // Send the email
    const emailResult = await resend.emails.send({
      from: "Monkey Print <onboarding@resend.dev>",
      to: recipient,
      subject: `[Contact Form] ${subject}`,
      html: htmlContent,
    });

    if (!emailResult) {
      throw new Error("Failed to send email");
    }

    return { success: true, id: emailResult };
  } catch (error) {
    console.error("Error sending contact form email:", error);
    return { success: false, error: "Failed to send email" };
  }
}
