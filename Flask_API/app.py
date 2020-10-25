from flask import Flask
import random
app = Flask(__name__)


@app.route('/tone')
def hello_world():
    toneList = ['Humorous', 'Ironic', 'Cynical']
    return random.choice(toneList)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)