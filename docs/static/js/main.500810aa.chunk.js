(this["webpackJsonpmeetingsdk-sample-react"]=this["webpackJsonpmeetingsdk-sample-react"]||[]).push([[0],{11:function(e,t,n){"use strict";n.r(t);var o=n(1),a=n.n(o),c=n(3),i=n.n(c),r=(n(8),n(9),n(0));var s=function(){var e=ZoomMtgEmbedded.createClient(),t="qzloYzd5SRKT9ve2PMc88Q",n=new URLSearchParams(window.location.search).get("meetingnumber"),o="Customer",a="Customer@bbb.com",c=new URLSearchParams(window.location.search).get("passcode"),i=new URLSearchParams(window.location.search).get("registrantToken");return Object(r.jsxs)("div",{className:"App",children:[Object(r.jsxs)("main",{id:"base",children:[Object(r.jsx)("h0",{children:"KMAG FITNESS"}),Object(r.jsx)("h1",{children:"Coach Anthony"}),Object(r.jsx)("img",{src:"https://zoom.us/account/branding/p/50f55c16-9500-42ea-bf54-cb4148646883.png",alt:"Magaoay INC",width:"120",height:"120"}),Object(r.jsx)("div",{id:"meetingSDKElement"}),Object(r.jsx)("button",{onClick:function(r){r.preventDefault(),fetch("https://siganturezoom.herokuapp.com/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({meetingNumber:n,role:0})}).then((function(e){return e.json()})).then((function(r){!function(r){var s=document.getElementById("meetingSDKElement"),m=document.getElementById("meetingSDKVideoElement"),l=document.getElementById("meetingSDKChatElement"),d=document.getElementById("meetingSDKParticipantElement");e.init({zoomAppRoot:s,language:"en-US",customize:{video:{popper:{disableDraggable:!1,anchorElement:m,pacement:"top"}},chat:{popper:{disableDraggable:!1,anchorElement:l,placement:"right"}},participants:{popper:{disableDraggable:!0,anchorElement:d,placement:"bottom"}},meetingInfo:["topic","host","mn","pwd","telPwd","invite","participant","dc","enctype"],toolbar:{buttons:[{text:"Load Form",className:"CustomButton",onClick:function(){console.log("custom button")}}]}}}),e.join({apiKey:t,signature:r,meetingNumber:n,password:c,userName:o,userEmail:a,tk:i})}(r.signature)})).catch((function(e){console.error(e)}))},children:"MeetNow with Coach"})]}),Object(r.jsx)("p",{})]})},m=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,12)).then((function(t){var n=t.getCLS,o=t.getFID,a=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),o(e),a(e),c(e),i(e)}))};i.a.render(Object(r.jsx)(a.a.StrictMode,{children:Object(r.jsx)(s,{})}),document.getElementById("root")),m()},8:function(e,t,n){},9:function(e,t,n){}},[[11,1,2]]]);
//# sourceMappingURL=main.500810aa.chunk.js.map