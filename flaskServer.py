import sys
from flask import Flask, render_template, request
app = Flask(__name__)


"""
Where our temporary server will live.
"""

PORT = None
if len(sys.argv) == 1:
  PORT=5000
else:
  PORT=int(sys.argv[1])




@app.route("/")
def main():
	# print render_template('index.html')
	return render_template('main2.html')


@app.route("/canvas")
def canvas():
  return render_template('testing.html')

@app.route("/design1")
def design1():
	return render_template('main2.html')



if __name__ == "__main__":
  app.run(port=PORT)

