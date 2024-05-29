import socket from "@/lib/socket";
import { Socket } from "socket.io-client";
import { create } from "zustand";
import { ROOM_SOCKET } from "@/constants/socket.route";
// import chatStore from "./chat-store";

type Store = {
    socket: Socket | null
    connect: () => void
    disconnect: () => void
    joinChannel: (channelId: string, roleId: string) => void
    leaveChannel: (channelId: string) => void
    sendMessage: (msg: string) => void
};

const useSocketStore = create<Store>((set) => ({
    socket: null,
    messages: [],
    connect: () => {
        set({ socket });
    },
    disconnect: () => set((state) => {
        state.socket?.close();
        return { socket: null };
    }),
    joinChannel: (channelId: string, roleId: string) => set((state) => {
        state.socket?.emit(ROOM_SOCKET.JOIN_CHANNEL, { channelId, roleId });
        state.socket?.on(ROOM_SOCKET.CHANNEL_NEW_MESSAGE, (message) => {
            alert(message);
            // chatStore.setState((prev) => ({ messages: [...prev.messages, message] }))
        });
        return state;
    }),
    leaveChannel: (channelId: string) => set((state) => {
        state.socket?.emit(ROOM_SOCKET.LEAVE_CHANNEL, channelId);
        return state;
    }),
    sendMessage: (msg: string) => set((state) => {
        state.socket?.emit(ROOM_SOCKET.CHANNEL_SEND_MESSAGE, { msg });
        return state;
    }),
}));

export default useSocketStore;
