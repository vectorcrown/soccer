var isProfilContentSelected = true;
var isPositionContentSelected = false;
var isOrientationContentSelected = false;
var isExportContentSelected = false;
var isFirstPinPointSelected = false;

var pinPointCount = 0;
var pinPointDataEntry = { 
    x: 0, 
    y: 0, 
    x1: 0, 
    y1: 0, 
    label: '', 
    player: '', 
    receiver: '',
    frame: 0, 
    home_team: '', 
    away_team: '',
    date: '',
    team_analyzed: 'home',
    sense_of_attack: 'right',
};
var pinPointData = [];

function initpinPointDataEntry() {
    pinPointDataEntry = { 
        x: 0, 
        y: 0, 
        x1: 0, 
        y1: 0, 
        label: '', 
        player: '',
        receiver: '', 
        frame: 0, 
        home_team: '', 
        away_team: '',
        date: '',
        team_analyzed: 'home',
        sense_of_attack: 'right',
    };
}

function showTopContent(contentId) {
    var topDivs = document.querySelectorAll('.top-div');
    topDivs.forEach(function(div) {
        div.style.display = 'none';
    });

    var selectedDiv = document.getElementById(contentId);
    selectedDiv.style.display = 'block';

    var buttons = document.querySelectorAll('.bottom-btn');
    buttons.forEach(function(button) {
        button.classList.remove('active');
    });

    var clickedButton = document.querySelector('button[data-id="' + contentId + '"]');
    clickedButton.classList.add('active');

    if(contentId === 'profil_content') {
        isProfilContentSelected = true;
        isPositionContentSelected = false;
        isOrientationContentSelected = false;
        isExportContentSelected = false;
        isFirstPinPointSelected = false;
    } else if(contentId === 'position_pitch_content') {
        isProfilContentSelected = false;
        isPositionContentSelected = true;
        isOrientationContentSelected = false;
        isExportContentSelected = false;
        isFirstPinPointSelected = false;
    } else if(contentId === 'orientation_pitch_content') {
        isProfilContentSelected = false;
        isPositionContentSelected = false;
        isOrientationContentSelected = true;
        isExportContentSelected = false;
        isFirstPinPointSelected = false;
    } else if(contentId === 'export_content') {
        isProfilContentSelected = false;
        isPositionContentSelected = false;
        isOrientationContentSelected = false;
        isExportContentSelected = true;
        isFirstPinPointSelected = false;
    } else {}
}

function scaleCoordinate(value, max) {
    return (value / max) * 100;
}

function placePinPointForPosition(event) {
    const positioniPitchContent = document.getElementById("position_pitch_content");
    const pitchWidth = positioniPitchContent.clientWidth;
    const pitchHeight = positioniPitchContent.clientHeight;
    const x = scaleCoordinate(event.clientX - positioniPitchContent.offsetLeft, pitchWidth);
    const y = scaleCoordinate(event.clientY - positioniPitchContent.offsetTop, pitchHeight);
  
    pinPointDataEntry.x = x;
    pinPointDataEntry.y = y;
    pinPointDataEntry.x1 = 0;
    pinPointDataEntry.y1 = 0;
}

function placePinPointForOrientation(event) {

}

function cancelModal() {
    var modalCancelBtns = document.getElementsByClassName('cancel-modal-btn');
    for(let modalCancelBtn of modalCancelBtns) {
        modalCancelBtn.addEventListener('click', function() {
            initpinPointDataEntry();
        });
    }
}

function openModals() {
    //  pitches
    const positionPitchContent = document.getElementById('position_pitch_content');
    const orientationPitchContent = document.getElementById('orientation_pitch_content');
    //  modals
    const positionFirstModal = new bootstrap.Modal(document.getElementById('position-first-modal'));
    const positionPlayerModal = new bootstrap.Modal(document.getElementById('position-player-modal'));
    const orientationFirstModal = new bootstrap.Modal(document.getElementById('orientation-first-modal'));
    const orientationPasserModal = new bootstrap.Modal(document.getElementById('orientation-passer-modal'));
    const orientationReceiverModal = new bootstrap.Modal(document.getElementById('orientation-receiver-modal'));
    
    positionPitchContent.addEventListener('click', function(event) {
        placePinPointForPosition(event);
        positionFirstModal.show();
    });

    orientationPitchContent.addEventListener('click', function() {
        if(isFirstPinPointSelected) {
            orientationFirstModal.show();
            isFirstPinPointSelected = false;
        } else {
            isFirstPinPointSelected = true;
        }
    });

    //  position
    const recoveryBtn = document.getElementById('recovery_btn');
    const lossBtn = document.getElementById('loss_btn');
    const threeLossBtn = document.getElementById('three_loss_btn');

    recoveryBtn.addEventListener('click', function() {
        positionFirstModal.hide();
        positionPlayerModal.show();

        pinPointDataEntry.label = 'recovery';
    });

    lossBtn.addEventListener('click', function() {
        positionFirstModal.hide();
        positionPlayerModal.show();

        pinPointDataEntry.label = 'loss';
    });

    threeLossBtn.addEventListener('click', function() {
        positionFirstModal.hide();
        positionPlayerModal.show();

        pinPointDataEntry.label = 'loss(+3 touches)';
    });

    const playerBtns = document.getElementsByClassName('player-btn');

    for(let playerBtn of playerBtns) {
        playerBtn.addEventListener('click', function() {
            positionPlayerModal.hide();
            
            pinPointDataEntry.player = playerBtn.id;

            const pinpoint = document.createElement("div");
            pinpoint.className = "pinpoint";
            pinpoint.style.left = pinPointDataEntry.x * document.getElementById("position_pitch_content").clientWidth / 100 + "px";
            pinpoint.style.top = pinPointDataEntry.y * document.getElementById("position_pitch_content").clientHeight / 100 + "px";
            positionPitchContent.appendChild(pinpoint);
            pinPointData.push(pinPointDataEntry);

            var exportTable = document.getElementById('export_table');
            var row = exportTable.insertRow(-1);
            var cell0 = row.insertCell(0);
            var cell1 = row.insertCell(1);
            var cell2 = row.insertCell(2);
            var cell3 = row.insertCell(3);
            var cell4 = row.insertCell(4);
            var cell5 = row.insertCell(5);
            var cell6 = row.insertCell(6);
            var cell7 = row.insertCell(7);
            var cell8 = row.insertCell(8);
            var cell9 = row.insertCell(9);
            var cell10 = row.insertCell(10);
            var cell11 = row.insertCell(11);
            var cell12 = row.insertCell(12);

            cell0.innerHTML = pinPointDataEntry.x;
            cell1.innerHTML = pinPointDataEntry.y;
            cell2.innerHTML = pinPointDataEntry.x1;
            cell3.innerHTML = pinPointDataEntry.y1;
            cell4.innerHTML = pinPointDataEntry.label;
            cell5.innerHTML = pinPointDataEntry.player;
            cell6.innerHTML = pinPointDataEntry.receiver;
            cell7.innerHTML = pinPointDataEntry.frame;
            cell8.innerHTML = pinPointDataEntry.home_team;
            cell9.innerHTML = pinPointDataEntry.away_team;
            cell10.innerHTML = pinPointDataEntry.date;
            cell11.innerHTML = pinPointDataEntry.team_analyzed;
            cell12.innerHTML = pinPointDataEntry.sense_of_attack;

            initpinPointDataEntry();
        });
    }

    //  orientation
    const successPassBtn = document.getElementById('success_pass_btn');
    const failedPassBtn = document.getElementById('failed_pass_btn');
    const progressBtn = document.getElementById('progress_btn');
    const callBtn = document.getElementById('call_btn');

    successPassBtn.addEventListener('click', function() {
        orientationFirstModal.hide();
        orientationPasserModal.show();
    });

    failedPassBtn.addEventListener('click', function() {
        orientationFirstModal.hide();
        orientationPasserModal.show();
    });

    progressBtn.addEventListener('click', function() {
        orientationFirstModal.hide();
        orientationPasserModal.show();
    });

    callBtn.addEventListener('click', function() {
        orientationFirstModal.hide();
        orientationPasserModal.show();
    });

    const passerBtns = document.getElementsByClassName('passer-btn');

    for(let passerBtn of passerBtns) {
        passerBtn.addEventListener('click', function() {
            orientationPasserModal.hide();
            orientationReceiverModal.show();
        });
    }

    const receiverBtns = document.getElementsByClassName('receiver-btn');

    for(let receiverBtn of receiverBtns) {
        receiverBtn.addEventListener('click', function() {
            orientationReceiverModal.hide();
            //
        });
    }
}

function getPinpointCoordinates() {
    
}
  
function exportPinpointCoordinatesToCSV() {
    const homeTeam = document.getElementById('home_team_input').value;
    const awayTeam = document.getElementById('away_team_input').value;
    const date = document.getElementById('date_input').value;
    const analyzed = document.getElementById('select_team_input').value;
    const sendOfAttack = document.getElementById('select_sense_attack_input').value;

    if(homeTeam === '' && awayTeam === '' && date === '') {
        alert('Please complete your profil');
        return;
    }

    for(let i = 0; i < pinPointData.length; i ++) {
        pinPointData[i].home_team = homeTeam;
        pinPointData[i].away_team = awayTeam;
        pinPointData[i].date = date;
        pinPointData[i].team_analyzed = analyzed;
        pinPointData[i].sense_of_attack = sendOfAttack;
    }

    if(sendOfAttack === 'left') {
        for(let i = 0; i < pinPointData.length; i ++) {
            pinPointData[i].x = 100 - pinPointData[i].x;
            pinPointData[i].y = 100 - pinPointData[i].y;
        }
    
    }

    console.log(pinPointData);

    const coordinates = pinPointData.map(
        ({ x, y, x1, y1, label, player, receiver, frame, home_team, away_team, date, team_analyzed, sense_of_attack }) => [x, y, x1, y1, label, player, receiver, frame, home_team, away_team, date, team_analyzed, sense_of_attack]
    );

    console.log(coordinates);

    let csvContent = "x, y, x1, y1, label, player, receiver, frame, home_team, away_team, date, team_analyzed, sense_of_attack\n";
    for (const [x, y, x1, y1, label, player, receiver, frame, home_team, away_team, date, team_analyzed, sense_of_attack] of coordinates) {
        csvContent += `${x},${y},${x1},${y1}, ${label}, ${player}, ${receiver}, ${frame}, ${home_team}, ${away_team}, ${date}, ${team_analyzed}, ${sense_of_attack} \n`;
    }
  
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pinpoints.csv";
    a.click();
}

showTopContent('profil_content');
openModals();
cancelModal();