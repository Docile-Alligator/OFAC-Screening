import '@material/web/tokens/_index.scss';
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/button/text-button.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/checkbox/checkbox.js';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/list/list.js';
import '@material/web/list/list-item.js';
import '@material/web/icon/icon.js';
import '@material/web/menu/menu.js';
import '@material/web/menu/menu-item.js';
import '@material/web/progress/circular-progress.js';
import '@material/web/dialog/dialog.js';
import './App.css';
import { useState } from "react";
import { useRef } from 'react';
import { forwardRef } from 'react';
import { useEffect } from 'react';
import { screenCandidate } from './ofac.js';

export default function App() {
    const dialogRef = useRef(null);
    const [screeningResult, setScreeningResult] = useState(null);

    return (
        <>
            <ResultDialog ref={dialogRef} screeningResult={screeningResult} />
            <div className={"center_card"}>
                <WebFormExplanation />
                <WebForm dialogRef={dialogRef} setScreeningResult={setScreeningResult} />
            </div>
        </>
    );
}

function WebFormExplanation() {
    return (
        <div style={{ flex: '50%', position: 'relative'}}>
            <div className={'screening_info'}>
                <p style={{ fontSize: '3rem', color: 'white' }}>OFAC Screening</p>
            </div>
            <img alt="web form explanation background" src={require('./form_explanation_background.jpg')} />
        </div>
    )
}

function WebForm(props) {
    const nameTextFieldRef = useRef(null);
    const birthYearTextFieldRef = useRef(null);
    const countryTextFieldRef = useRef(null);
    const menuRef = useRef(null);
    const submitButtonRef = useRef(null);
    const progressBarRef = useRef(null);
    const dialogRef = props.dialogRef;

    const handleShowCountryMenu = () => {
        if (menuRef.current.hasAttribute("open")) {
            menuRef.current.removeAttribute("open");
        } else {
            menuRef.current.setAttribute("open", '');
        }
    }

    const reportValidityAfterFocusLoss = (inputRef) => {
        inputRef.current.reportValidity();
        inputRef.current.blur();
    }

    function submitForm(event) {
        event.preventDefault();

        var inputValid = nameTextFieldRef.current.reportValidity();
        inputValid = inputValid && birthYearTextFieldRef.current.reportValidity();
        inputValid = inputValid && countryTextFieldRef.current.reportValidity();

        if (!inputValid) {
            return;
        }

        progressBarRef.current.style.display = '';
        submitButtonRef.current.style.display = 'none';

        screenCandidate(nameTextFieldRef.current.value,
            birthYearTextFieldRef.current.value,
            countryTextFieldRef.current.value)
            .then(response => {
                progressBarRef.current.style.display = 'none';
                submitButtonRef.current.style.display = '';
                props.setScreeningResult({
                    passed: true
                });

                dialogRef.current.show();
            })
            .catch(error => {
                progressBarRef.current.style.display = 'none';
                submitButtonRef.current.style.display = '';
                props.setScreeningResult({
                    passed: false,
                    // Error can be a string or a match object
                    error: error
                });

                dialogRef.current.show();
            });
    }

    return (
        <form onSubmit={submitForm} className={"main_form"} style={{flex: '50%'}}>
            <md-outlined-text-field label="Full Name" class={"form_item"} ref={nameTextFieldRef} required="true"
                                    onBlur={() => {reportValidityAfterFocusLoss(nameTextFieldRef)}}>
            </md-outlined-text-field>

            <md-outlined-text-field label="Birth Year" class={"form_item"} ref={birthYearTextFieldRef} type="number" min="1900"
                                    max="2024" step="1"
                                    value="2000" required="true" style={{fontFamily: '"Outfit", sans-serif'}} onBlur={() => {reportValidityAfterFocusLoss(birthYearTextFieldRef)}}>
            </md-outlined-text-field>

            <md-outlined-text-field label="Country" id="country" class={"form_item"} onClick={handleShowCountryMenu}
                                    ref={countryTextFieldRef} readOnly="true" required="true" value={"Canada"}
                                    onBlur={() => {reportValidityAfterFocusLoss(countryTextFieldRef)}}>
                <md-icon slot="trailing-icon">
                    <DropDownIcon/>
                </md-icon>
            </md-outlined-text-field>

            <CountryMenu ref={menuRef} countryRef={countryTextFieldRef}/>

            <md-filled-button class={"form_item"} ref={submitButtonRef} onClick={submitForm}>Submit</md-filled-button>
            <md-circular-progress indeterminate class={"form_item"} ref={progressBarRef} style={{alignSelf: 'center', display: 'none'}} ></md-circular-progress>

        </form>
    );
}

function DropDownIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
            <path d="M480-360 280-560h400L480-360Z"/>
        </svg>
    )
}

const countriesJSON = require('./countries.json');

const CountryMenu = forwardRef(function CountryMenu(props, ref) {
    return (
        <md-menu positioning="popover" id="usage-popover" anchor="country" ref={ref}>
            {countriesJSON.map((country, i) => {
                return <CountryMenuEntry key={i} countryName={country.name} countryRef={props.countryRef} />;
            })}
        </md-menu>
    )
});

function CountryMenuEntry(props) {
    const itemOnClick = () => {
        props.countryRef.current.value = props.countryName;
    };

    return (
        <md-menu-item onClick={itemOnClick}>
            <div slot="headline" style={{fontFamily: '"Outfit", sans-serif'}}>{props.countryName}</div>
        </md-menu-item>
    )
};

const ResultDialog = forwardRef(function ResultDialog(props, forwardedRef) {
    const title = props.screeningResult == null ? "" : props.screeningResult.passed ? "Clear" : "Hit";
    let message;
    if (props.screeningResult == null) {
        message = "";
    } else if (props.screeningResult.passed) {
        message = "You passed the OFAC screening."
    } else if (typeof props.screeningResult.error === 'string') {
        message = props.screeningResult.error;
    } else if (typeof props.screeningResult.error === 'object') {
        message = "Name: " + (props.screeningResult.error.name ? '❌ ' : '✅ ')
        + "DoB: " + (props.screeningResult.error.birthYear ? '❌ ' : '✅ ')
        + "Country: " + (props.screeningResult.error.country ? '❌ ' : '✅ ');
    } else {
        message = "";
    }
    let positiveButtonText = props.screeningResult == null || !props.screeningResult.passed ? "OK" : "Continue";

    const positiveButtonOnClick = () => {
        if (props.screeningResult != null && props.screeningResult.passed) {
            window.location.href = "https://google.com";
        }
    };

    const dialogRef = useRef(null);
    useEffect(() => {
        if (dialogRef.current) {
            const dialogOnClose = (e) => {
                if (props.screeningResult != null && props.screeningResult.passed) {
                    window.location.href = "https://google.com";
                }
            };

            dialogRef.current.addEventListener("close", dialogOnClose);

            return () => {
                dialogRef.current.removeEventListener("close", dialogOnClose);
            };
        }
    }, [props.screeningResult]);

    return (
        <md-dialog ref={ ref => { forwardedRef.current = ref; dialogRef.current = ref; } } close={positiveButtonOnClick}>
            <div slot="headline">
                {title}
            </div>
            <form slot="content" id="form-id" method="dialog">
                {message}
            </form>
            <div slot="actions">
                <md-text-button form="form-id" value="ok" onClick={positiveButtonOnClick}>{positiveButtonText}</md-text-button>
            </div>
        </md-dialog>
    )
})