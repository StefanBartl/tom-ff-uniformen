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
            for (const [i, member] of props.data.entries()) { // .entries() to make destructoring possible (to get the a increasing index) in a for / of loop
    
                const memberObject = [];

                //#region  member values

                memberObject.push(`${i + 1}.`);
                member.firstName ? memberObject.push(member.firstName) :  memberObject.push('');
                member.lastName ? memberObject.push(member.lastName) :  memberObject.push('');
                member.ffposition ? memberObject.push(member.ffposition) :  memberObject.push('');
                member.mantelS ? memberObject.push(member.mantelS) :  memberObject.push('');
                member.mantelB ? memberObject.push('Ja') :  memberObject.push('');
                member.jackeS ? memberObject.push(member.jackeS) :  memberObject.push('');
                member.jackeB ? memberObject.push('Ja') :  memberObject.push('');
                member.hoseS ? memberObject.push(member.hoseS) :  memberObject.push('');
                member.hoseB ? memberObject.push('Ja') :  memberObject.push('');
                member.hemdS ? memberObject.push(member.hemdS) :  memberObject.push('');
                member.hemdB ? memberObject.push('Ja') :  memberObject.push('');
                member.kappeS ? memberObject.push(member.kappeS) :  memberObject.push('');
                member.kappeB ? memberObject.push('Ja') :  memberObject.push('');

                memberObject.push('');
                member.hose2S ? memberObject.push(member.hose2S) :  memberObject.push('');
                member.hose2B ? memberObject.push('Ja') :  memberObject.push('');
                member.tshirtS ? memberObject.push(member.tshirtS) :  memberObject.push('');
                member.tshirtB ? memberObject.push('Ja') :  memberObject.push('');
                member.poloS ? memberObject.push(member.poloS) :  memberObject.push('');
                member.poloB ? memberObject.push('Ja') :  memberObject.push('');
                member.bluseS ? memberObject.push(member.bluseS) :  memberObject.push('');
                member.bluseB ? memberObject.push('Ja') :  memberObject.push('');
                member.fleeceS ? memberObject.push(member.fleeceS) :  memberObject.push('');
                member.fleeceB ? memberObject.push('Ja') :  memberObject.push('');

                memberObject.push('');
                member.schutzjackeS ? memberObject.push(member.schutzjackeS) :  memberObject.push('');
                member.schutzjackeB ? memberObject.push('Ja') :  memberObject.push('');
                member.schutzhoseS ? memberObject.push(member.schutzhoseS) :  memberObject.push('');
                member.schutzhoseB ? memberObject.push('Ja') :  memberObject.push('');
                member.einsatzstiefelschwarzS ? memberObject.push(member.einsatzstiefelschwarzS) :  memberObject.push('');
                member.einsatzstiefelschwarzB ? memberObject.push('Ja') :  memberObject.push('');
                member.einsatzstiefelgelbS ? memberObject.push(member.einsatzstiefelgelbS) :  memberObject.push('');
                member.einsatzstiefelgelbB ? memberObject.push('Ja') :  memberObject.push('');
                member.einsatzhandschuheS ? memberObject.push(member.einsatzhandschuheS) :  memberObject.push('');
                member.einsatzhandschuheB ? memberObject.push('Ja') :  memberObject.push('');
                member.kappe3S ? memberObject.push(member.kappe3S) :  memberObject.push('');
                member.kappe3B ? memberObject.push('Ja') :  memberObject.push('');
                member.haubeS ? memberObject.push(member.haubeS) :  memberObject.push('');
                member.haubeB ? memberObject.push('Ja') :  memberObject.push('');
                member.helmS ? memberObject.push(member.helmS) :  memberObject.push('');
                member.helmB ? memberObject.push('Ja') :  memberObject.push('');
                member.gurtS ? memberObject.push(member.gurtS) :  memberObject.push('');
                member.gurtB ? memberObject.push('Ja') :  memberObject.push('');

              if (member.textarea){
                const regex = /\n/g;
                const newTextareaString = member.textarea.replace(regex, ' ');
                memberObject.push(newTextareaString);
               } else {
                memberObject.push(''); 
               };

               //#endregion

               csvArray.push(memberObject);

            };

            GetFileCSV(csvArray);

    };

    return (
        <div>
                <button className='export-button consoleBtn' onClick={handleExport} title='Exportiere die Datenbank in eine CSV Datei'>export</button>
        </div>
    )
};
