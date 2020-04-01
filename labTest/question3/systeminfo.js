const os = require('os');

// return  CPU architecture - hostname - operating system type
const systemInfo = ()=>{
    let cpu = os.arch();
    let hostname = os.hostname();
    let opSys = os.platform();

    return `Operating System Info:: CPU Architecture: ${cpu}, Host name: ${hostname}, OS name: ${opSys}`;
}

// return username - home directory
const userInfo = () =>{
    let homeDir = os.homedir();
    let {username}= os.userInfo();

    return `User Info:: User name: ${username}, Home dir: ${homeDir}`
}

module.exports.systemInfo = systemInfo;
module.exports.userInfo = userInfo;


