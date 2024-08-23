# arr = []

# for i in range(50):
#     arr.append(project_ids[random.randint(0,150)])


# for val in arr:
#     # temp = val[0:len-2]
#     # print(val)
#     # break
#     url = f'https://uniswapv2-api.powerloom.io/data/2660/{val}/'
#     response = requests.get(url)
#     # Print the response
#     response_json = response.json()
#     # res = json.loads(response_json)

#     x = {"contract": response_json["contract"],
#          "job": url}
#     dict.append(x)
#     # print(x)
#     # time.sleep(1)
# print(dict)
import requests
import time
import json
# import data
import io
from lighthouseweb3 import Lighthouse
from dotenv import load_dotenv
import os
import math
dict = {}

def day0():
    global dict
    job = "aggregate_24h_top_tokens_lite:9fb408548a732c85604dacb9c956ffc2538a3b895250741593da630d994b1f27:UNISWAPV2/"
    EpocUrl = 'https://uniswapv2-api.powerloom.io/current_epoch' 
    Epoc = int(json.loads(requests.get(EpocUrl).text)["epochId"])
    for epoc in range(1, Epoc - 100, 100):
      try:
        openUrl = f'https://uniswapv2-api.powerloom.io/data/{epoc}/{job}' 
        response = json.loads(requests.get(openUrl).text)["tokens"]
        for Response in response:
          coinName = Response["symbol"]
          coinPrice = Response["price"]
          priceChange24h = Response["priceChange24h"]
          volume24h = Response["volume24h"]
          liquidity = Response["liquidity"]
          try:
            dict[coinName].append({
              "price": coinPrice,
              "priceChange24h":priceChange24h,
              "volume24h": volume24h,
              "liquidity": liquidity,
              "epoch": epoc
            })
          except:
            dict[coinName] = [{
              "price": coinPrice,
              "priceChange24h":priceChange24h,
              "volume24h": volume24h,
              "liquidity": liquidity,
              "epoch": epoc
            }]
      except:
        print(epoc)
    print(dict)
    return dict
        
def daily():
    global dict
    job = "aggregate_24h_top_tokens_lite:9fb408548a732c85604dacb9c956ffc2538a3b895250741593da630d994b1f27:UNISWAPV2/"
    EpocUrl = 'https://uniswapv2-api.powerloom.io/current_epoch' 
    Epoc = int(json.loads(requests.get(EpocUrl).text)["epochId"]) - 1
    openUrl = f'https://uniswapv2-api.powerloom.io/data/{Epoc}/{job}' 
    response = json.loads(requests.get(openUrl).text)["tokens"]
    print(response)
    for Response in response:
      coinName = Response["symbol"]
      coinPrice = Response["price"]
      priceChange24h = Response["priceChange24h"]
      volume24h = Response["volume24h"]
      liquidity = Response["liquidity"]
      try:
        dict[coinName].append({
          "price": coinPrice,
          "priceChange24h":priceChange24h,
          "volume24h": volume24h,
          "liquidity": liquidity,
          "epoch": Epoc
        })
      except:
        dict[coinName] = [{
          "price": coinPrice,
          "priceChange24h":priceChange24h,
          "volume24h": volume24h,
          "liquidity": liquidity,
          "epoch": Epoc
        }]
    print(dict)
    return dict

load_dotenv()
url = requests.get("https://gateway.lighthouse.storage/ipns/k51qzi5uqu5dm1uuht9e59h4qrvqs9pjx8a3cf1sz7x7j0vyyolywu8v3abls8").text

if(url != "{}"):
  response = requests.get(f"https://gateway.lighthouse.storage/ipfs/{url}")
  dict = json.loads(response.text)
dailyData = daily()
lh = Lighthouse(token=os.getenv("LHKey"))
result = json.dumps(dailyData)
write_file = open("trial.txt", "w")
write_file.write(result)
write_file.close()
tag = "powerloomData"
upload = lh.upload(source = "trial.txt", tag=tag)

cid_write_file = open("cid.txt", "w")
cid_write_file.write(upload['data']['Hash'])
cid_write_file.close()
uploadCID = lh.upload(source="cid.txt", tag="CID")
# list_uploads = lh.download(upload['data']['Hash'])



print(upload['data']['Hash'])
response = requests.get("https://api.lighthouse.storage/api/ipns/publish_record?cid="+uploadCID['data']['Hash']+"&keyName=ce2cd41551564889a3fab52b125190b3", headers={"Authorization": "Bearer "+os.getenv("LHKey")})
