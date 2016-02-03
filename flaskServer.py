from flask import Flask, render_template, request
app = Flask(__name__)


"""
Where our temporary server will live.
"""



@app.route("/")
def main():
	# print render_template('index.html')
	return render_template('main.html')


@app.route("/canvas")
def canvas():
  return render_template('testing.html')



if __name__ == "__main__":
  app.run()