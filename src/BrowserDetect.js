/* 
 * The MIT License
 *
 * Copyright 2018 sillas.santos.leal.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

export default class BrowserDetect {
    static MOBILE = "mobile";
    static DESKTOP = "desktop";

    constructor() {
        const navigator  = window.navigator || {userAgent: ""};
        const testB = /(opera|edge|chromium|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i;
        const testD = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
        const ua = navigator.userAgent;
        const uaLow = ua.toLowerCase();
        const chromiuns = [
            {
                expression: /\bChromium\/(\d+)/,
                name: "Chromium"
            },
            {
                expression: /\bOPR\/(\d+)/,
                name: "Opera"
            },
            {
                expression: /\bEdge\/(\d+)/,
                name: "Edge"
            }
        ];
        /**/
        let M = ua.match(testB) || [];
        let test;
        this.name = "";
        this.version = 0;
        this.vendor = navigator.vendor || "Vendor Undefined";
        this.product = navigator.product || "Product Undefined";
        this.platform = navigator.platform || "Platform Undefined";
        this.device =
                (testD.test(uaLow)) ?
                BrowserDetect.MOBILE :
                BrowserDetect.DESKTOP;
        /**/
        if (/trident/i.test(M[1])) {
            test = /\brv[ :]+(\d+)/g.exec(ua) || [];
            this.name = "IE";
            this.version = (test[1] || '');
        }
        if (this.name.length === 0) {
            if (M[1] === 'Chrome') {
                chromiuns.forEach((chromium) => {
                    test = ua.match(chromium.expression);
                    if (test !== null) {
                        this.name = chromium.name;
                        this.version = test[1];
                        return false;
                    }
                });
            }
        }
        if (this.name.length === 0) {
            M =
                    M[2] ?
                    [M[1], M[2]] :
                    [navigator.appName, navigator.appVersion, '-?'];
            if ((test = ua.match(/version\/(\d+)/i)) !== null) {
                M.splice(1, 1, test[1]);
            }
            this.name = M[0];
            this.version = M[1];
        }
    }
    
    /**
     * @description Method that informs if is a mobile or desktop browser
     * @returns {Boolean} Returns TRUE if is mobile or FALSE if is a desktop
     */
    getIsMobile(){
        return this.device === BrowserDetect.MOBILE;
    }
}