import { AuthService } from './auth.service';


export function init_token(service: AuthService) {
	return () => service.checkToken();
}
