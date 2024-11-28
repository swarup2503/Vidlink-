"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_APIKEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  const user = await currentUser(); // calls the currentUser

  if (!user) throw new Error("User is not authenticated");
  if (!apiKey) throw new Error("Stream API key secret is missing");
  if (!apiSecret) throw new Error("Stream API secret is missing");

  const client = new StreamClient(apiKey, apiSecret); // creates a server-side client to generate a token to authenticate audio-video service

  const expirationTime = Math.floor(Date.now() / 1000) + 3600; // expiration time for token
  const issuedAt = Math.floor(Date.now() / 1000) - 60; // time of issue for token

  const token = client.createToken(user.id, expirationTime, issuedAt); // generates the token

  return token;
};
