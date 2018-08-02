const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {interface,bytecode} = require('../compile');
const assert = require('assert');
let contract;
let accounts;
beforeEach(async ()=>{
    accounts = await web3.eth.getAccounts();
    contract =await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data:bytecode
        }).send({
            from:accounts[0],
            gas:'3000000'
        });
});
describe('测试智能合约',()=>{
    it('测试编译和部署',async()=>{
        assert.ok(contract.options.address)
    })
})
describe('测试区块链智能合约的投注方法',async()=>{
    it('测试彩票智能合约的投注方法,正确案例',async ()=>{
        const benginMoney = await contract.methods.getBalance().call();
        await contract.methods.enter().send({
            from:accounts[1],
            gas:'1000000',
            value: 1000000000000000000
        });
        const endMoney = await contract.methods.getBalance().call();
        console.log(endMoney-benginMoney);
        assert.equal('1000000000000000000',(endMoney-benginMoney));
    });

    it('测试彩票智能合约的投注方法,失败案例',async ()=>{
        console.log('bengin');
        try {
            await contract.methods.enter().send({
                from: accounts[1],
                gas: '1000000',
                value: 20000000000000000
            });
            assert(false);
        }catch (error){
            assert.ok(error);
        }
    });
})
