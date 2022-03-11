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
  var userName = 'fred'
  var userEmail = 'fred@sam.com'
  var passWord = new URLSearchParams(window.location.search).get('passcode')
  // pass in reg:
  // Meeting:
  // Webinar
  var registrantToken = 'X3UNFvRFVHi3fG_2pF0XINJVzHcAT0v6enm8F_xgeC0.DQMAAAAVvTndWhZWUk52cXBFdFNLQzVJWU1nRl9ac1Z3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA&pwd=NFVsOFUvcDNZZzMxM01BWlBRZXpWZz09&uuid=WN_zqEGHT0-TNy8fWrwUG36gQ'
 
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

    let meetingSDKVideoElement = document.getElementById('meetingSDKVideoElement')

    let meetingSDKChatElement = document.getElementById('meetingSDKChatElement');

    let meetingSDKParticipantElement = document.getElementById('meetingSDKParticipantElement')

    client.init({
      zoomAppRoot: meetingSDKElement,
      language: 'en-US',
      customize: {
        video:{
          popper:{
            disableDraggable: false,
            anchorElement: meetingSDKVideoElement,
            pacement: "top",
          }
        },
        chat: {
          popper: {
            disableDraggable: false,
            anchorElement: meetingSDKChatElement,
            placement: "right",
          }
        },
          participants: {
            popper: {
              disableDraggable: true,
              anchorElement: meetingSDKParticipantElement,
              placement: "bottom",
            }
          },
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
      userEmail: userEmail,
      tk: registrantToken

    })
  }

  return (
<div className="App">

<main id="base">
    <h0>KMAG FITNESS</h0>
    <h1>Coach Anthony</h1>

        <img src="https://zoom.us/account/branding/p/50f55c16-9500-42ea-bf54-cb4148646883.png" alt="Magaoay INC" width="120" height="120"></img>
        
        {/* For Component View */}
        <div id="meetingSDKElement">
          {/* Zoom Meeting SDK Component View Rendered Here */}
        </div>

        <button onClick={getSignature}>MeetNow with Coach</button>
      </main>
<p></p>
</div>

  );
}

export default App;
