import { Tabs } from 'antd';
import './Energy.css'
import { Language } from "../store/interfaces";
import { CryptoEnergies } from "./sections/CryptoEnergies";
import { InfraEnergies } from "./sections/InfraEnergies";
import { PersonalEnergies } from "./sections/PersonalEnergies";
import { EnergyIntro } from "./sections/EnergyIntro";
import { EnergyConclusion } from "./sections/EnergyConclusion";
export function Energy(lang: Language){
    return(
        <>
            {/* <div className="Energy-body-left">
                <Tabs tabPosition="left" className="Energy-tabs">
                    <Tabs.TabPane tab={lang.side_bar.tab1} key="1">
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={lang.side_bar.tab2} key="2">
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={lang.side_bar.tab3} key="3">
                    </Tabs.TabPane>
                </Tabs>
            </div> */}
            <div className="Energy-body-right">
                <EnergyIntro {...lang}> </EnergyIntro>
                <InfraEnergies {...lang}> </InfraEnergies>
                <PersonalEnergies {...lang}> </PersonalEnergies>
                <CryptoEnergies {...lang}></CryptoEnergies>
                <EnergyConclusion {...lang}></EnergyConclusion>
            </div>
        </>
    )
}