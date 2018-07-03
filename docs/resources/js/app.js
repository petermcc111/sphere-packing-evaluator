/** Connection between evaluator and interface */
"use strict";var HTML=function(){this.main=document.querySelector(".main"),this.urlList=this.parseURLParams(window.location.href),void 0!==this.urlList&&void 0!==this.urlList.radius?(this.input=new Input(this.urlList),this.result=this.input.getResult(),void 0!=this.result.warning?ReactDOM.render(React.createElement(ErrorForm,{main:this.main,result:this.result,urlList:this.urlList}),this.main):ReactDOM.render(React.createElement(OutputForm,{main:this.main,result:this.result,urlList:this.urlList}),this.main)):ReactDOM.render(React.createElement(InputForm,null),this.main)};HTML.prototype.parseURLParams=function(t){var e,i,r,s=t.indexOf("?")+1,n=t.indexOf("#")+1||t.length+1,a=t.slice(s,n-1),l=a.replace(/\+/g," ").split("&"),u={};if(a!==t&&""!==a){for(var h=0;h<l.length;h++)r=l[h].split("=",2),e=decodeURIComponent(r[0]),i=decodeURIComponent(r[1]),u[e]=2===r.length?i:null;return u}};var newHTML=new HTML;