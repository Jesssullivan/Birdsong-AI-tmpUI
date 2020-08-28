from flask import Flask

# production @ heroku:
hostname = '0.0.0.0'
hostport = 80

# if you are using a proxy via npm, use port 5000:
hostname = '127.0.0.1'
hostport = 5000

app = Flask(__name__, static_folder='./demos/')


@app.route('/')
def index():
    return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run(host=hostname, debug=False, port=hostport)
