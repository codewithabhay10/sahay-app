"use client";

import React, { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

interface ZegoMeetingRoomProps {
  roomID: string;
  userName: string;
  userID: string;
  onLeave: () => void;
}

export default function ZegoMeetingRoom({ roomID, userName, userID, onLeave }: ZegoMeetingRoomProps) {
  const meetingContainerRef = useRef<HTMLDivElement>(null);
  const zegoInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!meetingContainerRef.current) return;

    const appID = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID);
    const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET || '';
    
    // Generate Kit Token
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userID,
      userName
    );

    // Create instance object from Kit Token
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zegoInstanceRef.current = zp;

    // Start the call
    zp.joinRoom({
      container: meetingContainerRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
      showPreJoinView: false,
      showScreenSharingButton: true,
      showRoomDetailsButton: true,
      showUserList: true,
      maxUsers: 50,
      layout: "Auto",
      showLayoutButton: true,
      showNonVideoUser: true,
      showOnlyAudioUser: true,
      turnOnMicrophoneWhenJoining: true,
      turnOnCameraWhenJoining: true,
      useFrontFacingCamera: true,
      onLeaveRoom: () => {
        onLeave();
      },
      branding: {
        logoURL: "",
      },
      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,
      showTextChat: true,
      showUserName: true,
      lowerLeftNotification: {
        showUserJoinAndLeave: true,
        showTextChat: true,
      },
    });

    // Cleanup on unmount
    return () => {
      if (zegoInstanceRef.current) {
        zegoInstanceRef.current.destroy();
      }
    };
  }, [roomID, userName, userID, onLeave]);

  return (
    <div 
      ref={meetingContainerRef} 
      className="w-full h-full min-h-[600px] rounded-lg overflow-hidden"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
