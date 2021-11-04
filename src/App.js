import React from 'react';

import './App.css';

declare var ZoomMtgEmbedded

function App() {

  const client = ZoomMtgEmbedded.createClient();

  // setup your signature endpoint here: https://github.com/zoom/meetingsdk-sample-signature-node.js
  var signatureEndpoint = 'https://siganturezoom.herokuapp.com/'
  var apiKey = 'qzloYzd5SRKT9ve2PMc88Q'
  var meetingNumber = new URLSearchParams(window.location.search).get('meetingnumber')
  var role = 0
  var userName = 'MTGWEB201SDK'
  var userEmail = ''
  var passWord = new URLSearchParams(window.location.search).get('passcode')

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
    })
  }

  return (
<div className="App">
      <main>
        <img src="https://zoom.us/account/branding/p/a86a656f-ca3c-402b-960d-ab2500c6aad3.png" alt="Magaoay INC" width="100" height="33"></img>
      
        <h1>KelFIT WebSDK Component View Sample</h1>

        {/* For Component View */}
        <div id="meetingSDKElement">
          {/* Zoom Meeting SDK Component View Rendered Here */}
        </div>

        <button onClick={getSignature}>Join with Trainer Now</button>
      </main>
  <h2>Fitness Goals</h2>
      <p>LEAN MUSCLE</p>
      <p>WEGHT LOSS</p>
      <p>ENDURANCE</p>
      <p>STRENGTH</p>

      <h3>Rate Yourself</h3>
      <p>Excellent Shape</p>
      <p>I'm doing okay</p>
      <p>Need some work</p>

      
</div>



  );
}

export default App;
