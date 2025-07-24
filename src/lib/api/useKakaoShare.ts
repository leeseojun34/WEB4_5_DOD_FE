export const useKakaoShare = () => {
  const shareWithTemplate = (description: string, url = "") => {
    console.log(url);
    window.Kakao.Share.sendCustom({
      templateId: 122694,
      templateArgs: {
        description,
        url,
      },
    });
  };

  return { shareWithTemplate };
};
