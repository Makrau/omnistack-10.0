import axios from 'axios';
import getDevFromRequestBody from '../templates/getDevFromRequestBody.js';
import getDevFromGithubApi from '../templates/getDevFromGithubApi.js';
import Dev from '../models/Dev.js';

export const index = async (request, response) => {
  try {
    const devs = await Dev.find();
    return response.json(devs);
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
};

export const create = async (request, response) => {
  try {
    const devFromRequestBody = getDevFromRequestBody(request.body);
    const existingDev = !!await Dev.findOne({
      github_username: devFromRequestBody.githubUsername,
    });

    if (existingDev) {
      return response.status(400).send({ message: 'Dev já existente' });
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
    console.log(error);
    return response.status(400).send({ message: error.message });
  }
};

export default { create, index };
