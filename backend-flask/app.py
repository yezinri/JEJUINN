# -*- coding: utf-8 -*-
from flask import Flask, jsonify, request
import gensim
# 파일로 남기기 위해서는 filename='test.log' 파라미터, 어느 로그까지 남길 것인지를 level 로 설정 가능

app = Flask(__name__)
print("START FLASK SERVER BOOT")
print("MODEL LOAD...")
ko_model = gensim.models.fasttext.load_facebook_model('cc.ko.300.bin')
print("MODEL LOAD DONE")


@app.post('/sim')
def get_similarity():  # put application's code here
    params = request.get_json()
    print(params["work"])
    size = len(params["resumes"])
    for i in range(size):
        print(params["resumes"][i])
        params["resumes"][i]["similarity"] = ko_model.wv.similarity("안녕", "시발")
        print(params["resumes"][i])
    # gh_words = params["guestHouse"]["tags"]
    # tg_words = params["target"]["tags"]
    #
    # n = len(gh_words)
    # m = len(tg_words)
    # result = 0
    # for i in range(n):
    #     for j in range(m):
    #         similarity = ko_model.wv.similarity(gh_words[i], tg_words[j])
    #         result += similarity
    # result /= n*m
    print(params)
    return jsonify(params), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0')
