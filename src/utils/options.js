import { isETHAddress, isiAddress, isRAddress } from "./rules";

export const TOKEN_OPTIONS = [
  {
    label: 'ETH',
    value: 'ETH'
   },
  {
    label: 'USDC',
    value: 'USDC'
  },
  {
    label: 'VRSCTEST',
    value: 'VRSCTEST'
  },
  {
    label: 'Bridge.veth',
    value: 'BRIDGE'
  }
];

const tokenOptionsByPool = [
  "BRIDGE"
]

export const getTokenOptions = (poolAvailable) => (
  poolAvailable === "0" ? TOKEN_OPTIONS.filter(option => !tokenOptionsByPool.includes(option.value)) : TOKEN_OPTIONS
)

export const DESTINATION_OPTIONS = [
  { value : "vrsctest", label: "To VRSCTEST wallet (no conversion)" },
  { value : "bridgeBRIDGE", label: "Convert to Bridge.veth on VRSCTEST" },
  { value : "bridgeUSDC", label: "Convert to USDC on VRSCTEST" },
  { value : "bridgeVRSCTEST", label: "Convert to VRSCTEST on VRSCTEST" },
  { value : "bridgeETH", label: "Convert to ETH on VRSCTEST" },
  { value : "swaptoBRIDGE", label: "Convert to bridge Token (Bounce back to ETH)" },
  { value : "swaptoVRSCTEST", label: "Convert to VRSCTEST Token (Bounce back to ETH)" },
  { value : "swaptoUSDC", label: "Convert to USDC Token (Bounce back to ETH)" },
  { value : "swaptoETH", label: "Convert to ETH (Bounce back to ETH)" }
];

const destionationOptionsByPool = [
  "swaptoBRIDGE", "swaptoVRSCTEST", 'bridgeBRIDGE', 'swaptoUSDC', 'swaptoETH'
]

export const getDestinationOptions = (poolAvailable, address, selectedToken) => {
  
  const options = poolAvailable === "0" ? DESTINATION_OPTIONS.filter(option => !destionationOptionsByPool.includes(option.value)) : DESTINATION_OPTIONS
  
  if (isETHAddress(address)) {
    const ethOptions = options.filter(option => !['vrsctest', 'bridgeBRIDGE', 'bridgeUSDC', 'bridgeVRSCTEST', 'bridgeETH'].includes(option.value)); 
    if(selectedToken) {
      return ethOptions.filter(option => option.value !== `swapto${selectedToken}`);
    } else {
      return ethOptions
    }
  }

  if(isiAddress(address) || isRAddress(address)) {
    const vscOptions = options.filter(option => ['vrsctest', 'bridgeBRIDGE', 'bridgeUSDC', 'bridgeVRSCTEST', 'bridgeETH'].includes(option.value)); 
    if(poolAvailable === '0') {
      return vscOptions.filter(option => option.value === 'vrsctest')
    } else {
      return vscOptions.filter(option => option.value !== `bridge${selectedToken}`);
    }
  }

  return options;
}
