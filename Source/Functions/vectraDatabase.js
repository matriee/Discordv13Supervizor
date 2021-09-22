const RegisterData = require('../Database/RegisterData');
const CezaData = require('../Database/CezaData');
const YetkiliData = require('../Database/YetkiliData');
const UsernameData = require('../Database/UsernameData')
const settings = require('../Settings/settings.json')


class vectraDatabase {

    static async man(user, admin) {
        await user.roles.add(settings.ManRole);
        await user.roles.remove(settings.Unregister); 
        let registerData = await RegisterData.findOne({ Kisi: user.id })
        if(!registerData){
            let v = await new RegisterData({ Kisi: user.id, AdminID: admin.id, Man: 1, Woman: 0, Total: 1}); v.save() 
        }else {
            await registerData.Man++; registerData.Total++; registerData.save();
        }
    }

    static async woman(user, admin){        
        await user.roles.add(settings.WomanRole);
        await user.roles.remove(settings.Unregister);
        let registerData = await RegisterData.findOne({ Kisi: user.id })
        if(!registerData){
            let e = await new RegisterData({ Kisi: user.id, AdminID: admin.id, Man: 0, Woman: 1, Total: 1}); e.save() 
        }else {
            await registerData.Woman++; registerData.Total++; registerData.save();
        }
    }

    static async username(user, admin, tami){
        let userName = UsernameData.findOne({ Kisi: user.id })
        if(!userName){
            let vec = await new UsernameData({ Kisi: user.id, Tamisim: tami, AdminID: admin.id }); vec.save();
        }else {
            await UsernameData.findOneAndUpdate({ Kisi: user.id, Tamisim: tami, AdminID: admin.id })
        }

    }

    static async ykayit(admin) {
        let yregisterData = await YetkiliData.findOne({  Yetkili: admin.id })
        if(!yregisterData){
            let c = await new YetkiliData({Yetkili: admin.id, Ban: 0, Jail: 0, Mute: 0, Reg: 1, Puan: 10 }); c.save();
        }else {
            await YetkiliData.findOneAndUpdate({ Yetkili: admin.id, Ban: 0, Jail: 0, Mute: 0, Reg: 1, Puan: 10 });
        }
    }

    
    static async yjail(user, admin) {

        //Member Kısmı
        await settings.guildID.members.cache.get(user.id).roles.add(settings.JailRole)
        let cmuteData = await CezaData.findOne({ Kisi: user.id })
        if(!cmuteData){
            let vect = await new CezaData({ Kisi: user.id, Sebep: sebep, Ban: 0, Jail: 1, Mute: 0, Puan: 75 })
        }else {
            await CezaData.findOneAndUpdate({ Kisi: user.id, Sebep: sebep, Ban: 0, Jail: 1, Mute: 0, Puan: 75 });
        }


        //Admin Kısmı

        let yjailData = await YetkiliData.findOne({  Yetkili: admin.id })
        if(!yjailData){
            let t = await new YetkiliData({Yetkili: admin.id, Ban: 0, Jail: 1, Mute: 0, Reg: 0, Puan: 50 }); t.save();
        }else {
            await YetkiliData.findOneAndUpdate({ Yetkili: admin.id, Ban: 0, Jail: 1, Mute: 0, Reg: 0, Puan: 50 });
        }
    }

    
    static async yban(user, admin, sebep) {


        //Member Kısmı
        let cmuteData = await CezaData.findOne({ Kisi: user.id })
        if(!cmuteData){
            let vect = await new CezaData({ Kisi: user.id, Sebep: sebep, Ban: 1, Jail: 0, Mute: 0, Puan: 100 })
        }else {
            await CezaData.findOneAndUpdate({ Kisi: user.id, Sebep: sebep, Ban: 1, Jail: 0, Mute: 0, Puan: 100 });
        }

        //Admin Kısmı
        let ybanData = await YetkiliData.findOne({  Yetkili: admin.id })
        if(!ybanData){
            let r = await new YetkiliData({Yetkili: admin.id, Ban: 1, Jail: 0, Mute: 0, Reg: 0, Puan: 50 }); r.save();
        }else {
            await YetkiliData.findOneAndUpdate({ Yetkili: admin.id, Ban: 1, Jail: 0, Mute: 0, Reg: 0, Puan: 50 });
        }
    }

    
    static async ymute(user, admin, sebep) {

        //Member Kısmı
        let cmuteData = await CezaData.findOne({ Kisi: user.id })
        if(!cmuteData){
            let vect = await new CezaData({ Kisi: user.id, Sebep: sebep, Ban: 0, Jail: 0, Mute: 1, Puan: 50 })
        }else {
            await CezaData.findOneAndUpdate({ Kisi: user.id, Sebep: sebep, Ban: 0, Jail: 0, Mute: 1, Puan: 50 });
        }

        //Admin Kısmı

        let ymuteData = await YetkiliData.findOne({  Yetkili: admin.id })
        if(!ymuteData){
            let a = await new YetkiliData({Yetkili: admin.id, Ban: 0, Jail: 1, Mute: 0, Reg: 0, Puan: 25 }); a.save();
        }else {
            await YetkiliData.findOneAndUpdate({ Yetkili: admin.id, Ban: 0, Jail: 1, Mute: 0, Reg: 0, Puan: 25 });
        }
    }


}