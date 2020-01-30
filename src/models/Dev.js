/* eslint-disable camelcase */

import mongoose from 'mongoose';
import PointSchema from './utils/PointSchema.js';

const DevSchema = new mongoose.Schema({
  name: String,
  github_username: String,
  bio: String,
  avatar_url: String,
  techs: [String],
  location: {
    type: PointSchema,
    index: '2dsphere',
  },
});


export const devConnection = mongoose.model('Dev', DevSchema);

const convertToDatabaseObject = (dev) => {
  const {
    githubUsername: github_username,
    avatarUrl: avatar_url,
    ...otherProperties
  } = dev;

  return { github_username, avatar_url, ...otherProperties };
};

const create = (dev) => {
  const convertedDev = convertToDatabaseObject(dev);
  return devConnection.create(convertedDev);
};

export const Dev = {
  create,
};

export default { Dev, devConnection };
