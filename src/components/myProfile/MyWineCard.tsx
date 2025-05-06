import { Wine } from '@/types/schema';
import Image from 'next/image';
import images from '../../../public/images/images';
import HamburgerMenu from '../HamburgerMenu';
import { MyProfileCard } from './MyProfileCard';
import { motion } from 'framer-motion';

interface MyWineCardProps {
  id: number;
  wine: Wine;
  teamId: string | null;
  token: string;
  tab: string;
  openId: number | null;
  setOpenId: (id: number | null) => void;
  onSuccess: () => void;
  onClick: () => void;
  onEdit: (item: Wine) => void;
  onDelete: (item: Wine) => void;
}

export default function MyWineCard({ ...props }: MyWineCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="cursor-pointer"
    >
      <MyProfileCard
        pt="pt-[20px] md:pt-[30px]"
        mb="mb-[37px] md:mb-[62px]"
        className="gap-[20px] md:gap-[40px] h-[164px] md:h-[228px] items-end"
        onClick={props.onClick}
      >
        {/* 와인 이미지 */}
        <div className="w-[53px] h-[203px] md:w-[76px] md:h-[300px] overflow-hidden">
          <Image
            src={props.wine.image || images.defaultProfile}
            alt="와인이미지"
            width={76}
            height={270}
            className="w-full h-full translate-y-[13px] md:translate-y-[24px] object-cover"
          />
        </div>

        {/* 텍스트 정보 */}
        <div className=" flex flex-col items-start pb-[16px] h-full">
          <div className="text-[#2D3034] font-bold text-[20px] md:text-[30px] mb-[15px] md:mb-[20px]">
            {props.wine.name}
          </div>
          <div className="text-[#9facbd] text-sm mb-[4px] md:mb-[13px]">
            {props.wine.region}
          </div>
          <div className="flex items-center bg-mistyrose text-burgundy px-[10px] py-[6px] md:px-[15px] lg:py-[6px] rounded-[12px] w-max">
            <div className="font-bold text-md">
              ₩ {props.wine.price.toLocaleString()}
            </div>
          </div>
        </div>

        {/* 햄버거 메뉴 */}
        <div className="h-full ml-auto">
          <HamburgerMenu
            {...props}
            onEdit={() => props.onEdit(props.wine)}
            onDelete={() => props.onDelete(props.wine)}
          />
        </div>
      </MyProfileCard>
    </motion.div>
  );
}
