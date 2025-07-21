export const useKakaoShare = () => {
  const shareWithTemplate = (description: string, url: string) => {
    window.Kakao.Share.sendCustom({
      templateId: 122456,
      templateArgs: {
        description,
        url,
      },
    });
  };

  return { shareWithTemplate };
};
