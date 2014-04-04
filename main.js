// ==UserScript==
// @id             ingress-gps-intel
// @name           Ingress GPS Intel (IGI)
// @category       Layers
// @version        0.1.0.0.0
// @namespace      ingress.gps.intel
// @updateURL      
// @downloadURL    
// @description    Use the main.js file, and install it on Greasemonkey (Firefox) or Tampermonkey (Chrome).
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @grant          GM_info
// @grant          GM_xmlhttpRequest
// @require        http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// ==/UserScript==

window.igiLayer = null;

function kombina() {
 
  GM_xmlhttpRequest({
        method: "GET",
        url: "http://localhost",   // Your server hostname
    headers: {
        "User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
        "Accept": "text/xml"            // If not specified, browser defaults will be used
    },
        onload: function(response) {
        
        console.log("Start loading GPS data...");

        /*
        var iconEnlImage = 'data:image/png;base64,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';
        var iconEnlRetImage = 'data:image/png;base64,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';
        
        var greenIcon = L.icon({
            iconUrl:       iconEnlImage,
            iconRetinaUrl: iconEnlRetImage,
            iconSize:      [22, 37],
            iconAnchor:    [11, 36]
        });
        */
        
        
                var iconRedHulk = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAABACAYAAABoWTVaAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAStAAAErQGnCFr/AAAAB3RJTUUH3gQEEQQFl+AepAAADlVJREFUaN7NmmmQXNV1x3/3vtev15nu6ZFmkRAaLZYEQkBkJAg4gI2hXIBDgqGwIxwlOAshlXI5CWXMEpvKRkJIgu1ApVhiB2SQDCRgCxBCYlEAgSSMpJFGyyyafe19fd3v3ZsP0xrPjGbEjCRsTtX90N13+d+zn3NbMHsyAQ+wArgGWGsIsUzAfCAICCCuoF9p3QzsBLYC3UAZcGZzmJjpRAlBBUuBrxpCrK8xzcawadJgWSwNBJhnWQQNAwEkHYc+2+ZIocBwqUTKdUmUy4eBDcBPBXRryJ1JgJcC6/1S/uGqUMhzaTjMF2pqWFNVRYPXC1qjAP3LyyDE6NadxSLvp9Nsj8fZlcmwP5stlLV+AvhvYNdpARRgavgO8CefC4fPurWhgaujUZp8PhytKWuN0vqkBxhC4BECUwhacjneSCZ5ZnCQd1KpHuBRjxAPl7XOzRqggKiGDZYQV9/b1GTc2tBAg2WhAfdjQJ0MrKxwddPwMA92djoZ131FwG0aRmYMUECjhq01Hs/KjStXcnF1NQagTnK40npMxAKQQpxUbBp4K5nkjsOH6bbtZuByIDETgLXAW3M9npVvrl5Nk883LccS5TIpx2GgVOJYsUjSGTXQiGnS5PPRYFmETZMaj2fK9R4haM7luLG5me5i8ShwPlCcFqCAgIaNcz2e69/67GdZ6PVOCa69UGBnOs2r8Ti7SyUKpollWZimCYDjOJRKJfyOw0WWxZeiUS6prmax33/CXl4p2ZvNcu3evYyUy9uBq6YEuMTvF22Fwj0hw7j/ufPOk58Lh08QaVkpnh4cZMPgIC1aEw6HiUQiVFdXEwgEJgDM5/Ok02mSySSpVIpzhGBdfT231tfjkXLCvgEp+Xksxi0HDmAr9ffAvVNx8DLgufsXLWr45oIFyEnghkol7mtv53/jcbyhEIFAAK/Xi9Z6bEy4uRBjw7Zt8vk8djbL70Sj/O3ixdRZ1oT5fin5h85OvtvREQNuAt4cAyihSsEPrqipWf/kihXUW9YE99Fn2/zFkSNsS6Xwer0YhoEQ4gRQ0xpFZa7ruti2zVXhMD9Ytox5Xu+EeTnX5SvNzbybSj1vCPH7rtZ5g1GLOq/KMB75ywULuDwcxhl3cNpxuLejg5diMQzDQCmF4zinNJSrEFLQVigQL5e5PBLBO07clpTM9/l4dnBwnoa9wBFZiau3rQwGuba2dkKg1FrzwvAwPxkcBMB13ZkNrSZ+dka/0wtDuFqBJfnJyDAvDA9PkIIAzgsG+WI0GgG+BPhMwPII8fXPRSIs8HrJuO7YgmPFIg91d4+BnRCbQxbacdFFd7wsMaNejFo/9tEkSJBeAzwS79VN6Fo/SoOSEue1Dh7q7uaKSIRFFevWQL1lcX1tLa/H41cCi0zgNyKmWX1NNIo9DoSrNVvicTpVGXFWFcIjoawQloHnrBCy2qK8fwSVKCJMiRG28C+vIXBRHdl3+zEjFmZjEGN+FWJRGNEYwnEUZVtRHsgjV0Tp7O9iSzzOH8+bh1Fx7LLCxfle77m9tr3QBK6pNk3WVFfjKDUhMjzW1wd1AeQNn8EzP4RpCjxVHrxz/bj7h2FZBMMUGB6Jd14Q74IQTqxA8DMRRNjCUQLHUbgKHA1aGGgpUNUWanEEtW+Yx/v6+EZj4xhABZzt87HE76fXtleaAlYv8PmImCYZ55caeDif52ihgKhvwJjrR5RcSjv6cGwXp95P4II5hFbPx0BjaDBG2Y5Z40NpcB2NITQYAvtognxzjHJ/Hm0ZyEvnIef4kY0hjvT2c6RQYGUwOKZKdZbFWaMWvsKUQixf6vfDJB37154eODeCOL8WHIW7bxjdlcHJ2JQ+6Cf3YjuZZRHqbl1G6Nw6DMAQx9UDpFbYB0cY2nCEwpGKPtb4ENVe9C+G4Pw6WFWLyBV4qLubJ1esGNPDkJTUj/rJVaaA+jqP54So8XoqgXnVQkSVFxG04KIa3CUCQyksqSFVonwoQ8+/7KHxluXMvWEVpq/i1/J5Ei8doG/TEeRiH56b5yCjflwFrjQwayIIy8Ko8sIFtbz+Qtdkx0nYNBFCLJZAMGiaTHa5SdfFE/IgTYmDpqGqjpfXPc7btz+HpwuM/0mxtGoh0c/XE9tzjNzBXrTHQns85Jq7iX3Yhf+SMHrA5kb3SgJ9Jm/f/jyb1z1GQ9VcHBSGR+IJekiO8xzHxeyXEhNqTKBUVso3Oa2plhJ7uICsDmI4mk4zzX63i9uX3sRNX/k8h0Y+YuWFq5i/ZhGu5eGF3i2UhgcQSuHxGdx5113kY3HeZwfZ/Ai/e/PlnLd0OY/s+SldZhpPTiDQuCMFqifFZgGjyTAUTA2JhOM0TgZ4QSDIOy0J5III2C4BI8g9ux+nOdbKpedcgfGtLPlcgsFQlF3xNpy5frQWIExUrY/Nmfe4uHEpi746D49Xsqbpt/jz1/6RZzvfImD4Kdl5HNvBbUmyNhA8QcQZ18XVutvUWre1FQqNYlKCecvcOnZ0tKH3DyNXz0OVXCy/xbOd29nYsZWoN4SrSyh7N8FgENP0oiw/aHDsJAWZZ1PvLqQjMbIeNvT9J1oaWKYfJ++g86VRw+vIcMvCJRPOtpViqFQC2CcVfNiaz1NQakJqc/2cOSyRFvqjEVRPFjfn4LpgmX58vipKpkB4fVgePwqDQr9N2QpSsgJkO7MoYWF5Agivj5Ip8fmqsEw/ytG4OQfVk0HvHWGJtLh+zpzx1SNDpRI9tg1wQAJbE47DL9JpzHFcrDFN7m5qgqSNbonhjuRx8w6uq3GVxnErQwmK5TJFn0sukySfTeHWB7FdB8cFx9UT1+Qd3Fge1RKHpM3dTU3UVPJIKqVCt23TVigA7DOBt1OO42xNJMzfDIcpVyxKCMEVkQiXhcO8c2gE3RjE8RhAAB00wRRooDSUZVkhyjn1S9A9Cq01Us7nYGsbrf44Yk5w1L04Gifn4A7lUc0xaBnhsnCYKyIRxquXBppzOdoLhXbgmAkUikpteD0eX/9n8+cTlHLMJ9ZZFncvXMitBw+S2NGD65HgRtF1QXTQROFwc+NavrP2D2iom0dZlVCuwu8N0tvXyT99+DSbkrsxMHFy5VFwh+LoHd3UaMndCxdOSFxFRbw/GxkB2A60Hy/WhjNK3bY0EOD8YJDxXmmhz0etx8O7sQTFtgRaCrQUYEi8IRMrn6dWeWkfbKMn3smx4XZaultoHzrGmwO7GZE2pSEbtyuN2jsMb3YRUYK/W7yY3x6ne8dpTybD/ceOpYF/BvaJCvKwhie/PGfOjY8uW0bENE+ILM8MDvJQVxdHCgU4qwp5fh3eKxcQqjEIFArochlhjvoz5WqkYZAPBMgmFfb2LtS+IejNsMzv56/OPpuv1defAK6kFF9vaeGVWOznhhBfc7XOGsctG8h0FAo3XFBVZa0IBE5YvCoUYk11NYYQdAylKLQncZQg75pkkop0AtIxTTquySQhndLkBko47/ejt3cSyTqsq6/nvqYmro5Gp6yVd6bTfK+jIw08oGHPhKJJgl/Bo5eEw+s3rVxJZJxlTb7l5liM9S0tYEoI+47Hp0ndJjGq8akiOIofn3MO19XWYkk55b5eKbl0zx72ZDI7KkX8lIX7F4AfPbJ8+YLfq69HTlMEuVqzORZjw8AAjtaEDAO/YYzNV0DBdcm6LqYQrGto4Lra2rGcbypwTw0M8EeHDtnAjcDLJ+ssPBbxeL7RvHatqDaMk7Y6nEn1xISAP76hKMS0rRAJFLVm+c6dxMrll4HrJvRzptCFg0Wlvpxy3Zpro1H0SUpJY4ZDnKRP45WSbx49ynupVKHSEM1MvsDkm7cBDz/R16e2JhL4pOSTIp+UbI7F2Dg0hIa7gN6pODwVfR947VtHj9JXKk0IgWeKTCHotW0e6Owk57qvAf8xnQpM1yL702PFYua+9nasTwDg8aJsdyaTBL4NuFP2FE+yRwro7ioWbzzb52N1VRXlU2xcTtV225lOc29HBxnXvVvCzzRTq/vHKdhzScd56Yc9PXQUCtO6idnScLnM93t7GSyVXgM2qWm4NxOAReCunel05r/6+zkT/FPA1kSCF4eHY8APpzKMmYr4eH6W1FBsLxavWVNVxQKv95SBCqC/VGLdwYM677o/Bv7tY/vaHzdBg5JCdKYdZ3VOqUVXR6N4TlHUphD8dWsrO9Ppw4YQd2hInjbACsgMkG3J5b54YSjkXz5FMvFx5K10Ue/r6NDAXRremOED0ozpeWDLPe3tFJSatWjzSnFnayvANuDJGT9dzJIRLSnHuVlrHbwmGp3e9CZRlWlyX3s7r8Zi6NFwlpjFE9ys6CDwo4e6u90u2z7pW8h4vdubzfLUwAAKHmQ0lPJJAUTAd4HhO1tb8c4Q4L93dzNcLseA7832vFkD1KO+8W82x2K8k0pN6DFPJktK/i+VYlsigdL6XgGFTxxghYtPuFofeaCrCz1NUikqSevGoSG6i8Vm4IXpwtkZB6hBafj2B+k02xKJKbloCMGBXI5XYzGAh00hRk7lrNNJ9l6Pl8v7nx5V/hO4aCvFtkSCzmLxI2CHo7X6VQPMAw/uSqf5YFLb5HhIe3ZoCOAl4PCpHnI6ABXwdmuh0Lk9kTjhh93pNC25XBuw5XSSi9PK5wUMAs9sTyTosu2xzUpK8WR/P4zWtu/+2gBWXM62D9Lp/KFcDoRAAD22zZvJZBp45XTTs9OuiCpV4Dtvp1IUXBcpBBtHdW9Iwou/doAa+oCdW+JxUpVC/amBAQW8p2YRc6eNRGeoBnq/OZsdGLTthoFSiV7bLlWyHz4tAHcBnW8kkw2J0dcqG9j8aQI4BLS+kUhc3DXaW36XWf4F6ldBt3ulzFTaMnfwKaQLgYEKwMV8SqmtUvCfuRbJGQZ4gFn8o24m9P+CFgeM4K5ojgAAAABJRU5ErkJggg=="; 
        
        var redIcon = L.icon({
            iconUrl:       iconRedHulk,
            iconSize:      [22, 37],
            iconAnchor:    [11, 36]
        });

        var data = $.parseJSON(response.responseText);
        var geojson = L.geoJson(data, {
            pointToLayer: function(feature, latlng) {
                return new L.marker(latlng, {icon: redIcon});
            },
            onEachFeature: function (feature, layer) {
                layer.bindPopup("Name: " + feature.properties.name + "<br/>Nick: " + feature.properties.nick + "<br/>Time: " + feature.properties.time, {offset: [0,-20]});
            }
        });
                
        if( window.igiLayer ) {
                        window.igiLayer.clearLayers();
            console.log("Cleare IGI layer");
                }

        geojson.addTo(map);
        window.igiLayer = geojson;
               
        }
  });

}
setInterval(kombina, 10000);
kombina();

function wrapper(plugin_info) {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};



// PLUGIN START ////////////////////////////////////////////////////////


// use own namespace for plugin
window.plugin.igiLayer = function() {};

window.plugin.igiLayer.addLayer = function() {
};

var setup =  window.plugin.igiLayer.addLayer;

// PLUGIN END //////////////////////////////////////////////////////////


setup.info = plugin_info; //add the script info data to the function as a property
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);
