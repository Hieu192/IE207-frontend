import React, { useEffect } from 'react';

const LiveChat = () => {
  useEffect(() => {
    // Configs
    const liveChatBaseUrl = document.location.protocol + '//' + 'livechat.fpt.ai/v36/src';
    const LiveChatSocketUrl = 'livechat.fpt.ai:443';
    const FptAppCode = 'f69bd57171701202b9d22e78fe9613a2';
    const FptAppName = 'Hỗ trợ khách hàng';
    
    const CustomStyles = {
      headerBackground: 'linear-gradient(86.7deg, #3353a2ff 0.85%, #31b7b7ff 98.94%)',
      headerTextColor: '#ffffffff',
      headerLogoEnable: false,
      headerLogoLink: 'https://chatbot-tools.fpt.ai/livechat-builder/img/Icon-fpt-ai.png',
      headerText: 'Hỗ trợ khách hàng',
      primaryColor: '#6d9ccbff',
      secondaryColor: '#ecececff',
      primaryTextColor: '#ffffffff',
      secondaryTextColor: '#000000DE',
      buttonColor: '#b4b4b4ff',
      buttonTextColor: '#ffffffff',
      bodyBackgroundEnable: false,
      bodyBackgroundLink: '',
      avatarBot: 'https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg?size=338&ext=jpg&ga=GA1.1.1518270500.1718064000&semt=ais_user',
      sendMessagePlaceholder: 'Nhập tin nhắn chatbot',
      floatButtonLogo: 'https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg?size=338&ext=jpg&ga=GA1.1.1518270500.1718064000&semt=ais_user',
      floatButtonTooltip: 'Tôi có thể giúp cho bạn?',
      floatButtonTooltipEnable: true,
      customerLogo: 'https://chatbot-tools.fpt.ai/livechat-builder/img/bot.png',
      customerWelcomeText: 'Nhập tên của bạn',
      customerButtonText: 'Bắt đầu',
      prefixEnable: false,
      prefixType: 'radio',
      prefixOptions: ["Anh", "Chị"],
      prefixPlaceholder: 'Danh xưng',
      css: ''
    };

    let FptLiveChatConfigs = {
      appName: FptAppName,
      appCode: FptAppCode,
      themes: '',
      styles: CustomStyles
    };

    // Append Script
    let FptLiveChatScript = document.createElement('script');
    FptLiveChatScript.id = 'fpt_ai_livechat_script';
    FptLiveChatScript.src = liveChatBaseUrl + '/static/fptai-livechat.js';
    document.body.appendChild(FptLiveChatScript);

    // Append Stylesheet
    let FptLiveChatStyles = document.createElement('link');
    FptLiveChatStyles.id = 'fpt_ai_livechat_script';
    FptLiveChatStyles.rel = 'stylesheet';
    FptLiveChatStyles.href = liveChatBaseUrl + '/static/fptai-livechat.css';
    document.body.appendChild(FptLiveChatStyles);

    // Init
    FptLiveChatScript.onload = function () {
      window.fpt_ai_render_chatbox(FptLiveChatConfigs, liveChatBaseUrl, LiveChatSocketUrl);
    };

    // Clean up on unmount
    return () => {
      document.body.removeChild(FptLiveChatScript);
      document.body.removeChild(FptLiveChatStyles);
    };
  }, []);

  return null; // This component does not render anything
};

export default LiveChat;