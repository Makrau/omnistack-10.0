import parseArrayAsString from '../utils/parseStringAsArray.js';

export const getDevFromRequestBody = (bodyRequest) => {
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
    github_username: githubUsername, techs: techsArray, location,
  };
};

export const getDevFromGithubApi = (apiResponseData) => {
  const {
    login,
    name = login,
    avatar_url: avatarUrl,
    bio,
  } = apiResponseData;

  return {
    name,
    avatar_url: avatarUrl,
    bio,
  };
};

export default { getDevFromRequestBody, getDevFromGithubApi };
