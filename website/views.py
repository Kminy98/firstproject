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

# test

 #-----양예린----  
@app.route("/like", methods=["POST"])
def member_post():
    like1_receive = request.form['like1_give']
    user_ip = request.remote_addr
    find_ip = db.ip_address.find_one({'like_user':like1_receive,'ip_address':user_ip})
    if find_ip:
         return jsonify({'msg':'동일 ip에서 좋아요는 1번만 가능합니다!'})
    else:
        doc = {
            'like_user':like1_receive,
            "ip_address":user_ip
        }
        db.ip_address.insert_one(doc)
        db.likes.update_one({'user':like1_receive},{'$inc':{'count':1}})
        return jsonify({'msg':'좋아요 완료!'})
   
    # like1_receive = request.form['like1_give']
    # db.likes.update_one({'user':like1_receive},{'$inc':{'count':1}})
    # return jsonify({'msg':'POST 연결 완료!'})

@app.route("/like", methods=["GET"])
def like_get():
    like1_count = list(db.likes.find({}, {'_id':False}))
    return jsonify({'result': like1_count})
    
@app.route("/unlike", methods=["POST"])
def hate():
    hate_receive = request.form['hate_give']
    user_ip = request.remote_addr
    find_ip = db.ip_address.find_one({'like_user':hate_receive,'ip_address':user_ip})
    if find_ip:
        db.ip_address.delete_one({'like_user':hate_receive,'ip_address':user_ip})
        db.likes.update_one({'user':hate_receive},{'$inc':{'count':-1}})
        return jsonify({'msg':'좋아요 취소 완료!'})
    else:
        return jsonify({'msg':'좋아요를 누르지 않으셨습니다!'})




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
def comment_pwd_check():
    index_receive= request.form["index_give"]
    index2= int(index_receive)

    pw= request.form["pw_give"]

    result = col.find_one({'index':index2,'pw':pw})
    if result is None:
        return jsonify({'msg': '수정 실패!'})
    else:
        return jsonify({'result': 'True'})

@app.route("/comment_edit", methods=["POST"])
def comment_edit():
    index_receive= request.form["index_give"]
    index= int(index_receive)
    pw = request.form["pw_give"]
    comment_data = request.form["edit_give"]

    col.update_one({'index':index,'pw':pw},{'$set':{'comment':comment_data}})
    return jsonify({'msg': '수정 완료!'})

if __name__ == '__main__':
    app.run(127.0.0.1', port=5000, debug=True)
