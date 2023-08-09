import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import Grid from 'gridfs-stream';
import path from 'path';
import multiparty from 'multiparty';
import { MongoClient } from 'mongodb';
import { connectDB } from '@/src/backend/services/Database';
import fs from 'fs-extra';
import { NextApiRequest, NextApiResponse } from 'next';
import { collection, addDoc } from "firebase/firestore";
import {db} from '../../firebase';
import { NewsResource } from '@/src/Resources';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const news: NewsResource = req.body;
      const result = addDoc(collection(db, "news"), news);
      res.status(200).json({myResult: result});
    } else {
      res.status(405).end();
    }
  }