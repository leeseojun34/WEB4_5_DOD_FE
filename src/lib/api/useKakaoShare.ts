export const useKakaoShare = () => {
  const shareWithTemplate = (description: string) => {
    window.Kakao.Share.sendCustom({
      templateId: 122456,
      templateArgs: {
        description,
        url: window.location.href,
      },
      
    });
  };

  return { shareWithTemplate };
};
