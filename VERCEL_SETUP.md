# Vercel Deployment Setup Guide

## Issue Fixed
The contact form was not working on Vercel because PHP files cannot run on Vercel's serverless platform. The backend has been converted to a Node.js serverless function.

## Environment Variables Setup

To configure the email sending functionality, you need to set up environment variables in your Vercel project:

1. **Go to your Vercel Dashboard**
   - Navigate to your project settings
   - Go to the "Environment Variables" section

2. **Add the following environment variables:**
   ```
   GMAIL_USER=asedaquarshie@gmail.com
   GMAIL_APP_PASSWORD=lmyvgstnphjiigeh
   ```

3. **To get a Gmail App Password (if needed):**
   - Go to https://myaccount.google.com/apppasswords
   - Make sure 2-Step Verification is enabled on your Google Account
   - Generate a new app password for "Mail"
   - Use the 16-character password (without spaces)

4. **Redeploy your application**
   - After adding the environment variables, trigger a new deployment
   - The environment variables will be available to your serverless function

## Files Changed

1. **Created `/api/send-email.js`** - Node.js serverless function to handle email sending
2. **Created `package.json`** - Node.js dependencies (nodemailer)
3. **Updated `script.js`** - Changed API endpoint from `send_email.php` to `/api/send-email`
4. **Old PHP file** - `send_email.php` can be kept for local development but won't work on Vercel

## Testing Locally

If you want to test locally with Vercel:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file (not committed to git):
   ```
   GMAIL_USER=asedaquarshie@gmail.com
   GMAIL_APP_PASSWORD=your-app-password
   ```

3. Run Vercel dev server:
   ```bash
   npm run dev
   ```

## Important Notes

- The serverless function is located at `/api/send-email.js`
- It will be automatically deployed as a serverless function on Vercel
- The API endpoint will be available at `https://your-domain.vercel.app/api/send-email`
- Make sure to set the environment variables in Vercel dashboard before deploying

