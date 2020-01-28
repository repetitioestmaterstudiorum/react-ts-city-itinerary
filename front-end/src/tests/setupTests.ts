// import { configure } from "enzyme";
// import Adapter from "enzyme-adapter-react-16";
// configure({ adapter: new Adapter() });

import * as enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
// tslint:disable-next-line:no-any
(enzyme as any).configure({ adapter: new Adapter() });

// tried: https://github.com/Microsoft/TypeScript-React-Starter/issues/131
