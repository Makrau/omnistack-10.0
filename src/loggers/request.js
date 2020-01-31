/* eslint-disable no-console */
const requestLogger = (request, response, next) => {
  console.log('');
  console.time('request');

  console.log(`HTTP Method: ${request.method};`);
  console.log(`URL: ${request.url}`);
  console.log('Body: ', request.body);

  next();
  console.timeEnd('request');
  console.log('');
};

export default requestLogger;
