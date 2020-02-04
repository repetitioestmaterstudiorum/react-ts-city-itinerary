// type declaration file (no export needed because if "d.ts" instead of ".ts") - https://www.youtube.com/watch?v=ODvirqIC09A

// type RoutesProps = {
//   isLanding: boolean;
// };

interface CitiesProps {
  // Cities: any;
  // City: any;
  // cities: any;
  oneCity: CityI;
}

interface CityI {
  city: string;
}
