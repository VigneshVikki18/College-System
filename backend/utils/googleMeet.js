import fs from 'fs/promises';
import path from 'path';
import process from 'process';
import { authenticate } from '@google-cloud/local-auth';
import { SpacesServiceClient } from '@google-apps/meet';
import { auth } from 'google-auth-library';
import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();


const SCOPES = ['https://www.googleapis.com/auth/meetings.space.created'];
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

async function saveCredentials(client) {
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) return client;
  client = await authenticate({
    scopes: SCOPES,
    credentials: {
      installed: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uris: [process.env.GOOGLE_REDIRECT_URI],
        project_id: process.env.GOOGLE_PROJECT_ID,
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      },
    },
  });
  if (client.credentials) await saveCredentials(client);
  return client;
}


export async function createGoogleMeetLink() {
  const authClient = await authorize();
  const calendar = google.calendar({ version: 'v3', auth: authClient });

  const event = {
    summary: 'Virtual Interview',
    description: 'Scheduled virtual interview via Google Meet',
    start: {
      dateTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour from now
      timeZone: 'Asia/Kolkata',
    },
    end: {
      dateTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
      timeZone: 'Asia/Kolkata',
    },
    conferenceData: {
      createRequest: {
        requestId: String(Date.now()),
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    },
    attendees: [], // optionally include participants
  };

  const response = await calendar.events.insert({
    calendarId: 'primary',
    resource: event,
    conferenceDataVersion: 1,
  });

  return response.data.hangoutLink;
}

