import GYM from '@/assets/icons/GYM.svg';
import AirCondition from '@/assets/icons/Air conditioner.svg';
import CableTv from '@/assets/icons/Cable TV.svg';
import Dishwasher from '@/assets/icons/Dishwasher.svg';
import FireExtinguisher from '@/assets/icons/Fire extinguisher.svg';
import Elevator from '@/assets/icons/Elevator.svg';
import Garden from '@/assets/icons/Garden.svg';
import Internet from '@/assets/icons/Internet.svg';
import Pool from '@/assets/icons/Pool.svg';
import Laundry from '@/assets/icons/Laundry.svg';
import Securitycameras from '@/assets/icons/Security cameras.svg';
import Iron from '@/assets/icons/Iron.svg';
import Kitchen from '@/assets/icons/Kitchen.svg';
import Grill from '@/assets/icons/Grill.svg';
import Refrigerator from '@/assets/icons/Refrigerator.svg';
import Heater from '@/assets/icons/Heater.svg';
import Chimney from '@/assets/icons/Chimney.svg';
import Sportsfield from '@/assets/icons/Sports field.svg';
import PetFriendly from '@/assets/icons/Pet friendly.svg';
import SmokingArea from '@/assets/icons/Smoking area.svg';
import Microwave from '@/assets/icons/Microwave.svg';
import Lockpad from '@/assets/icons/Lockpad.svg';
import KidsZone from '@/assets/icons/Kids zone.svg';
import Garage from '@/assets/icons/Garage.svg';
import { View } from 'react-native';

const ICON_MAPPING: Record<string, JSX.Element> = {
  GYM: <GYM color="black" />,
  'Air conditioner': <AirCondition />,
  'Cable TV': <CableTv />,
  Dishwasher: <Dishwasher />,
  'Fire extinguisher': <FireExtinguisher />,
  Elevator: <Elevator />,
  Garden: <Garden />,
  Internet: <Internet />,
  Pool: <Pool />,
  Laundry: <Laundry />,
  'Security cameras': <Securitycameras />,
  Iron: <Iron />,
  Kitchen: <Kitchen />,
  Grill: <Grill />,
  Refrigerator: <Refrigerator />,
  Heater: <Heater />,
  Chimney: <Chimney />,
  'Sports field': <Sportsfield />,
  'Pet friendly': <PetFriendly />,
  'Smoking area': <SmokingArea />,
  Microwave: <Microwave />,
  Lockpad: <Lockpad />,
  'Kids zone': <KidsZone />,
  Garage: <Garage />,
};

type Props = {
  IconType: string;
};

const DynamicIcon = ({ IconType }: Props) => {
  const Icon = ICON_MAPPING[IconType];

  return Icon ? (
    <View
      style={{
        height: 50,
        width: 49,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: '#F3F3F3',
      }}
    >
      <View>{Icon}</View>
    </View>
  ) : (
    <>Icon not found</>
  );
};

export default DynamicIcon;
