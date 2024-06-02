import { ROOM_SOCKET } from "@/constants/socket.route";
import socket from "@/lib/socket";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import eventStore from "@/store/event-store";
import chatStore from "@/store/chat-store";

export const useSocket = () => {
  const { channelId, eventId } = useParams();
  const { currentRole } = eventStore();
  const [readyToJoin, setReadyToJoin] = useState<boolean>(false);
  const { updateMessages, fetchMessages } = chatStore();

  useEffect(() => {
    if (channelId && currentRole) {
      setReadyToJoin(true);
    } else {
      setReadyToJoin(false);
    }
  }, [channelId, currentRole]);

  useEffect(() => {
    console.log(readyToJoin);

    if (readyToJoin && currentRole) {
      if (!socket.connected) {
        socket.connect();
      }

      socket.emit(ROOM_SOCKET.JOIN_CHANNEL, {
        channelId,
        roleId: currentRole.id as string,
      });

      socket.on(ROOM_SOCKET.CHANNEL_NEW_MESSAGE, (message: any) => {
        updateMessages({
          message
        });
        fetchMessages(eventId as string, channelId as string);
      });

      return () => {
        if (socket) {
          socket.off(ROOM_SOCKET.CHANNEL_NEW_MESSAGE);
          socket.emit(ROOM_SOCKET.LEAVE_CHANNEL, channelId);
          socket.disconnect();
        }
      };
    }
  }, [readyToJoin, currentRole]);
};
