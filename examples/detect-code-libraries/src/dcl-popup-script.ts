import {BrowserDescriptor, BrowserExtensionFramework} from "../../../browser-extension-framework/api/browser-extension-framework";

console.debug("[dcl-popup-script.js] Initializing...")

document.getElementById("execute-detect")!
    .addEventListener("click", async () => {
        console.info(`[dcl-popup-script.js] Clicked the 'Detect' button`);

        // Note: we're not supporting Firefox because I can't actually test with Firefox. See the related 'Wish List' item in the README.
        const backendWiring = await BrowserExtensionFramework.initializeBackendWiring(BrowserDescriptor.CHROMIUM);
        await backendWiring.injectInstrumentedPageScript("dcl-page-script.js")

        const response = await backendWiring.rpcClient.execRemoteProcedure("detect", {});
        console.info(`[dcl-popup-script.js] Response to 'detect': ${response}`);
        alert(`Detected the following libraries: ${response}`);
    });