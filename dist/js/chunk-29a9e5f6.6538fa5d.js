(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-29a9e5f6"],{"23cd":function(t,s,i){},"37e5":function(t,s,i){"use strict";i.r(s);var a=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"wrapper",style:{background:"url("+t.siteData.image+") center center"}},[i("div",{staticClass:"center"},[t.loading?i("loading"):t._e()],1),i("div",{staticClass:"cover"}),i("div",{staticClass:"system-cont"},[i("div",{staticClass:"container mt-5"},[i("h1",{staticClass:"head"},[t._v(t._s(t.system.title))]),i("h3",{staticClass:"sub-head"},[t._v(t._s(t.system.subtitle))]),i("div",{staticClass:"sections"},t._l(t.system.sections,(function(s,a){return i("div",{key:a,staticClass:"section"},[i("div",{staticClass:"row"},[t._m(0,!0),i("div",{staticClass:"col-md-6 desc"},[i("div",{staticClass:"title sec-title"},[t._v(t._s(s.title))]),i("div",{staticClass:"text sec-text"},[t._v(t._s(s.text))]),s.link?i("div",{staticClass:"sec-btn"},[i("a",{staticClass:"btn btn-secondary",attrs:{target:"__blank",href:s.link}},[t._v("الذهاب الي الرابط")])]):t._e()])])])})),0)])])])},e=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"col-md-6"},[a("div",{staticClass:"img"},[a("img",{staticClass:"img-fluid",attrs:{src:i("f5bb"),alt:""}})])])}],n=i("bc3a"),c=i.n(n),l={created:function(){var t=this;this.id=this.$route.params.id,this.loading=!0,c.a.get("/getSystemData/"+this.id).then((function(s){t.loading=!1,t.system=s.data.system,console.log(t.system)}))},data:function(){return{id:null,system:{},loading:!1}},computed:{siteData:function(){return this.$store.getters.siteData}},methods:{randomizeImage:function(){var t=Math.ceil(Math.random()*this.system.sections.length);return"../assets/imgs/immigration"+t+".jpg"}}},r=l,o=(i("d312"),i("2877")),d=Object(o["a"])(r,a,e,!1,null,"20f345a8",null);s["default"]=d.exports},d312:function(t,s,i){"use strict";i("23cd")},f5bb:function(t,s,i){t.exports=i.p+"img/immigration5.efc7269f.jpg"}}]);
//# sourceMappingURL=chunk-29a9e5f6.6538fa5d.js.map