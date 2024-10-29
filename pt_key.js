/**
 * 自动获取jdcookie

名称:pt_key
描述:获取京东ck
支持:仅测试Quantumult-X
更新日志:2024.10.29修改脚本一直处于运行状态，添加多账号获取
说明:获取新ck切换账号后，直接退后台重进
TG频道:https://t.me/LXi_Collection_hall
TG群聊:https://t.me/LxiCollectionhallChat

脚本声明:：
 1. 本脚本仅用于学习研究，禁止用于商业用途。
 2. 本脚本不保证准确性、可靠性、完整性和及时性。
 3. 任何人或组织可自由使用，无需通知。
 4. 作者不对使用本脚本产生的任何损失或问题负责。
 5. 如认为脚本侵犯权益，请提供身份证明与所有权证明，我将在确认后删除相关内容。
 6. 请勿将本脚本用于商业用途，后果自负。
 7. 本脚本版权归作者所有。

===================|调试区|====================

[rewrite_local]
^https?:\/\/api\.m\.jd\.com\/client\.action\?functionId=(wareBusiness|serverConfig|basicConfig) url script-request-header pt_key.js

[MITM]
hostname = %APPEND% api.m.jd.com
*/

//获取 Cookie
let rawCookie = $request.headers["Cookie"] || $request.headers["cookie"];
let ptPinMatch = rawCookie.match(/pt_pin=([^;]+);/);
let ptKeyMatch = rawCookie.match(/pt_key=([^;]+);/);
if (ptPinMatch && ptKeyMatch) {
let ptPin = ptPinMatch[1];
let currentJdCookie = `pt_pin=${ptPin};pt_key=${ptKeyMatch[1]};`;
let previousJdCookie = $prefs.valueForKey(`jdCookie_${ptPin}`) || "";
if (currentJdCookie !== previousJdCookie) {
// 如果不重复或账号变化，则通知并存储新的 Cookie
$notify("Cookie已更新", `账号: ${ptPin}`, currentJdCookie);
$prefs.setValueForKey(currentJdCookie, `jdCookie_${ptPin}`);
} 
} else {
$notify("错误", "", "无法从Cookie中提取pt_pin或pt_key。");
}
$done({});