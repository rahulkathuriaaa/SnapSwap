data = [{'contract': 'CDS', 'job': 'pairContract_pair_total_reserves:0x0be902716176d66364f1c2ecf25829a6d95c5bee:UNISWAPV2/'}, 
{'contract': 'WBTC', 'job': 'pairContract_pair_total_reserves:0xbb2b8038a1640196fbe3e38816f3e67cba72d940:UNISWAPV2/'},
{'contract': 'RACA', 'job': 'pairContract_pair_total_reserves:0x700fc86c46299cf2a8fd86edadae3f57014351b0:UNISWAPV2/'},
{'contract': 'WETH', 'job': 'pairContract_pair_total_reserves:0xdfcf744c8ae896e8631ba9b9dc717546646f6708:UNISWAPV2/'},
{'contract': 'USDC', 'job': 'pairContract_pair_total_reserves:0x3041cbd36888becc7bbcbc0045e3b1f144466f5f:UNISWAPV2/'}, 
{'contract': 'MONGOOSE', 'job': 'pairContract_pair_total_reserves:0x450e653a0a125a1dc36d3901d3cce2e2287df0c2:UNISWAPV2/'}, 
{'contract': 'FNSP', 'job': 'pairContract_pair_total_reserves:0x2a6c361b43a2edcae08e2bd5448e90e9369cced9:UNISWAPV2/'}, 
{'contract': 'WILD', 'job': 'pairContract_pair_total_reserves:0xcaa004418eb42cdf00cb057b7c9e28f0ffd840a5:UNISWAPV2/'}, 
{'contract': 'imBTC', 'job': 'pairContract_pair_total_reserves:0x4d136871d5617019dfdb339a2cd7cb5a0b75e7f3:UNISWAPV2/'}, 
{'contract': 'SPOOL', 'job': 'pairContract_pair_total_reserves:0xf3b675df63fb4889180d290a338fc15c0766fd64:UNISWAPV2/'}, 
{'contract': 'USDT', 'job': 'pairContract_pair_total_reserves:0xf6c4e4f339912541d3f8ed99dba64a1372af5e5b:UNISWAPV2/'}, 
{'contract': 'stETH', 'job': 'pairContract_pair_total_reserves:0x4028daac072e492d34a3afdbef0ba7e35d8b55c4:UNISWAPV2/'}, 
{'contract': 'LON', 'job': 'pairContract_pair_total_reserves:0x7924a818013f39cf800f5589ff1f1f0def54f31f:UNISWAPV2/'}, 
{'contract': 'PAXG', 'job': 'pairContract_pair_total_reserves:0x6d74443bb2d50785989a7212ebfd3a8dbabd1f60:UNISWAPV2/'},
{'contract': 'ANT', 'job': 'pairContract_pair_total_reserves:0x9def9511fec79f83afcbffe4776b1d817dc775ae:UNISWAPV2/'}]

import requests
import time
import json
import data
import io
from lighthouseweb3 import Lighthouse
from dotenv import load_dotenv
import os
load_dotenv()
lh = Lighthouse(token=os.getenv("LHKey"))
result = json.dumps({})
write_file = open("trial.txt", "w")
write_file.write(result)
write_file.close()
tag = "powerloomData"
upload = lh.upload(source = "trial.txt", tag=tag)
list_uploads = lh.download(upload['data']['Hash'])

print(upload['data']['Hash'])
response = requests.get("https://api.lighthouse.storage/api/ipns/publish_record?cid="+upload['data']['Hash']+"&keyName=ce2cd41551564889a3fab52b125190b3", headers={"Authorization": "Bearer 6b691914.6940cf296607421aa60945184a348ff7"})
