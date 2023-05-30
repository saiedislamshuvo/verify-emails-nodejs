const dns = require('dns');
const net = require('net');
const { promisify } = require('util');
const XLSX = require('xlsx');
const fs = require('fs');

async function verifyEmail(email) {
    // Extract the domain name from the email address
    const [, domain] = email.split('@');

    try {
        // Use DNS to look up the MX records for the domain
        const records = await promisify(dns.resolveMx)(domain);
        const mxRecord = records[0].exchange;

        // Connect to the SMTP server and perform a handshake
        const smtpSocket = net.createConnection({ port: 25, host: mxRecord });
        smtpSocket.on('error', (error) => {
            console.error(error);
            smtpSocket.end();
        });
        const readResponse = async () => {
            console.error('response 250 readResponse');
            return new Promise((resolve) => {
                smtpSocket.once('data', (data) => resolve(data.toString()));
            });
        };

        await readResponse();
        smtpSocket.write(`HELO ${domain}\r\n`);
        await readResponse();
        smtpSocket.write(`MAIL FROM: <test@example.com>\r\n`);
        await readResponse();
        smtpSocket.write(`RCPT TO: <${email}>\r\n`);
        const response = await readResponse();

        // Check if the email address is valid or not
        if (response.includes('250')) {
            console.error('response 250 true');
            return true;
        } else {
            console.error('response 250 false');
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function init() {
    
    fs.readFile('data/data.json', 'utf8', async (err, jsonContent) => {
        if (err) {
            console.error(err);
            return;
        }

        const emails = JSON.parse(jsonContent);
        for (let i = 0; i < emails.length; i++) {
            console.log(emails[i].email)
            const [, domain] = emails[i].email.split('@');

            if (domain != 'gmail.com') {
                console.log('not gmail: ', domain);
                continue;
            }
            const status = await verifyEmail(emails[i].email)

            if (status) {

                fs.readFile('data/valid.json', 'utf8', (err, validJsonContent) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    let dataArray = JSON.parse(validJsonContent);
                    dataArray.push(emails[i].email);
                    const validJsonContentData = JSON.stringify(dataArray);

                    fs.writeFile('data/valid.json', validJsonContentData, 'utf8', (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        console.log('Data has been appended to file');
                    });
                });

            } else {

                fs.readFile('data/invalid.json', 'utf8', (err, invalidJsonContent) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    let dataArray = JSON.parse(invalidJsonContent);
                    dataArray.push(emails[i].email);
                    const invalidJsonContentData = JSON.stringify(dataArray);

                    fs.writeFile('data/invalid.json', invalidJsonContentData, 'utf8', (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        console.log('Data has been appended to file');
                    });
                });

            }
        }
    });

}


init();