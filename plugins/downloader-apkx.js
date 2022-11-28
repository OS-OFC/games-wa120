import  fetch from 'node-fetch'
let handler = async (m,{conn,text,args})=>{
if (!args[0]) throw 'Ex: .apk minecraft'
m.reply("*LOADING...*")
let res = await apk(text)
if(res.obb==true){
let buttons = [{ buttonText: { displayText: 'Download'}, buttonId: `.doapk ${text}` },{ buttonText: { displayText: 'OBB'}, buttonId: `.obb ${text}` }]
 conn.sendMessage(m.chat, { image: { url: res.icon }, caption: '*name* : '+res.name +'\n*package* : '+res.packageN +'\n*obb* : '+res.obb_link , footer: '_Apk files......._', buttons }, { quoted: m })
}else if(res.obb ==false){
let buttons = [{ buttonText: { displayText: 'Download'}, buttonId: `.doapk ${text}` }]
conn.sendMessage(m.chat, { image: { url: res.icon }, caption: '*name* : '+res.name +'\n*package* : '+res.packageN +'\n*obb* : '+res.obb_link , footer: '_Apk files......._', buttons }, { quoted: m })
}
}
handler.command = /^(apk|apkx)$/i
export default handler 
async function apk(url) {
	let res = await fetch('http://ws75.aptoide.com/api/7/apps/search?query='+url+'&limit=1')
	let $ = await res.json()
try {
let icon = $.datalist.list[0].icon
} catch {
throw 'Can\'t download the apk!'
}
	let icon = $.datalist.list[0].icon
	let name = $.datalist.list[0].name
	let packageN = $.datalist.list[0].package
	let download = $.datalist.list[0].file.path
let obb_link;
let obb;
try { obb_link = await $.datalist.list[0].obb.main.path
obb = true
} catch { 
obb_link = await "_not avalable_" 
obb = await false
};

	if (!download) throw 'Can\'t download the apk!'
	return {obb,obb_link, name, icon, packageN}
	 }