// see https://docs.solanamobile.com/react-native/polyfill-guides/web3-js

import { Buffer } from "buffer/";
import "react-native-get-random-values";

global.Buffer = Buffer as unknown as typeof global.Buffer;
