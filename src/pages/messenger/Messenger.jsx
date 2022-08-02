import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  const baseURL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.sender,
        message: data.message,
        createdAt: Date.now(),
      });
    });
  }, [messages]);

  useEffect(() => {
    console.log("Vao set current chat",currentChat)//ms co last messege
    arrivalMessage &&
      // currentChat?.members.includes(arrivalMessage.sender) 
      currentChat
      &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user.data);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users
        // user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const baseURL = process.env.REACT_APP_BASE_URL;
        const params = new URLSearchParams({
          token: user?.data.token,
          index: 0,
          count:100
        }).toString();
        const url =
          `${baseURL}/chat/get_list_conversation?` +
          params;

        const res = await axios.post(url);
        console.log('res: ', res);
        
        setConversations(res?.data?.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user.data.id]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const baseURL = process.env.REACT_APP_BASE_URL;
        const params = new URLSearchParams({
          token: user?.data.token,
          index: 50,
          count:100
        }).toString();
        const url =
          `${baseURL}/friend/get_user_friends?` +
          params;

        const res = await axios.post(url);
        console.log('res: ', res);
        
        setFriends(res?.data?.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user.data.id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
       
        const params = new URLSearchParams({
          token: user?.data.token,
          index: 0,
          count:300,
          // partner_id:1,
          conversation_id: currentChat.id,
        }).toString();
        const url =
        `${baseURL}/chat/get_conversation?` +
        params;

        const res = await axios.post(url);
        console.log('res get conversation: ', res);
        setMessages(res?.data?.data.conversation);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("currentChat",currentChat);
    console.log("newMessege",newMessage);
    const message = {
      sender: user.data.id,
      message: newMessage,
      conversationId: currentChat.id,
    };

    const receiverId = currentChat.partner.id
    console.log('receiverId: ', receiverId);

    socket.current.emit("sendMessage", {
      sender: user.data,
      receiverId,
      message: newMessage,
    });

  

    try {
      
    
      const params = new URLSearchParams({
        // token: user?.data.token,
        senderId: message.sender,
        content: message.message,
        conversationId: message.conversationId,
      }).toString();
      const url =
      `${baseURL}/chat/add_dialog?` +
      params;
      

      const res = await axios.post(url);
      setMessages((prev) => [...prev, {
        sender: user.data,
        own:true,
        message: newMessage,
      }]);
      console.log("afterrrMessage",messages);

      setNewMessage("");

      //fetch
      const params2 = new URLSearchParams({
        token: user?.data.token,
        index: 0,
        count:30,

        conversation_id: message.conversationId,
      }).toString();
      const url2 =
      `${baseURL}/chat/get_conversation?` +
      params2;

      const res2 = await axios.post(url2);
     
      console.log('res get conversation: ', res2);
      // setMessages(res2?.data?.data.conversation);

      //const res = await axios.post("/chat/add_dialog", message);
      // setMessages([...messages, res2?.data?.data.conversation]);
    
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  
  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {console.log("conv",conversations)}
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m?.sender?.id === user.data.id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}
