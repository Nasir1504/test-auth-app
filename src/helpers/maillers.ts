import User from "@/model/userModel";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {

        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000 //1 hour 
                })

            //we can also wright like:
            //  await User.findByIdAndUpdate(userId,{
            // $set: {
            //     verifyToken: hashedToken,
            //     verifyTokenExpiry: Date.now() + 3600000
            // }})
            // but it already treats it as $set under the hood.

        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 1800000 //30 minutes.
                })

        }


        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "1f726671cecdb4",
                pass: "2aef1ca1996362"
            }
        });

        const linkPath = emailType === "VERIFY" ? "verifyemail" : "resetpassword";

        const mailOption = {
            from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            text: "Hello world?",
            html: `
                    <p>
                        Click <a href="${process.env.DOMAIN}/${linkPath}?token=${hashedToken}">
                        here
                        </a> 
                        to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
                        or copy and paste the link below in your browser
                        <br />
                        ${process.env.DOMAIN}/${linkPath}?token=${hashedToken}
                    </p>
                `
        }

        const mailResponse = await transport.sendMail(mailOption)
        return mailResponse;


    } catch (e: any) {
        throw new Error(e.message)
        console.log("Error", e)
    }
}



// 3600000 = 3,600,000 ms
// 1 second = 1000 ms
// 1 minute = 60 × 1000 = 60,000 ms
// 1 hour = 60 × 60 × 1000 = 3,600,000 ms ✅