import resource from 'resource-router-middleware';
import facets from '../models/facets';
import { reward } from '../lib/blockchain';

function createSurvey(req, res) {
  var postId = req.body.postId;
  var surveyResult = req.body.surveyResult;
  console.log(req.body)
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(surveyResult));
  // db.postResults(postId, surveyResult, function(result) {
  //   sendJsonResult(res, result.json);
  // });
}

function takeSurvey(req, res) {
  
}

function sendJsonResult(res, obj) {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(obj));
}

export default { createSurvey, takeSurvey }