const COZE_BOT_KEY = 'pat_rWrGNMaHR5Mrqu8xARQDrl1PAh0q9nRNgukyvpnU77gemW41yP3jpKh2hfKha9M3';
const API_URL = 'https://api.coze.cn/v3/chat';
const BOT_ID = '7440114917405130763';

Page({
  data: {
    chatList: [],
    inputText: '',
    scrollToView: '',
    isWaiting: false
  },

  currentContent: '',
  typingTimer: null,
  dotsCount: 0,

  // 监听输入
  onInput(e) {
    this.setData({
      inputText: e.detail.value
    });
  },

  // 发送消息
  sendMessage() {
    const content = this.data.inputText.trim();
    if (!content || this.data.isWaiting) return;

    // 添加用户消息到对话列表
    const message = {
      type: 'user',
      content: content
    };

    const chatList = [...this.data.chatList, message];
    this.setData({
      chatList,
      inputText: '',
      isWaiting: true,
      scrollToView: `msg-${chatList.length - 1}`
    });

    this.callCozeAPI(content);
  },

  // 调用 Coze API
  callCozeAPI(content) {
    const requestData = {
      bot_id: BOT_ID,
      user_id: 'user_' + Date.now(),
      stream: true,
      auto_save_history: true,
      additional_messages: [{
        role: 'user',
        content: JSON.stringify([{
          type: 'text',
          text: content
        }]),
        content_type: 'object_string'
      }]
    };

    console.log('发送请求数据:', JSON.stringify(requestData, null, 2));

    // 创建临时消息对象
    const aiMessage = {
      type: 'ai',
      content: '思考中'
    };
    const chatList = [...this.data.chatList, aiMessage];
    this.setData({
      chatList,
      scrollToView: `msg-${chatList.length - 1}`
    });

    const messageIndex = chatList.length - 1;
    this.currentContent = '';
    this.dotsCount = 0;
    
    // 开始省略号动画
    this.startDotsAnimation(aiMessage, messageIndex);

    const req = wx.request({
      url: API_URL,
      method: 'POST',
      data: requestData,
      enableChunked: true,
      header: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${COZE_BOT_KEY}`,
        'Accept': 'text/event-stream'
      }
    });

    const decoder = new TextDecoder('utf-8');
    req.onChunkReceived(({ data }) => {
      try {
        const text = decoder.decode(new Uint8Array(data));
        const messages = text.split('\n\n').filter(Boolean);
        
        messages.forEach(message => {
          const lines = message.split('\n');
          const eventLine = lines.find(line => line.startsWith('event:'));
          const dataLine = lines.find(line => line.startsWith('data:'));
          
          if (!eventLine || !dataLine) return;
          
          const event = eventLine.slice('event:'.length).trim();
          const data = JSON.parse(dataLine.slice('data:'.length).trim());
          
          console.log('事件类型:', event, '数据:', data);
          
          switch (event) {
            case 'conversation.message.delta':
              if (data.type === 'answer' && data.content) {
                this.currentContent = data.content;
              }
              break;
              
            case 'conversation.message.completed':
              if (data.type === 'answer') {
                // 停止省略号动画
                if (this.typingTimer) {
                  clearTimeout(this.typingTimer);
                  this.typingTimer = null;
                }
                
                // 显示完整内容
                this.currentContent = data.content;
                aiMessage.content = this.currentContent;
                this.setData({
                  [`chatList[${messageIndex}]`]: aiMessage,
                  scrollToView: `msg-${messageIndex}`
                });
              }
              break;
              
            case 'conversation.chat.completed':
              console.log('对话完成');
              this.setData({ isWaiting: false });
              break;
          }
        });
      } catch (error) {
        console.error('处理数据块错误:', error);
        this.handleError('处理响应数据失败');
      }
    });
  },

  // 开始省略号动画
  startDotsAnimation(aiMessage, messageIndex) {
    const dots = '.'.repeat(this.dotsCount + 1);
    aiMessage.content = '...' + dots;
    
    this.setData({
      [`chatList[${messageIndex}]`]: aiMessage,
      scrollToView: `msg-${messageIndex}`
    });

    this.dotsCount = (this.dotsCount + 1) % 3;
    
    this.typingTimer = setTimeout(() => {
      this.startDotsAnimation(aiMessage, messageIndex);
    }, 500);
  },

  // 错误处理
  handleError(errorMsg) {
    const errorMessage = {
      type: 'ai',
      content: `抱歉，${errorMsg}，请稍后重试。`
    };
    
    const chatList = [...this.data.chatList, errorMessage];
    this.setData({
      chatList,
      scrollToView: `msg-${chatList.length - 1}`,
      isWaiting: false
    });
  }
});