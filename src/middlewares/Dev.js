/* eslint-disable camelcase */
import { devConnection } from '../models/Dev.js';

export const checkDevExists = async (request, response, next) => {
  const { github_username } = request.body;
  const dev = await devConnection.findOne({ github_username });

  request.dev = dev;
  request.devExists = !!dev;

  return next();
};

export const checkRequestBody = (request, response, next) => {
  const { github_username } = request.body;

  if (!github_username) {
    return response.status(400).send({ error: 'github_username not found on request body' });
  }

  return next();
};
