import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'address-book',
  webDir: 'build',
  server: {
    url: 'http://10.0.0.75:3000',
    cleartext: true,
    androidScheme: 'https'
  }
};

export default config;
