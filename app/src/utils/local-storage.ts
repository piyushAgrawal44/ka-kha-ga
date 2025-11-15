class LocalStorageUtil {
    getUserObject() {
        const stringifyObj = localStorage.getItem("user");

        if (!stringifyObj) {
            this.logoutUser();
            console.log("Token not found ! Please login again");
            return null;
        }

        try {
            return JSON.parse(stringifyObj);
        } catch (error) {
            console.log(error);
            this.logoutUser();
           return null;
        }
    }

    getAuthToken() {
        const token = localStorage.getItem("token");

        if (!token) {
            this.logoutUser();
            console.log("Token not found ! Please login again");
            return null;
        }

        try {
            return token;
        } catch (error) {
            console.log(error);
            this.logoutUser();
            return null;
        }
    }

    logoutUser() {
        localStorage.clear();
    }
}

export default LocalStorageUtil;