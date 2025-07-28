interface Window {
  Kakao: {
    Share: {
      sendCustom: (options: {
        templateId: number;
        templateArgs: {
          [key: string]: string;
        };
      }) => void;
    };
  };
}

interface UserType {
  id: string;
  email: string;
  name: string;
  profileImageNumber: number;
  provider: string;
  role: string;
}

namespace kakao.maps {
  interface Map {
    panBy(x: number, y: number): void;
    setCenter(position: LatLng): void;
  }
}
