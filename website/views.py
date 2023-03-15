from flask import Flask, render_template, request, jsonify
app = Flask(__name__, static_folder='static')

from pymongo import MongoClient
client = MongoClient('mongodb+srv://sparta:test@cluster0.przww4v.mongodb.net/?retryWrites=true&w=majority')
db = client.dbsparta

db=client['dbsparta']
col = db.user

@app.route('/')
def home():
    return render_template('index.html')



 #-----양예린----  
@app.route("/member", methods=["POST"])
def member_post():
    likeCount1_receive = request.form['likeCount1_give']
    likeCount2_receive = request.form['likeCount2_give']
    likeCount3_receive = request.form['likeCount3_give']
    likeCount4_receive = request.form['likeCount4_give']
    
    doc = {
        'likeCount1':likeCount1_receive
          }
    db.likeCount.insert_one(doc)

    
    return jsonify({'msg':'POST 연결 완료!'})

@app.route("/member", methods=["GET"])
def member_get():
    return jsonify({'msg':'GET 연결 완료!'})


#--정승호--



@app.route("/comment", methods=["POST"])
def comment_post():
    id_receive = request.form["id_give"]
    pw_receive = request.form["pw_give"]
    comment_receive = request.form["comment_give"]
    last_index=col.find().sort('_id',-1).limit(1)
    if col.count_documents({}) == 0:
        index=1
    else:
        index=last_index[0]['index']+1
    doc={
        'index':index,
        'id':id_receive,
        'pw':pw_receive,
        'comment':comment_receive
    }
    col.insert_one(doc)
    return jsonify({'msg': '저장완료'})
    
@app.route("/comment", methods=["GET"])
def comment_get():
    comment=list(col.find({},{'_id':False,'pw':False}))
    return jsonify({'result': comment})

@app.route("/comment2", methods=["POST"])
def comment_del():
    index_receive= request.form["index_give"]
    index2= int(index_receive)

    pw= request.form["pw_give"]

    result = col.find_one({'index':index2,'pw':pw})
    if result is None:
        return jsonify({'msg': '삭제 실패!'})
    else:
        col.delete_one({'index':index2})
        all_data=col.find({'index':{'$gt':index2}})
        for data in all_data:
            current_index = data['index']
            new_index = current_index-1
            col.update_one({'_id': data['_id']},{'$set':{'index':new_index}})
        return jsonify({'msg': '삭제 완료!'})
    
@app.route("/comment3", methods=["POST"])
def comment_edit():
    index_receive= request.form["index_give"]
    index2= int(index_receive)

    pw= request.form["pw_give"]

    result = col.find_one({'index':index2,'pw':pw})
    if result is None:
        return jsonify({'msg': '수정 실패!'})
    else:
        return jsonify({'result': 'True'})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)