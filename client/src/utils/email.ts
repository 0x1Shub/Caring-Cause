// import nodemailer from 'nodemailer';

// export const sendEmailToAdmin = async (shippingInfo: any) => {
//     const transporter = nodemailer.createTransport({
//         host: 'smtp.example.com', t
//         port: 587
//         secure: false, // Use SSL/TLS
//         auth: {
//             user: 'your-email@example.com', 
//             pass: 'your-password',
//         },
//     });

//     // Email message options
//     const mailOptions = {
//         from: 'your-email@example.com', // Sender email address
//         to: 'admin@example.com', // Admin email address
//         subject: 'New Fund Request', // Email subject
//         html: `
//             <h1>New Fund Request</h1>
//             <p>Name: ${shippingInfo.name}</p>
//             <p>Phone: ${shippingInfo.phone}</p>
//             <p>Pan Card Number: ${shippingInfo.panCardNumber}</p>
//             <p>Account Number: ${shippingInfo.accountNumber}</p>
//             <p>Address: ${shippingInfo.address}</p>
//             <p>City: ${shippingInfo.city}</p>
//             <p>State: ${shippingInfo.state}</p>
//             <p>Country: ${shippingInfo.country}</p>
//             <p>Pin Code: ${shippingInfo.pinCode}</p>
//         `,
//     };

//     try {
//         // Send mail with defined transport object
//         await transporter.sendMail(mailOptions);
//         console.log('Email sent to admin successfully!');
//     } catch (error) {
//         console.error('Error sending email:', error);
//         throw new Error('Failed to send email to admin');
//     }
// };
