from flask import Flask, request, session, redirect
from blue_prints import block_master, oauth

app = Flask(__name__, static_folder="static")
app.secret_key = "123"
app.debug = True

app.register_blueprint(oauth.auth)
app.register_blueprint(block_master.bm)


@app.before_request
def before():
    if request.path == "/login":
        return None
    elif request.path.startswith("/static"):
        return None
    if session.get("username"):
        return None
    else:
        next_path = request.path
        session["next_path"] = next_path
        return redirect("login")


if __name__ == '__main__':
    app.run("127.0.0.1", 8888)
