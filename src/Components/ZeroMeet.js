import { JitsiMeeting } from "@jitsi/web-sdk";
import React, { useRef, useState } from "react";
import { MdVideoCall } from "react-icons/md";

 function ZeroMeet() {
  const apiRefNew = useRef();
  const [logItems, setlogItems] = useState([]);
  const [showNew, setshowNew] = useState(false);

  const printLogs = (payload) => {
    setlogItems((items) => [...items, JSON.stringify(payload)]);
  };

  const handleAudioStatusChange = (payload, feature) => {
    if (payload.muted) {
      setlogItems((items) => [...items, `${feature} off`]);
    } else {
      setlogItems((items) => [...items, `${feature} on`]);
    }
  };

  const handleChatUpdates = (payload, ref) => {
    if (payload.isOpen || !payload.unreadCount) {
      return;
    }
    ref.current.executeCommand("toggleChat");
    setlogItems((items) => [
      ...items,
      `you have ${payload.unreadCount} unread messages`,
    ]);
  };


  const handleApiReady = (apiObj, ref) => {
    ref.current = apiObj;
    ref.current.addEventListeners({
      audioMuteStatusChanged: (payload) => handleAudioStatusChange(payload, "audio"),
      videoMuteStatusChanged: (payload) => handleAudioStatusChange(payload, "video"),
      raiseHandUpdated: printLogs,
      tileViewChanged: printLogs,
      chatUpdated: (payload) => handleChatUpdates(payload, ref),
    });
  };


  
  const handleFrame = iframeRef => {
    iframeRef.style.marginTop = "10px";
    iframeRef.style.padding = "5px";
    iframeRef.style.height = "700px";
    
  };

const renderSpinner = () => (
  <div
    style={{
      fontFamily: "sans-serif",
      textAlign: "center",
    }}
  >
    Loading........
  </div>
);

  // Multiple instances demo
  const renderMeetComp = () => {
    if (!showNew) {
      return null;
    }

    return (
      <JitsiMeeting
        domain="https://alpha.jitsi.net"
        spiner={renderSpinner}
        roomName="Zero Meet Room"
        onApiReady={(externalApi) => handleApiReady(externalApi, apiRefNew)}
        getIFrameRef={handleFrame}
      />
    );
  };

  const renderButtons = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <button
        type="button"
        className="btn btn-primary m-3"
        onClick={() => setshowNew(!showNew)}
      >
        <MdVideoCall
          size={40}
          className=""
          style={{ margin: "2", width: "30px" }}
        />
        New Meeting
      </button>
    </div>
  );

  const renderLog = () =>
    logItems.map((item, index) => (
      <div
        style={{
          fontFamily: "monospace",
          padding: "5px",
        }}
        key={index}
      >
        {item}
      </div>
    ));

  return (
    <>
      {renderButtons()}
      {renderMeetComp()}
      {renderLog()}
    </>
  );
}

export default ZeroMeet;

