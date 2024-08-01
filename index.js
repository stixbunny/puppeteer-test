import puppeteerExtra from "puppeteer-extra";
import stealthPlugin from "puppeteer-extra-plugin-stealth";
import chromium from "@sparticuz/chromium";

export async function test() {
  try {
    puppeteerExtra.use(stealthPlugin());
    const launchOptions = {
      headless: chromium.headless,
      executablePath: await chromium.executablePath(),
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      ignoreHTTPSErrors: true,
    };

    console.log("starting script with...");
    console.log(launchOptions);

    const browser = await puppeteerExtra.launch(launchOptions);
    const page = await browser.newPage();
    await page.goto("https://vantek.cl", {
      waitUntil: "networkidle2",
    });
    console.log(page.url());
    console.log(await page.content());
    await browser.close();
  } catch (e) {
    console.log(e);
  }
}

(async () => {
  await test();
})();
