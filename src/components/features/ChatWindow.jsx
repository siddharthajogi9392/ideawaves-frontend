import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Card } from '../common/Components';
import { Send, Users, ArrowLeft, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import io from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_URL?.replace('/api', '') || window.location.origin);

const ChatWindow = () => {
  const { ideaId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [chatData, setChatData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchChatAndJoin = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/chat/${ideaId}`);
        setChatData(res.data);
        setMessages(res.data.messages || []);

        // Join socket room
        socket.emit('join_room', ideaId);
      } catch (err) {
        console.error("Failed to fetch chat", err);
        setError(err.response?.data?.message || "Chat not found");
      } finally {
        setLoading(false);
      }
    };

    if (ideaId) {
      fetchChatAndJoin();
    }

    // Socket listeners
    socket.on('receive_message', (data) => {
      if (data.ideaId === ideaId) {
        setMessages(prev => [...prev, data]);
      }
    });

    return () => {
      socket.off('receive_message');
    };
  }, [ideaId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !chatData) return;
    if (chatData.idea?.status === 'Completed') return;

    const messagePayload = {
      ideaId,
      senderId: user._id,
      senderName: user.name,
      text: newMessage,
      timestamp: new Date().toISOString()
    };

    try {
      await api.post('/chat/send', { ideaId, text: newMessage });

      // Emit to others
      socket.emit('send_message', messagePayload);

      // Add to local state
      setMessages(prev => [...prev, messagePayload]);
      setNewMessage('');
    } catch (error) {
      console.error("Failed to send message", error);
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  };

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || '?';
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-140px)] animate-in">
      <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mb-4"></div>
      <p className="text-surface-500 font-medium">Loading secure chat room...</p>
    </div>
  );

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center animate-in">
        <Card className="p-10 glass-card">
          <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-amber-500" />
          </div>
          <h2 className="text-2xl font-display font-bold text-surface-900 mb-3">Access Restricted</h2>
          <p className="text-surface-600 mb-8 leading-relaxed">{error}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-brand-600 text-white rounded-xl py-4 font-bold shadow-lg shadow-brand-200 hover:bg-brand-700 hover:scale-[1.02] transition-all active:scale-95"
          >
            Back to Dashboard
          </button>
        </Card>
      </div>
    );
  }

  const isCompleted = chatData?.idea?.status === 'Completed';

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-140px)] flex flex-col p-4 md:p-6 animate-in">
      <div className="flex-1 flex flex-col glass-card rounded-3xl overflow-hidden relative shadow-2xl">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-400/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/5 rounded-full blur-3xl -ml-32 -mb-32"></div>

        {/* Header */}
        <div className="p-5 border-b border-surface-200/50 bg-white/40 backdrop-blur-xl flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2.5 hover:bg-white/80 rounded-xl transition-all border border-transparent hover:border-surface-200 hover:shadow-sm group"
            >
              <ArrowLeft className="w-5 h-5 text-surface-600 group-hover:text-brand-600" />
            </button>
            <div>
              <h2 className="font-display font-bold text-surface-900 text-xl tracking-tight">
                {chatData?.idea?.title}
              </h2>
              <div className="flex items-center text-sm text-surface-500 mt-0.5">
                <div className="flex items-center mr-3">
                  <div className="flex -space-x-2 mr-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-5 h-5 rounded-full border-2 border-white bg-surface-200 flex items-center justify-center text-[8px] font-bold">
                        {i}
                      </div>
                    ))}
                  </div>
                  <span className="font-medium text-surface-600">{chatData?.participants?.length} Participants</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse mr-1"></div>
                <span className="text-xs">Live Chat</span>
              </div>
            </div>
          </div>
          {isCompleted && (
            <span className="px-4 py-1.5 bg-green-50 text-green-700 text-xs font-black uppercase tracking-widest rounded-full border border-green-100 italic">
              Archived Project
            </span>
          )}
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-gradient-to-b from-white/10 to-surface-50/30">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full opacity-40">
              <Users className="w-16 h-16 text-surface-400 mb-4" />
              <p className="font-display text-lg">Send the first message to your team</p>
            </div>
          ) : (
            messages.map((msg, index) => {
              if (msg.isSystemMessage) {
                return (
                  <div key={index} className="flex justify-center my-4 slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                    <span className="px-5 py-2 glass-card bg-surface-100/50 text-surface-500 text-[11px] font-bold uppercase tracking-widest rounded-full border border-surface-200/30">
                      {msg.text}
                    </span>
                  </div>
                );
              }

              const senderId = msg.senderId?._id || msg.senderId;
              const isMe = senderId === user._id;

              return (
                <div key={index} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : 'flex-row'} slide-up group`} style={{ animationDelay: `${index * 0.05}s` }}>
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-bold shrink-0 shadow-sm border ${isMe
                    ? 'bg-gradient-to-br from-brand-600 to-indigo-700 text-white border-brand-500'
                    : 'bg-white text-surface-700 border-surface-100'
                    }`}>
                    {getInitials(msg.senderName)}
                  </div>

                  <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[80%]`}>
                    <div className="flex items-center gap-2 mb-1.5 px-1">
                      {!isMe && (
                        <span className="text-xs font-bold text-surface-700">
                          {msg.senderName || 'Anonymous Participant'}
                        </span>
                      )}
                      <span className="text-[10px] text-surface-400 font-medium">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <div className={`rounded-3xl px-6 py-3.5 shadow-glass transition-all group-hover:shadow-lg ${isMe
                      ? 'bg-gradient-to-br from-brand-600 to-indigo-700 text-white rounded-tr-none'
                      : 'bg-white/90 backdrop-blur-sm text-surface-800 rounded-tl-none border border-surface-100/50'
                      }`}>
                      <p className="text-[15px] leading-relaxed font-medium">{msg.text}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Action input */}
        <div className="p-6 bg-white/60 backdrop-blur-xl border-t border-surface-200/50 z-10">
          {isCompleted ? (
            <div className="text-center py-4 bg-surface-100/50 rounded-2xl border border-surface-200/40 text-surface-500 text-sm font-medium italic flex items-center justify-center gap-2">
              <Lock className="w-4 h-4" />
              This discussion is now archived.
            </div>
          ) : (
            <form onSubmit={handleSend} className="flex gap-4 relative">
              <div className="flex-1 relative group">
                <input
                  type="text"
                  className="w-full bg-white border border-surface-200 rounded-2xl pl-6 pr-14 py-4 text-[15px] font-medium transition-all focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 group-hover:border-surface-300 shadow-sm"
                  placeholder="Type a message to your team..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <span className={`text-[10px] font-bold ${newMessage.length > 400 ? 'text-amber-500' : 'text-surface-300'} transition-colors`}>
                    {newMessage.length > 0 && `${newMessage.length}`}
                  </span>
                </div>
              </div>
              <button
                type="submit"
                className="bg-gradient-to-br from-brand-600 to-indigo-700 text-white p-4 rounded-2xl hover:scale-105 transition-all shadow-xl shadow-brand-500/20 active:scale-95 disabled:opacity-50 disabled:grayscale disabled:hover:scale-100 group overflow-hidden"
                disabled={!newMessage.trim()}
              >
                <div className="relative z-10">
                  <Send className={`w-6 h-6 transition-transform ${newMessage.trim() ? 'group-hover:translate-x-1 group-hover:-translate-y-1' : ''}`} />
                </div>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};


export default ChatWindow;
