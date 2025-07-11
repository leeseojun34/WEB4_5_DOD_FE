export interface kakaoSearch {
  id: string; // 장소 ID
  place_name: string; // 장소명, 업체명
  category_name: string; // 카테고리 이름
  category_group_code?: string; // 카테고리 그룹 코드
  category_group_name: string; // 카테고리 그룹명
  phone?: string; // 전화번호
  address_name?: string; // 전체 지번 주소
  road_address_name: string; // 전체 도로명 주소
  x: string; // X 좌표(경도, longitude)
  y: string; // Y 좌표(위도, latitude)
  place_url?: string; // 장소 상세 페이지 URL
  distance?: string; // 중심좌표까지의 거리(미터, x/y 파라미터 있을 때만)
}
