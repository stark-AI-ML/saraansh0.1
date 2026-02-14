class UserConfig {
  constructor({ tokenKey = null, model = null, theme = null, tokenLeft = null } = {}) {
    this.tokenKey = tokenKey;
    this.model = model;
    this.theme = theme;
    this.tokenLeft = tokenLeft;
  }

  setTokenKey(tokenKey) {
    this.tokenKey = tokenKey;
    this.save({ tokenKey });
  }

  setModel(modelName) {
    this.model = modelName;
    this.save({ model: modelName });
  }

  setTokenLeft(tokenLeft) {
    this.tokenLeft = tokenLeft;
    this.save({ tokenLeft });
  }


    static async getTokenKey() {
    const result = await chrome.storage.local.get(["userSettings"]);
    return result.userSettings?.tokenKey ?? null;
  }

  static async getModel() {
    const result = await chrome.storage.local.get(["userSettings"]);
    return result.userSettings?.model ?? null;
  }

  static async getTokenLeft() {
    const result = await chrome.storage.local.get(["userSettings"]);
    return result.userSettings?.tokenLeft ?? null;
  }

  static async getTheme() {
    const result = await chrome.storage.local.get(["userSettings"]);
    return result.userSettings?.theme ?? null;
  }


  save(updatedFields) {
    chrome.storage.local.get(["userSettings"], (result) => {
      const currentSettings = result.userSettings || {};
      const newSettings = { ...currentSettings, ...updatedFields };

      chrome.storage.local.set({ userSettings: newSettings }, () =>
        console.log("Settings updated:", newSettings)
      );
    });
  }

  static loadConfig() {
    return new Promise((resolve) => {
      chrome.storage.local.get(["userSettings"], (result) => {
        if (result.userSettings) {
          resolve(new UserConfig(result.userSettings));
        } else {
          resolve(new UserConfig()); 
        }
      });
    });
  }
}

export default UserConfig;