

import { useEffect } from "react";
import { Language, ResponsivePieInterface, CoinData } from "../../store/interfaces";
import { Coin } from "../../store/interfaces";
import axios, { AxiosResponse } from 'axios';
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../store";
import { ResponsivePie } from '@nivo/pie'
import './CoinGraph.css'


export function CoinGraph(lang: Language): JSX.Element{

    
    const dispatch = useDispatch();

    const coinsToPrint: Coin[] = useTypedSelector((state) => state.reducers.coins);

    const graphData = toGraphData(coinsToPrint);

    function toGraphData(coins: Coin[]): ResponsivePieInterface[] {
        return coins.map((coin: Coin) => {
            return {
                id: coin.coin,
                label: coin.coin,
                value: coin.ratedPower,
                color: coin.ratedPower
            }
        })
    }

    const coinList: Map<string, boolean> = new Map([
        ['BTC', true],
        ['ETH', true],
        ['BCH', true],
        ['BSV', true],
        ['LTC', true],
        ['XMR', true],
        ['DASH', true],
        ['ETC', true],
        ['ZEC', true],
        ['DOGE', true],
        ['BTG', true],
        ['DCR', true],
        ['RVN', true],
        ['MONA', true],
        ['BTM', true],
        ['SC', true],
        ['DGB', true],
        ['ZEN', true],
        ['KMD', true],
        ['BCN', true],
    ]);

    let hashEfficiency: Map<string, number> = new Map([
        ['SHA-256', 25300000000],
        ['Scrypt', 827000],
        ['X11', 12200000],
        ['Equihash', 90],
        ['Blake', 18900000000],
        ['Tensority', 182],
        ['Sia', 1220000000],
        ['CryptoNight', 500],
        ['Lyra2REv2', 11700000],
    ]);

    //URL to fetch from
    const url = "https://api.minerstat.com/v2/coins";

    useEffect(() => {

        fetchData().then((response: CoinData[]) => {
            const newCoins = prepareData(response);
            saveCoins(newCoins);
        });
        
    }) 
    
    function prepareData(data: CoinData[]){
        const coins: Coin[] = [];
        let CoinMap = new Map<string, boolean>();
        data.forEach(coin => {
            const coin_data: Coin = {
                coin: coin.coin,
                network_hashrate: coin.network_hashrate,
                algorithm: coin.algorithm,
                ratedPower: hashEfficiency.has(coin.algorithm) ? coin.network_hashrate / (hashEfficiency.get(coin.algorithm) || 0) / 1000000000 : -1
            }
            if (coin_data.ratedPower !== -1 && !CoinMap.has(coin_data.coin)) {
                coins.push(coin_data);
                CoinMap.set(coin_data.coin, true);
            }
        });
        return coins.sort((a, b) => b.ratedPower - a.ratedPower);
    }
    
    function saveCoins(coins: Coin[]){
        if (coinsToPrint.length === 1) {
            dispatch({type: "SET_COINS", payload: coins});
        }   
    }

    async function fetchData(){         
        return await axios.get(url).then((response: AxiosResponse<CoinData[]>) => {
            return (response.data.filter(coin => coinList.has(coin.coin)));
        });
    }
    
    return(
        <div>
            <div className="Pie-chart-container-desktop">
                <ResponsivePie
                    data={graphData}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    valueFormat=" >-.5r"
                    padAngle={0.7}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
                />
            </div>
            <div className="Pie-chart-container-mobile">
                <ResponsivePie
                    data={graphData}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    valueFormat=" >-.5r"
                    padAngle={0.7}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
                />
            </div>
        </div>
    )
        
}