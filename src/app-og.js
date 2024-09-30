import React from 'react';

import './App.css';

declare var ZoomMtgEmbedded
declare var ZoomMtg

ZoomMtg.setZoomJSLib('https://source.zoom.us/3.8.10/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

function App() {

  const client = ZoomMtgEmbedded.createClient();

  // setup your signature endpoint here: https://github.com/zoom/meetingsdk-sample-signature-node.js
  var signatureEndpoint = 'https://siganturezoom.herokuapp.com/'
  var apiKey = 'qzloYzd5SRKT9ve2PMc88Q'
  var meetingNumber = new URLSearchParams(window.location.search).get('meetingnumber')
  var role = 1
  var userName = 'Trainee'
  var userEmail = ''
  var passWord = new URLSearchParams(window.location.search).get('passcode')
  var registrantToken = ''

  function getSignature(e) {
    e.preventDefault();

    fetch(signatureEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: role
      })
    }).then(res => res.json())
    .then(response => {
      startMeeting(response.signature)
    }).catch(error => {
      console.error(error)
    })
  }

  function startMeeting(signature) {

    let meetingSDKElement = document.getElementById('meetingSDKElement');

    client.init({
      debug: true,
      zoomAppRoot: meetingSDKElement,
      language: 'en-US',
      customize: {
        meetingInfo: ['topic', 'host', 'mn', 'pwd', 'telPwd', 'invite', 'participant', 'dc', 'enctype'],
        toolbar: {
          buttons: [
            {
              text: 'Load Form',
              className: 'CustomButton',
              onClick: () => {
                console.log('custom button');
              
              }          
            }
          ]
        }
      }
    });

    client.join({
    	apiKey: apiKey,
    	signature: signature,
    	meetingNumber: meetingNumber,
    	password: passWord,
    	userName: userName,
      userEmail: userEmail
      tk: registrantToken
    })
  }

  return (
<div className="App">
      <main>
        
        <h1>Coach Anthony</h1>
        <img src="https://zoom.us/account/branding/p/50f55c16-9500-42ea-bf54-cb4148646883.png" alt="Magaoay INC" width="120" height="120"></img>
        
        {/* For Component View */}
        <div id="meetingSDKElement">
          {/* Zoom Meeting SDK Component View Rendered Here */}
        </div>

        <button onClick={getSignature}>MeetNow with Coach</button>
      </main>
  <h2>Training Days</h2>
      <p>Schedule an appointment with a trainer</p>
      <p>Enter fitness goals</p>
  <h3>Rate Yourself</h3>
      <p>Excellent Shape</p>
      <p>I'm doing okay</p>
</div>

  );
}

export default App;
