# Jarida

Part of the Jarida Project. Built with React Native.

## Installation

Prerequisites:

- Android Studio
- NodeJS and NPM
- [**A running deployment of Jarida API**](https://github.com/c3n7/jarida-api)

1. Installation steps:

   ```shell
   npm i
   ```

2. Update [`constants/Config.tsx`](https://github.com/c3n7/Jarida/blob/main/constants/Config.tsx) to point to the deployed API's URL:

   ```typescript
   const Config = {
     API_URL: "https://yourdomain.com/api/v1",
   };
   ```

   If running Jarida API from your localhost, configure [`constants/Config.tsx`](https://github.com/c3n7/Jarida/blob/main/constants/Config.tsx) as follows:

   ```typescript
   const Config = {
     API_URL: "http://10.0.2.2:8000/api/v1",
   };
   ```

## Running Jarida

Congratulations! You've made it this far. Now run the app while you have your emulator/device connected:

```shell
npm start
```

Then scan the QR code or tap `a` on your keyboard while the terminal is highlighted to open the Expo App in the emulator, with the Jarida APP installed.
