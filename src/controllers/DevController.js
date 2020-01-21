import axios from 'axios';
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
    const {
      github_username: githubUsername,
      techs,
      latitude,
      longitude,
    } = request.body;
    const apiResponse = await axios.get(`https://api.github.com/users/${githubUsername}`);

    const dev = await Dev.findOne({ github_username: githubUsername });

    if (dev) {
      return response.status(400).send({ message: 'Dev já existente' });
    }

    const {
      login,
      name = login,
      avatar_url: avatarUrl,
      bio,
    } = apiResponse.data;

    const techsArray = techs.split(',').map((tech) => tech.trim());
    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    const createdDev = await Dev.create({
      github_username: githubUsername,
      name,
      avatar_url: avatarUrl,
      bio,
      techs: techsArray,
      location,
    });
    return response.json(createdDev);
  } catch (error) {
    console.log(error);
    return response.status(400).send({ message: error.message });
  }
};

export default { create, index };
