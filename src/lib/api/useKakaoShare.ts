export const useKakaoShare = () => {
  const shareWithTemplate = (description: string, url = "") => {
    window.Kakao.Share.sendCustom({
      templateId: 123845,
      templateArgs: {
        description,
        url,
      },
    });
  };

  return { shareWithTemplate };
};
