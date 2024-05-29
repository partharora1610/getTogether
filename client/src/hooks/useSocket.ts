import { ROOM_SOCKET } from "@/constants/socket.route"
import socket from "@/lib/socket"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation";
import eventStore from "@/store/event-store";

export const useSocket = () => {
  
  const { channelId } = useParams();
  const  { currentRole } = eventStore();
  const [ readyToJoin, setReadyToJoin ] = useState<boolean>(false);

  // useEffect(() => {
  //   if (channelId && currentRole) {
  //     setReadyToJoin(true);
  //   }
  // }, [channelId, currentRole]);

  // useEffect(() => {
  //   if (readyToJoin) {
  //     socket.connect();
      
  //     // socket.emit(ROOM_SOCKET.JOIN_CHANNEL, { channelId, roleId: currentRole.id as string });

     

  //     return () => {
  //       if (socket) {
  //         socket.emit(ROOM_SOCKET.LEAVE_CHANNEL, channelId);
  //         socket.disconnect();
  //       }
  //     };
  //   }
  // }, [readyToJoin])

}
