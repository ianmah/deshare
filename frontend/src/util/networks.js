import { Network } from "@ethersproject/networks";

export const matic = {
    name: 'matic',
    chainId: 137,
    _defaultProvider: (providers) => new providers.JsonRpcProvider('rpc-url')
}
