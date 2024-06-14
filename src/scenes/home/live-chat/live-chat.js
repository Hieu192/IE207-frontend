import React, { useEffect } from 'react';

const LiveChat = () => {
  useEffect(() => {
    const liveChatBaseUrl = document.location.protocol + '//' + 'livechat.fpt.ai/v36/src';
    const LiveChatSocketUrl = 'livechat.fpt.ai:443';
    const FptAppCode = 'f69bd57171701202b9d22e78fe9613a2';
    const FptAppName = 'chatbot';
    
    const CustomStyles = {
      headerBackground: 'linear-gradient(86.7deg, #3353a2ff 0.85%, #31b7b7ff 98.94%)',
      headerTextColor: '#ffffffff',
      headerLogoEnable: false,
      headerLogoLink: 'https://chatbot-tools.fpt.ai/livechat-builder/img/Icon-fpt-ai.png',
      headerText: 'Hỗ trợ trực tuyến',
      primaryColor: '#6d9ccbff',
      secondaryColor: '#ecececff',
      primaryTextColor: '#ffffffff',
      secondaryTextColor: '#000000DE',
      buttonColor: '#b4b4b4ff',
      buttonTextColor: '#ffffffff',
      bodyBackgroundEnable: false,
      bodyBackgroundLink: '',
      avatarBot: 'https://chatbot-tools.fpt.ai/livechat-builder/img/bot.png',
      sendMessagePlaceholder: 'Nhập tin nhắn',
      floatButtonLogo: 'https://chatbot-tools.fpt.ai/livechat-builder/img/Icon-fpt-ai.png',
      floatButtonTooltip: 'FPT.AI xin chào',
      floatButtonTooltipEnable: false,
      customerLogo: 'https://chatbot-tools.fpt.ai/livechat-builder/img/bot.png',
      customerWelcomeText: 'Vui lòng nhập tên của bạn',
      customerButtonText: 'Bắt đầu',
      prefixEnable: false,
      prefixType: 'radio',
      prefixOptions: ["Anh", "Chị"],
      prefixPlaceholder: 'Danh xưng',
      css: ''
    };

    // Get bot code from URL if FptAppCode is empty
    if (!FptAppCode) {
      const appCodeFromHash = window.location.hash.substr(1);
      if (appCodeFromHash.length === 32) {
        FptAppCode = appCodeFromHash;
      }
    }

    // Set Configs
    const FptLiveChatConfigs = {
      appName: FptAppName,
      appCode: FptAppCode,
      themes: '',
      styles: CustomStyles
    };

    // Append Script
    const FptLiveChatScript = document.createElement('script');
    FptLiveChatScript.id = 'fpt_ai_livechat_script';
    FptLiveChatScript.src = `${liveChatBaseUrl}/static/fptai-livechat.js`;
    document.body.appendChild(FptLiveChatScript);

    // Append Stylesheet
    const FptLiveChatStyles = document.createElement('link');
    FptLiveChatStyles.id = 'fpt_ai_livechat_script';
    FptLiveChatStyles.rel = 'stylesheet';
    FptLiveChatStyles.href = `${liveChatBaseUrl}/static/fptai-livechat.css`;
    document.body.appendChild(FptLiveChatStyles);

    // Init
    FptLiveChatScript.onload = function () {
      window.fpt_ai_render_chatbox(FptLiveChatConfigs, liveChatBaseUrl, LiveChatSocketUrl);
    };

    // Clean up on unmount
    return () => {
      // document.body.removeChild(FptLiveChatScript);
      // document.body.removeChild(FptLiveChatStyles);
    };
  }, []);

  return null; // This component does not render anything
};

export default LiveChat;