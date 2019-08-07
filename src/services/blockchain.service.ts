import Web3 from 'web3';
import Contract from 'web3/eth/contract';
import { Injectable } from '@angular/core';
import Axios from 'axios';


interface ContractInfo {
    readonly abi: any;
    readonly bytecode: string;
    readonly deployedBytecode: string;
}

const NETWORKS = {
    '1': 'Main Net',
    '3': 'Ropsten test network',
    '4': 'Rinkeby test network',
    '42': 'Kovan test network',
    '4447': 'Truffle Develop Network',
    '5777': 'Ganache Blockchain'
}

const factoryAddressMap = {
    '1': '',
    '3': '0x32Dd01721370E219Eb1c114678293f3A5E24a08E'
};

export interface NetworkInfo {
    netId: number;
    netName: string;
    address: string;
}

async function loadContractInfo(url: string): Promise<ContractInfo> {
    return await Axios.get(url).then(resp => resp.data);
}

enum ContractType {
    Factory,
    Registry,
    Token,
    Controller,
    Mock
}

function toBytes(str: string): string {
    return this.web3.utils.fromAscii(str);
}

export interface Investor {
    address: string;
    isUsaUser: boolean;
}

@Injectable()
export class BlockchainService {
    networkId: number;
    initialized: boolean = false;
    web3: Web3;
    factoryAddress: string;
    account: string;
    factoryContractInfo: ContractInfo;
    factoryContract: Contract;
    registryContract: Contract;
    urls: { [key: number]:string } = {};
    contracts: { [key: number]:Contract } = {};

    constructor() {
        this.urls[ContractType.Factory] = './assets/contracts/BankorusFactory.json';
        this.urls[ContractType.Registry] = './assets/contracts/IRegistry.json';
        this.urls[ContractType.Token] = './assets/contracts/BankorusToken.json';
        this.urls[ContractType.Controller] = './assets/contracts/Controller.json';
        this.urls[ContractType.Mock] = './assets/contracts/Mock.json';
    }

    private async loadContract(url: string, address: string): Promise<any> {
        return await Axios.get(url)
                          .then(resp => {
                              const data = resp.data;
                              return new this.web3.eth.Contract(data.abi, address);
                            });
    }

    public async initialize(networkId: number): Promise<boolean> {
        this.networkId = networkId;
        if (this.initialized) return Promise.resolve(true);
        const provider = Web3.givenProvider;
        if (provider === null) throw new Error('metamask_not_found');
        this.web3 = new Web3(provider);
        console.log('web3', this.web3);
        await this.checkNetwork();
        const accounts = await this.web3.eth.getAccounts();
        if (accounts.length === 0) throw new Error('not_avaiable_account');
        this.account = accounts[0];
        const factoryAddress = factoryAddressMap[this.networkId];
        if (!factoryAddress) throw new Error(`not find factory address for net ${this.networkId}`);
        this.factoryAddress = factoryAddress;
        this.initialized = true;

        return true;
    }

    public async checkNetwork(): Promise<boolean> {
        const curNetworkId = await this.web3.eth.net.getId();
        const specifiedNetwork = NETWORKS[this.networkId];
        return curNetworkId === specifiedNetwork;
    }

    private async estimateGas(method: any): Promise<number[]> {
        console.log(method);
        // const gas = await method.estimateGas();
        const gas = 6000000;
        const gasPrice:any  = await this.web3.eth.getGasPrice();
        return [Math.round(gas * 1.1), gasPrice* 1.2];
    }

    private async _send(method: any): Promise<any> {
        const [gas, gasPrice] = await this.estimateGas(method);
        console.log('send method', method.arguments[0], 'gas', gas, 'gasPrice', gasPrice);
        const receipt = await method.send({from: this.account, gas: gas, gasPrice});
        return receipt;
    }

    private async _call(method: any): Promise<any> {
        const [gas, gasPrice] = await this.estimateGas(method);
        console.log('call method', method.arguments[0], 'gas', gas, 'gasPrice', gasPrice);
        const receipt = await method.call({from: this.account, gas: gas, gasPrice});
        return receipt;
    }

    private async getContract(id: ContractType, address: string): Promise<Contract> {
        const url = this.urls[id];

        if (!url) throw new Error(`${id} definition not found`);

        let contract = this.contracts[name];

        if (!contract) {
            contract = await this.loadContract(url, address);
            this.contracts[id] = contract;
        }

        return contract;
    }

    private check() {
        if (!this.initialized) throw new Error('not_avaiable_account');
    }

    public async create(name: string, symbol: string, totalSupply: number, startAt: number, regulation: string, amountFund: number, currency: string): Promise<string[]> {
        this.check();
        const contract = await this.getContract(ContractType.Factory, this.factoryAddress);
        const method = contract.methods.create(name, symbol, totalSupply, 0, startAt, regulation);
        const receipt = await this._send(method);
        const eventData = receipt.events.NewVTF.returnValues;
        const addresses = [eventData.controller, eventData.registry, eventData.token];
        console.log('receipt', receipt);
        console.log('address', addresses);
        return addresses;
    }

    public async load(token: string, controller: string, registry: string): Promise<boolean> {
        await Promise.all([
            this.getContract(ContractType.Registry, registry),
            this.getContract(ContractType.Controller, controller),
            this.getContract(ContractType.Token, token)
        ]);

        return true;
    }

    private async getStub() {
        return await this.getContract(ContractType.Mock, "0x896f4678839bc031423ede78658df8f9924d46c8");
    }

    public async loadFromChain(): Promise<boolean> {
        const contract = await this.getContract(ContractType.Factory, this.factoryAddress);
        const method = await contract.methods.getAddresses();
        await this._call(method);
        return true;
    }


    public async addInvestor(investor: Investor): Promise<boolean> {
        this.check();
        const contract = await this.getStub();
        const attr = toBytes("isUsaUser");
        const val = this.web3.utils.fromAscii(investor.isUsaUser + '');
        const method = await contract.methods.call("update", investor.address + ',isUsaUser,' + investor.isUsaUser);
        const receipt = await this._send(method);
        console.log("addInvestor", receipt);
        return true;
    }

    private generateInvestorData(inverstors : Investor[]): string {
        let result = "";

        for (let investor of inverstors) {
            result += investor.address + ',isUsaUser,' + investor.isUsaUser;
        }
        return result;
    }

    public async addInvestors(inverstors: Investor[]): Promise<boolean> {
        this.check();
        console.log('inverstors====', inverstors);
        if (inverstors.length > 50) {
            throw new Error('too_many_investors');
        }

        if (inverstors.length == 0) {
            throw new Error('no_investors');
        }

        const contract = await this.getStub();
        const method = await contract.methods.call("update", this.generateInvestorData(inverstors));
        const receipt = await this._send(method);
        console.log("addInvestors", receipt);
        return true;
    }

    public async isTransferAllowed(from: string, to: string): Promise<boolean> {
        this.check();
        if (!this.contracts[ContractType.Controller]) throw new Error('call load before interact with chain');
        const contract = this.contracts[ContractType.Controller];
        const method = await contract.methods.isTransferAllowed(from, to);
        const receipt = await this._call(method);
        return receipt;
    }

    public async transfer(receiver: string, amount: number): Promise<boolean> {
        this.check();
        const contract = await this.getStub();
        const method = await contract.methods.call("transfer", receiver + ',' + amount );
        const receipt = await this._send(method);
        console.log("transfer complete", receipt);
        return true;
    }
}
