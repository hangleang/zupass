import { ZuAuthArgs } from "@pcd/zuauth";

/**
 * ZuAuth configuration.
 * Can be found in Podbox in the "ZuAuth Configuration" section of your
 * pipeline dashboard.
 */
export const config: ZuAuthArgs["config"] = [
  {
    "pcdType": "eddsa-ticket-pcd",
    "publicKey": [
      "1fba47ffe6090605cce08c9b3f6be02c3ea2a6080b37511d0a175d2d7ec63944",
      "19bc06efdfb54d56366af7d7b380381489b5751cea249407f65dedaa73debb42"
    ],
    "productId": "20635d6a-27e2-5ba9-b680-52189e5e159d",
    "eventId": "eddf221f-f4d9-5d67-9261-195a2d3f5572",
    "eventName": "Pagoda Gathering",
    "productName": "Convergence"
  },
  {
    "pcdType": "eddsa-ticket-pcd",
    "publicKey": [
      "1fba47ffe6090605cce08c9b3f6be02c3ea2a6080b37511d0a175d2d7ec63944",
      "19bc06efdfb54d56366af7d7b380381489b5751cea249407f65dedaa73debb42"
    ],
    "productId": "beb03b4b-6c23-5359-bf41-2309c3f49039",
    "eventId": "1652460e-48ba-52d4-9a38-35e54157fc5d",
    "eventName": "Pagoda Gathering",
    "productName": "ThinkPod"
  }
];
