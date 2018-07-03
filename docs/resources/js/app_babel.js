/**

 Connection between evaluator and interface

*/

var HTML = function(){
	this.main=document.querySelector(".main")
	this.urlList = this.parseURLParams(window.location.href)
	if(this.urlList!== undefined && this.urlList.radius !==undefined){
		this.input = new Input(this.urlList)
		this.result = this.input.getResult()
		if (this.result.warning != undefined){
			ReactDOM.render(<ErrorForm main={this.main} result={this.result} urlList={this.urlList} />,this.main)
		}else ReactDOM.render(<OutputForm main={this.main} result={this.result} urlList={this.urlList} />,this.main)
	}
	else {
		ReactDOM.render(<InputForm />,this.main)
	}
}

HTML.prototype.parseURLParams = function(url) {
	//use to obtain the information in url (?xx=yy&xa=ya&...)
	//source: https://stackoverflow.com/questions/814613/how-to-read-get-data-from-a-url-using-javascript
	//modified codes
	var queryStart = url.indexOf("?") + 1
	var	queryEnd   = url.indexOf("#") + 1 || url.length + 1
	var	query = url.slice(queryStart, queryEnd - 1)
	var	pairs = query.replace(/\+/g, " ").split("&") //"+" means " "
	var	parms = {}, n, v, nv
	if (query === url || query === "") return
	else {
		for (var i = 0; i < pairs.length; i++) {
			nv = pairs[i].split("=", 2)
			n = decodeURIComponent(nv[0])
			v = decodeURIComponent(nv[1])

			//if (!parms.hasOwnProperty(n)) parms[n] = []
			//parms[n].push(nv.length === 2 ? v : null)
			parms[n] = nv.length === 2 ? v : null
		} return parms
	}
}

//IIFE: initialize the program
var newHTML = new HTML()

