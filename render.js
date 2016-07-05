function Main(){
	var pages = [], current, c,
	    links = [{ link : "page1", page : "p1"},
		         { link : "page2", page : "p2"}];
	pages["p1"] = new Page({title : "Page 1", content : "This is page 1 content",  subpages:[]});
	pages["p2"] = new Page({title : "Page 2", content : "This is page 2 content", subpages:[]});
	
	
	

	this.loadContent = function(){
		var maindiv = document.createElement("div");
		maindiv.setAttribute("id", "pageContent");
		document.getElementsByTagName("body")[0].appendChild(maindiv)
	   current = pages["p1"];
	   this.showpage();
	};
	
	this.setPage = function(p){
	 current = pages[p]
	 c = p;
	};
	
	this.showpage = function(){
	  current.render();
	if(c === "p2"){
		current.setSubpage({title : "subPage 2", content : "This is subpage 2 content", link: { text : "sub page2", page : "s2"}})
	 }
	},
	this.showsubpage = function(s){
	   current.getSubpage(s);
	};
	this.loadNav = function(){
		var ul = document.createElement("ul");
		    ul.setAttribute("id", "mainLinks");
	     
		 for(i=0; i < links.length; i++){
			var li = document.createElement("li"),
				a = document.createElement("a");
				a.innerHTML = links[i].link;
				a.setAttribute("href", "#");
				a.setAttribute("onClick", "showpage('"+links[i].page+"')")
		    li.appendChild(a);
			ul.appendChild(li);
		 }
		 document.getElementsByTagName("body")[0].appendChild(ul);
	}
   
}

function Page(page){
	var header = document.createElement("span"),
		content = document.createElement("div"),
		sub = document.createElement("div");
		header.setAttribute("id", "title");
		content.setAttribute("id", "content");
		sub.setAttribute("id", "subNav");
	this.subpages = {};
	var addHeader = function(){
		header.innerHTML = page.title;
		document.getElementById("pageContent").appendChild(header);
	};
	
	var addSideBar = function(){
		document.getElementById("pageContent").appendChild(sub);
	};
	
	var addContent = function(){
		content.innerHTML = page.content;
		document.getElementById("pageContent").appendChild(content);
	};
	
   this.render = function (){
		var pageContent = document.getElementById("pageContent");

		// As long as <ul> has a child node, remove it
		while (pageContent.hasChildNodes()) {   
			pageContent.removeChild(pageContent.firstChild);
		}
		
       addHeader();
	   addSideBar();
	   addContent();
   }
   
   this.getSubpage = function(s){
     document.getElementById("title").innerHTML = this.subpages[s].title;
     document.getElementById("content").innerHTML = this.subpages[s].content;
   }
   
   this.setSubpage = function(subpage){
        this.subpages[subpage.link.page] = subpage;
		var a = document.createElement("a");
				a.innerHTML = subpage.link.text;
				a.setAttribute("href", "#");
				a.setAttribute("onClick", "showsubpage('"+subpage.link.page+"')");
				
       if(document.getElementById("subNav").childNodes.length == 0)
           {document.getElementById("subNav").appendChild(a);}
   }
   
}
var main = new Main();
function showpage(pg){
	main.setPage(pg);
	main.showpage();
}
function loadContent(){
	main.loadNav();
	main.loadContent();
}
function showsubpage(s){
	main.showsubpage(s);
}