import WebSocket from "ws"
import { WellKnownChain } from "@substrate/connect"
import { ScProvider } from "@unstoppablejs/sc-provider"
;(globalThis as any).WebSocket = WebSocket

export const smProvider = ScProvider(WellKnownChain.polkadot)
