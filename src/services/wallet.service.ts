import http from "../http-common";
import IWalletData from "../types/wallet"

class WalletDataService {
    getAll() {
        return http.get<Array<IWalletData>>("/wallets");
    }

    get(id: string) {
        return http.get<IWalletData>(`/wallets/${id}`);
    }

    create(data: IWalletData) {
        return http.post<IWalletData>("/wallets", data);
    }

    credit(id: any, amount: number) {
        return http.post<any>(`/wallets/top-up/${amount}/${id}`);
    }

    debit(id: any, amount: number) {
        return http.post<any>(`/wallets/debit/${amount}/${id}`);
    }

    w2w(fromId: any, amount: number, toId: any) {
        return http.post<any>(`/wallets/transfer/${amount}/${fromId}/${toId}`);
    }
}

export default new WalletDataService();