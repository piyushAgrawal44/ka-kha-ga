class LocalStorageUtil {
    getUserObject() {
        const stringifyObj = localStorage.getItem("user");

        if (!stringifyObj) {
            this.logoutUser();
            throw Error("Token expired ! Please login again");
        }

        try {
            return JSON.parse(stringifyObj);
        } catch (error) {
            console.log(error);
            this.logoutUser();
            throw Error("Something went wrong while getting user details ! Please login again.");
        }
    }

    logoutUser() {
        localStorage.clear();
    }
}

export default LocalStorageUtil;