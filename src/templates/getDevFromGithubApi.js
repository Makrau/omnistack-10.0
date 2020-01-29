const getDevFromGithubApi = (apiResponseData) => {
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

export default getDevFromGithubApi;
