import jwtDecode, { JwtPayload } from 'jwt-decode';

export function retrieveJWT(): string | null {
    return localStorage.getItem("jwt");
}

export function storeJWT(jwt: string) {
    localStorage.setItem("jwt", jwt);
}

export function removeJWT() {
    localStorage.removeItem("jwt");
}

export function getLoginInfoFromJWT(jwt: string | null): { ip: string} | null {
    if (!jwt) {
        return null;
    }
    const payload: JwtPayload = jwtDecode(jwt);
    const ip = payload.sub;
    if (!ip) {
        return null;
    }
    return { ip };
}


