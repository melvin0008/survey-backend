import resource from 'resource-router-middleware';
import facets from '../models/facets';
import { createSurveyTask, getRewardedTask } from '../lib/blockchain';

function createSurvey(req, res) {
  //Add survey to mongodb
  createSurveyTask(req.body.surveyId, req.body.totalSurveyers).then(result => {
    sendJsonResult({result: result });
  })
}

function takeSurvey(req, res) {
  //Add response to mongodb
  getRewardedTask(req.body.surveyId, req.body.address).then(result => {
    sendJsonResult({result: result });
  })
}

function sendJsonResult(res, obj) {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(obj));
}

export default { createSurvey, takeSurvey }