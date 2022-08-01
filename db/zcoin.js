const Member = require("../models/member");

/**
 * It takes a member object, finds the member in the database, and returns the member data.
 * @param member - The member object.
 * @returns A promise.
 */
 async function getMember(member) {
    const memberData = await Member.findOne({id: member.id});
    return memberData;
}

/**
 * It gets a member's money.
 * @param member - The member you want to get the money of.
 * @returns The value of the member.zcoin property.
 */
async function getMemberMoney(member) {
    member = await getMember(member);
    return member.zcoin;
}


/**
 * Create a new member object, save it to the database, and log the new member's id to the console.
 * @param member - {
 */
function createMember(member){
    const newMember = new Member({id: member.id, guildId: member.guild.id});
    newMember.save().then(u => console.log(`New wallet for -> ${u.id}`));
}

/**
 * It updates a member's data in the database.
 * @param member - The member object
 * @param settings - {
 * @returns The return value is a promise.
 */
async function updateMember(member, settings) {
    let memberData = await getMember(member);
    if (typeof memberData != "object") memberData = {};
    for (const key in settings){
        if (memberData[key] != settings[key]) memberData[key] = settings[key];
    }
    return memberData.updateOne(settings);
}

/**
 * It adds money to a member
 * @param member - The member object or the member's id.
 * @param amount - The amount of money to add to the member.
 */
async function addMoney(member, amount){
    member = await getMember(member);
    member.zcoin += amount;
    updateMember(member, {zcoin: member.zcoin});
}

/**
 * It removes money from a member
 * @param member - The member you want to remove money from.
 * @param amount - The amount of money to remove from the user.
 */
async function removeMoney(member, amount){
    member = await getMember(member);
    member.zcoin -= amount;
    updateMember(member, {zcoin: member.zcoin});
}

/**
 * It finds the top 10 members in a guild by zcoin and returns them.
 * @param guildId - The ID of the guild you want to get the leaderboard of.
 * @returns An array of objects.
 */
async function leaderboard(guildId){
    const guildLeaderboard = await Member.find({guildId: guildId}).sort({zcoin: -1}).limit(10);
    return guildLeaderboard;
}

/**
 * If the member's daily date is not equal to the current date, then set the member's daily date to the
 * current date, add 1000 zcoins to the member's zcoin count, update the member's zcoin count and daily
 * date, and return a message saying that the member has received 1000 zcoins. Otherwise, return a
 * message saying that the member has already received their daily zcoins.
 * @param member - The member object.
 * @returns a promise.
 */
async function daily(member){
    member = await getMember(member);
    const now = new Date();
    if (member.daily.getDate() != now.getDate()){
        member.daily = now;
        member.zcoin += 1000;
        updateMember(member, {zcoin: member.zcoin, daily: member.daily});
        return `You have received 1000 zcoins!`;
    }else {
        return `You have already received your daily zcoins!`;
    }
}


/**
 * It takes a member, another member, and an amount, and gives the amount of zcoin from the first
 * member to the second member
 * @param member - The member who is giving the money.
 * @param oMember - The member you're giving the money to.
 * @param amount - The amount of zcoin to give.
 * @returns a promise.
 */
async function give(member, oMember, amount){
    member = await getMember(member);
    oMember = await getMember(oMember);
    if (member.id == oMember.id) return `You can't give money to yourself!`;
    if (member.zcoin < amount) return `You don't have enough zcoin!`;
    member.zcoin -= amount;
    oMember.zcoin += amount;
    updateMember(member, {zcoin: member.zcoin});
    updateMember(oMember, {zcoin: oMember.zcoin});
}

module.exports = {getMemberMoney, getMember, createMember, updateMember, addMoney, removeMoney, leaderboard, daily, give};