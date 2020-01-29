import parseArrayAsString from '../utils/parseStringAsArray.js';

const getDevFromBodyRequest = (bodyRequest) => {
  const {
    github_username: githubUsername,
    techs,
    latitude,
    longitude,
  } = bodyRequest;
  const techsArray = parseArrayAsString(techs);
  const location = {
    type: 'Point',
    coordinates: [longitude, latitude],
  };

  return {
    githubUsername, techs: techsArray, location,
  };
};

export default getDevFromBodyRequest;
