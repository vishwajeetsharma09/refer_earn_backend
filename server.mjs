
import express from 'express';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import { sendReferralEmail } from './nodemailer.mjs';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

// Endpoint to fetch all referrals
app.get('/api/referrals', async (req, res) => {
  try {
    const referrals = await prisma.referral.findMany();
    res.json(referrals);
  } catch (error) {
    console.error('Error fetching referrals:', error);
    res.status(500).send('Server error');
  }
});

// Endpoint to fetch referrals by referee email
app.get('/api/referrals/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const referrals = await prisma.referral.findMany({
      where: {
        refereeEmail: email,
      },
    });
    res.json(referrals);
  } catch (error) {
    console.error(`Error fetching referrals for ${email}:`, error);
    res.status(500).send('Server error');
  }
});

// Endpoint to handle referral submissions
app.post('/api/referrals', async (req, res) => {
  const { referrerName, referrerEmail, refereeName, refereeEmail, message } = req.body;

  if (!referrerName || !referrerEmail || !refereeName || !refereeEmail) {
    return res.status(400).send('All fields are required');
  }

  try {
    const referral = await prisma.referral.create({
      data: {
        referrerName,
        referrerEmail,
        refereeName,
        refereeEmail,
        message,
      },
    });

    await sendReferralEmail(referrerEmail, refereeEmail, message);

    res.status(201).json(referral);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
