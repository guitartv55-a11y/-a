import type { ImageKey } from './presentationData';
import heroImg from '../assets/images/industrial_park_sea_hero_1795342190858.jpg';
import electronicsImg from '../assets/images/electronics_assembly_line_1795342189001.jpg';
import automotiveImg from '../assets/images/automotive_manufacturing_line_1795342189124.jpg';
import textileImg from '../assets/images/textile_garment_factory_1795342189504.jpg';
import foodImg from '../assets/images/food_processing_plant_1795342191605.jpg';
import petrochemicalImg from '../assets/images/petrochemical_refinery_1795342189065.jpg';
import shipbuildingImg from '../assets/images/shipbuilding_yard_1795342189745.jpg';
import woodImg from '../assets/images/wood_processing_mill_1795346977030.jpg';
import miningImg from '../assets/images/mineral_mining_facility_1795346977436.jpg';

export interface MediaAsset {
  src: string;
  alt: string;
  caption: string;
}

export const MEDIA_ASSETS: Record<ImageKey, MediaAsset> = {
  hero: {
    src: heroImg,
    alt: 'Toàn cảnh khu công nghiệp hiện đại tại Đông Nam Á nhìn từ trên cao',
    caption: 'Khu công nghiệp hiện đại tại Đông Nam Á',
  },
  electronics: {
    src: electronicsImg,
    alt: 'Dây chuyền lắp ráp linh kiện điện tử công nghệ cao trong phòng sạch',
    caption: 'Công nghiệp điện tử - tin học',
  },
  automotive: {
    src: automotiveImg,
    alt: 'Dây chuyền robot tự động lắp ráp ô tô trong nhà máy cơ khí hiện đại',
    caption: 'Cơ khí & sản xuất ô tô',
  },
  textile: {
    src: textileImg,
    alt: 'Nhà máy dệt may quy mô công nghiệp tại Đông Nam Á',
    caption: 'Công nghiệp dệt may',
  },
  food: {
    src: foodImg,
    alt: 'Dây chuyền chế biến và đóng hộp thực phẩm tự động bằng thép không gỉ',
    caption: 'Công nghiệp chế biến thực phẩm',
  },
  petrochemical: {
    src: petrochemicalImg,
    alt: 'Tổ hợp lọc hóa dầu ven biển hiện đại tại Đông Nam Á',
    caption: 'Công nghiệp hóa chất & hóa dầu',
  },
  shipbuilding: {
    src: shipbuildingImg,
    alt: 'Nhà máy đóng tàu biển với cần cẩu giàn cỡ lớn bên bờ biển Đông Nam Á',
    caption: 'Công nghiệp đóng tàu',
  },
  wood: {
    src: woodImg,
    alt: 'Nhà máy chế biến gỗ và lâm sản công nghiệp hiện đại tại Đông Nam Á',
    caption: 'Công nghiệp chế biến lâm sản',
  },
  mining: {
    src: miningImg,
    alt: 'Cơ sở khai thác và tuyển khoáng sản công nghiệp tại Đông Nam Á',
    caption: 'Công nghiệp khai thác khoáng sản',
  },
};
