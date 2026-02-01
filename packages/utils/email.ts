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
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/resetPassword?token=${token}`;

  await resend.emails.send({
    from: "Monkey Print <onboarding@resend.dev>",
    to: email,
    subject: "Password Reset",
    html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
  });
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


export async function sendForumContactEmail({
  adminEmails,
  name,
  email,
  subject,
  subjectLabel,
  message,
}: {
  adminEmails: string[];
  name: string;
  email: string;
  subject: string;
  subjectLabel: string;
  message: string;
}) {
  try {
    console.log("[EMAIL] Attempting to send contact form email");
    console.log("[EMAIL] API Key exists:", !!process.env.RESEND_API_KEY);
    console.log("[EMAIL] Recipients:", adminEmails);

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f4f8;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 10px 40px rgba(55, 81, 255, 0.15);">
                
                <!-- Header with Logo -->
                <tr>
                  <td style="padding: 0;">
                    <div style="background: linear-gradient(135deg, #1a1f3c 0%, #3751FF 50%, #5F74FF 100%); border-radius: 16px 16px 0 0; padding: 40px 40px 50px 40px; text-align: center; position: relative;">
                      <!-- Decorative circles -->
                      <div style="position: absolute; top: 20px; right: 30px; width: 60px; height: 60px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
                      <div style="position: absolute; bottom: 30px; left: 20px; width: 40px; height: 40px; background: rgba(255,255,255,0.08); border-radius: 50%;"></div>
                      
                      <!-- Logo placeholder -->
                      <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.15); border-radius: 20px; margin: 0 auto 20px auto; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2);">
                        <span style="font-size: 32px; font-weight: 800; color: #ffffff;">F</span>
                      </div>
                      
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                        Forum <span style="color: #3751FF;">ENET'</span><span style="color: #FF6B35;">COM</span>
                      </h1>
                      <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.8); font-size: 14px; letter-spacing: 1px;">
                        NOUVEAU MESSAGE DE CONTACT
                      </p>
                    </div>
                  </td>
                </tr>
                
                <!-- Subject Badge -->
                <tr>
                  <td style="padding: 0 40px;">
                    <div style="margin-top: -25px; text-align: center;">
                      <span style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #3751FF 0%, #5F74FF 100%); color: #ffffff; font-size: 14px; font-weight: 600; border-radius: 30px; box-shadow: 0 4px 15px rgba(55, 81, 255, 0.4);">
                        📋 ${subjectLabel}
                      </span>
                    </div>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px;">
                    
                    <!-- Sender Info Card -->
                    <div style="background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%); padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
                      <div style="display: flex; align-items: center; margin-bottom: 16px;">
                        <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #3751FF 0%, #5F74FF 100%); border-radius: 12px; display: inline-block; text-align: center; line-height: 48px; margin-right: 16px;">
                          <span style="color: #ffffff; font-size: 20px; font-weight: 700;">${name.charAt(0).toUpperCase()}</span>
                        </div>
                        <div style="display: inline-block; vertical-align: middle;">
                          <h3 style="margin: 0; color: #202C4B; font-size: 18px; font-weight: 600;">${name}</h3>
                          <a href="mailto:${email}" style="color: #3751FF; font-size: 14px; text-decoration: none;">${email}</a>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Message Section -->
                    <div style="margin-bottom: 32px;">
                      <h3 style="margin: 0 0 16px 0; color: #202C4B; font-size: 16px; font-weight: 600; display: flex; align-items: center;">
                        <span style="display: inline-block; width: 4px; height: 20px; background: linear-gradient(180deg, #3751FF 0%, #5F74FF 100%); border-radius: 2px; margin-right: 12px;"></span>
                        Message
                      </h3>
                      <div style="background-color: #f8fafc; padding: 24px; border-radius: 12px; border-left: 4px solid #3751FF;">
                        <p style="margin: 0; color: #515B73; font-size: 15px; line-height: 1.8; white-space: pre-wrap;">${message}</p>
                      </div>
                    </div>
                    
                    <!-- Reply Button -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td align="center">
                          <a href="mailto:${email}?subject=Re: ${subjectLabel} - Forum ENET'COM" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #3751FF 0%, #5F74FF 100%); color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 12px; box-shadow: 0 4px 15px rgba(55, 81, 255, 0.4); transition: all 0.3s ease;">
                            ✉️ Répondre à ${name}
                          </a>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Quick Info -->
                    <div style="margin-top: 32px; padding: 20px; background: #fffbeb; border-radius: 12px; border: 1px solid #fde68a;">
                      <p style="margin: 0; color: #92400e; font-size: 13px; text-align: center;">
                        💡 <strong>Conseil:</strong> Répondez dans les 24h pour maintenir une bonne expérience utilisateur.
                      </p>
                    </div>
                    
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 30px 40px; background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%); border-radius: 0 0 16px 16px; border-top: 1px solid #e2e8f0;">
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="text-align: center;">
                          <p style="margin: 0 0 8px 0; color: #64748b; font-size: 13px;">
                            Ce message a été envoyé via le formulaire de contact
                          </p>
                          <p style="margin: 0 0 16px 0; color: #94a3b8; font-size: 12px;">
                            Forum ENET'COM - Connecter les Talents aux Opportunités
                          </p>
                          <div style="border-top: 1px solid #e2e8f0; padding-top: 16px;">
                            <p style="margin: 0; color: #94a3b8; font-size: 11px;">
                              © ${new Date().getFullYear()} Forum ENET'COM. Tous droits réservés.
                            </p>
                          </div>
                        </td>
                      </tr>
                    </table>
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
      from: "Forum ENET'COM <onboarding@resend.dev>",
      to: adminEmails,
      replyTo: email,
      subject: `[Contact] ${subjectLabel} - ${name}`,
      html: htmlContent,
    });

    if (error) {
      console.error("[EMAIL] Resend error:", error);
      throw new Error(error.message);
    }

    console.log("[EMAIL] Contact email sent successfully:", data);
    return { success: true, data };
  } catch (error) {
    console.error("[EMAIL] Failed to send contact email:", error);
    throw error;
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
