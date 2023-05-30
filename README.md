# Verify Emails

This is a Node.js script that verifies the validity of email addresses by performing an SMTP handshake with the respective mail servers. The script reads a list of email addresses from a JSON file, verifies each email address, and saves the valid and invalid addresses in separate JSON files.

## Installation

1. Clone the repository or download the script files.
2. Navigate to the project directory in your terminal.
3. Run the following command to install the required dependencies:

Run the following command to install the required dependencies:

```
yarn
```

## Usage

### Step 1: Prepare the Email List

1. Create a JSON file named `data.json` in the `data` folder.
2. Add the email addresses to the `data.json` file in the following format:

```json
[
  {
    "email": "example1@example.com"
  },
  {
    "email": "example2@example.com"
  },
  ...
]
```
Add as many email objects as needed, with each object containing an email property.

### Step 2: Verify Email Addresses
1. Open the app.js file.
2. Review the verifyEmail function. This function extracts the domain from each email address, performs an MX record lookup, and establishes an SMTP connection to verify the email address.
3. Save the file.
4. Run the following command to start the email verification process:
```
npm run verify
```
The script will read the email addresses from the data/data.json file and verify each email address. The valid email addresses will be appended to the data/valid.json file, and the invalid email addresses will be appended to the data/invalid.json file.

## License

This script is licensed under the MIT License. Refer to the [LICENSE](LICENSE) file for more information.

