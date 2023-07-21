import { createClient } from "@unstoppablejs/client"
import { smProvider } from "./provider"

const { chainHead, transaction } = createClient(smProvider)

// please play around with the API of `chainHeadFollower`
// for instance, have a look at `chainHeadFollower.storage`, `chainHeadFollower.body`, etc
const chainHeadFollower = chainHead(true, (event) => {
  console.log(event)

  if (event.event === "finalized") {
    ;(async () => {
      const headers = await Promise.all(
        event.finalizedBlockHashes.map(chainHeadFollower.header),
      )

      console.log("finalized blocks headers:")
      console.log(
        headers.map((header, idx) => ({
          block: event.finalizedBlockHashes[idx],
          header,
        })),
      )
    })()
  }
})

const genesisHash = await chainHeadFollower.genesisHash()
console.log({ genesisHash })

setTimeout(() => {
  console.log("Unfollow!")
  chainHeadFollower.unfollow()
}, 60_000)
