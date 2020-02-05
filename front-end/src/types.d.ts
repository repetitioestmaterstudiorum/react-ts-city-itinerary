// type declaration file (no export needed because of "d.ts" instead of ".ts") - https://www.youtube.com/watch?v=ODvirqIC09A
// types: for one variable
// interface: for objects
// if a declaration is needed only for one component, do it there

interface City {
  name?: string;
  id?: string;
  contry?: string;
}

type Cities = Array<City>;
