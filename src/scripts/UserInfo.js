export default class UserInfo {

    constructor({name, description}) {
        this._name = document.querySelector(name);
        this._description = document.querySelector(description);
    }

    getUserInfo() {
        const userInfo = {
            name: this._name.textContent,
            description: this._description.textContent
        }

        return userInfo;
    }

    setUserInfo(newName, newDescription) {
        this._name.textContent = newName;
        this._description.textContent = newDescription;
    }
}