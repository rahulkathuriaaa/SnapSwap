const initializeInvestors = async(contract,account, _id, _tokens, _tokenAmt)=>{
    if (!contract) return false;
     const res = await contract.methods
       .initializeInvestors(_id, _tokens, _tokenAmt)
       .send({ from: account });
       return res ;
}

const tokenSwap = async(
  contract,
  account,
  _id,
  _fromTokenId,
  _toTokenId,
  _currPrice,
  _convertedPrice
)=>{
    if (!contract) return false;
    const res= await contract.methods.tokenSwap(_id, _fromTokenId, _toTokenId, _currPrice, _convertedPrice)
    .send({ from: account });
    return res;
}

const initializeMutualFun=async (contract,account, _id,flag,_name,_investment,_tokens,_fromToken)=>{
    if (!contract) return false;
    const res= await contract.methods.initializeMutualFund(_id,flag,_name,_investment,_tokens,_fromToken)
    .send({ from: account });
    return res;
}


export { initializeInvestors, tokenSwap, initializeMutualFun}
