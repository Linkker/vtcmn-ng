import { AuthServiceConfig, GoogleLoginProvider } from "angular-6-social-login";
export function getAuthServiceConfigs() {
    var config = new AuthServiceConfig([{
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('795749081780-ru99ibau714e08ble3cem77ucdrfmqep.apps.googleusercontent.com')
        }]);
    return config;
}
//# sourceMappingURL=socialloginConfig.js.map