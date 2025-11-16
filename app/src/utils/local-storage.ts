import { UserType } from "../types/user.type";

class LocalStorageUtil {

    setToken(token: string) {
        try {
            if (!token) {
                this.logoutUser();
                throw new Error("Failed to save auth token ! Please try again later");
            }
            localStorage.setItem("token", token);
            return true;
        } catch (error) {
            this.logoutUser();
            throw new Error("Failed to save auth token ! Please try again later");
        }
    }

    decodeJwtPayload<T = any>(token: string): T | null {
        try {
            const parts = token.split(".");
            if (parts.length !== 3) return null;

            const payloadBase64 = parts[1]
                .replace(/-/g, "+")
                .replace(/_/g, "/");

            const decoded = atob(payloadBase64);
            return JSON.parse(decoded) as T;
        } catch (err) {
            console.error("Failed to decode JWT payload:", err);
            return null;
        }
    }

    getUserObject() {
        const token = localStorage.getItem("token");
        
        if (!token) {
            this.logoutUser();
            console.log("Token not found ! Please login again");
            return null;
        }
        const userObject:UserType | null = this.decodeJwtPayload(token);
        
        if (!userObject) {
            this.logoutUser();
            console.log("Token not found ! Please login again");
            return null;
        }

        return userObject;
    }

    getAuthToken() {
        const token = localStorage.getItem("token");

        if (!token) {
            this.logoutUser();
            console.log("Token not found ! Please login again");
            return null;
        }

        return token;
    }

    logoutUser() {
        localStorage.clear();
    }
}

export default LocalStorageUtil;