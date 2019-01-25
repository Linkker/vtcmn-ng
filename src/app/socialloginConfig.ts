import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider} from "angular-6-social-login";
export function getAuthServiceConfigs() {
    let config = new AuthServiceConfig([{
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('795749081780-ru99ibau714e08ble3cem77ucdrfmqep.apps.googleusercontent.com')
    }]);

    return config;
}
