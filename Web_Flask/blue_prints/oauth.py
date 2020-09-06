from flask import Blueprint, request, session, redirect,render_template,jsonify

from blue_prints import util
from blue_prints import code_msg
auth = Blueprint("auth",__name__)



@auth.route("/login",methods=["get","post"],endpoint="login")
def login():
    if request.method=="GET":
        return render_template("login.html")
    print(request.json)
    print(request.form)
    username = request.form.get("username")
    if not username:
        return jsonify(code_msg.USER_NOT_EXIST.get_response())
    pwd = request.form.get("pwd")
    pwd = util.gen_md5(pwd)
    if username == "123" and pwd == util.gen_md5("456"):
        session["username"]=username
        return jsonify({"code":200,"data":"登录成功","next_path":session.get("next_path")})
    return jsonify(code_msg.USER_NOT_EXIST.get_response())


@auth.route("/home",endpoint="home")
def home():
    return "home"