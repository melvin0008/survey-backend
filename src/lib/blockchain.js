import Neon, { neon, rpc, u } from '@cityofzion/neon-js'
import axios from 'axios';
import config from '../config.json';
import base58 from 'bs58'

export function getTokenBalance(address) {
  let hashString = u.ab2hexstring(base58.decode(address))
  return invokeContract('balanceOf',[hashString.slice(2, 42)]).then(res => {
    if (res.result.state === 'HALT, BREAK') {
      return u.fixed82num(res.result.stack[0].value)
    }
  })
}

export function createSurveyTask(surveyId, totalSurveyers) {
  return invokeContract('create_survey',[u.ab2hexstring(surveyId), totalSurveyers]).then(res => {
    if (res.result.state === 'HALT, BREAK') {
      console.log("Created Survey Successfully")
      return true;
    }
  })
}

export function getRewardedTask(surveyId, address) {
  let hashString = u.ab2hexstring(base58.decode(address))
  return invokeContract('reward',[u.ab2hexstring(surveyId), hashString]).then(res => {
    if (res.result.state === 'HALT, BREAK') {
      console.log("Address has been rewarded")
      return true;
    }
  })
}

const invokeContract = (operation, args) => {
  const props = {
    scriptHash: config.scriptHash,
    operation: operation,
    args: args
  }
  const vmScript = Neon.create.script(props)

  return getRPCEndpoint().then( rpcEndpoint => {
    return rpc.Query.invokeScript(vmScript)
                  .execute(rpcEndpoint)
                  .then(res => res)
  })
}

const getRPCEndpoint =  () => axios.get(config.RESTEndpoint + '/v2/network/best_node').then(response => response.data.node)
