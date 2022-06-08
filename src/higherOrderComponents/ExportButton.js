import '../styles/Export.css'
import GetFileCSV from '../components/GetFileCSV';

export default function Export(props){

    function handleExport(){

            // Hardcoded sorted  array with keys (headers)
            let allKeys = [
                '',
                'Vorname', 
                'Nachname',
                'Position',
                'Mantel',
                'Mantel',
                'Jacke',
                'Jacke',
                'Hose',
                'Hose',
                'Hemd',
                'Hemd',
                'Kappe', 
                'Kappe',
                '',
                'Hose' ,
                'Hose',
                'Tshirt', 
                'Tshirt' ,
                'Polo' ,
                'Polo' ,
                'Bluse' ,
                'Bluse' ,
                'Fleece' ,
                'Fleece',
                '',
                'Schutzjacke',
                'Schutzjacke' ,
                'Schutzhose',
                'Schutzhose',
                'Einsatzstiefelschwarz', 
                'Einsatzstiefelschwarz',
                'Einsatzstiefelgelb' ,
                'Einsatzstiefelgelb',
                'Einsatzhandschuhe',
                'Einsatzhandschuhe',
                'Kappe',
                'Kappe',
                'Haube',
                'Haube',
                'Helm' ,
                'Helm' ,
                'Gurt',
                'Gurt',
                'Textarea' 
            ];
            // Create array to receive member values
            let csvArray = [allKeys];
            // Get sorted array with the member values
            for (const member of props.data) {
                const memberObject = [];

                memberObject.push(':');
                member.firstName ? memberObject.push(member.firstName) :  memberObject.push('');
                member.lastName ? memberObject.push(member.lastName) :  memberObject.push('');
                member.ffposition ? memberObject.push(member.ffposition) :  memberObject.push('');
                member.mantelS ? memberObject.push(member.mantelS) :  memberObject.push('');
                member.mantelB ? memberObject.push(member.mantelB) :  memberObject.push('');
                member.jackeS ? memberObject.push(member.jackeS) :  memberObject.push('');
                member.jackeB ? memberObject.push(member.jackeB) :  memberObject.push('');
                member.hoseS ? memberObject.push(member.hoseS) :  memberObject.push('');
                member.hoseB ? memberObject.push(member.hoseB) :  memberObject.push('');
                member.hemdS ? memberObject.push(member.hemdS) :  memberObject.push('');
                member.hemdB ? memberObject.push(member.hemdB) :  memberObject.push('');
                member.kappeS ? memberObject.push(member.kappeS) :  memberObject.push('');
                member.kappeB ? memberObject.push(member.kappeB) :  memberObject.push('');
                memberObject.push('');
                member.hose2S ? memberObject.push(member.hose2S) :  memberObject.push('');
                member.hose2B ? memberObject.push(member.hose2B) :  memberObject.push('');
                member.tshirtS ? memberObject.push(member.tshirtS) :  memberObject.push('');
                member.tshirtB ? memberObject.push(member.tshirtB) :  memberObject.push('');
                member.poloS ? memberObject.push(member.poloS) :  memberObject.push('');
                member.poloB ? memberObject.push(member.poloB) :  memberObject.push('');
                member.bluseS ? memberObject.push(member.bluseS) :  memberObject.push('');
                member.bluseB ? memberObject.push(member.bluseB) :  memberObject.push('');
                member.fleeceS ? memberObject.push(member.fleeceS) :  memberObject.push('');
                member.fleeceB ? memberObject.push(member.fleeceB) :  memberObject.push('');
                memberObject.push('');
                member.schutzjackeS ? memberObject.push(member.schutzjackeS) :  memberObject.push('');
                member.schutzjackeB ? memberObject.push(member.schutzjackeB) :  memberObject.push('');
                member.schutzhoseS ? memberObject.push(member.schutzhoseS) :  memberObject.push('');
                member.schutzhoseB ? memberObject.push(member.schutzhoseB) :  memberObject.push('');
                member.einsatzstiefelschwarzS ? memberObject.push(member.einsatzstiefelschwarzS) :  memberObject.push('');
                member.einsatzstiefelschwarzB ? memberObject.push(member.einsatzstiefelschwarzB) :  memberObject.push('');
                member.einsatzstiefelgelbS ? memberObject.push(member.einsatzstiefelgelbS) :  memberObject.push('');
                member.einsatzstiefelgelbB ? memberObject.push(member.einsatzstiefelgelbB) :  memberObject.push('');
                member.einsatzhandschuheS ? memberObject.push(member.einsatzhandschuheS) :  memberObject.push('');
                member.einsatzhandschuheB ? memberObject.push(member.einsatzhandschuheB) :  memberObject.push('');
                member.kappe3S ? memberObject.push(member.kappe3S) :  memberObject.push('');
                member.kappe3B ? memberObject.push(member.kappe3B) :  memberObject.push('');
                member.haubeS ? memberObject.push(member.haubeS) :  memberObject.push('');
                member.haubeB ? memberObject.push(member.haubeB) :  memberObject.push('');
                member.helmS ? memberObject.push(member.helmS) :  memberObject.push('');
                member.helmB ? memberObject.push(member.helmB) :  memberObject.push('');
                member.gurtS ? memberObject.push(member.gurtS) :  memberObject.push('');
                member.gurtB ? memberObject.push(member.gurtB) :  memberObject.push('');
                // member.textarea ? memberObject.push(member.textarea) :  memberObject.push(''); Problem with this in csv fil

                csvArray.push(memberObject);
            };
            GetFileCSV(csvArray);

    };

    return (
        <div>
                <button className='export-button' onClick={handleExport} title='Exportiere die Datenbank in eine CSV Datei'>export</button>
        </div>
    )
};
