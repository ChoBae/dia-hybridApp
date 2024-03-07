import appConfig from '../app.config';
import { Browser } from '@capacitor/browser';
import axios from 'axios';
export const loginWithGithub = async (callback: () => void) => {
  /**
   * Fetches the CSRF token, needed for all requests
   * Bear in mind we need to set credentials to include
   * https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials
   */
  //   console.log('callback 시작', callback);
  const { csrfToken }: { csrfToken: string } = await axios.get(`${appConfig.apiHost}/api/auth/csrf`, {
    withCredentials: true,
  }).then(res => {
    console.log('res', res);
    return res.data;
  });

  console.log('csrfToken 가져옴.', csrfToken);
  /**
   * Generate an oAuth URL for the Twitter provider
   */
  const { url }: { url: string } = await fetch(`${appConfig.apiHost}/api/auth/signin/github`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      csrfToken,
      json: 'true',
      callbackUrl: `${appConfig.apiHost}/me`,
    }),
    redirect: 'follow',
    credentials: 'include',
  }).then(res => res.json());
  console.log('url 가져옴.', url);
  /**
   * We are awaiting the import of the In App Browser as simply importing or requring it throws an error
   */

  /**
   * We open the instance of InAppBrowser with the URL and options
   * https://cordova.apache.org/docs/en/11.x/reference/cordova-plugin-inappbrowser/
   */
  //   const ref = InAppBrowser.create(
  //     url,
  //     '_blank',
  //     'location=yes,hidenavigationbuttons=yes,hideurlbar=yes,toolbarcolor=#f1f5f9'
  //   );
  const ref = async () =>
    await Browser.open({
      url,
      windowName: '_blank',
      toolbarColor: '#f1f5f9',
    });
  ref();
  //   if (ref) {
  /**
   * Here we can check if we've been successfully redirected, if we have we close the browser
   */
  // ref!.on('loadstart').subscribe((e: any) => {
  //   const includesUrl = e.url.includes(`/me`);
  //   if (includesUrl) {
  //     ref.close();
  //   }
  // });
  //   console.log('ref', ref);
  //   Browser.addListener('browserFinished', async () => {
  //     Browser.close();
  //   });

  //   /**
  //    * We can also trigger a callback when we exit the InAppBrowser
  //    */
  //   Browser.addListener('browserFinished', async () => {
  //     callback();
  //   });
};
// };
