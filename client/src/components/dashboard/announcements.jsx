'use client';
import { useState, useEffect } from 'react';
import { useAuthContext } from "@/hooks/useAuthContext";
import { fetchChatHistory } from "@/utils/socket/WebSocket";
import { sendMessage } from '@/utils/socket/WebSocket';
import { convertTimestamp } from '@/utils/helpers/convertTime';

export default function Announcements() {
    const { role, authReady } = useAuthContext();
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState([]);

    useEffect(() => {
        if (authReady) {
            fetchMessages();

            const ws = new WebSocket('ws://127.0.0.1:8000/ws/chat/announcements/');
            setSocket(ws);

            ws.onmessage = (e) => {
                const data = JSON.parse(e.data);
                setMessage((prev) => [...prev, {
                    title: data.title,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    content: data.message,
                    timestamp: new Date().toISOString(),
                }]);
            };

            return () => {
                ws.close();
            };
        }
    }, [authReady]);

    const fetchMessages = async () => {
        try {
            const chatHistory = await fetchChatHistory("announcements");

            if (chatHistory && chatHistory.messages) {
                setMessage(chatHistory.messages);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleMessageSubmit = (e) => {
        e.preventDefault();
        const message = e.target.message.value;
        const title = e.target.title.value;
        const timestamp = new Date().toISOString();
        sendMessage(socket, message, title, timestamp);
        e.target.reset();
    };

    const showMessages = (message) => {
        return (
            <div className="flex-grow overflow-y-scroll border border-gray-300 dark:border-w rounded-md w-3/4">
                <div className="flex flex-col-reverse">
                    {message && [...message].reverse().map((msg, index) => (
                        <div key={index} className="flex flex-col">
                            <p className="text-gray-500 dark:text-neutral-300 text-center mb-1">{convertTimestamp(msg.timestamp)}</p>
                            <p className="text-black font-bold text-xl dark:text-neutral-300 text-center mb-1">{msg.title}</p> 
                            <p className="text-black dark:text-neutral-300 text-center mb-3">{msg.first_name} {msg.last_name}: {msg.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (authReady && role == 'coach') {
        return (
            <div className="w-full rounded-md overflow-hidden shadow-md ml-2 bg-white p-4 dark:bg-gray-600">
                <h2 className="underline dark:text-neutral-300 text-center">Announcements</h2>
                
                <div className="h-[40vh] flex flex-col items-center dark:bg-gray-900">
                    {showMessages(message)}

                    <form onSubmit={handleMessageSubmit} className="flex flex-col w-3/4 dark:bg-gray-900">
                        <label> Title: </label>
                        <input
                            type="text"
                            name="title"
                            className="border border-gray-300 dark:text-neutral-300 dark:bg-gray-900 dark:border-white rounded-md p-2 mb-2"
                            required
                        />
                        
                        <label> Announce: </label>
                        <input
                            type="text"
                            name="message"
                            className="border border-gray-300 dark:text-neutral-300 dark:bg-gray-900 dark:border-white rounded-md p-2 mb-2"
                            required
                        />

                        <button type="submit" className="bg-blue-500 dark:bg-blue-900 dark:text-neutral-300 text-white py-2 px-4 rounded-md ml-2">
                            Send
                        </button>
                    </form>
                </div>
            </div>
        );
    } else if(authReady && role != 'coach') {
        return (
            <div className="w-full rounded-md overflow-hidden shadow-md ml-2 mr-2 bg-white p-4 dark:bg-gray-600">
                <h2 className="underline dark:text-neutral-300 text-center">Announcements</h2>
                
                <div className="h-[40vh] flex flex-col items-center dark:bg-gray-900">
                    {showMessages(message)}
                </div>
            </div>
        )
    }
}