Page({
  data: {
    features: [
      {
        id: 'chat',
        name: 'AI小伙伴',
        desc: '和AI一起聊天学习',
        icon: '/images/chat-icon.png'
      },
      {
        id: 'draw',
        name: 'AI修图乐',
        desc: '创造专属精美图片',
        icon: '/images/artist-icon.png'
      }
    ]
  },

  // 跳转到聊天页面
  navigateToChat() {
    wx.navigateTo({
      url: '/pages/chat/chat'
    });
  },

  // 跳转到AI修图页面
  navigateToDraw() {
    wx.navigateTo({
      url: '/pages/draw/draw'
    });
  },

  // 处理功能点击
  handleFeatureClick(e) {
    const { id } = e.currentTarget.dataset;
    switch(id) {
      case 'chat':
        this.navigateToChat();
        break;
      case 'draw':
        this.navigateToDraw();
        break;
    }
  }
}); 