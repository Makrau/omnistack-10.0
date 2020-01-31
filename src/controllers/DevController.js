import axios from 'axios';
import { getDevFromGithubApi, getDevFromRequestBody } from '../templates/Dev.js';
import { Dev, devConnection } from '../models/Dev.js';

export const index = async (request, response) => {
  try {
    const devs = await devConnection.find();
    return response.json(devs);
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
};

export const create = async (request, response) => {
  try {
    const devFromRequestBody = getDevFromRequestBody(request.body);

    if (request.devExists) {
      return response.status(400).send({ message: 'Dev already exists' });
    }

    const apiResponse = await axios
      .get(`https://api.github.com/users/${devFromRequestBody.githubUsername}`);

    const devFromGithubApi = getDevFromGithubApi(apiResponse.data);

    const createdDev = await Dev.create({
      ...devFromRequestBody,
      ...devFromGithubApi,
    });
    return response.json(createdDev);
  } catch (error) {
    return response.status(400).send({ message: error.message });
  }
};

export default { create, index };
