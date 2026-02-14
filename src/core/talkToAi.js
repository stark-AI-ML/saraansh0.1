class TalkToAI {
  constructor(prompt, chunk, className) {
    this.prompt = prompt;
    this.chunkArr = chunk;
    this.className = className;
    this.conclusion;
  }

  async init() {
    return new Promise(async (res, rej) => {
      try {
        console.log("under the init");
        await this.createObj();
      } catch (error) {
        console.log(error);
        rej();
      }
      res();
    });
  }

  sendToAI(messageArr, i) {}

  wait(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("wating so that we don't have the issue of the RATE LIMIT");
        resolve("WAIT_OVER");
      }, ms);
    });
  }

  async createObj() {
    console.log("creating the object");
    const promptObj = { role: "system", content: `${this.prompt}` };
    let conclusion = "";

    for (let i = 0; i < this.chunkArr.length; i++) {
      const chunkObj = { role: "user", content: this.chunkArr[i] };
      const conclusionObj =
        i > 0
          ? {
              role: "system",
              content: `{**id = ${
                i - 1
              }**} Continue from previous summary: ${conclusion}`,
            }
          : null;

      const message = [promptObj, chunkObj];
      if (conclusionObj) message.push(conclusionObj);
      console.log(message);
      try {
        conclusion = await this.sendToAI(message, i);
      } catch (error) {
        console.log(error);
        return;
      }
      await this.wait(6000);
      console.log("WAIT_OVER_FOR_NEXT_AI_CALL");
    }
  }
}

export default TalkToAI;
