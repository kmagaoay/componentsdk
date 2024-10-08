import React from 'react';

import './App.css';
import ZoomMtgEmbedded from '@zoomus/websdk/embedded';

function App() {

  const client = ZoomMtgEmbedded.createClient();

  // setup your signature endpoint here: https://github.com/zoom/meetingsdk-sample-signature-node.js
  var signatureEndpoint = 'https://yckfd07uph.execute-api.us-east-1.amazonaws.com/latest'
  var sdkKey = 'PfPapLCavJc2ZBjMkssNeqboLdBOpoAEXQTc'
  var meetingNumber = new URLSearchParams(window.location.search).get('meetingnumber')
  var role = 0
  var userName = 'Customer'
  var userEmail = 'Customer@bbb.com'
  var passWord = new URLSearchParams(window.location.search).get('passcode')
  // pass in the registrant's token if your meeting or webinar requires registration. More info here:
  // Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/meetings#join-registered
  // Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/webinars#join-registered
  var registrantToken = new URLSearchParams(window.location.search).get('registrantToken')
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
    	sdkKey: sdkKey,
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

    <h1>Coach</h1>

        <img src="https://zoom.us/account/branding/p/50f55c16-9500-42ea-bf54-cb4148646883.png" alt="Magaoay INC" width="120" height="120"></img>
        
        {/* For Component View */}
        <div id="meetingSDKElement">
          {/* Zoom Meeting SDK Component View Rendered Here */}
        </div>

        <button onClick={getSignature}>MeetNow Coach</button>
      </main>
<p></p>
</div>

  );
}

export default App;
