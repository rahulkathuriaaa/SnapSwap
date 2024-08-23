const allSwapsOfUser=async(contract, _id)=>{
    if(!contract) return false;
    const res=await contract.methods.allSwapsOfUser(_id).call();
    return res;
}

const countOfIndivisualToken= async(contract, _id,_token)=>{
    if(!contract) return false;
    const res= await contract.methods.countOfIndivisualToken(_id,_token).call()
    return res
}

const allUserData= async (contract,_id)=>{
    if(!contract) return false;
    const res= await contract.methods.allUserData(_id).call()
    return res
}

const entireMFPortfolio=async(contract,_id,_flag)=>{
    if(!contract) return false;
    const res= await contract.methods.entireMFPortfolio(_id,_flag).call()
    console.log(res);
    return res
}

export {allSwapsOfUser,countOfIndivisualToken,allUserData,entireMFPortfolio}